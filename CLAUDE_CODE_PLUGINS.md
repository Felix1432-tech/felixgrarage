# Claude Code Plugins - Base de Conhecimento Atualizada (2026)

## O que são

Claude Code Plugins são pacotes de extensão que adicionam funcionalidades customizadas ao Claude Code. Cada plugin pode conter uma combinação de:

- **Skills (Slash Commands)**: Atalhos customizados para operações frequentes (ex: `/commit`, `/review`)
- **Subagents**: Agentes especializados para tarefas específicas de desenvolvimento
- **MCP Servers**: Conexões com ferramentas externas via Model Context Protocol
- **Hooks**: Automações que executam em pontos-chave do workflow (PreToolUse, PostToolUse, SessionStart, etc.)
- **LSP Servers**: Servidores Language Server Protocol para code intelligence

## Arquitetura / Estrutura

### Estrutura de um Plugin

```
meu-plugin/
├── .claude-plugin/
│   └── plugin.json          # Manifesto do plugin (metadata)
├── commands/                 # Slash commands (arquivos .md)
├── agents/                   # Definições de subagents
├── skills/                   # Agent Skills com SKILL.md
├── hooks/
│   └── hooks.json            # Event handlers
├── .mcp.json                 # Configuração de MCP servers
├── .lsp.json                 # Configuração de LSP servers
└── README.md                 # Documentação
```

### Escopo de Instalação

| Escopo | Descrição | Arquivo de Config |
|--------|-----------|-------------------|
| **User** | Para você em todos os projetos | `~/.claude/settings.json` |
| **Project** | Para todos colaboradores do repo | `.claude/settings.json` |
| **Local** | Só para você neste repo | `settings.local.json` |
| **Managed** | Definido por admins (imutável) | Managed settings |

### Marketplace System

O sistema funciona em dois passos:
1. **Adicionar marketplace** → registra catálogo de plugins disponíveis
2. **Instalar plugin** → baixa e ativa plugin específico

O marketplace oficial da Anthropic (`claude-plugins-official`) vem pré-configurado.

---

## Como Usar

### Comandos Essenciais

```bash
# Abrir gerenciador interativo de plugins (4 tabs: Discover, Installed, Marketplaces, Errors)
/plugin

# Adicionar marketplace (GitHub)
/plugin marketplace add owner/repo

# Adicionar marketplace (Git URL com branch específico)
/plugin marketplace add https://gitlab.com/company/plugins.git#v1.0.0

# Adicionar marketplace (local)
/plugin marketplace add ./my-marketplace

# Listar marketplaces
/plugin marketplace list

# Atualizar marketplace
/plugin marketplace update marketplace-name

# Remover marketplace
/plugin marketplace remove marketplace-name

# Instalar plugin (user scope por padrão)
/plugin install plugin-name@marketplace-name

# Instalar com escopo específico
claude plugin install formatter@your-org --scope project

# Desabilitar sem desinstalar
/plugin disable plugin-name@marketplace-name

# Reabilitar
/plugin enable plugin-name@marketplace-name

# Desinstalar
/plugin uninstall plugin-name@marketplace-name
```

### Testar Plugin Local (Desenvolvimento)

```bash
# Carregar plugin de diretório local
claude --plugin-dir ./my-plugin

# Carregar múltiplos plugins
claude --plugin-dir ./plugin-one --plugin-dir ./plugin-two
```

### Auto-update

- Marketplaces oficiais têm auto-update habilitado por padrão
- Terceiros: desabilitado por padrão, toggle via `/plugin` → Marketplaces → Enable auto-update
- Desabilitar totalmente: `export DISABLE_AUTOUPDATER=true`
- Manter só plugins com update: `export FORCE_AUTOUPDATE_PLUGINS=true`

---

## Top 13 Plugins Oficiais (Anthropic)

### 1. LSP Plugins (Code Intelligence) ⭐⭐⭐⭐⭐

