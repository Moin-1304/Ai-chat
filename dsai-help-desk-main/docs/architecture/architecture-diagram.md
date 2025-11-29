# Defense-in-Depth Architecture Specification for PCTE CP AI Help Desk

## Diagram Specification for Drawing Tool

Based on air-gapped Kubernetes deployment best practices and control plane/data plane isolation principles, here's a complete specification you can use to create the architecture diagram:

## Page Layout (Landscape, 11x8.5")

**Overall Structure:** Left-to-right flow from users to infrastructure, with vertical layer stacking

**Color Scheme:**

* CP Outer Boundary: Dark blue (#1a3a52)
* EP Outer Boundary: Red (#8b0000)
* Access Layer: Light blue (#e3f2fd)
* Application Layer: Green (#e8f5e9)
* Data Layer: Orange (#fff3e0)
* Observability Layer: Purple (#f3e5f5)
* Infrastructure Layer: Gray (#eceff1)

## Layer 1: Outer Boundaries (Full Width)

## Control Plane Container (Left 85% of page)

<pre class="not-prose w-full rounded font-mono text-sm font-extralight"><div class="codeWrapper text-light selection:text-super selection:bg-super/10 my-md relative flex flex-col rounded font-mono text-sm font-normal bg-subtler"><div class="translate-y-xs -translate-x-xs bottom-xl mb-xl flex h-0 items-start justify-end md:sticky md:top-[100px]"><div class="overflow-hidden rounded-full border-subtlest ring-subtlest divide-subtlest bg-base"><div class="border-subtlest ring-subtlest divide-subtlest bg-subtler"><button data-testid="toggle-wrap-code-button" aria-label="No line wrap" type="button" class="focus-visible:bg-subtle hover:bg-subtle text-quiet  hover:text-foreground dark:hover:bg-subtle font-sans focus:outline-none outline-none outline-transparent transition duration-300 ease-out select-none items-center relative group/button font-semimedium justify-center text-center items-center rounded-full cursor-pointer active:scale-[0.97] active:duration-150 active:ease-outExpo origin-center whitespace-nowrap inline-flex text-sm h-8 aspect-square" data-state="closed"><div class="flex items-center min-w-0 gap-two justify-center"><div class="flex shrink-0 items-center justify-center size-4"><svg role="img" class="inline-flex fill-current" width="16" height="16"><use xlink:href="#pplx-icon-text-wrap-disabled"></use></svg></div></div></button><button data-testid="copy-code-button" aria-label="Copy code" type="button" class="focus-visible:bg-subtle hover:bg-subtle text-quiet  hover:text-foreground dark:hover:bg-subtle font-sans focus:outline-none outline-none outline-transparent transition duration-300 ease-out select-none items-center relative group/button font-semimedium justify-center text-center items-center rounded-full cursor-pointer active:scale-[0.97] active:duration-150 active:ease-outExpo origin-center whitespace-nowrap inline-flex text-sm h-8 aspect-square" data-state="closed"><div class="flex items-center min-w-0 gap-two justify-center"><div class="flex shrink-0 items-center justify-center size-4"><svg role="img" class="inline-flex fill-current" width="16" height="16"><use xlink:href="#pplx-icon-copy"></use></svg></div></div></button></div></div></div><div class="-mt-xl"><div><div data-testid="code-language-indicator" class="text-quiet bg-subtle py-xs px-sm inline-block rounded-br rounded-tl-[3px] font-thin">text</div></div><div><span><code><span><span>┌─ CONTROL PLANE (CP) ─ No Internet Egress ─────────────────────────┐
</span></span><span>│  [All internal components nested here]                             │
</span><span>│  Badges: 🔒 CUI-Compliant | 🚫 No Public Internet | 🏢 Air-Gapped  │
</span><span>└─────────────────────────────────────────────────────────────────────┘
</span><span></span></code></span></div></div></div></pre>

## Event Plane Container (Right 15% of page)

<pre class="not-prose w-full rounded font-mono text-sm font-extralight"><div class="codeWrapper text-light selection:text-super selection:bg-super/10 my-md relative flex flex-col rounded font-mono text-sm font-normal bg-subtler"><div class="translate-y-xs -translate-x-xs bottom-xl mb-xl flex h-0 items-start justify-end md:sticky md:top-[100px]"><div class="overflow-hidden rounded-full border-subtlest ring-subtlest divide-subtlest bg-base"><div class="border-subtlest ring-subtlest divide-subtlest bg-subtler"><button data-testid="toggle-wrap-code-button" aria-label="No line wrap" type="button" class="focus-visible:bg-subtle hover:bg-subtle text-quiet  hover:text-foreground dark:hover:bg-subtle font-sans focus:outline-none outline-none outline-transparent transition duration-300 ease-out select-none items-center relative group/button font-semimedium justify-center text-center items-center rounded-full cursor-pointer active:scale-[0.97] active:duration-150 active:ease-outExpo origin-center whitespace-nowrap inline-flex text-sm h-8 aspect-square" data-state="closed"><div class="flex items-center min-w-0 gap-two justify-center"><div class="flex shrink-0 items-center justify-center size-4"><svg role="img" class="inline-flex fill-current" width="16" height="16"><use xlink:href="#pplx-icon-text-wrap-disabled"></use></svg></div></div></button><button data-testid="copy-code-button" aria-label="Copy code" type="button" class="focus-visible:bg-subtle hover:bg-subtle text-quiet  hover:text-foreground dark:hover:bg-subtle font-sans focus:outline-none outline-none outline-transparent transition duration-300 ease-out select-none items-center relative group/button font-semimedium justify-center text-center items-center rounded-full cursor-pointer active:scale-[0.97] active:duration-150 active:ease-outExpo origin-center whitespace-nowrap inline-flex text-sm h-8 aspect-square" data-state="closed"><div class="flex items-center min-w-0 gap-two justify-center"><div class="flex shrink-0 items-center justify-center size-4"><svg role="img" class="inline-flex fill-current" width="16" height="16"><use xlink:href="#pplx-icon-copy"></use></svg></div></div></button></div></div></div><div class="-mt-xl"><div><div data-testid="code-language-indicator" class="text-quiet bg-subtle py-xs px-sm inline-block rounded-br rounded-tl-[3px] font-thin">text</div></div><div><span><code><span><span>┌─ EVENT PLANE (EP) ──┐
</span></span><span>│  Isolated Network   │
</span><span>│  ┌────────────────┐ │
</span><span>│  │ Training Ranges│ │
</span><span>│  │ VMs/Containers │ │
</span><span>│  └────────────────┘ │
</span><span>│                     │
</span><span>│  🚫 No Internet     │
</span><span>│  Egress             │
</span><span>│                     │
</span><span>│  Note: Only CP↔EP   │
</span><span>│  controlled         │
</span><span>│  interactions per   │
</span><span>│  PCTE policy        │
</span><span>└─────────────────────┘
</span><span></span></code></span></div></div></div></pre>

## Layer 2: Access & Identity (Top of CP, Width 100%)

<pre class="not-prose w-full rounded font-mono text-sm font-extralight"><div class="codeWrapper text-light selection:text-super selection:bg-super/10 my-md relative flex flex-col rounded font-mono text-sm font-normal bg-subtler"><div class="translate-y-xs -translate-x-xs bottom-xl mb-xl flex h-0 items-start justify-end md:sticky md:top-[100px]"><div class="overflow-hidden rounded-full border-subtlest ring-subtlest divide-subtlest bg-base"><div class="border-subtlest ring-subtlest divide-subtlest bg-subtler"><button data-testid="toggle-wrap-code-button" aria-label="No line wrap" type="button" class="focus-visible:bg-subtle hover:bg-subtle text-quiet  hover:text-foreground dark:hover:bg-subtle font-sans focus:outline-none outline-none outline-transparent transition duration-300 ease-out select-none items-center relative group/button font-semimedium justify-center text-center items-center rounded-full cursor-pointer active:scale-[0.97] active:duration-150 active:ease-outExpo origin-center whitespace-nowrap inline-flex text-sm h-8 aspect-square" data-state="closed"><div class="flex items-center min-w-0 gap-two justify-center"><div class="flex shrink-0 items-center justify-center size-4"><svg role="img" class="inline-flex fill-current" width="16" height="16"><use xlink:href="#pplx-icon-text-wrap-disabled"></use></svg></div></div></button><button data-testid="copy-code-button" aria-label="Copy code" type="button" class="focus-visible:bg-subtle hover:bg-subtle text-quiet  hover:text-foreground dark:hover:bg-subtle font-sans focus:outline-none outline-none outline-transparent transition duration-300 ease-out select-none items-center relative group/button font-semimedium justify-center text-center items-center rounded-full cursor-pointer active:scale-[0.97] active:duration-150 active:ease-outExpo origin-center whitespace-nowrap inline-flex text-sm h-8 aspect-square" data-state="closed"><div class="flex items-center min-w-0 gap-two justify-center"><div class="flex shrink-0 items-center justify-center size-4"><svg role="img" class="inline-flex fill-current" width="16" height="16"><use xlink:href="#pplx-icon-copy"></use></svg></div></div></button></div></div></div><div class="-mt-xl"><div><div data-testid="code-language-indicator" class="text-quiet bg-subtle py-xs px-sm inline-block rounded-br rounded-tl-[3px] font-thin">text</div></div><div><span><code><span><span>┌─ ACCESS & IDENTITY LAYER ────────────────────────────────────────┐
</span></span><span>│                                                                   │
</span><span>│  [Users/Roles] ──OIDC──→ [Red Hat SSO/IDM] ←──→ [RBAC Policy]   │
</span><span>│   (External)              (AC-2, AC-3, IA-2)      Store           │
</span><span>│                                  ↓                                │
</span><span>│                        [Reverse Proxy]                            │
</span><span>│                     (nginx/Traefik with mTLS)                     │
</span><span>│                         (SC-8, SC-13)                             │
</span><span>│                                  ↓                                │
</span><span>└───────────────────────────────────────────────────────────────────┘
</span><span>          Arrows flow down to Application Layer
</span><span></span></code></span></div></div></div></pre>

**Components:**

1. **Users/Roles Box** (far left)
   * Icons: 👤 End Users, 🛠️ Admins, 🔧 DevOps
   * Label: "External access via web browser"
2. **Red Hat SSO/IDM** (center-left)
   * Icon: 🔑
   * Label: "OpenID Connect authentication"
   * RMF Tags: AC-2, AC-3, IA-2, IA-8
3. **RBAC Policy Store** (center-right)
   * Icon: 📋
   * Label: "Role mappings & permissions"
   * Connected to SSO with bidirectional arrow
4. **Reverse Proxy** (center, below SSO)
   * Icon: 🛡️
   * Label: "TLS 1.3 termination, mTLS enforcement, NetworkPolicies"
   * RMF Tags: SC-8, SC-13
   * Show 🚫 cloud icon with "No egress allowed"

## Layer 3: Application & Services Layer (Middle CP)

<pre class="not-prose w-full rounded font-mono text-sm font-extralight"><div class="codeWrapper text-light selection:text-super selection:bg-super/10 my-md relative flex flex-col rounded font-mono text-sm font-normal bg-subtler"><div class="translate-y-xs -translate-x-xs bottom-xl mb-xl flex h-0 items-start justify-end md:sticky md:top-[100px]"><div class="overflow-hidden rounded-full border-subtlest ring-subtlest divide-subtlest bg-base"><div class="border-subtlest ring-subtlest divide-subtlest bg-subtler"><button data-testid="toggle-wrap-code-button" aria-label="No line wrap" type="button" class="focus-visible:bg-subtle hover:bg-subtle text-quiet  hover:text-foreground dark:hover:bg-subtle font-sans focus:outline-none outline-none outline-transparent transition duration-300 ease-out select-none items-center relative group/button font-semimedium justify-center text-center items-center rounded-full cursor-pointer active:scale-[0.97] active:duration-150 active:ease-outExpo origin-center whitespace-nowrap inline-flex text-sm h-8 aspect-square" data-state="closed"><div class="flex items-center min-w-0 gap-two justify-center"><div class="flex shrink-0 items-center justify-center size-4"><svg role="img" class="inline-flex fill-current" width="16" height="16"><use xlink:href="#pplx-icon-text-wrap-disabled"></use></svg></div></div></button><button data-testid="copy-code-button" aria-label="Copy code" type="button" class="focus-visible:bg-subtle hover:bg-subtle text-quiet  hover:text-foreground dark:hover:bg-subtle font-sans focus:outline-none outline-none outline-transparent transition duration-300 ease-out select-none items-center relative group/button font-semimedium justify-center text-center items-center rounded-full cursor-pointer active:scale-[0.97] active:duration-150 active:ease-outExpo origin-center whitespace-nowrap inline-flex text-sm h-8 aspect-square" data-state="closed"><div class="flex items-center min-w-0 gap-two justify-center"><div class="flex shrink-0 items-center justify-center size-4"><svg role="img" class="inline-flex fill-current" width="16" height="16"><use xlink:href="#pplx-icon-copy"></use></svg></div></div></button></div></div></div><div class="-mt-xl"><div><div data-testid="code-language-indicator" class="text-quiet bg-subtle py-xs px-sm inline-block rounded-br rounded-tl-[3px] font-thin">text</div></div><div><span><code><span><span>┌─ APPLICATION & SERVICES LAYER ────────────────────────────────────┐
</span></span><span>│                                                                    │
</span><span>│  [Self-Service UI] ←→ [RAG Orchestrator] ←→ [Admin Console]      │
</span><span>│   (Help Desk Portal)    (Gateway/Router)      (KB Curation)       │
</span><span>│          ↓                    ↓ ↓ ↓                    ↓          │
</span><span>│                               ↓ ↓ ↓                               │
</span><span>│          ┌────────────────────┼─┼─┼───────────────────┐           │
</span><span>│          │                    ↓ ↓ ↓                   │           │
</span><span>│          │  [LLM Inference]   ↓ ↓   [Embeddings Svc]  │           │
</span><span>│          │   llama.cpp/vLLM   ↓ ↓    bge-small-en     │           │
</span><span>│          │   (SC-28, SI-7)    ↓ ↓    (SC-28)          │           │
</span><span>│          │   🚫 No egress     ↓ ↓    🚫 No egress     │           │
</span><span>│          │                    ↓ ↓                     │           │
</span><span>│          │   [Connectors]     ↓ ↓                     │           │
</span><span>│          │   - Jira (CP)      ↓ ↓                     │           │
</span><span>│          │   - Confluence     ↓ ↓                     │           │
</span><span>│          │   - MKDocs         ↓ ↓                     │           │
</span><span>│          │   - Mattermost     ↓ ↓                     │           │
</span><span>│          │   🚫 No egress     ↓ ↓                     │           │
</span><span>│          └────────────────────┼─┼─┘                   │           │
</span><span>│                               ↓ ↓                                 │
</span><span>│                    [Guardrails & Policies]                        │
</span><span>│                    (Content filters, PII scrubbing)               │
</span><span>│                    (SI-3, SI-4, SI-10)                            │
</span><span>│                                                                    │
</span><span>└────────────────────────────────────────────────────────────────────┘
</span><span>          Arrows flow down to Data Layer
</span><span></span></code></span></div></div></div></pre>

**Component Details:**

1. **Self-Service UI** (left)
   * Icon: 🖥️
   * Label: "Help Desk Portal - User queries, ticket view"
   * Connection: HTTPS → Orchestrator
2. **RAG Orchestrator** (center)
   * Icon: ⚙️
   * Label: "Agent Gateway - Prompt templates, tool calling, policy checks"
   * Connections:
     * Up: ← UI, SSO
     * Down: → Vector DB, LLM, Embeddings, Connectors, Audit Logs
     * Right: → Admin Console
3. **Admin Console** (right)
   * Icon: 🛠️
   * Label: "KB curation, model config, user management"
   * Connection: → Connectors (for ingestion)
4. **LLM Inference Service** (center-left box)
   * Icon: 🧠
   * Label: "Llama-3.1-8B Q5_K_M (CPU) / Qwen2-72B (GPU uplift)"
   * Sub-label: "llama.cpp (CPU) or vLLM (GPU)"
   * RMF Tags: SC-28 (encryption), SI-7 (integrity)
   * Badge: 🚫 "No external API calls"
5. **Embeddings Service** (center-right box)
   * Icon: 📊
   * Label: "bge-small-en-v1.5"
   * Sub-label: "Query encoding & document indexing"
   * RMF Tags: SC-28
   * Badge: 🚫 "No external calls"
6. **Connectors** (bottom-center box)
   * Icon: 🔌
   * Label: "Internal CP-hosted tools only:"
   * List items:
     * Jira Service Management (CP instance)
     * Confluence (CP instance)
     * MKDocs (CP-hosted docs)
     * Mattermost (CP chat)
   * Badge: 🚫 "No internet egress"
7. **Guardrails & Policies** (bottom span)
   * Icon: 🛡️
   * Label: "Content filters, PII detection, prompt injection defense, refusal logic"
   * RMF Tags: SI-3 (malicious code), SI-4 (monitoring), SI-10 (validation)

## Layer 4: Data & Storage Layer (Below Application)

<pre class="not-prose w-full rounded font-mono text-sm font-extralight"><div class="codeWrapper text-light selection:text-super selection:bg-super/10 my-md relative flex flex-col rounded font-mono text-sm font-normal bg-subtler"><div class="translate-y-xs -translate-x-xs bottom-xl mb-xl flex h-0 items-start justify-end md:sticky md:top-[100px]"><div class="overflow-hidden rounded-full border-subtlest ring-subtlest divide-subtlest bg-base"><div class="border-subtlest ring-subtlest divide-subtlest bg-subtler"><button data-testid="toggle-wrap-code-button" aria-label="No line wrap" type="button" class="focus-visible:bg-subtle hover:bg-subtle text-quiet  hover:text-foreground dark:hover:bg-subtle font-sans focus:outline-none outline-none outline-transparent transition duration-300 ease-out select-none items-center relative group/button font-semimedium justify-center text-center items-center rounded-full cursor-pointer active:scale-[0.97] active:duration-150 active:ease-outExpo origin-center whitespace-nowrap inline-flex text-sm h-8 aspect-square" data-state="closed"><div class="flex items-center min-w-0 gap-two justify-center"><div class="flex shrink-0 items-center justify-center size-4"><svg role="img" class="inline-flex fill-current" width="16" height="16"><use xlink:href="#pplx-icon-text-wrap-disabled"></use></svg></div></div></button><button data-testid="copy-code-button" aria-label="Copy code" type="button" class="focus-visible:bg-subtle hover:bg-subtle text-quiet  hover:text-foreground dark:hover:bg-subtle font-sans focus:outline-none outline-none outline-transparent transition duration-300 ease-out select-none items-center relative group/button font-semimedium justify-center text-center items-center rounded-full cursor-pointer active:scale-[0.97] active:duration-150 active:ease-outExpo origin-center whitespace-nowrap inline-flex text-sm h-8 aspect-square" data-state="closed"><div class="flex items-center min-w-0 gap-two justify-center"><div class="flex shrink-0 items-center justify-center size-4"><svg role="img" class="inline-flex fill-current" width="16" height="16"><use xlink:href="#pplx-icon-copy"></use></svg></div></div></button></div></div></div><div class="-mt-xl"><div><div data-testid="code-language-indicator" class="text-quiet bg-subtle py-xs px-sm inline-block rounded-br rounded-tl-[3px] font-thin">text</div></div><div><span><code><span><span>┌─ DATA & STORAGE LAYER ────────────────────────────────────────────┐
</span></span><span>│                                                                    │
</span><span>│  [Vector DB]    [Relational DB]   [Artifact Store]  [Audit Logs]  │
</span><span>│  pgvector/      PostgreSQL         Object Storage/  Append-only    │
</span><span>│  Milvus         (SC-28, SI-7)      PV for models    encrypted      │
</span><span>│  (SC-28)        Metadata,          (SC-28)          (AU-2, AU-3,   │
</span><span>│  HNSW index     sessions,                           AU-9, AU-12)   │
</span><span>│                 configs                             🔒 Immutable   │
</span><span>│                                                                    │
</span><span>│  All storage on encrypted Persistent Volumes (LUKS or platform)   │
</span><span>│  RMF: SC-28 (at rest), SC-13 (cryptographic protection)           │
</span><span>│                                                                    │
</span><span>└────────────────────────────────────────────────────────────────────┘
</span><span></span></code></span></div></div></div></pre>

**Component Details:**

1. **Vector DB** (left)
   * Icon: 📐
   * Label: "pgvector (PostgreSQL) or Milvus"
   * Sub-label: "384-dim embeddings, HNSW index, <10ms retrieval"
   * RMF Tags: SC-28
   * Badge: 🔒 "Encrypted PV"
2. **Relational DB** (center-left)
   * Icon: 🗄️
   * Label: "PostgreSQL"
   * Sub-label: "User sessions, configs, metadata, RBAC mappings"
   * RMF Tags: SC-28, SI-7
   * Badge: 🔒 "Encrypted PV"
3. **Artifact Store** (center-right)
   * Icon: 📦
   * Label: "Object Storage or Shared PV"
   * Sub-label: "Model weights (GGUF/safetensors), tokenizers, mirrored artifacts"
   * RMF Tags: SC-28
   * Badge: 🔒 "Encrypted PV"
4. **Audit Log Store** (right)
   * Icon: 📝
   * Label: "Append-only audit logs"
   * Sub-label: "User ID, query, retrieved docs, response, timestamp, confidence"
   * RMF Tags: AU-2, AU-3, AU-9, AU-12
   * Badge: 🔒 "Immutable, tamper-evident, cryptographic signatures"

## Layer 5: Observability & Security Layer (Bottom CP span)

<pre class="not-prose w-full rounded font-mono text-sm font-extralight"><div class="codeWrapper text-light selection:text-super selection:bg-super/10 my-md relative flex flex-col rounded font-mono text-sm font-normal bg-subtler"><div class="translate-y-xs -translate-x-xs bottom-xl mb-xl flex h-0 items-start justify-end md:sticky md:top-[100px]"><div class="overflow-hidden rounded-full border-subtlest ring-subtlest divide-subtlest bg-base"><div class="border-subtlest ring-subtlest divide-subtlest bg-subtler"><button data-testid="toggle-wrap-code-button" aria-label="No line wrap" type="button" class="focus-visible:bg-subtle hover:bg-subtle text-quiet  hover:text-foreground dark:hover:bg-subtle font-sans focus:outline-none outline-none outline-transparent transition duration-300 ease-out select-none items-center relative group/button font-semimedium justify-center text-center items-center rounded-full cursor-pointer active:scale-[0.97] active:duration-150 active:ease-outExpo origin-center whitespace-nowrap inline-flex text-sm h-8 aspect-square" data-state="closed"><div class="flex items-center min-w-0 gap-two justify-center"><div class="flex shrink-0 items-center justify-center size-4"><svg role="img" class="inline-flex fill-current" width="16" height="16"><use xlink:href="#pplx-icon-text-wrap-disabled"></use></svg></div></div></button><button data-testid="copy-code-button" aria-label="Copy code" type="button" class="focus-visible:bg-subtle hover:bg-subtle text-quiet  hover:text-foreground dark:hover:bg-subtle font-sans focus:outline-none outline-none outline-transparent transition duration-300 ease-out select-none items-center relative group/button font-semimedium justify-center text-center items-center rounded-full cursor-pointer active:scale-[0.97] active:duration-150 active:ease-outExpo origin-center whitespace-nowrap inline-flex text-sm h-8 aspect-square" data-state="closed"><div class="flex items-center min-w-0 gap-two justify-center"><div class="flex shrink-0 items-center justify-center size-4"><svg role="img" class="inline-flex fill-current" width="16" height="16"><use xlink:href="#pplx-icon-copy"></use></svg></div></div></button></div></div></div><div class="-mt-xl"><div><div data-testid="code-language-indicator" class="text-quiet bg-subtle py-xs px-sm inline-block rounded-br rounded-tl-[3px] font-thin">text</div></div><div><span><code><span><span>┌─ OBSERVABILITY & SECURITY LAYER (Spans full CP width) ───────────┐
</span></span><span>│                                                                    │
</span><span>│  [Prometheus]  [Grafana]  [Loki/ELK]  [OpenTelemetry]  [SIEM/IDS] │
</span><span>│  Metrics       Dashboards  Log agg    Trace collect   (Optional)  │
</span><span>│  (SI-4)        (SI-4)      (AU-6)     (AU-6, SI-4)    Security    │
</span><span>│                                                       Analytics    │
</span><span>│                                                       (SI-4, IR-4) │
</span><span>│  All services emit: Metrics (Prometheus), Logs (stdout→Loki),     │
</span><span>│  Traces (OTLP). SIEM ingests from audit logs & monitoring stack.  │
</span><span>│                                                                    │
</span><span>└────────────────────────────────────────────────────────────────────┘
</span><span></span></code></span></div></div></div></pre>

**Component Details:**

1. **Prometheus** (left)
   * Icon: 📈
   * Label: "Metrics collection - CPU, memory, latency, throughput"
   * RMF Tags: SI-4
2. **Grafana** (center-left)
   * Icon: 📊
   * Label: "Visualization dashboards - Health, performance, alerts"
   * RMF Tags: SI-4
3. **Loki/ELK** (center)
   * Icon: 📋
   * Label: "Log aggregation - Application logs, error tracking"
   * RMF Tags: AU-6
4. **OpenTelemetry** (center-right)
   * Icon: 🔍
   * Label: "Distributed tracing - Request flow, latency breakdown"
   * RMF Tags: AU-6, SI-4
5. **SIEM/IDS** (right, dashed box)
   * Icon: 🚨
   * Label: "Security Analytics (Optional)"
   * Sub-label: "Anomaly detection, threat correlation, incident response"
   * RMF Tags: SI-4, IR-4
   * Note: "Ingests audit logs & monitoring data"

## Layer 6: Infrastructure Layer (Bottom foundation)

<pre class="not-prose w-full rounded font-mono text-sm font-extralight"><div class="codeWrapper text-light selection:text-super selection:bg-super/10 my-md relative flex flex-col rounded font-mono text-sm font-normal bg-subtler"><div class="translate-y-xs -translate-x-xs bottom-xl mb-xl flex h-0 items-start justify-end md:sticky md:top-[100px]"><div class="overflow-hidden rounded-full border-subtlest ring-subtlest divide-subtlest bg-base"><div class="border-subtlest ring-subtlest divide-subtlest bg-subtler"><button data-testid="toggle-wrap-code-button" aria-label="No line wrap" type="button" class="focus-visible:bg-subtle hover:bg-subtle text-quiet  hover:text-foreground dark:hover:bg-subtle font-sans focus:outline-none outline-none outline-transparent transition duration-300 ease-out select-none items-center relative group/button font-semimedium justify-center text-center items-center rounded-full cursor-pointer active:scale-[0.97] active:duration-150 active:ease-outExpo origin-center whitespace-nowrap inline-flex text-sm h-8 aspect-square" data-state="closed"><div class="flex items-center min-w-0 gap-two justify-center"><div class="flex shrink-0 items-center justify-center size-4"><svg role="img" class="inline-flex fill-current" width="16" height="16"><use xlink:href="#pplx-icon-text-wrap-disabled"></use></svg></div></div></button><button data-testid="copy-code-button" aria-label="Copy code" type="button" class="focus-visible:bg-subtle hover:bg-subtle text-quiet  hover:text-foreground dark:hover:bg-subtle font-sans focus:outline-none outline-none outline-transparent transition duration-300 ease-out select-none items-center relative group/button font-semimedium justify-center text-center items-center rounded-full cursor-pointer active:scale-[0.97] active:duration-150 active:ease-outExpo origin-center whitespace-nowrap inline-flex text-sm h-8 aspect-square" data-state="closed"><div class="flex items-center min-w-0 gap-two justify-center"><div class="flex shrink-0 items-center justify-center size-4"><svg role="img" class="inline-flex fill-current" width="16" height="16"><use xlink:href="#pplx-icon-copy"></use></svg></div></div></button></div></div></div><div class="-mt-xl"><div><div data-testid="code-language-indicator" class="text-quiet bg-subtle py-xs px-sm inline-block rounded-br rounded-tl-[3px] font-thin">text</div></div><div><span><code><span><span>┌─ INFRASTRUCTURE LAYER (Foundation) ───────────────────────────────┐
</span></span><span>│                                                                    │
</span><span>│  [Tanzu Kubernetes Grid (TKG) / K8s Cluster]                      │
</span><span>│  - NetworkPolicies: No egress, inter-pod mTLS                     │
</span><span>│  - Pod Security Standards: Restricted profile                     │
</span><span>│  - Internal image registry (mirrored artifacts)                   │
</span><span>│  - Encrypted storage classes (SC-28)                              │
</span><span>│  RMF: SC-7 (boundary protection), SC-8 (transmission protection)  │
</span><span>│                                                                    │
</span><span>│  [VMware vSphere Hypervisor]                                      │
</span><span>│  - vCenter SSO integration                                        │
</span><span>│  - vSphere HA and DRS                                             │
</span><span>│  - Encrypted storage (vSAN or datastore encryption)               │
</span><span>│  RMF: SC-28, SC-12 (crypto key management)                        │
</span><span>│                                                                    │
</span><span>└────────────────────────────────────────────────────────────────────┘
</span><span></span></code></span></div></div></div></pre>

## Data Flow Arrows (Label Each)

**Primary Flows:**

1. **User → UI:**
   * Arrow: `User (HTTPS) → Reverse Proxy (SSO/mTLS) → Self-Service UI`
   * Label: "OIDC authentication, TLS 1.3"
2. **UI → Orchestrator:**
   * Arrow: `UI (HTTPS) → Orchestrator`
   * Label: "User query, session token"
3. **Orchestrator → Vector DB:**
   * Arrow: `Orchestrator ↔ Vector DB`
   * Label: "Retrieve top-6 chunks (cosine similarity)"
4. **Orchestrator → Embeddings:**
   * Arrow: `Orchestrator → Embeddings Service`
   * Label: "Encode query (bge-small-en-v1.5)"
5. **Orchestrator → LLM:**
   * Arrow: `Orchestrator → LLM Inference`
   * Label: "Prompt + context → LLM → Response"
6. **Orchestrator → Connectors:**
   * Arrow: `Orchestrator ↔ Connectors (Jira/Confluence/MKDocs/Mattermost)`
   * Label: "Fetch tickets, docs, messages (CP internal APIs)"
7. **Orchestrator → Audit Logs:**
   * Arrow: `Orchestrator → Audit Log Store`
   * Label: "Log: user_id, query, sources, response, timestamp"
8. **Admin Console → Connectors:**
   * Arrow: `Admin Console → Connectors`
   * Label: "Trigger ingestion jobs, KB curation"
9. **All Services → Observability:**
   * Arrows: `Each service → Prometheus (metrics), Loki (logs), OTel (traces)`
   * Label: "Telemetry emission"
10. **Observability → SIEM:**
    * Arrow: `Loki + Audit Logs → SIEM/IDS`
    * Label: "Security event correlation"

**Blocked Flows (Show with 🚫 icon):**

* LLM Inference → Internet ❌
* Embeddings Service → Internet ❌
* Connectors → Internet ❌
* Reverse Proxy → Internet ❌
* Orchestrator → Internet ❌

## Security Control Annotations (Callout Badges)

Place these as colored badges next to relevant components:

* **RBAC Enforced:** SSO, Orchestrator, Vector DB, Admin Console
* **Encrypted at Rest:** All storage (Vector DB, PostgreSQL, Artifact Store, Audit Logs)
* **TLS 1.3 in Transit:** All API communications
* **Audit Logged:** Orchestrator, Connectors, Admin Console
* **Guardrails Active:** Orchestrator (input/output filters)
* **Network Isolated:** All components (K8s NetworkPolicies)
* **Air-Gapped:** Image registry (no external pulls)

## RMF/NIST Control Family Mapping (Legend Box)

Create a legend box in bottom-right corner:

<pre class="not-prose w-full rounded font-mono text-sm font-extralight"><div class="codeWrapper text-light selection:text-super selection:bg-super/10 my-md relative flex flex-col rounded font-mono text-sm font-normal bg-subtler"><div class="translate-y-xs -translate-x-xs bottom-xl mb-xl flex h-0 items-start justify-end md:sticky md:top-[100px]"><div class="overflow-hidden rounded-full border-subtlest ring-subtlest divide-subtlest bg-base"><div class="border-subtlest ring-subtlest divide-subtlest bg-subtler"><button data-testid="toggle-wrap-code-button" aria-label="No line wrap" type="button" class="focus-visible:bg-subtle hover:bg-subtle text-quiet  hover:text-foreground dark:hover:bg-subtle font-sans focus:outline-none outline-none outline-transparent transition duration-300 ease-out select-none items-center relative group/button font-semimedium justify-center text-center items-center rounded-full cursor-pointer active:scale-[0.97] active:duration-150 active:ease-outExpo origin-center whitespace-nowrap inline-flex text-sm h-8 aspect-square" data-state="closed"><div class="flex items-center min-w-0 gap-two justify-center"><div class="flex shrink-0 items-center justify-center size-4"><svg role="img" class="inline-flex fill-current" width="16" height="16"><use xlink:href="#pplx-icon-text-wrap-disabled"></use></svg></div></div></button><button data-testid="copy-code-button" aria-label="Copy code" type="button" class="focus-visible:bg-subtle hover:bg-subtle text-quiet  hover:text-foreground dark:hover:bg-subtle font-sans focus:outline-none outline-none outline-transparent transition duration-300 ease-out select-none items-center relative group/button font-semimedium justify-center text-center items-center rounded-full cursor-pointer active:scale-[0.97] active:duration-150 active:ease-outExpo origin-center whitespace-nowrap inline-flex text-sm h-8 aspect-square" data-state="closed"><div class="flex items-center min-w-0 gap-two justify-center"><div class="flex shrink-0 items-center justify-center size-4"><svg role="img" class="inline-flex fill-current" width="16" height="16"><use xlink:href="#pplx-icon-copy"></use></svg></div></div></button></div></div></div><div class="-mt-xl"><div><div data-testid="code-language-indicator" class="text-quiet bg-subtle py-xs px-sm inline-block rounded-br rounded-tl-[3px] font-thin">text</div></div><div><span><code><span><span>┌─ RMF Control Families ─────────────────┐
</span></span><span>│ AC: Access Control (SSO, RBAC)         │
</span><span>│ AU: Audit & Accountability (Logs)      │
</span><span>│ IA: Identification & Authentication    │
</span><span>│ SC: System & Communications Protection │
</span><span>│     (TLS, encryption, isolation)       │
</span><span>│ SI: System & Information Integrity     │
</span><span>│     (Monitoring, guardrails, validation│
</span><span>│ IR: Incident Response (SIEM)           │
</span><span>└─────────────────────────────────────────┘
</span><span></span></code></span></div></div></div></pre>

## Icon Legend (Top-Right Corner)

<pre class="not-prose w-full rounded font-mono text-sm font-extralight"><div class="codeWrapper text-light selection:text-super selection:bg-super/10 my-md relative flex flex-col rounded font-mono text-sm font-normal bg-subtler"><div class="translate-y-xs -translate-x-xs bottom-xl mb-xl flex h-0 items-start justify-end md:sticky md:top-[100px]"><div class="overflow-hidden rounded-full border-subtlest ring-subtlest divide-subtlest bg-base"><div class="border-subtlest ring-subtlest divide-subtlest bg-subtler"><button data-testid="toggle-wrap-code-button" aria-label="No line wrap" type="button" class="focus-visible:bg-subtle hover:bg-subtle text-quiet  hover:text-foreground dark:hover:bg-subtle font-sans focus:outline-none outline-none outline-transparent transition duration-300 ease-out select-none items-center relative group/button font-semimedium justify-center text-center items-center rounded-full cursor-pointer active:scale-[0.97] active:duration-150 active:ease-outExpo origin-center whitespace-nowrap inline-flex text-sm h-8 aspect-square" data-state="closed"><div class="flex items-center min-w-0 gap-two justify-center"><div class="flex shrink-0 items-center justify-center size-4"><svg role="img" class="inline-flex fill-current" width="16" height="16"><use xlink:href="#pplx-icon-text-wrap-disabled"></use></svg></div></div></button><button data-testid="copy-code-button" aria-label="Copy code" type="button" class="focus-visible:bg-subtle hover:bg-subtle text-quiet  hover:text-foreground dark:hover:bg-subtle font-sans focus:outline-none outline-none outline-transparent transition duration-300 ease-out select-none items-center relative group/button font-semimedium justify-center text-center items-center rounded-full cursor-pointer active:scale-[0.97] active:duration-150 active:ease-outExpo origin-center whitespace-nowrap inline-flex text-sm h-8 aspect-square" data-state="closed"><div class="flex items-center min-w-0 gap-two justify-center"><div class="flex shrink-0 items-center justify-center size-4"><svg role="img" class="inline-flex fill-current" width="16" height="16"><use xlink:href="#pplx-icon-copy"></use></svg></div></div></button></div></div></div><div class="-mt-xl"><div><div data-testid="code-language-indicator" class="text-quiet bg-subtle py-xs px-sm inline-block rounded-br rounded-tl-[3px] font-thin">text</div></div><div><span><code><span><span>┌─ Legend ────────────────┐
</span></span><span>│ 🔒 Encrypted            │
</span><span>│ 🚫 No Internet Egress   │
</span><span>│ 🛡️ Security Control     │
</span><span>│ 🔑 Authentication       │
</span><span>│ 📝 Audit Logging        │
</span><span>│ ⚠️  Optional Component  │
</span><span>└─────────────────────────┘
</span><span></span></code></span></div></div></div></pre>

## Additional Annotations

**Top Banner (across CP):**

* "✅ CUI-Compliant | 🚫 No Public Internet | 🏢 Air-Gapped | 🔒 FIPS 140-2 Cryptography"

**Bottom Note (below Infrastructure Layer):**

* "All artifacts mirrored internally. CPU-first deployment (50 tok/s). Optional GPU uplift: 2×A100 for 60-90 tok/s."

## Control Plane vs Event Plane Isolation

**Visual Treatment:**

* Draw a thick vertical divider between CP and EP (85%/15% split)
* Label divider: "Network Isolation Boundary - No Direct Data Flow"
* Add note near divider: "CP ↔ EP interactions only via PCTE-controlled channels (not shown)"

**EP Internal Note:**

* "Event Plane operates training ranges in isolated network segments. No internet access. Control/management traffic routed through CP per PCTE architecture."

## Implementation Notes for Drawing

**Software Recommendations:**

* **Lucidchart, Draw.io, or Visio** for professional results
* **PlantUML or Mermaid** for code-based diagrams (version control friendly)

**Style Guidelines:**

* Use rounded rectangles for services/components
* Use cylinders for databases/storage
* Use cloud shapes with red X for "no egress" indicators
* Use different background shades for each layer
* Use bold arrows for primary data flows, dashed for optional/monitoring
* Use color-coding: Blue (access), Green (app), Orange (data), Purple (observability), Gray (infra)

**Font Sizes:**

* Layer headers: 14pt bold
* Component names: 11pt bold
* Sub-labels: 9pt regular
* RMF tags: 8pt italic
* Ensure all text readable when printed at 11x8.5"

## Validation Checklist

Before finalizing, verify:

* ✅ All components show "no internet egress" where applicable
* ✅ Data flows are unidirectional or bidirectional as appropriate
* ✅ RMF control families mapped to at least one component per family
* ✅ EP shown as isolated with clear boundary
* ✅ SSO/RBAC enforcement shown at multiple layers
* ✅ Audit logging shown for sensitive operations
* ✅ Encryption called out for data at rest and in transit
* ✅ Air-gapped artifact mirroring mentioned
* ✅ CPU-first with GPU uplift path noted
* ✅ All CP-hosted tools explicitly labeled as internal

This specification provides everything needed to create a comprehensive, single-page defense-in-depth architecture diagram that accurately represents the PCTE CP AI Help Desk deployment with proper security controls, isolation, and compliance mappings.

1. [https://www.youtube.com/watch?v=LC8R1TBaFvg](https://www.youtube.com/watch?v=LC8R1TBaFvg)
2. [https://netsec.ethz.ch/publications/papers/sasaki-asoni-secvirtnet2016.pdf](https://netsec.ethz.ch/publications/papers/sasaki-asoni-secvirtnet2016.pdf)
3. [https://airbyte.com/data-engineering-resources/control-plane-vs-data-plane](https://airbyte.com/data-engineering-resources/control-plane-vs-data-plane)
4. [https://www.crowdstrike.com/en-us/cybersecurity-101/cloud-security/control-plane/](https://www.crowdstrike.com/en-us/cybersecurity-101/cloud-security/control-plane/)
5. [https://techdocs.broadcom.com/us/en/vmware-security-load-balancing/avi-load-balancer/avi-load-balancer/31-1/vmware-avi-load-balancer-installation-guide/se-data-plane-architecture-and-packet-flow/data-plane/data-plane-and-control--management-plane-isolation.html](https://techdocs.broadcom.com/us/en/vmware-security-load-balancing/avi-load-balancer/avi-load-balancer/31-1/vmware-avi-load-balancer-installation-guide/se-data-plane-architecture-and-packet-flow/data-plane/data-plane-and-control--management-plane-isolation.html)
6. [https://www.spectrocloud.com/blog/kubernetes-in-air-gapped-environments](https://www.spectrocloud.com/blog/kubernetes-in-air-gapped-environments)
7. [https://docs.netapp.com/us-en/netapp-solutions-containers/tanzu/vtwn-overview-tkgs.html](https://docs.netapp.com/us-en/netapp-solutions-containers/tanzu/vtwn-overview-tkgs.html)
8. [https://www.splunk.com/en_us/blog/learn/control-plane-vs-data-plane.html](https://www.splunk.com/en_us/blog/learn/control-plane-vs-data-plane.html)
9. [https://kubeops.net/blog/understanding-air-gapped-environments-in-kubernetes-part-1](https://kubeops.net/blog/understanding-air-gapped-environments-in-kubernetes-part-1)
10. [https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere-supervisor/7-0/vsphere-with-tanzu-configuration-and-management-7-0/supervisor-architecture-and-components/tanzu-kubernetes-grid-architecture.html](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere-supervisor/7-0/vsphere-with-tanzu-configuration-and-management-7-0/supervisor-architecture-and-components/tanzu-kubernetes-grid-architecture.html)
