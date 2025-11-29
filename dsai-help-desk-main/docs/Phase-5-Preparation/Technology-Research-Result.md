Given the comprehensive scope of your research request, I'll provide a consolidated technology stack recommendation organized by priority areas. This response focuses on practical, deployment-ready recommendations for your PCTE AI Help Desk system.

# PCTE AI Help Desk: Technology Stack Recommendations (2024-2025)

## 1. RAG (Retrieval Augmented Generation) Implementation

## **Best Practices (2024-2025)**

**Hybrid Retrieval Strategy:**

* Combine BM25 (keyword/lexical search) with dense semantic search for optimal recall[tigerdata**+1**](https://www.tigerdata.com/blog/rag-is-more-than-just-vector-search)
* Use reranking models (cross-encoders) to improve top-k precision after initial retrieval
* Implement query expansion and decomposition for complex technical questions[tigerdata](https://www.tigerdata.com/blog/rag-is-more-than-just-vector-search)

**Recommended Vector Database: pgvector (PostgreSQL Extension)**

**Rationale:**

* **Air-gapped friendly:** Self-hosted, no external dependencies[latenode**+1**](https://latenode.com/blog/best-vector-databases-for-rag-complete-2025-comparison-guide)
* **Cost:** Free, open-source (PostgreSQL license)
* **Integration:** Native SQL interface works seamlessly with existing relational data[reddit](https://www.reddit.com/r/LocalLLaMA/comments/1e63m16/vector_database_pgvector_vs_milvus_vs_weaviate/)
* **Performance:** HNSW indexing provides sub-10ms query latency for 100K+ vectors[reddit](https://www.reddit.com/r/LocalLLaMA/comments/1e63m16/vector_database_pgvector_vs_milvus_vs_weaviate/)
* **Maturity:** Production-ready with strong community support[reddit](https://www.reddit.com/r/LocalLLaMA/comments/1e63m16/vector_database_pgvector_vs_milvus_vs_weaviate/)

**Alternative Consideration: Milvus**

* Better for 1M+ vector scale and GPU acceleration scenarios[zair](https://www.zair.top/en/post/vector-database-compare/)
* More complex deployment (requires etcd, MinIO) - overhead for your 250-1K user scale[zair](https://www.zair.top/en/post/vector-database-compare/)
* Choose if future scale exceeds 1M documents or requires GPU-accelerated search[latenode](https://latenode.com/blog/best-vector-databases-for-rag-complete-2025-comparison-guide)

**CPU-Only Optimization:**

* Use **GGUF Q5_K_M quantization** for embedding models (4.5x speedup, <1% quality loss)[itecsonline](https://itecsonline.com/post/vllm-vs-ollama-vs-llama.cpp-vs-tgi-vs-tensort)
* Batch query encoding (32-64 queries) for document indexing workloads
* Enable HNSW index with optimized parameters: `ef_construction=200, M=16` for balanced performance[reddit](https://www.reddit.com/r/LocalLLaMA/comments/1e63m16/vector_database_pgvector_vs_milvus_vs_weaviate/)

**Recommended Embedding Model: BAAI/bge-small-en-v1.5**

* **Performance:** 2-5ms per query on 16-core CPU, 200-500 qps throughput[huggingface](https://huggingface.co/BAAI/bge-small-en-v1.5)
* **Quality:** MTEB score 62.40 (strong for technical docs)
* **Memory:** 130 MB footprint
* **Dimensions:** 384 (efficient storage)
* License: MIT (no restrictions)

**Semantic Search Best Practices:**

* Use **cosine similarity** for vector distance metric
* Retrieve top-20 candidates, rerank to top-6 for LLM context
* Implement **reciprocal rank fusion (RRF)** to merge BM25 + dense results[tigerdata](https://www.tigerdata.com/blog/rag-is-more-than-just-vector-search)
* Set similarity threshold (>0.7) to filter low-quality matches

**Closed-Network Considerations:**

* Download model weights pre-deployment (~500MB total package)
* Mirror PyTorch CPU runtime and dependencies (~300MB)
* Use local artifact registry (Harbor or Nexus) for container images
* No runtime internet required once deployed

---

## 2. AI/ML Frameworks and Libraries

## **Recommended Framework: LangChain** [**REQUIRES VALIDATION - SEE NOTE BELOW**]

**Rationale:**

* **Production maturity:** Most widely adopted (2M+ downloads/month)[latenode**+1**](https://community.latenode.com/t/which-framework-should-i-choose-for-rag-development-langchain-vs-llamaindex/39107)
* **Comprehensive tooling:** Built-in support for RAG, agents, memory, callbacks[latenode](https://community.latenode.com/t/which-framework-should-i-choose-for-rag-development-langchain-vs-llamaindex/39107)
* **Integration ecosystem:** Pre-built connectors for Confluence, Jira APIs[latenode](https://community.latenode.com/t/which-framework-should-i-choose-for-rag-development-langchain-vs-llamaindex/39107)
* **Active development:** Monthly releases with enterprise features[n8n](https://blog.n8n.io/llamaindex-vs-langchain/)

**vs. LlamaIndex:**

* LlamaIndex better for data-centric, index-first workflows[n8n](https://blog.n8n.io/llamaindex-vs-langchain/)
* LangChain better for agent-based, tool-calling chatbots[n8n**+1**](https://blog.n8n.io/llamaindex-vs-langchain/)
* PCTE Help Desk requires agent patterns (tool calling for Jira, ticket creation) → **LangChain wins**

**⚠️ PHASE 5 DECISION NOTE:**

LangChain recommendation requires engineering validation. Considerations:

* **Pros:** Abstraction layer, pre-built integrations, community support
* **Cons:** Potential over-engineering for PCTE's closed-network constraints; may introduce unnecessary complexity and coupling; direct FastAPI + llama.cpp orchestration could be simpler and more maintainable
* **Alternative:** Lightweight orchestration without LangChain (direct API calls, custom agent logic)
* **Action:** Yash should evaluate trade-offs and confirm whether LangChain's benefits justify overhead vs. direct implementation

**LLM Inference Engine: llama.cpp (CPU-optimized)**

**Deployment Configuration:**

* **Framework:** llama.cpp server with OpenAI-compatible API[developers.redhat**+1**](https://developers.redhat.com/articles/2025/09/30/vllm-or-llamacpp-choosing-right-llm-inference-engine-your-use-case)
* **Model:** Llama-3.1-8B-Instruct Q5_K_M quantization
* **Performance:** ~50 tokens/sec on 64-core Xeon (real benchmark)[itecsonline](https://itecsonline.com/post/vllm-vs-ollama-vs-llama.cpp-vs-tgi-vs-tensort)
* **TTFT:** 800-1500ms at low concurrency[itecsonline](https://itecsonline.com/post/vllm-vs-ollama-vs-llama.cpp-vs-tgi-vs-tensort)
* **Concurrency:** Use queue-based request handling for 250-1K users

**Why llama.cpp over vLLM:**

* vLLM requires GPU for optimal performance[reddit**+1**](https://www.reddit.com/r/LocalLLaMA/comments/1nwpxxx/performance_wise_what_is_the_best_backend_right/)
* vLLM cannot offload to CPU in production scenarios[reddit](https://www.reddit.com/r/LocalLLaMA/comments/1nwpxxx/performance_wise_what_is_the_best_backend_right/)
* llama.cpp designed specifically for CPU-first deployments[wallaroo**+1**](https://docs.wallaroo.ai/202404/wallaroo-llm/wallaroo-llm-optimizations/wallaroo-llm-optimizations-vllm-llama/)
* Your constraint: **No GPU → llama.cpp is correct choice**[developers.redhat](https://developers.redhat.com/articles/2025/09/30/vllm-or-llamacpp-choosing-right-llm-inference-engine-your-use-case)

**NLP Production Best Practices:**

* Use **spaCy** for intent classification and entity extraction (CPU-optimized, mature)
* Implement **sentence-transformers** for zero-shot classification tasks
* Deploy models via **ONNX Runtime** for 2-4x CPU inference speedup

**Confidence Scoring Implementation:**

* Aggregate multiple signals:
  * **Retrieval score:** Average cosine similarity of top-k chunks (>0.75 = high confidence)
  * **LLM probability:** Token probabilities from model output (perplexity-based)
  * **Semantic consistency:** Similarity between query and generated answer
* Use **logistic regression ensemble** to combine scores into final confidence (0-1 scale)
* Set confidence threshold (>0.7) for autonomous answers, <0.7 triggers escalation

**Closed-Network Deployment:**

* Pre-download all models and weights (Llama-3.1-8B: ~5.3GB GGUF)
* Package LangChain + dependencies as Docker image (~2GB)
* Use internal PyPI mirror for Python packages
* Total artifact footprint: ~8-10GB for complete AI stack

**Licensing:**

* LangChain: MIT (free, permissive)
* llama.cpp: MIT
* Llama-3.1 Community License: Acceptable for <700M MAU (PCTE internal users qualify)
* Alternative: Qwen2-7B-Instruct (Apache 2.0, zero restrictions)

---

## 3. Backend Architecture and APIs

## **Recommended Framework: FastAPI**

**Best Practices for Chatbot APIs:**

**Architecture Pattern:**

<pre class="not-prose w-full rounded font-mono text-sm font-extralight"><div class="codeWrapper text-light selection:text-super selection:bg-super/10 my-md relative flex flex-col rounded-lg font-mono text-sm font-normal bg-subtler"><div class="translate-y-xs -translate-x-xs bottom-xl mb-xl flex h-0 items-start justify-end md:sticky md:top-[calc(var(--header-height)+var(--size-xs))]"><div class="overflow-hidden rounded-full border-subtlest ring-subtlest divide-subtlest bg-base"><div class="border-subtlest ring-subtlest divide-subtlest bg-subtler"><button data-testid="copy-code-button" aria-label="Copy code" type="button" class="focus-visible:bg-subtle hover:bg-subtle text-quiet  hover:text-foreground dark:hover:bg-subtle font-sans focus:outline-none outline-none outline-transparent transition duration-300 ease-out select-none items-center relative group/button font-semimedium justify-center text-center items-center rounded-full cursor-pointer active:scale-[0.97] active:duration-150 active:ease-outExpo origin-center whitespace-nowrap inline-flex text-sm h-8 aspect-square" data-state="closed"><div class="flex items-center min-w-0 gap-two justify-center"><div class="flex shrink-0 items-center justify-center size-4"><svg role="img" class="inline-flex fill-current" width="16" height="16"><use xlink:href="#pplx-icon-copy"></use></svg></div></div></button></div></div></div><div class="-mt-xl"><div><div data-testid="code-language-indicator" class="text-quiet bg-subtle py-xs px-sm inline-block rounded-br rounded-tl-lg text-xs font-thin">text</div></div><div><span><code><span><span>Client → API Gateway (nginx) → FastAPI App → LangChain Orchestrator
</span></span><span>                                            ├→ llama.cpp (LLM)
</span><span>                                            ├→ pgvector (Retrieval)
</span><span>                                            └→ Jira/Confluence APIs
</span><span></span></code></span></div></div></div></pre>

**Async/Event-Driven Design:**

* Use **async/await** for all I/O-bound operations[ysfi](https://ysfi.me/blog/fastapi-concurrency-and-parallelism/)
* FastAPI defaults to **AnyIO with 40-thread pool** for sync endpoints[stackoverflow](https://stackoverflow.com/questions/76524933/how-does-uvicorn-fastapi-handle-concurrency-with-1-worker-and-synchronous-endp)
* For 1,000 concurrent users: Deploy with **Uvicorn workers = vCPUs** (not 2×CPU+1 formula)[ysfi](https://ysfi.me/blog/fastapi-concurrency-and-parallelism/)
* **Async endpoints** handle concurrency via event loop, not threads[ysfi](https://ysfi.me/blog/fastapi-concurrency-and-parallelism/)

**Concurrency Configuration:**

<pre class="not-prose w-full rounded font-mono text-sm font-extralight"><div class="codeWrapper text-light selection:text-super selection:bg-super/10 my-md relative flex flex-col rounded-lg font-mono text-sm font-normal bg-subtler"><div class="translate-y-xs -translate-x-xs bottom-xl mb-xl flex h-0 items-start justify-end md:sticky md:top-[calc(var(--header-height)+var(--size-xs))]"><div class="overflow-hidden rounded-full border-subtlest ring-subtlest divide-subtlest bg-base"><div class="border-subtlest ring-subtlest divide-subtlest bg-subtler"><button data-testid="copy-code-button" aria-label="Copy code" type="button" class="focus-visible:bg-subtle hover:bg-subtle text-quiet  hover:text-foreground dark:hover:bg-subtle font-sans focus:outline-none outline-none outline-transparent transition duration-300 ease-out select-none items-center relative group/button font-semimedium justify-center text-center items-center rounded-full cursor-pointer active:scale-[0.97] active:duration-150 active:ease-outExpo origin-center whitespace-nowrap inline-flex text-sm h-8 aspect-square" data-state="closed"><div class="flex items-center min-w-0 gap-two justify-center"><div class="flex shrink-0 items-center justify-center size-4"><svg role="img" class="inline-flex fill-current" width="16" height="16"><use xlink:href="#pplx-icon-copy"></use></svg></div></div></button></div></div></div><div class="-mt-xl"><div><div data-testid="code-language-indicator" class="text-quiet bg-subtle py-xs px-sm inline-block rounded-br rounded-tl-lg text-xs font-thin">python</div></div><div><span><code><span><span class="token token"># Deploy with 16-32 Uvicorn workers on 32-core system</span><span>
</span></span><span><span>uvicorn main</span><span class="token token punctuation">:</span><span>app </span><span class="token token operator">-</span><span class="token token operator">-</span><span>workers </span><span class="token token">32</span><span></span><span class="token token operator">-</span><span class="token token operator">-</span><span>host </span><span class="token token">0.0</span><span class="token token">.0</span><span class="token token">.0</span><span></span><span class="token token operator">-</span><span class="token token operator">-</span><span>port </span><span class="token token">8000</span><span>
</span></span><span></span></code></span></div></div></div></pre>

**Rate Limiting & Queuing:**

* Use **Redis** for distributed rate limiting (100 req/min per user)
* Implement **request queue** with priority levels (escalated > new chats)
* Use **circuit breaker pattern** for LLM timeout protection (Tenacity library)
* Set **max queue depth = 500** to prevent memory exhaustion

**API Design Best Practices:**

* **Versioning:** URL-based (`/api/v1/chat`, `/api/v2/chat`) for breaking changes
* **Backward compatibility:** Maintain v1 for 12 months after v2 release
* **Error handling:** Consistent JSON error format with error codes
* **Pagination:** Cursor-based for chat history (not offset-based)
* **Filtering:** Query parameters for status, date range, user filters

**Authentication in Closed Network:**

* Integrate with **Red Hat SSO (Keycloak)** for OAuth2/OIDC [client-specified]
* Use **JWT tokens** with short expiry (15 min access, 7-day refresh)
* Implement **API key** authentication for service-to-service calls
* Store sessions in Redis for horizontal scaling

**Integration with Client Technologies:**

* Deploy behind **F5 BIG-IP** load balancer [client-specified]
* Use **NSX-T micro-segmentation** for pod-level network policies [client-specified]
* Leverage **TKG** service mesh (Istio) for mTLS between services

**Closed-Network Considerations:**

* Package FastAPI + dependencies as container (~500MB)
* No external API calls (all integrations internal to PCTE)
* Use internal NTP servers for timestamp consistency

**Cost/Licensing:**

* FastAPI: MIT (free)
* Redis: BSD 3-clause (free)
* All dependencies open-source, zero licensing cost

---

## 4. Frontend Technologies

## **Recommended Framework: React**

**Rationale (2024-2025):**

* **Ecosystem maturity:** Largest component library ecosystem (MUI, Ant Design, Chakra UI)[codertrove**+1**](https://www.codertrove.com/articles/2025-tech-stack-dilemma-react-vs-vue-vs-angular-for-enterprise-application)
* **Enterprise adoption:** Dominant in large-scale enterprise apps (65%+ market share)[codertrove](https://www.codertrove.com/articles/2025-tech-stack-dilemma-react-vs-vue-vs-angular-for-enterprise-application)
* **Performance:** React 19 Server Components enable leaner client bundles[lambdatest](https://www.lambdatest.com/blog/vue-vs-react/)
* **Team scalability:** Most developers know React (larger talent pool)[codertrove](https://www.codertrove.com/articles/2025-tech-stack-dilemma-react-vs-vue-vs-angular-for-enterprise-application)
* **TypeScript integration:** First-class support with strong typing

**vs. Vue:**

* Vue has gentler learning curve, better for smaller teams[lambdatest**+1**](https://www.lambdatest.com/blog/vue-vs-react/)
* React better for large teams needing strict architecture[codertrove](https://www.codertrove.com/articles/2025-tech-stack-dilemma-react-vs-vue-vs-angular-for-enterprise-application)
* PCTE requires enterprise scale → **React recommended**[codertrove](https://www.codertrove.com/articles/2025-tech-stack-dilemma-react-vs-vue-vs-angular-for-enterprise-application)

**Recommended UI Component Library: Material-UI (MUI)**

**Rationale (Phase 5 Decision):**

* **Proven in demo:** Already implemented with custom military dark theme (Army Gold #D4AF37, Army Green #4A7C59)
* **Extensive icons:** Material Design icon library (AddIcon, EditIcon, DeleteIcon, etc.)
* **Deep customization:** `styleOverrides` in theme for tactical "Call of Duty" aesthetic
* **Accessibility:** WCAG 2.1 AA compliant out-of-the-box
* **DoD-friendly:** No CDN dependencies, self-hostable
* **Team familiarity:** Current codebase uses MUI; team already proficient
* **Production-ready:** Tactical aesthetic proven in Phase 4 demo

**Real-Time Data Visualization:**

* Use **Recharts** (built on D3, React-friendly) for deflection rate charts
* Implement **react-query** for server state management and real-time updates
* Use **WebSockets** (Socket.IO) for live chat status updates
* Leverage **SWR** for automatic data revalidation every 30s

**Responsive Design Best Practices:**

* Target **1920×1080 desktop** primary, 1366×768 minimum
* Use **CSS Grid + Flexbox** for layout (not Bootstrap grid)
* Implement **breakpoints:** sm (640px), md (768px), lg (1024px), xl (1280px)
* Test on Chrome, Firefox, Edge (DoD-approved browsers)

**Accessibility (WCAG 2.1 AA):**

* Use **semantic HTML** (`<nav>`, `<main>`, `<section>`)
* Ensure **keyboard navigation** for all interactive elements (Tab, Enter, Escape)
* Provide **ARIA labels** for screen readers
* Maintain **4.5:1 contrast ratio** for text (use Axe DevTools for validation)
* Implement **skip navigation** links for keyboard users

**Closed-Network Deployment:**

* Bundle all assets with Webpack/Vite (no CDN dependencies)
* Self-host fonts (no Google Fonts)
* Use internal npm registry (Verdaccio) for packages
* Total build artifacts: ~5-8MB gzipped

**Cost/Licensing:**

* React: MIT
* Material-UI (MUI): MIT
* Recharts: MIT
* Zero licensing cost

---

## 5. Data Mocking and Testing

## **HTTP Mocking: Pytest with responses**

**Recommended Tools:**

* **responses** library for unit tests (lightweight, Pythonic)
* **WireMock** for integration tests (JVM-based, complex scenarios)
* **Playwright** for end-to-end tests (browser automation)

**Realistic Test Data Generation:**

* Use **Faker** library for synthetic user profiles, chat messages, ticket data
* Create **fixture factories** (factory_boy) for reusable test objects
* Generate **1,000 user profiles** with realistic names, roles, query patterns
* Build **500-doc test corpus** from sample Confluence/Jira exports

**Load Testing Recommendation: k6**

**Rationale:**

* **Modern JavaScript syntax:** Easy for developers to write test scripts
* **Protocol support:** HTTP/2, WebSockets (critical for real-time chat)
* **Metrics:** Built-in performance metrics (p50, p95, p99 latency)
* **Distributed:** Can run distributed tests from multiple pods in TKG

**Load Test Configuration:**

<pre class="not-prose w-full rounded font-mono text-sm font-extralight"><div class="codeWrapper text-light selection:text-super selection:bg-super/10 my-md relative flex flex-col rounded-lg font-mono text-sm font-normal bg-subtler"><div class="translate-y-xs -translate-x-xs bottom-xl mb-xl flex h-0 items-start justify-end md:sticky md:top-[calc(var(--header-height)+var(--size-xs))]"><div class="overflow-hidden rounded-full border-subtlest ring-subtlest divide-subtlest bg-base"><div class="border-subtlest ring-subtlest divide-subtlest bg-subtler"><button data-testid="copy-code-button" aria-label="Copy code" type="button" class="focus-visible:bg-subtle hover:bg-subtle text-quiet  hover:text-foreground dark:hover:bg-subtle font-sans focus:outline-none outline-none outline-transparent transition duration-300 ease-out select-none items-center relative group/button font-semimedium justify-center text-center items-center rounded-full cursor-pointer active:scale-[0.97] active:duration-150 active:ease-outExpo origin-center whitespace-nowrap inline-flex text-sm h-8 aspect-square" data-state="closed"><div class="flex items-center min-w-0 gap-two justify-center"><div class="flex shrink-0 items-center justify-center size-4"><svg role="img" class="inline-flex fill-current" width="16" height="16"><use xlink:href="#pplx-icon-copy"></use></svg></div></div></button></div></div></div><div class="-mt-xl"><div><div data-testid="code-language-indicator" class="text-quiet bg-subtle py-xs px-sm inline-block rounded-br rounded-tl-lg text-xs font-thin">javascript</div></div><div><span><code><span><span class="token token">// k6 script for 1,000 concurrent users</span><span>
</span></span><span><span></span><span class="token token">export</span><span></span><span class="token token">let</span><span> options </span><span class="token token operator">=</span><span></span><span class="token token punctuation">{</span><span>
</span></span><span><span></span><span class="token token literal-property property">stages</span><span class="token token operator">:</span><span></span><span class="token token punctuation">[</span><span>
</span></span><span><span></span><span class="token token punctuation">{</span><span></span><span class="token token literal-property property">duration</span><span class="token token operator">:</span><span></span><span class="token token">'5m'</span><span class="token token punctuation">,</span><span></span><span class="token token literal-property property">target</span><span class="token token operator">:</span><span></span><span class="token token">250</span><span></span><span class="token token punctuation">}</span><span class="token token punctuation">,</span><span></span><span class="token token">// Ramp to 250 users</span><span>
</span></span><span><span></span><span class="token token punctuation">{</span><span></span><span class="token token literal-property property">duration</span><span class="token token operator">:</span><span></span><span class="token token">'10m'</span><span class="token token punctuation">,</span><span></span><span class="token token literal-property property">target</span><span class="token token operator">:</span><span></span><span class="token token">1000</span><span></span><span class="token token punctuation">}</span><span class="token token punctuation">,</span><span></span><span class="token token">// Ramp to 1,000 users</span><span>
</span></span><span><span></span><span class="token token punctuation">{</span><span></span><span class="token token literal-property property">duration</span><span class="token token operator">:</span><span></span><span class="token token">'10m'</span><span class="token token punctuation">,</span><span></span><span class="token token literal-property property">target</span><span class="token token operator">:</span><span></span><span class="token token">1000</span><span></span><span class="token token punctuation">}</span><span class="token token punctuation">,</span><span></span><span class="token token">// Hold at 1,000 users</span><span>
</span></span><span><span></span><span class="token token punctuation">{</span><span></span><span class="token token literal-property property">duration</span><span class="token token operator">:</span><span></span><span class="token token">'5m'</span><span class="token token punctuation">,</span><span></span><span class="token token literal-property property">target</span><span class="token token operator">:</span><span></span><span class="token token">0</span><span></span><span class="token token punctuation">}</span><span class="token token punctuation">,</span><span></span><span class="token token">// Ramp down</span><span>
</span></span><span><span></span><span class="token token punctuation">]</span><span class="token token punctuation">,</span><span>
</span></span><span><span></span><span class="token token literal-property property">thresholds</span><span class="token token operator">:</span><span></span><span class="token token punctuation">{</span><span>
</span></span><span><span></span><span class="token token literal-property property">http_req_duration</span><span class="token token operator">:</span><span></span><span class="token token punctuation">[</span><span class="token token">'p(95)<2000'</span><span class="token token punctuation">]</span><span class="token token punctuation">,</span><span></span><span class="token token">// 95% requests < 2s</span><span>
</span></span><span><span></span><span class="token token punctuation">}</span><span class="token token punctuation">,</span><span>
</span></span><span><span></span><span class="token token punctuation">}</span><span class="token token punctuation">;</span><span>
</span></span><span></span></code></span></div></div></div></pre>

**Alternative: Locust**

* Better for complex user behavior simulation (Python-based)
* Use if test scenarios require stateful user sessions

**Synthetic User Profiles:**

* Create **10 user personas:** L1 support agent, L2 engineer, cyber operator, etc.
* Define **query patterns:** 40% factual, 30% troubleshooting, 20% clarification, 10% escalation
* Implement **realistic think time:** 5-30s between messages
* Vary **session lengths:** 1-5 exchanges per chat session

**Integration Testing with Mocks:**

* Mock Jira API responses using **responses** library
* Mock Confluence search results with cached JSON fixtures
* Use **Docker Compose** to spin up test environment (FastAPI + Redis + PostgreSQL)
* Run tests in **GitLab CI** with ephemeral test containers

**Closed-Network Considerations:**

* Package k6 binary (~50MB) in container image
* Store test data fixtures in Git LFS (~500MB)
* Run load tests from within TKG cluster (use K8s Jobs)

**Cost/Licensing:**

* k6: AGPL (free for internal use)
* Pytest, responses, Faker: MIT
* WireMock: Apache 2.0
* Zero licensing cost

---

## 6. Security and Compliance

## **CUI Compliance Implementation**

**Encryption (TLS 1.3+):**

* Use **NGINX with OpenSSL 1.1.1+** for TLS 1.3 termination at ingress
* Enforce **strong cipher suites:** `TLS_AES_256_GCM_SHA384`, `TLS_CHACHA20_POLY1305_SHA256`
* Implement **HSTS headers:** `Strict-Transport-Security: max-age=31536000; includeSubDomains`
* Use **mTLS** between microservices (Istio service mesh)

**Recommended Encryption Library: cryptography (Python)**

* **FIPS 140-2 validated** cryptographic primitives
* Supports **AES-256-GCM** for data at rest
* Use for encrypting sensitive fields in database (chat history with PII)

**Audit Logging Best Practices:**

* Log **every user action:** query submitted, response generated, ticket created, escalation triggered
* Include **metadata:** user_id, timestamp, session_id, IP address, action_type
* Store logs in **append-only PostgreSQL table** with cryptographic signatures (HMAC-SHA256)
* Implement **log retention:** 3 years for CUI compliance (NIST SP 800-53 AU-11)
* Use **structured logging:** JSON format for machine parsing

**Example Audit Log Entry:**

<pre class="not-prose w-full rounded font-mono text-sm font-extralight"><div class="codeWrapper text-light selection:text-super selection:bg-super/10 my-md relative flex flex-col rounded-lg font-mono text-sm font-normal bg-subtler"><div class="translate-y-xs -translate-x-xs bottom-xl mb-xl flex h-0 items-start justify-end md:sticky md:top-[calc(var(--header-height)+var(--size-xs))]"><div class="overflow-hidden rounded-full border-subtlest ring-subtlest divide-subtlest bg-base"><div class="border-subtlest ring-subtlest divide-subtlest bg-subtler"><button data-testid="copy-code-button" aria-label="Copy code" type="button" class="focus-visible:bg-subtle hover:bg-subtle text-quiet  hover:text-foreground dark:hover:bg-subtle font-sans focus:outline-none outline-none outline-transparent transition duration-300 ease-out select-none items-center relative group/button font-semimedium justify-center text-center items-center rounded-full cursor-pointer active:scale-[0.97] active:duration-150 active:ease-outExpo origin-center whitespace-nowrap inline-flex text-sm h-8 aspect-square" data-state="closed"><div class="flex items-center min-w-0 gap-two justify-center"><div class="flex shrink-0 items-center justify-center size-4"><svg role="img" class="inline-flex fill-current" width="16" height="16"><use xlink:href="#pplx-icon-copy"></use></svg></div></div></button></div></div></div><div class="-mt-xl"><div><div data-testid="code-language-indicator" class="text-quiet bg-subtle py-xs px-sm inline-block rounded-br rounded-tl-lg text-xs font-thin">json</div></div><div><span><code><span><span class="token token punctuation">{</span><span>
</span></span><span><span></span><span class="token token property">"timestamp"</span><span class="token token operator">:</span><span></span><span class="token token">"2025-11-15T05:35:00Z"</span><span class="token token punctuation">,</span><span>
</span></span><span><span></span><span class="token token property">"user_id"</span><span class="token token operator">:</span><span></span><span class="token token">"user123@army.mil"</span><span class="token token punctuation">,</span><span>
</span></span><span><span></span><span class="token token property">"session_id"</span><span class="token token operator">:</span><span></span><span class="token token">"sess-abc123"</span><span class="token token punctuation">,</span><span>
</span></span><span><span></span><span class="token token property">"action"</span><span class="token token operator">:</span><span></span><span class="token token">"chat_query"</span><span class="token token punctuation">,</span><span>
</span></span><span><span></span><span class="token token property">"query_text_hash"</span><span class="token token operator">:</span><span></span><span class="token token">"sha256:..."</span><span class="token token punctuation">,</span><span>
</span></span><span><span></span><span class="token token property">"response_id"</span><span class="token token operator">:</span><span></span><span class="token token">"resp-xyz789"</span><span class="token token punctuation">,</span><span>
</span></span><span><span></span><span class="token token property">"confidence_score"</span><span class="token token operator">:</span><span></span><span class="token token">0.85</span><span class="token token punctuation">,</span><span>
</span></span><span><span></span><span class="token token property">"escalated"</span><span class="token token operator">:</span><span></span><span class="token token boolean">false</span><span class="token token punctuation">,</span><span>
</span></span><span><span></span><span class="token token property">"sources"</span><span class="token token operator">:</span><span></span><span class="token token punctuation">[</span><span class="token token">"CONF-12345"</span><span class="token token punctuation">,</span><span></span><span class="token token">"JIRA-67890"</span><span class="token token punctuation">]</span><span>
</span></span><span><span></span><span class="token token punctuation">}</span><span>
</span></span><span></span></code></span></div></div></div></pre>

**RBAC Implementation:**

* Use **Red Hat SSO (Keycloak) roles** [client-specified]
* Map roles to permissions: `help_desk_user`, `help_desk_admin`, `system_admin`
* Implement **attribute-based access control (ABAC)** for document-level access
* Enforce **least privilege:** Users only see chats/tickets they created or are assigned to

**Security Testing Tools:**

* **OWASP ZAP:** Automated vulnerability scanning (DAST)
* **Bandit:** Python static analysis for security issues (SAST)
* **Trivy:** Container image vulnerability scanning
* **Snyk:** Dependency vulnerability scanning (optional)

**Closed-Network Deployment:**

* Run all security scans in CI/CD pipeline (no external SaaS tools)
* Use internal CVE database mirror (NIST NVD mirror)
* Package OWASP ZAP as container image (~1.5GB)

**Cost/Licensing:**

* All tools: Apache 2.0 or MIT (free)
* FIPS 140-2 compliance: Use RHEL crypto libraries (included with Red Hat subscription)

---

## 7. CI/CD and DevOps

## **Recommended CI/CD: GitLab CI (Self-Hosted)**

**Rationale for Closed Networks:**

* **Self-hosted:** Runs entirely on-premises (no SaaS dependency)
* **Integrated:** Git + CI/CD + container registry in one platform
* **Kubernetes native:** Built-in TKG/K8s executor support
* **YAML-based:** GitLab CI pipelines as code

**Alternative: Jenkins**

* More flexible but higher maintenance overhead
* Choose if team already has Jenkins expertise
* GitLab CI preferred for greenfield deployment

**Infrastructure-as-Code Recommendation: Helm + Terraform**

**Helm (Kubernetes):**

* Package AI Help Desk as **Helm chart** with configurable values
* Use **Helm hooks** for database migrations
* Manage **secrets** via Kubernetes Secrets (encrypted with KMS)
* Version charts in GitLab (semantic versioning: v1.0.0, v1.1.0)

**Terraform (Infrastructure):**

* Provision **VMware vSphere VMs** for TKG nodes [client-specified]
* Configure **NSX-T network segments** and firewall rules [client-specified]
* Manage **F5 virtual servers** and load balancer pools [client-specified]
* Use **remote state backend:** S3-compatible storage (MinIO on-prem)

**CI/CD Pipeline Stages:**

1. **Build:** Docker image build (multi-stage for minimal size)
2. **Test:** Unit tests (Pytest), integration tests (Docker Compose)
3. **Security:** Trivy scan, Bandit SAST, OWASP ZAP DAST
4. **Deploy:** Helm upgrade to dev/staging/prod namespaces
5. **Verify:** Smoke tests, health checks, rollback if failed

**Automated Rollback:**

* Use **Helm rollback** command on deployment failure
* Implement **readiness probes:** `/health` endpoint checks DB connectivity, LLM availability
* Set **max unavailable pods = 25%** during rolling updates
* **Canary deployment:** Route 10% traffic to new version, monitor errors, full rollout if stable

**Monitoring/Alerting Integration:**

* Send deployment events to **Slack/Mattermost** [client uses Mattermost]
* Trigger **PagerDuty alerts** on critical deployment failures
* Use **Prometheus metrics** for deployment success rate tracking

**Closed-Network Deployment:**

* Run **GitLab Runner** as Kubernetes pods in TKG
* Use **internal Docker registry** (Harbor) for image storage
* Mirror all base images (Python, NGINX) to internal registry
* Package Terraform providers locally (~100MB)

**Cost/Licensing:**

* GitLab CE: MIT (free)
* Helm: Apache 2.0
* Terraform: MPL 2.0 (free for internal use)
* Zero licensing cost for CI/CD stack

---

## 8. Monitoring, Logging, and Observability

## **Recommended APM: Prometheus + Grafana**

**Rationale:**

* **Open-source:** No licensing cost, widely adopted (CNCF projects)
* **Kubernetes-native:** Built-in service discovery for TKG pods
* **Self-hosted:** Runs entirely on-premises in closed network
* **Extensible:** Rich ecosystem of exporters and integrations

**Architecture:**

<pre class="not-prose w-full rounded font-mono text-sm font-extralight"><div class="codeWrapper text-light selection:text-super selection:bg-super/10 my-md relative flex flex-col rounded-lg font-mono text-sm font-normal bg-subtler"><div class="translate-y-xs -translate-x-xs bottom-xl mb-xl flex h-0 items-start justify-end md:sticky md:top-[calc(var(--header-height)+var(--size-xs))]"><div class="overflow-hidden rounded-full border-subtlest ring-subtlest divide-subtlest bg-base"><div class="border-subtlest ring-subtlest divide-subtlest bg-subtler"><button data-testid="copy-code-button" aria-label="Copy code" type="button" class="focus-visible:bg-subtle hover:bg-subtle text-quiet  hover:text-foreground dark:hover:bg-subtle font-sans focus:outline-none outline-none outline-transparent transition duration-300 ease-out select-none items-center relative group/button font-semimedium justify-center text-center items-center rounded-full cursor-pointer active:scale-[0.97] active:duration-150 active:ease-outExpo origin-center whitespace-nowrap inline-flex text-sm h-8 aspect-square" data-state="closed"><div class="flex items-center min-w-0 gap-two justify-center"><div class="flex shrink-0 items-center justify-center size-4"><svg role="img" class="inline-flex fill-current" width="16" height="16"><use xlink:href="#pplx-icon-copy"></use></svg></div></div></button></div></div></div><div class="-mt-xl"><div><div data-testid="code-language-indicator" class="text-quiet bg-subtle py-xs px-sm inline-block rounded-br rounded-tl-lg text-xs font-thin">text</div></div><div><span><code><span><span>App Pods → Prometheus (scrape /metrics) → Grafana (visualization)
</span></span><span>         → Alertmanager → Mattermost webhooks
</span><span></span></code></span></div></div></div></pre>

**Metrics to Track:**

* **LLM metrics:** TTFT (p50/p95), tokens/sec, queue depth, error rate
* **API metrics:** Request rate, latency (p50/p95/p99), error rate (5xx)
* **Chat metrics:** Deflection rate (59%), escalation rate (41%), avg exchanges
* **System metrics:** CPU/memory/disk usage, pod restarts, network I/O

**Log Aggregation: Loki (Grafana Loki)**

**Rationale:**

* **Grafana-native:** Seamless integration with Grafana dashboards
* **Cost-efficient:** Indexes metadata only (not full log content)
* **Scalable:** Handles 1TB+/day log volume with object storage backend
* **PromQL-like query:** Similar syntax to Prometheus (lower learning curve)

**Alternative: ELK Stack**

* Elasticsearch + Logstash + Kibana more feature-rich but heavier
* Choose ELK if need advanced log analytics (ML anomaly detection)
* Loki preferred for most use cases (simpler, lighter)

**Distributed Tracing: Jaeger**

**Implementation:**

* Instrument FastAPI with **OpenTelemetry SDK**
* Trace full request path: API → LangChain → llama.cpp → pgvector → Jira API
* Identify bottlenecks: Which component adds most latency?
* Set **sampling rate = 10%** to reduce overhead (sample all errors)

**Alerting Rules (Prometheus):**

<pre class="not-prose w-full rounded font-mono text-sm font-extralight"><div class="codeWrapper text-light selection:text-super selection:bg-super/10 my-md relative flex flex-col rounded-lg font-mono text-sm font-normal bg-subtler"><div class="translate-y-xs -translate-x-xs bottom-xl mb-xl flex h-0 items-start justify-end md:sticky md:top-[calc(var(--header-height)+var(--size-xs))]"><div class="overflow-hidden rounded-full border-subtlest ring-subtlest divide-subtlest bg-base"><div class="border-subtlest ring-subtlest divide-subtlest bg-subtler"><button data-testid="copy-code-button" aria-label="Copy code" type="button" class="focus-visible:bg-subtle hover:bg-subtle text-quiet  hover:text-foreground dark:hover:bg-subtle font-sans focus:outline-none outline-none outline-transparent transition duration-300 ease-out select-none items-center relative group/button font-semimedium justify-center text-center items-center rounded-full cursor-pointer active:scale-[0.97] active:duration-150 active:ease-outExpo origin-center whitespace-nowrap inline-flex text-sm h-8 aspect-square" data-state="closed"><div class="flex items-center min-w-0 gap-two justify-center"><div class="flex shrink-0 items-center justify-center size-4"><svg role="img" class="inline-flex fill-current" width="16" height="16"><use xlink:href="#pplx-icon-copy"></use></svg></div></div></button></div></div></div><div class="-mt-xl"><div><div data-testid="code-language-indicator" class="text-quiet bg-subtle py-xs px-sm inline-block rounded-br rounded-tl-lg text-xs font-thin">text</div></div><div><span><code><span><span>- alert: HighLLMLatency
</span></span><span>  expr: histogram_quantile(0.95, llm_ttft_seconds) > 2
</span><span>  for: 5m
</span><span>  annotations:
</span><span>    summary: "95th percentile TTFT exceeds 2 seconds"
</span><span>
</span><span>- alert: HighDeflectionDrop
</span><span>  expr: deflection_rate < 0.50
</span><span>  for: 10m
</span><span>  annotations:
</span><span>    summary: "Deflection rate dropped below 50%"
</span><span></span></code></span></div></div></div></pre>

**Real-Time Alerting:**

* Send alerts to **Mattermost** via webhooks [client-specified]
* Route critical alerts to **PagerDuty** for on-call engineers
* Use **Grafana OnCall** for escalation policies

**Help Desk KPIs to Monitor:**

* **Deflection rate:** 59% target (alert if <50%)
* **Average response time:** <12 seconds for 512 tokens
* **Concurrent users:** Track peak and average
* **Error rate:** <1% of requests should fail
* **Escalation time:** Time from chat start to escalation (<5 min target)

**Closed-Network Deployment:**

* Run Prometheus, Grafana, Loki in TKG as StatefulSets
* Use **local object storage (MinIO)** for Loki log chunks
* Configure **long-term retention:** 90 days (configurable)
* Total storage: ~500GB for 90-day retention at 1K users

**Cost/Licensing:**

* Prometheus: Apache 2.0
* Grafana: AGPL (free for internal use)
* Loki: AGPL
* Jaeger: Apache 2.0
* Zero licensing cost

---

## 9. Database Technologies

## **Recommended Primary Database: PostgreSQL 16**

**Rationale:**

* **Mature:** 30+ years of development, battle-tested reliability
* **Feature-rich:** JSON support (JSONB), full-text search, replication
* **Extensions:** pgvector for vectors, pg_trgm for BM25 search
* **ACID compliance:** Strong transactional guarantees for chat history
* **License:** PostgreSQL (permissive, free)

**Schema Design:**

<pre class="not-prose w-full rounded font-mono text-sm font-extralight"><div class="codeWrapper text-light selection:text-super selection:bg-super/10 my-md relative flex flex-col rounded-lg font-mono text-sm font-normal bg-subtler"><div class="translate-y-xs -translate-x-xs bottom-xl mb-xl flex h-0 items-start justify-end md:sticky md:top-[calc(var(--header-height)+var(--size-xs))]"><div class="overflow-hidden rounded-full border-subtlest ring-subtlest divide-subtlest bg-base"><div class="border-subtlest ring-subtlest divide-subtlest bg-subtler"><button data-testid="copy-code-button" aria-label="Copy code" type="button" class="focus-visible:bg-subtle hover:bg-subtle text-quiet  hover:text-foreground dark:hover:bg-subtle font-sans focus:outline-none outline-none outline-transparent transition duration-300 ease-out select-none items-center relative group/button font-semimedium justify-center text-center items-center rounded-full cursor-pointer active:scale-[0.97] active:duration-150 active:ease-outExpo origin-center whitespace-nowrap inline-flex text-sm h-8 aspect-square" data-state="closed"><div class="flex items-center min-w-0 gap-two justify-center"><div class="flex shrink-0 items-center justify-center size-4"><svg role="img" class="inline-flex fill-current" width="16" height="16"><use xlink:href="#pplx-icon-copy"></use></svg></div></div></button></div></div></div><div class="-mt-xl"><div><div data-testid="code-language-indicator" class="text-quiet bg-subtle py-xs px-sm inline-block rounded-br rounded-tl-lg text-xs font-thin">sql</div></div><div><span><code><span><span class="token token">-- Chat sessions table</span><span>
</span></span><span><span></span><span class="token token">CREATE</span><span></span><span class="token token">TABLE</span><span> chat_sessions </span><span class="token token punctuation">(</span><span>
</span></span><span><span>  id UUID </span><span class="token token">PRIMARY</span><span></span><span class="token token">KEY</span><span class="token token punctuation">,</span><span>
</span></span><span><span>  user_id </span><span class="token token">VARCHAR</span><span class="token token punctuation">(</span><span class="token token">255</span><span class="token token punctuation">)</span><span></span><span class="token token operator">NOT</span><span></span><span class="token token boolean">NULL</span><span class="token token punctuation">,</span><span>
</span></span><span><span>  created_at </span><span class="token token">TIMESTAMP</span><span></span><span class="token token operator">NOT</span><span></span><span class="token token boolean">NULL</span><span class="token token punctuation">,</span><span>
</span></span><span><span>  ended_at </span><span class="token token">TIMESTAMP</span><span class="token token punctuation">,</span><span>
</span></span><span><span>  escalated </span><span class="token token">BOOLEAN</span><span></span><span class="token token">DEFAULT</span><span></span><span class="token token boolean">FALSE</span><span class="token token punctuation">,</span><span>
</span></span><span><span>  jira_ticket_id </span><span class="token token">VARCHAR</span><span class="token token punctuation">(</span><span class="token token">50</span><span class="token token punctuation">)</span><span>
</span></span><span><span></span><span class="token token punctuation">)</span><span class="token token punctuation">;</span><span>
</span></span><span>
</span><span><span></span><span class="token token">-- Chat messages table</span><span>
</span></span><span><span></span><span class="token token">CREATE</span><span></span><span class="token token">TABLE</span><span> chat_messages </span><span class="token token punctuation">(</span><span>
</span></span><span><span>  id UUID </span><span class="token token">PRIMARY</span><span></span><span class="token token">KEY</span><span class="token token punctuation">,</span><span>
</span></span><span><span>  session_id UUID </span><span class="token token">REFERENCES</span><span> chat_sessions</span><span class="token token punctuation">(</span><span>id</span><span class="token token punctuation">)</span><span class="token token punctuation">,</span><span>
</span></span><span><span>  role </span><span class="token token">VARCHAR</span><span class="token token punctuation">(</span><span class="token token">20</span><span class="token token punctuation">)</span><span></span><span class="token token operator">NOT</span><span></span><span class="token token boolean">NULL</span><span class="token token punctuation">,</span><span></span><span class="token token">-- 'user' or 'assistant'</span><span>
</span></span><span><span>  content </span><span class="token token">TEXT</span><span></span><span class="token token operator">NOT</span><span></span><span class="token token boolean">NULL</span><span class="token token punctuation">,</span><span>
</span></span><span><span>  confidence_score </span><span class="token token">DECIMAL</span><span class="token token punctuation">(</span><span class="token token">3</span><span class="token token punctuation">,</span><span class="token token">2</span><span class="token token punctuation">)</span><span class="token token punctuation">,</span><span>
</span></span><span><span>  sources JSONB</span><span class="token token punctuation">,</span><span></span><span class="token token">-- Array of source document IDs</span><span>
</span></span><span><span>  created_at </span><span class="token token">TIMESTAMP</span><span></span><span class="token token operator">NOT</span><span></span><span class="token token boolean">NULL</span><span>
</span></span><span><span></span><span class="token token punctuation">)</span><span class="token token punctuation">;</span><span>
</span></span><span>
</span><span><span></span><span class="token token">-- Vector storage (pgvector extension)</span><span>
</span></span><span><span></span><span class="token token">CREATE</span><span></span><span class="token token">TABLE</span><span> document_embeddings </span><span class="token token punctuation">(</span><span>
</span></span><span><span>  id UUID </span><span class="token token">PRIMARY</span><span></span><span class="token token">KEY</span><span class="token token punctuation">,</span><span>
</span></span><span><span>  doc_id </span><span class="token token">VARCHAR</span><span class="token token punctuation">(</span><span class="token token">255</span><span class="token token punctuation">)</span><span></span><span class="token token operator">NOT</span><span></span><span class="token token boolean">NULL</span><span class="token token punctuation">,</span><span>
</span></span><span><span>  content </span><span class="token token">TEXT</span><span></span><span class="token token operator">NOT</span><span></span><span class="token token boolean">NULL</span><span class="token token punctuation">,</span><span>
</span></span><span><span>  embedding vector</span><span class="token token punctuation">(</span><span class="token token">384</span><span class="token token punctuation">)</span><span class="token token punctuation">,</span><span></span><span class="token token">-- bge-small-en-v1.5 dimensions</span><span>
</span></span><span>  metadata JSONB
</span><span><span></span><span class="token token punctuation">)</span><span class="token token punctuation">;</span><span>
</span></span><span>
</span><span><span></span><span class="token token">CREATE</span><span></span><span class="token token">INDEX</span><span></span><span class="token token">ON</span><span> document_embeddings 
</span></span><span><span></span><span class="token token">USING</span><span> hnsw </span><span class="token token punctuation">(</span><span>embedding vector_cosine_ops</span><span class="token token punctuation">)</span><span class="token token punctuation">;</span><span>
</span></span><span></span></code></span></div></div></div></pre>

**Vector Storage Approach:**

* Use **pgvector extension** for embeddings (same DB as relational data)
* Avoids complexity of separate vector DB[reddit](https://www.reddit.com/r/LocalLLaMA/comments/1e63m16/vector_database_pgvector_vs_milvus_vs_weaviate/)
* Simplifies backup/restore (single DB dump)
* HNSW index provides fast nearest-neighbor search[reddit](https://www.reddit.com/r/LocalLLaMA/comments/1e63m16/vector_database_pgvector_vs_milvus_vs_weaviate/)

**Alternative: Separate Milvus for Vectors**

* Only if vector count exceeds 1M or need GPU-accelerated search[latenode](https://latenode.com/blog/best-vector-databases-for-rag-complete-2025-comparison-guide)
* Your scale (10K-100K docs) fits comfortably in pgvector[reddit](https://www.reddit.com/r/LocalLLaMA/comments/1e63m16/vector_database_pgvector_vs_milvus_vs_weaviate/)

**Database Scaling (Closed Network):**

* Use **PostgreSQL streaming replication** for read replicas
* Primary (writes) + 2 replicas (reads) for HA
* Use **pgpool-II** for connection pooling and load balancing
* Set **max_connections = 200** (sufficient for 1K users via connection pool)

**Replication Configuration:**

<pre class="not-prose w-full rounded font-mono text-sm font-extralight"><div class="codeWrapper text-light selection:text-super selection:bg-super/10 my-md relative flex flex-col rounded-lg font-mono text-sm font-normal bg-subtler"><div class="translate-y-xs -translate-x-xs bottom-xl mb-xl flex h-0 items-start justify-end md:sticky md:top-[calc(var(--header-height)+var(--size-xs))]"><div class="overflow-hidden rounded-full border-subtlest ring-subtlest divide-subtlest bg-base"><div class="border-subtlest ring-subtlest divide-subtlest bg-subtler"><button data-testid="copy-code-button" aria-label="Copy code" type="button" class="focus-visible:bg-subtle hover:bg-subtle text-quiet  hover:text-foreground dark:hover:bg-subtle font-sans focus:outline-none outline-none outline-transparent transition duration-300 ease-out select-none items-center relative group/button font-semimedium justify-center text-center items-center rounded-full cursor-pointer active:scale-[0.97] active:duration-150 active:ease-outExpo origin-center whitespace-nowrap inline-flex text-sm h-8 aspect-square" data-state="closed"><div class="flex items-center min-w-0 gap-two justify-center"><div class="flex shrink-0 items-center justify-center size-4"><svg role="img" class="inline-flex fill-current" width="16" height="16"><use xlink:href="#pplx-icon-copy"></use></svg></div></div></button></div></div></div><div class="-mt-xl"><div><div data-testid="code-language-indicator" class="text-quiet bg-subtle py-xs px-sm inline-block rounded-br rounded-tl-lg text-xs font-thin">text</div></div><div><span><code><span><span># Synchronous replication for zero data loss
</span></span><span>synchronous_commit = on
</span><span>synchronous_standby_names = 'replica1,replica2'
</span><span></span></code></span></div></div></div></pre>

**Data Retention/Archival:**

* Retain **active chat sessions:** 90 days in primary DB
* Archive **completed chats:** Move to cold storage (S3/MinIO) after 90 days
* Use **pg_partman** for automatic table partitioning by month
* Implement **VACUUM** strategy to reclaim disk space

**Backup/DR Strategy:**

* Use **pg_basebackup** for full backups (daily at 2 AM)
* Use **WAL archiving** for point-in-time recovery (PITR)
* Store backups on **separate storage cluster** (3-2-1 rule)
* Test restore procedure monthly (RTO: <4 hours, RPO: <1 hour)

**Closed-Network Deployment:**

* Deploy PostgreSQL as **StatefulSet** in TKG
* Use **Persistent Volumes** with VMware vSAN [client-specified]
* Configure **encrypted storage class** for data-at-rest encryption
* Backup to **MinIO object storage** within same datacenter

**Cost/Licensing:**

* PostgreSQL: PostgreSQL License (free)
* pgvector: PostgreSQL License (free)
* pgpool-II: BSD (free)
* Zero licensing cost

---

## 10. Integration Patterns

## **Atlassian Integration (Confluence, Jira)**

**Best Practices:**

* Use **REST APIs** (v3 for Jira, v2 for Confluence)
* Implement **OAuth 2.0** for authentication (not basic auth)
* Use **webhook listeners** for real-time updates (new tickets, doc changes)
* Implement **exponential backoff** retry logic (max 3 retries)

**Confluence Integration:**

<pre class="not-prose w-full rounded font-mono text-sm font-extralight"><div class="codeWrapper text-light selection:text-super selection:bg-super/10 my-md relative flex flex-col rounded-lg font-mono text-sm font-normal bg-subtler"><div class="translate-y-xs -translate-x-xs bottom-xl mb-xl flex h-0 items-start justify-end md:sticky md:top-[calc(var(--header-height)+var(--size-xs))]"><div class="overflow-hidden rounded-full border-subtlest ring-subtlest divide-subtlest bg-base"><div class="border-subtlest ring-subtlest divide-subtlest bg-subtler"><button data-testid="copy-code-button" aria-label="Copy code" type="button" class="focus-visible:bg-subtle hover:bg-subtle text-quiet  hover:text-foreground dark:hover:bg-subtle font-sans focus:outline-none outline-none outline-transparent transition duration-300 ease-out select-none items-center relative group/button font-semimedium justify-center text-center items-center rounded-full cursor-pointer active:scale-[0.97] active:duration-150 active:ease-outExpo origin-center whitespace-nowrap inline-flex text-sm h-8 aspect-square" data-state="closed"><div class="flex items-center min-w-0 gap-two justify-center"><div class="flex shrink-0 items-center justify-center size-4"><svg role="img" class="inline-flex fill-current" width="16" height="16"><use xlink:href="#pplx-icon-copy"></use></svg></div></div></button></div></div></div><div class="-mt-xl"><div><div data-testid="code-language-indicator" class="text-quiet bg-subtle py-xs px-sm inline-block rounded-br rounded-tl-lg text-xs font-thin">python</div></div><div><span><code><span><span class="token token"># Python example with requests</span><span>
</span></span><span><span></span><span class="token token">import</span><span> requests
</span></span><span>
</span><span><span></span><span class="token token">def</span><span></span><span class="token token">search_confluence</span><span class="token token punctuation">(</span><span>query</span><span class="token token punctuation">,</span><span> space_key</span><span class="token token operator">=</span><span class="token token">"PCTE"</span><span class="token token punctuation">)</span><span class="token token punctuation">:</span><span>
</span></span><span><span>    url </span><span class="token token operator">=</span><span></span><span class="token token">"https://confluence.internal/rest/api/content/search"</span><span>
</span></span><span><span>    params </span><span class="token token operator">=</span><span></span><span class="token token punctuation">{</span><span>
</span></span><span><span></span><span class="token token">"cql"</span><span class="token token punctuation">:</span><span></span><span class="token token string-interpolation">f"text ~ '</span><span class="token token string-interpolation interpolation punctuation">{</span><span class="token token string-interpolation interpolation">query</span><span class="token token string-interpolation interpolation punctuation">}</span><span class="token token string-interpolation">' AND space = </span><span class="token token string-interpolation interpolation punctuation">{</span><span class="token token string-interpolation interpolation">space_key</span><span class="token token string-interpolation interpolation punctuation">}</span><span class="token token string-interpolation">"</span><span class="token token punctuation">,</span><span>
</span></span><span><span></span><span class="token token">"limit"</span><span class="token token punctuation">:</span><span></span><span class="token token">20</span><span>
</span></span><span><span></span><span class="token token punctuation">}</span><span>
</span></span><span><span>    response </span><span class="token token operator">=</span><span> requests</span><span class="token token punctuation">.</span><span>get</span><span class="token token punctuation">(</span><span>url</span><span class="token token punctuation">,</span><span> params</span><span class="token token operator">=</span><span>params</span><span class="token token punctuation">,</span><span> 
</span></span><span><span>                           auth</span><span class="token token operator">=</span><span class="token token punctuation">(</span><span class="token token">"service_account"</span><span class="token token punctuation">,</span><span></span><span class="token token">"token"</span><span class="token token punctuation">)</span><span class="token token punctuation">)</span><span>
</span></span><span><span></span><span class="token token">return</span><span> response</span><span class="token token punctuation">.</span><span>json</span><span class="token token punctuation">(</span><span class="token token punctuation">)</span><span>
</span></span><span></span></code></span></div></div></div></pre>

**Jira Integration:**

<pre class="not-prose w-full rounded font-mono text-sm font-extralight"><div class="codeWrapper text-light selection:text-super selection:bg-super/10 my-md relative flex flex-col rounded-lg font-mono text-sm font-normal bg-subtler"><div class="translate-y-xs -translate-x-xs bottom-xl mb-xl flex h-0 items-start justify-end md:sticky md:top-[calc(var(--header-height)+var(--size-xs))]"><div class="overflow-hidden rounded-full border-subtlest ring-subtlest divide-subtlest bg-base"><div class="border-subtlest ring-subtlest divide-subtlest bg-subtler"><button data-testid="copy-code-button" aria-label="Copy code" type="button" class="focus-visible:bg-subtle hover:bg-subtle text-quiet  hover:text-foreground dark:hover:bg-subtle font-sans focus:outline-none outline-none outline-transparent transition duration-300 ease-out select-none items-center relative group/button font-semimedium justify-center text-center items-center rounded-full cursor-pointer active:scale-[0.97] active:duration-150 active:ease-outExpo origin-center whitespace-nowrap inline-flex text-sm h-8 aspect-square" data-state="closed"><div class="flex items-center min-w-0 gap-two justify-center"><div class="flex shrink-0 items-center justify-center size-4"><svg role="img" class="inline-flex fill-current" width="16" height="16"><use xlink:href="#pplx-icon-copy"></use></svg></div></div></button></div></div></div><div class="-mt-xl"><div><div data-testid="code-language-indicator" class="text-quiet bg-subtle py-xs px-sm inline-block rounded-br rounded-tl-lg text-xs font-thin">python</div></div><div><span><code><span><span class="token token">def</span><span></span><span class="token token">create_jira_ticket</span><span class="token token punctuation">(</span><span>summary</span><span class="token token punctuation">,</span><span> description</span><span class="token token punctuation">,</span><span> user_email</span><span class="token token punctuation">)</span><span class="token token punctuation">:</span><span>
</span></span><span><span>    url </span><span class="token token operator">=</span><span></span><span class="token token">"https://jira.internal/rest/api/3/issue"</span><span>
</span></span><span><span>    payload </span><span class="token token operator">=</span><span></span><span class="token token punctuation">{</span><span>
</span></span><span><span></span><span class="token token">"fields"</span><span class="token token punctuation">:</span><span></span><span class="token token punctuation">{</span><span>
</span></span><span><span></span><span class="token token">"project"</span><span class="token token punctuation">:</span><span></span><span class="token token punctuation">{</span><span class="token token">"key"</span><span class="token token punctuation">:</span><span></span><span class="token token">"HELPDESK"</span><span class="token token punctuation">}</span><span class="token token punctuation">,</span><span>
</span></span><span><span></span><span class="token token">"summary"</span><span class="token token punctuation">:</span><span> summary</span><span class="token token punctuation">,</span><span>
</span></span><span><span></span><span class="token token">"description"</span><span class="token token punctuation">:</span><span> description</span><span class="token token punctuation">,</span><span>
</span></span><span><span></span><span class="token token">"issuetype"</span><span class="token token punctuation">:</span><span></span><span class="token token punctuation">{</span><span class="token token">"name"</span><span class="token token punctuation">:</span><span></span><span class="token token">"Task"</span><span class="token token punctuation">}</span><span class="token token punctuation">,</span><span>
</span></span><span><span></span><span class="token token">"reporter"</span><span class="token token punctuation">:</span><span></span><span class="token token punctuation">{</span><span class="token token">"emailAddress"</span><span class="token token punctuation">:</span><span> user_email</span><span class="token token punctuation">}</span><span>
</span></span><span><span></span><span class="token token punctuation">}</span><span>
</span></span><span><span></span><span class="token token punctuation">}</span><span>
</span></span><span><span>    response </span><span class="token token operator">=</span><span> requests</span><span class="token token punctuation">.</span><span>post</span><span class="token token punctuation">(</span><span>url</span><span class="token token punctuation">,</span><span> json</span><span class="token token operator">=</span><span>payload</span><span class="token token punctuation">,</span><span> 
</span></span><span><span>                            auth</span><span class="token token operator">=</span><span class="token token punctuation">(</span><span class="token token">"service_account"</span><span class="token token punctuation">,</span><span></span><span class="token token">"token"</span><span class="token token punctuation">)</span><span class="token token punctuation">)</span><span>
</span></span><span><span></span><span class="token token">return</span><span> response</span><span class="token token punctuation">.</span><span>json</span><span class="token token punctuation">(</span><span class="token token punctuation">)</span><span>
</span></span><span></span></code></span></div></div></div></pre>

**ServiceNow/Zendesk Integration:**

**ServiceNow:**

* Use **Table API** for CRUD operations on incidents
* Implement **webhook receiver** for status updates
* Map PCTE chat sessions to ServiceNow incident records
* Use **ServiceNow REST API v2**

**Zendesk:**

* Use **Tickets API** for ticket creation/updates
* Implement **Zendesk webhooks** for bidirectional sync
* Use **Zendesk Support API v2**

**Error Handling & Retry Logic:**

<pre class="not-prose w-full rounded font-mono text-sm font-extralight"><div class="codeWrapper text-light selection:text-super selection:bg-super/10 my-md relative flex flex-col rounded-lg font-mono text-sm font-normal bg-subtler"><div class="translate-y-xs -translate-x-xs bottom-xl mb-xl flex h-0 items-start justify-end md:sticky md:top-[calc(var(--header-height)+var(--size-xs))]"><div class="overflow-hidden rounded-full border-subtlest ring-subtlest divide-subtlest bg-base"><div class="border-subtlest ring-subtlest divide-subtlest bg-subtler"><button data-testid="copy-code-button" aria-label="Copy code" type="button" class="focus-visible:bg-subtle hover:bg-subtle text-quiet  hover:text-foreground dark:hover:bg-subtle font-sans focus:outline-none outline-none outline-transparent transition duration-300 ease-out select-none items-center relative group/button font-semimedium justify-center text-center items-center rounded-full cursor-pointer active:scale-[0.97] active:duration-150 active:ease-outExpo origin-center whitespace-nowrap inline-flex text-sm h-8 aspect-square" data-state="closed"><div class="flex items-center min-w-0 gap-two justify-center"><div class="flex shrink-0 items-center justify-center size-4"><svg role="img" class="inline-flex fill-current" width="16" height="16"><use xlink:href="#pplx-icon-copy"></use></svg></div></div></button></div></div></div><div class="-mt-xl"><div><div data-testid="code-language-indicator" class="text-quiet bg-subtle py-xs px-sm inline-block rounded-br rounded-tl-lg text-xs font-thin">python</div></div><div><span><code><span><span class="token token">from</span><span> tenacity </span><span class="token token">import</span><span> retry</span><span class="token token punctuation">,</span><span> stop_after_attempt</span><span class="token token punctuation">,</span><span> wait_exponential
</span></span><span>
</span><span><span></span><span class="token token decorator annotation punctuation">@retry</span><span class="token token punctuation">(</span><span>
</span></span><span><span>    stop</span><span class="token token operator">=</span><span>stop_after_attempt</span><span class="token token punctuation">(</span><span class="token token">3</span><span class="token token punctuation">)</span><span class="token token punctuation">,</span><span>
</span></span><span><span>    wait</span><span class="token token operator">=</span><span>wait_exponential</span><span class="token token punctuation">(</span><span>multiplier</span><span class="token token operator">=</span><span class="token token">1</span><span class="token token punctuation">,</span><span></span><span class="token token">min</span><span class="token token operator">=</span><span class="token token">2</span><span class="token token punctuation">,</span><span></span><span class="token token">max</span><span class="token token operator">=</span><span class="token token">10</span><span class="token token punctuation">)</span><span>
</span></span><span><span></span><span class="token token punctuation">)</span><span>
</span></span><span><span></span><span class="token token">def</span><span></span><span class="token token">call_jira_api</span><span class="token token punctuation">(</span><span>endpoint</span><span class="token token punctuation">,</span><span> payload</span><span class="token token punctuation">)</span><span class="token token punctuation">:</span><span>
</span></span><span><span>    response </span><span class="token token operator">=</span><span> requests</span><span class="token token punctuation">.</span><span>post</span><span class="token token punctuation">(</span><span>endpoint</span><span class="token token punctuation">,</span><span> json</span><span class="token token operator">=</span><span>payload</span><span class="token token punctuation">)</span><span>
</span></span><span><span>    response</span><span class="token token punctuation">.</span><span>raise_for_status</span><span class="token token punctuation">(</span><span class="token token punctuation">)</span><span></span><span class="token token"># Raises for 4xx/5xx</span><span>
</span></span><span><span></span><span class="token token">return</span><span> response</span><span class="token token punctuation">.</span><span>json</span><span class="token token punctuation">(</span><span class="token token punctuation">)</span><span>
</span></span><span></span></code></span></div></div></div></pre>

**Data Synchronization Patterns:**

* Use **event-driven sync:** Webhook triggers → immediate sync
* Implement **scheduled sync:** Nightly batch job for missed events
* Use **idempotency keys:** Prevent duplicate ticket creation
* Maintain **sync state table:** Track last successful sync timestamp

**Webhook-Based Integration Best Practices:**

* Validate **webhook signatures** (HMAC-SHA256) to prevent spoofing
* Implement **webhook retry queue:** Handle failed webhook deliveries
* Use **async processing:** Queue webhook events for background processing
* Set **timeout = 30s** for webhook HTTP calls

**Closed-Network Considerations:**

* All integrations are **internal to PCTE network** (no internet calls)
* Use **internal DNS** for service discovery (confluence.internal, jira.internal)
* Configure **TLS certificates** for internal services (internal CA)

**Cost/Licensing:**

* All integration libraries (requests, tenacity): MIT/Apache 2.0
* Atlassian, ServiceNow, Zendesk: Client already has licenses [client-specified]
* Zero additional licensing cost

---

## Summary Technology Stack Recommendation

| Category                    | Recommended Technology          | License              | Cost |
| --------------------------- | ------------------------------- | -------------------- | ---- |
| **Vector DB**         | pgvector (PostgreSQL extension) | PostgreSQL           | Free |
| **RAG Framework**     | LangChain [REQUIRES VALIDATION] | MIT                  | Free |
| **LLM Inference**     | llama.cpp (Llama-3.1-8B Q5_K_M) | MIT + Llama 3.1      | Free |
| **Embedding Model**   | BAAI/bge-small-en-v1.5          | MIT                  | Free |
| **Backend API**       | FastAPI + Uvicorn               | MIT                  | Free |
| **Frontend**          | React + Material-UI (MUI)       | MIT                  | Free |
| **Database**          | PostgreSQL 16                   | PostgreSQL           | Free |
| **CI/CD**             | GitLab CI (self-hosted)         | MIT                  | Free |
| **IaC**               | Helm + Terraform                | Apache 2.0 + MPL 2.0 | Free |
| **Monitoring**        | Prometheus + Grafana            | Apache 2.0 + AGPL    | Free |
| **Logging**           | Grafana Loki                    | AGPL                 | Free |
| **Tracing**           | Jaeger (OpenTelemetry)          | Apache 2.0           | Free |
| **Load Testing**      | k6                              | AGPL                 | Free |
| **Security Scanning** | Trivy + OWASP ZAP               | Apache 2.0           | Free |

**Total Licensing Cost:** $0 (all open-source)

**Deployment Artifact Size:** ~15-20 GB (includes all models, images, dependencies)

This technology stack is optimized for **closed-network, CPU-only, enterprise-scale deployment** with **zero licensing costs** and **strong DoD/CUI compliance** alignment. All recommendations integrate seamlessly with your client-specified VMware/Red Hat/Atlassian infrastructurenfrastructure.

1. [https://www.tigerdata.com/blog/rag-is-more-than-just-vector-search](https://www.tigerdata.com/blog/rag-is-more-than-just-vector-search)
2. [https://latenode.com/blog/best-vector-databases-for-rag-complete-2025-comparison-guide](https://latenode.com/blog/best-vector-databases-for-rag-complete-2025-comparison-guide)
3. [https://www.reddit.com/r/LocalLLaMA/comments/1e63m16/vector_database_pgvector_vs_milvus_vs_weaviate/](https://www.reddit.com/r/LocalLLaMA/comments/1e63m16/vector_database_pgvector_vs_milvus_vs_weaviate/)
4. [https://www.zair.top/en/post/vector-database-compare/](https://www.zair.top/en/post/vector-database-compare/)
5. [https://itecsonline.com/post/vllm-vs-ollama-vs-llama.cpp-vs-tgi-vs-tensort](https://itecsonline.com/post/vllm-vs-ollama-vs-llama.cpp-vs-tgi-vs-tensort)
6. [https://huggingface.co/BAAI/bge-small-en-v1.5](https://huggingface.co/BAAI/bge-small-en-v1.5)
7. [https://community.latenode.com/t/which-framework-should-i-choose-for-rag-development-langchain-vs-llamaindex/39107](https://community.latenode.com/t/which-framework-should-i-choose-for-rag-development-langchain-vs-llamaindex/39107)
8. [https://blog.n8n.io/llamaindex-vs-langchain/](https://blog.n8n.io/llamaindex-vs-langchain/)
9. [https://developers.redhat.com/articles/2025/09/30/vllm-or-llamacpp-choosing-right-llm-inference-engine-your-use-case](https://developers.redhat.com/articles/2025/09/30/vllm-or-llamacpp-choosing-right-llm-inference-engine-your-use-case)
10. [https://www.reddit.com/r/LocalLLaMA/comments/1nwpxxx/performance_wise_what_is_the_best_backend_right/](https://www.reddit.com/r/LocalLLaMA/comments/1nwpxxx/performance_wise_what_is_the_best_backend_right/)
11. [https://docs.wallaroo.ai/202404/wallaroo-llm/wallaroo-llm-optimizations/wallaroo-llm-optimizations-vllm-llama/](https://docs.wallaroo.ai/202404/wallaroo-llm/wallaroo-llm-optimizations/wallaroo-llm-optimizations-vllm-llama/)
12. [https://ysfi.me/blog/fastapi-concurrency-and-parallelism/](https://ysfi.me/blog/fastapi-concurrency-and-parallelism/)
13. [https://stackoverflow.com/questions/76524933/how-does-uvicorn-fastapi-handle-concurrency-with-1-worker-and-synchronous-endp](https://stackoverflow.com/questions/76524933/how-does-uvicorn-fastapi-handle-concurrency-with-1-worker-and-synchronous-endp)
14. [https://www.codertrove.com/articles/2025-tech-stack-dilemma-react-vs-vue-vs-angular-for-enterprise-application](https://www.codertrove.com/articles/2025-tech-stack-dilemma-react-vs-vue-vs-angular-for-enterprise-application)
15. [https://www.lambdatest.com/blog/vue-vs-react/](https://www.lambdatest.com/blog/vue-vs-react/)
16. [https://www.arsturn.com/blog/multi-gpu-showdown-benchmarking-vllm-llama-cpp-ollama-for-maximum-performance](https://www.arsturn.com/blog/multi-gpu-showdown-benchmarking-vllm-llama-cpp-ollama-for-maximum-performance)
17. [https://www.houseoffoss.com/post/ollama-vs-llama-cpp-vs-vllm-local-llm-deployment-in-2025](https://www.houseoffoss.com/post/ollama-vs-llama-cpp-vs-vllm-local-llm-deployment-in-2025)