**O que faz:** Adiciona inteligência de código nativa ao Claude via Language Server Protocol — go-to-definition, find references, diagnostics em tempo real, hover info.

**Performance:** Navegação em 50ms vs 45s com busca textual tradicional.

**Linguagens suportadas (oficial):**

| Linguagem | Plugin | Binário |
|-----------|--------|---------|
| TypeScript | `typescript-lsp` | `typescript-language-server` |
| Python | `pyright-lsp` | `pyright-langserver` |
| Rust | `rust-analyzer-lsp` | `rust-analyzer` |
| Go | `gopls-lsp` | `gopls` |
| Java | `jdtls-lsp` | `jdtls` |
| C/C++ | `clangd-lsp` | `clangd` |
| PHP | `php-lsp` | `intelephense` |
| C# | `csharp-lsp` | `csharp-ls` |
| Kotlin | `kotlin-lsp` | `kotlin-language-server` |
| Lua | `lua-lsp` | `lua-language-server` |
| Swift | `swift-lsp` | `sourcekit-lsp` |

**Instalação:**
```bash
/plugin install typescript-lsp@claude-plugins-official
/plugin install pyright-lsp@claude-plugins-official
```

**Capacidades:**
- Diagnostics automáticos após cada edit (erros de tipo, imports faltantes)
- Go-to-definition, find references, hover, document symbols
- Call hierarchy tracing

**Nota:** Precisa do binário do language server instalado no sistema. Se usar `boostvolt/claude-code-lsps` marketplace, cobre 22+ linguagens adicionais (Dart, Elixir, Gleam, Ruby, Terraform, Zig, etc.).

---

### 2. commit-commands ⭐⭐⭐⭐⭐

**O que faz:** Automação de workflow Git — commit, push, e criação de PR.

**Comandos:**
- `/commit-commands:commit` — Stage + gera mensagem + commit
- `/commit-commands:commit-push-pr` — Commit + push + cria PR
- `/commit-commands:clean_gone` — Limpa branches locais deletadas no remote

**Instalação:**
```bash
/plugin install commit-commands@anthropics-claude-code
```

---

### 3. pr-review-toolkit ⭐⭐⭐⭐⭐

**O que faz:** 5-6 agentes especializados rodando em paralelo para revisão de PR.

**Agentes inclusos:**
- Code reviewer (compliance com CLAUDE.md)
- Bug detector
- Historical context analyzer
- PR history reviewer
- Code comments analyzer
- Silent failure hunter
- Type design analyzer

**Comando:** `/pr-review-toolkit:review-pr`

**Instalação:**
```bash
/plugin install pr-review-toolkit@anthropics-claude-code
```

---

### 4. security-guidance ⭐⭐⭐⭐

**O que faz:** Hook PreToolUse que escaneia cada edit antes da execução, bloqueando código inseguro.

**Monitora 9 padrões:**
- Command injection
- XSS
- eval() usage
- Dangerous HTML
- Pickle deserialization
- os.system calls
- SQL injection patterns
- Unsafe input handling
- Secret exposure

**Instalação:**
```bash
/plugin install security-guidance@claude-plugins-official
```

---

### 5. feature-dev ⭐⭐⭐⭐

**O que faz:** Workflow completo de desenvolvimento de features em 7 fases.

**Agentes:**
- `code-explorer` — Análise profunda do codebase
- `code-architect` — Design de implementação
- `code-reviewer` — Revisão de qualidade

**Comando:** `/feature-dev`

---

### 6. frontend-design ⭐⭐⭐⭐

**O que faz:** Skill auto-invocada que aplica design judgment superior ao output de UI, evitando estética genérica "AI slop".

**Foco em:** Tipografia bold, paletas de cores únicas, layouts criativos, animações.

---

### 7. agent-sdk-dev ⭐⭐⭐⭐

**O que faz:** Ferramentas para desenvolvimento com Claude Agent SDK.

**Comandos:** `/new-sdk-app` para setup interativo
**Agentes:** `agent-sdk-verifier-py`, `agent-sdk-verifier-ts`

