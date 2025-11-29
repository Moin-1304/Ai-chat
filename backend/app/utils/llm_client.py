"""
LLM Client abstraction layer
Supports OpenAI and can be extended for other providers
"""
import os
from typing import List, Dict, Any, Optional
from dotenv import load_dotenv
from openai import OpenAI
import logging

# Load environment variables
load_dotenv()

logger = logging.getLogger(__name__)


class LLMClient:
    """Abstract LLM client interface"""
    
    def generate(self, prompt: str, system_prompt: Optional[str] = None, **kwargs) -> str:
        """Generate response from LLM"""
        raise NotImplementedError
    
    def generate_with_context(
        self, 
        user_message: str, 
        context_chunks: List[Dict[str, Any]], 
        conversation_history: List[Dict[str, str]],
        system_prompt: Optional[str] = None
    ) -> str:
        """Generate response with RAG context"""
        raise NotImplementedError


class OpenAILLMClient(LLMClient):
    """OpenAI LLM client implementation"""
    
    def __init__(self):
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise ValueError("OPENAI_API_KEY environment variable not set")
        
        self.client = OpenAI(api_key=api_key)
        # Use gpt-4o-mini as default (cheaper and more available) or gpt-4o if available
        self.model = os.getenv("OPENAI_MODEL", "gpt-4o-mini")
        self.temperature = float(os.getenv("OPENAI_TEMPERATURE", "0.3"))  # Lower for more deterministic
    
    def generate(self, prompt: str, system_prompt: Optional[str] = None, **kwargs) -> str:
        """Generate response using OpenAI"""
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": prompt})
        
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                temperature=self.temperature,
                **kwargs
            )
            return response.choices[0].message.content
        except Exception as e:
            logger.error(f"OpenAI API error: {e}")
            raise
    
    def generate_with_context(
        self, 
        user_message: str, 
        context_chunks: List[Dict[str, Any]], 
        conversation_history: List[Dict[str, str]],
        system_prompt: Optional[str] = None
    ) -> str:
        """Generate response with RAG context"""
        
        # Build system prompt with strict constraints
        if not system_prompt:
            system_prompt = """You are an AI Help Desk assistant for PCTE (Persistent Cyber Training Environment).

CRITICAL CONSTRAINTS:
1. You MUST ONLY use information from the provided Knowledge Base (KB) chunks.
2. If the KB does not contain relevant information, you MUST say "This is not covered in the knowledge base" and recommend escalation.
3. NEVER fabricate commands, URLs, procedures, or steps not explicitly in the KB.
4. NEVER provide guidance on accessing host machines, disabling logging, or destructive actions.
5. Always cite KB references when providing information.
6. Be helpful, professional, and concise.

Your responses must be grounded ONLY in the provided KB content."""

        # Build context from KB chunks
        kb_context = ""
        if context_chunks:
            kb_context = "\n\n## Knowledge Base Context:\n\n"
            for i, chunk in enumerate(context_chunks, 1):
                kb_context += f"### Reference {i}: {chunk.get('title', 'Unknown')}\n"
                kb_context += f"{chunk.get('content', '')}\n\n"
        else:
            kb_context = "\n\n## Knowledge Base Context:\n\nNo relevant knowledge base articles found for this query.\n\n"
        
        # Build conversation history
        history_context = ""
        if conversation_history:
            history_context = "\n\n## Recent Conversation History:\n\n"
            for msg in conversation_history[-5:]:  # Last 5 messages
                role = msg.get('role', 'user')
                content = msg.get('content', '')
                history_context += f"{role.capitalize()}: {content}\n"
        
        # Construct full prompt
        full_prompt = f"""{kb_context}{history_context}

## User Question:
{user_message}

## Instructions:
Based ONLY on the Knowledge Base context above, provide a helpful answer. If the KB doesn't contain relevant information, clearly state that and recommend creating a support ticket."""

        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": full_prompt}
        ]
        
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                temperature=self.temperature,
                max_tokens=1000
            )
            return response.choices[0].message.content
        except Exception as e:
            logger.error(f"OpenAI API error: {e}")
            raise


def get_llm_client() -> LLMClient:
    """Factory function to get LLM client based on configuration"""
    provider = os.getenv("LLM_PROVIDER", "openai").lower()
    
    if provider == "openai":
        return OpenAILLMClient()
    else:
        raise ValueError(f"Unsupported LLM provider: {provider}")