---

### 8. plugin-dev ⭐⭐⭐⭐

**O que faz:** Toolkit para criar plugins Claude Code.

**Comandos:** `/plugin-dev:create-plugin` (workflow de 8 fases)
**Agentes:** `agent-creator`, `plugin-validator`, `skill-reviewer`

---

### 9. ralph-wiggum ⭐⭐⭐⭐

**O que faz:** Loops autônomos iterativos — Claude executa tarefas sequencialmente, commitando a cada uma, por múltiplas horas sem supervisão.

**Comandos:** `/ralph-loop`, `/cancel-ralph`
**Ideal para:** CRUD operations, migrations, expansão de test coverage.

---

### 10. hookify ⭐⭐⭐

**O que faz:** Cria hooks customizados analisando padrões de conversa.

**Comandos:** `/hookify`, `/hookify:list`, `/hookify:configure`

---

### 11. claude-opus-4-5-migration ⭐⭐⭐

**O que faz:** Migração automatizada de código/prompts de Sonnet 4.x e Opus 4.1 para Opus 4.5.

---

### 12. explanatory-output-style ⭐⭐⭐

**O que faz:** Injeta insights educativos sobre escolhas de implementação e padrões do codebase no início da sessão.

---

### 13. learning-output-style ⭐⭐⭐

**O que faz:** Modo interativo de aprendizado que solicita contribuições de código significativas nos pontos de decisão.

---

## Top Plugins de Integração (Official Marketplace)

### External Integrations (MCP pré-configurado)

| Plugin | Serviço | Instalação |
|--------|---------|------------|
| `github` | GitHub repos, PRs, issues | `/plugin install github@claude-plugins-official` |
| `gitlab` | GitLab repos, MRs | `/plugin install gitlab@claude-plugins-official` |
| `linear` | Linear issues, projects | `/plugin install linear@claude-plugins-official` |
| `atlassian` | Jira + Confluence | `/plugin install atlassian@claude-plugins-official` |
| `asana` | Asana tasks/projects | `/plugin install asana@claude-plugins-official` |
| `notion` | Notion pages/databases | `/plugin install notion@claude-plugins-official` |
| `figma` | Figma designs → código | `/plugin install figma@claude-plugins-official` |
| `slack` | Slack messages/channels | `/plugin install slack@claude-plugins-official` |
| `vercel` | Vercel deployments | `/plugin install vercel@claude-plugins-official` |
| `firebase` | Firebase projects | `/plugin install firebase@claude-plugins-official` |
| `supabase` | Supabase projects | `/plugin install supabase@claude-plugins-official` |
| `sentry` | Sentry error tracking | `/plugin install sentry@claude-plugins-official` |

---

## Top Plugins da Comunidade

### Context7 ⭐⭐⭐⭐⭐

**O que faz:** Injecta documentação real e atualizada de bibliotecas no contexto do Claude. Cobre 1000+ libraries.

**Por que usar:** Elimina hallucinations de API — Claude consulta docs atuais em vez de dados de training.

**Exemplo:** "Show me Server Actions in Next.js 16" → puxa docs reais.

```bash
/plugin install context7@claude-plugins-official
```

---

### Playwright ⭐⭐⭐⭐⭐

**O que faz:** Abre Chrome controlável por linguagem natural — UI testing, automação, web scraping.

**Exemplo:** "Test the checkout flow: browse products, add to cart, fill test card, pay."

```bash
/plugin install playwright@claude-plugins-official
```

---

### Firecrawl ⭐⭐⭐⭐

**O que faz:** Converte websites em dados LLM-ready. Lida com JS rendering, anti-bot, proxies.

**Tools:** `/firecrawl:scrape`, `/firecrawl:crawl`, `/firecrawl:search`, `/firecrawl:map`, `/firecrawl:agent`

```bash
/plugin install firecrawl@claude-plugins-official
```

---

### shadcn/ui MCP ⭐⭐⭐⭐

**O que faz:** Dá acesso direto à library shadcn/ui — busca componentes, exemplos, install commands.

**Exemplo:** "Create a modern pricing card with three tiers using shadcn/ui"

---

### Chrome DevTools MCP ⭐⭐⭐⭐

**O que faz:** Acesso completo ao DevTools — network, console, performance, elements.

**Exemplos:** "Show failed network requests", "Run performance audit"

```bash
/plugin marketplace add ChromeDevTools/chrome-devtools-mcp
/plugin install chrome-devtools-mcp@chrome-devtools-plugins
```

---

### connect-apps (Composio) ⭐⭐⭐⭐

**O que faz:** Conecta Claude a 500+ apps — Gmail, Slack, GitHub, Notion, databases.

**Instalação:**
```bash
/plugin marketplace add ComposioHQ/awesome-claude-plugins
/plugin install connect-apps@composiohq-awesome-claude-plugins
```

---

### GSD (Get Shit Done) ⭐⭐⭐⭐

**O que faz:** Sistema de meta-prompting e spec-driven development. Context engineering, orchestração de subagents, state management.

**Ideal para:** Solo devs, projetos de médio porte.

**Repo:** https://github.com/glittercowboy/get-shit-done

---

### BMAD Method ⭐⭐⭐⭐

**O que faz:** Breakthrough Method for Agile AI Development. 12+ agentes especializados, workflows adaptativos.

**Ideal para:** Teams com processos agile existentes.

**Repo:** https://github.com/bmad-code-org/BMAD-METHOD

---

### Code Review (Community) ⭐⭐⭐⭐

**O que faz:** Múltiplos agentes de review com confidence scoring.

```bash
/plugin install code-review@claude-plugins-official
```

---

## Marketplaces Populares

| Marketplace | Plugins | Instalação |
|-------------|---------|------------|
| **Anthropic Official** | ~30+ (LSP, integrations, workflows) | Pré-instalado |
| **Anthropic Demo** | 13 (examples/reference) | `/plugin marketplace add anthropics/claude-code` |
| **ComposioHQ** | 50+ (integrations, quality, design) | `/plugin marketplace add ComposioHQ/awesome-claude-plugins` |
| **ccplugins** | 132+ (13 categorias) | `/plugin marketplace add ccplugins/awesome-claude-code-plugins` |
| **awesome-claude-code-toolkit** | 120+ plugins + 135 agents | `/plugin marketplace add rohitg00/awesome-claude-code-toolkit` |
| **boostvolt LSPs** | 22+ linguagens LSP | `/plugin marketplace add boostvolt/claude-code-lsps` |

---

## Recomendações por Caso de Uso

### Para Projetos Next.js + TypeScript (como Escritório Legal)

| Prioridade | Plugin | Razão |
|------------|--------|-------|
| 🔴 Must | `typescript-lsp` | Code intelligence nativa, diagnostics em tempo real |
| 🔴 Must | `context7` | Docs atuais de Next.js, React, Prisma, Tailwind |
| 🔴 Must | `security-guidance` | Previne vulnerabilidades em cada edit |
| 🟡 Should | `pr-review-toolkit` | Review automatizado multi-agente |
| 🟡 Should | `commit-commands` | Git workflow automatizado |
| 🟡 Should | `playwright` | Testing de UI (cobranças, formulários, kanban) |
| 🟢 Nice | `frontend-design` | UI de alta qualidade visual |
| 🟢 Nice | `shadcn` MCP | Acesso direto a componentes shadcn |
| 🟢 Nice | `sentry` | Error tracking em prod |

### Para Full-Stack Development Geral

```bash
# Core (instalar primeiro)
/plugin install typescript-lsp@claude-plugins-official
/plugin install pyright-lsp@claude-plugins-official
/plugin install security-guidance@claude-plugins-official
/plugin install context7@claude-plugins-official

# Workflow
/plugin install commit-commands@anthropics-claude-code
/plugin install pr-review-toolkit@anthropics-claude-code

# Testing
/plugin install playwright@claude-plugins-official

# Integrations (escolher conforme stack)
/plugin install github@claude-plugins-official
/plugin install linear@claude-plugins-official
/plugin install vercel@claude-plugins-official
```

### Para Solo Dev / Side Projects

```bash
/plugin install typescript-lsp@claude-plugins-official
/plugin install context7@claude-plugins-official
/plugin install commit-commands@anthropics-claude-code
/plugin install ralph-wiggum@anthropics-claude-code  # loops autônomos
```

---

## Best Practices

### Performance
- **Limite de 2-3 MCPs ativos** — muitos MCPs degradam startup time
- LSP plugins consomem memória significativa (rust-analyzer, pyright em monorepos grandes)
- Desabilitar plugins não utilizados: `/plugin disable`

### Segurança
- **Sempre revise plugins antes de instalar** — Anthropic não controla conteúdo de terceiros
- PreToolUse hooks para validação: exit code 0 (allow), exit code 2 (deny)
- Hooks rodam com credenciais do usuário — revise scripts cuidadosamente
- Enterprise: `allowManagedHooksOnly` para bloquear hooks de terceiros

### Team Setup
- Usar **Project scope** para plugins compartilhados (`.claude/settings.json`)
- Configurar `extraKnownMarketplaces` + `enabledPlugins` em settings do projeto
- LSP plugins: equipe precisa ter binários instalados localmente

### Troubleshooting
- `/plugin` → tab **Errors** para ver erros de carregamento
- Plugin skills não aparecem: `rm -rf ~/.claude/plugins/cache` + restart
- LSP "Executable not found": instalar binário do language server
- Plugin não carrega: verificar que diretórios estão na raiz (NÃO dentro de `.claude-plugin/`)

---

## Ecossistema em Números (Feb 2026)

- **9.000+** plugins totais (ClaudePluginHub + claude-plugins.dev + Anthropic Marketplace)
- **43** marketplaces registrados
- **4.501** repositórios GitHub indexados com plugins
- **13** plugins oficiais Anthropic
- **11** LSP plugins oficiais
- **12** integrações externas oficiais
- **132+** plugins no ccplugins marketplace
- **135** agents no awesome-claude-code-toolkit
- **22+** linguagens com LSP via boostvolt

---

## Lacunas de Conhecimento

- Métricas de download/popularidade por plugin individual não são públicas
- Benchmark comparativo de performance (com vs sem LSP) apenas anecdotal (50ms vs 45s claim)
- Compatibilidade de plugins entre versões do Claude Code não documentada explicitamente
- Pricing de MCP servers que dependem de APIs pagas (Firecrawl, Linear) varia

---

## Recursos

- **Docs oficiais:** https://code.claude.com/docs/en/plugins
- **Discover plugins:** https://code.claude.com/docs/en/discover-plugins
- **Plugin reference:** https://code.claude.com/docs/en/plugins-reference
- **Marketplace guide:** https://code.claude.com/docs/en/plugin-marketplaces
- **Demo plugins (Anthropic):** https://github.com/anthropics/claude-code/tree/main/plugins
- **Awesome Claude Code:** https://github.com/hesreallyhim/awesome-claude-code
- **Awesome Claude Plugins (ccplugins):** https://github.com/ccplugins/awesome-claude-code-plugins
- **Awesome Claude Plugins (Composio):** https://github.com/ComposioHQ/awesome-claude-plugins
- **Claude Plugins Metrics:** https://github.com/quemsah/awesome-claude-plugins
- **Awesome Claude Code Toolkit:** https://github.com/rohitg00/awesome-claude-code-toolkit
- **Community Registry:** https://claude-plugins.dev/
- **Claude Directory:** https://www.claudedirectory.org/

---

**Data da Pesquisa:** 2026-02-10
**Fontes Consultadas:** 20+ páginas de documentação oficial, artigos técnicos e repositórios GitHub
