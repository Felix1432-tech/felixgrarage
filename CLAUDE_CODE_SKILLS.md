# Claude Code Skills - Base de Conhecimento Atualizada (2026)

## O que são

Agent Skills são pacotes de capacidade que transformam o Claude de um agente genérico em um especialista de domínio. Cada skill é um diretório com um arquivo `SKILL.md` contendo instruções, metadados e recursos opcionais (scripts, templates, exemplos) que o Claude usa automaticamente quando relevantes.

Skills seguem o **Agent Skills Open Standard** (publicado Dez 2025), portável entre Claude Code, Codex, Cursor, Windsurf, Gemini CLI, GitHub Copilot, e outros.

### Skills vs Commands vs Plugins

| Conceito | Invocação | Escopo | Distribuição |
|----------|-----------|--------|--------------|
| **Skill** | Auto (Claude decide) ou `/skill-name` | Inline ou subagent | `.claude/skills/`, plugins, marketplaces |
| **Command** | Só `/command-name` | Inline | `.claude/commands/` (legacy, mesma funcionalidade) |
| **Plugin** | Pacote contendo skills + agents + hooks + MCP | Multi-projeto | Marketplaces |

> Commands foram **merged into Skills**. `.claude/commands/review.md` e `.claude/skills/review/SKILL.md` criam ambos `/review`.

---

## Arquitetura / Estrutura

### Estrutura de uma Skill

```
minha-skill/
├── SKILL.md           # Instruções principais (obrigatório)
├── reference.md       # Docs detalhadas (carregado sob demanda)
├── examples/
│   └── sample.md      # Exemplos de output esperado
├── templates/
│   └── template.md    # Template para Claude preencher
└── scripts/
    └── validate.sh    # Script executável
```

### SKILL.md — Frontmatter Completo

```yaml
---
name: minha-skill                    # Identificador (lowercase, hyphens, max 64 chars)
description: O que faz e QUANDO usar  # Claude usa para decidir auto-invocação
argument-hint: [issue-number]         # Hint no autocomplete
disable-model-invocation: true        # true = só /manual, Claude não auto-invoca
user-invocable: false                 # false = oculta do menu /, só Claude usa
allowed-tools: Read, Grep, Glob      # Ferramentas permitidas quando ativa
model: opus                          # Modelo específico para esta skill
context: fork                        # fork = roda em subagent isolado
agent: Explore                       # Tipo de subagent (Explore, Plan, general-purpose, custom)
hooks:                               # Hooks scoped a esta skill
  PreToolUse:
    - matcher: "Write"
      hooks:
        - type: command
          command: "echo 'write detected'"
---

Instruções markdown aqui...
```

### Substituições Dinâmicas

| Variável | Descrição |
|----------|-----------|
| `$ARGUMENTS` | Tudo após `/skill-name` |
| `$ARGUMENTS[N]` ou `$N` | Argumento por índice (0-based) |
| `${CLAUDE_SESSION_ID}` | ID da sessão atual |
| `` !`command` `` | Executa shell antes de enviar (preprocessing) |

### Progressive Disclosure (3 níveis)

1. **Level 1:** Metadados (name + description) — carregados no system prompt no startup
2. **Level 2:** Conteúdo completo do SKILL.md — carregado quando Claude determina relevância
3. **Level 3+:** Arquivos referenciados — carregados sob demanda para cenários específicos

> "A quantidade de contexto que pode ser bundled em uma skill é efetivamente ilimitada" — Anthropic

### Onde Skills Ficam

| Localização | Path | Aplica a |
|-------------|------|----------|
| Enterprise | Managed settings | Toda organização |
| Personal | `~/.claude/skills/<name>/SKILL.md` | Todos seus projetos |
| Project | `.claude/skills/<name>/SKILL.md` | Só este projeto |
| Plugin | `<plugin>/skills/<name>/SKILL.md` | Onde plugin está ativo |
| Monorepo | `packages/frontend/.claude/skills/` | Auto-discovery recursivo |

Prioridade: Enterprise > Personal > Project. Plugin skills usam namespace `plugin:skill`.

---

## Ferramentas de Instalação

### 1. npx skills add (Vercel)

```bash
# Instalar skills de um repo
npx skills add vercel-labs/agent-skills

# Listar skills disponíveis
npx skills add vercel-labs/agent-skills --list

# Instalar skill específica
npx skills add vercel-labs/agent-skills --skill react-best-practices

# Instalar para agente específico
npx skills add vercel-labs/agent-skills -a claude-code
```

Suporta: claude-code, codex, cursor, windsurf, gemini-cli, github-copilot, opencode, etc.

### 2. npx add-skill

```bash
# Instalar de repo
npx add-skill repo-name

# Escolher skills específicas
npx add-skill K-Dense-AI/claude-scientific-skills
```

### 3. Via Plugin Marketplace

```bash
# Adicionar marketplace que contém skills
/plugin marketplace add owner/repo
/plugin install skill-pack@marketplace-name
```

### 4. Manual (Git Clone)

```bash
# Clonar para personal skills
git clone https://github.com/author/skill.git ~/.claude/skills/skill-name

# Ou para project skills
git clone https://github.com/author/skill.git .claude/skills/skill-name
```

---

## Top Skills Oficiais (Anthropic)

### Document Skills (Production-grade)

| Skill | Função | Instalação |
|-------|--------|------------|
| **docx** | Criar, editar Word com tracked changes, comments, formatting | `/plugin marketplace add anthropics/skills` |
| **pdf** | Extrair texto/tabelas, criar PDFs, merge/split, formulários | idem |
| **pptx** | Criar, editar PowerPoint com layouts, templates, charts | idem |
| **xlsx** | Criar, editar Excel com fórmulas, formatação, análise | idem |

### Creative & Design

| Skill | Função |
|-------|--------|
| **algorithmic-art** | Arte generativa com p5.js, randomness seeded, flow fields |
| **canvas-design** | Arte visual em PNG e PDF |
| **frontend-design** | UI/UX de alta qualidade, evita estética "AI slop" |
| **theme-factory** | Temas profissionais com 10 presets de fontes e cores |
| **web-artifacts-builder** | Artifacts HTML complexos com React, Tailwind, shadcn |
| **slack-gif-creator** | GIFs animados otimizados para Slack |

### Development

| Skill | Função |
|-------|--------|
| **mcp-builder** | Guia para criar MCP servers de qualidade |
| **webapp-testing** | Testar web apps locais via Playwright |
| **skill-creator** | Guia interativo para criar novas skills |

### Communication

| Skill | Função |
|-------|--------|
| **brand-guidelines** | Cores e tipografia oficiais Anthropic |
| **internal-comms** | Status reports, newsletters, FAQs |

---

## Top Skills de Dev Teams Oficiais

### Vercel Engineering

```bash
npx skills add vercel-labs/agent-skills
```

| Skill | Função |
|-------|--------|
| **react-best-practices** | Padrões React, otimização, re-render auditing |
| **next-best-practices** | Abordagens recomendadas Next.js |
| **next-cache-components** | Estratégias de caching em Next.js |
| **next-upgrade** | Upgrade de versão Next.js |
| **composition-patterns** | Componentes React reutilizáveis |
| **web-design-guidelines** | Padrões de web design |
| **vercel-deploy-claimable** | Deploy para Vercel |
| **react-native-skills** | Guidelines de performance React Native |

### Cloudflare Team

```bash
npx skills add cloudflare/agent-skills
```

| Skill | Função |
|-------|--------|
| **agents-sdk** | Agentes IA stateful com scheduling, RPC, MCP |
| **durable-objects** | Coordenação stateful via RPC/SQLite |
| **web-perf** | Core Web Vitals e performance auditing |
| **wrangler** | Workers, KV, R2, D1, Vectorize, Queues |
| **commands** | Referência CLI Cloudflare |
| **building-mcp-server-on-cloudflare** | MCP remoto com OAuth |

### Google Labs (Stitch)

| Skill | Função |
|-------|--------|
| **shadcn-ui** | Construção de componentes UI |
| **react-components** | Conversão Stitch → React |
| **remotion** | Geração de walkthrough videos |
| **enhance-prompt** | Melhoria de prompts com design specs |

### Stripe Team

```bash
npx skills add stripe/agent-skills
```

| Skill | Função |
|-------|--------|
| **stripe-best-practices** | Best practices de integração Stripe |
| **upgrade-stripe** | Upgrade de SDK e versão de API |

### Supabase Team

| Skill | Função |
|-------|--------|
| **postgres-best-practices** | Otimização PostgreSQL para Supabase |

### Hugging Face Team (8 skills)

| Skill | Função |
|-------|--------|
| **hugging-face-cli** | Hub CLI para modelos, datasets |
| **hugging-face-datasets** | Criação de datasets com SQL |
| **hugging-face-evaluation** | Avaliação de modelos |
| **hugging-face-model-trainer** | Training com TRL (SFT, DPO, GRPO) |
| **hugging-face-jobs** | Jobs de compute no HF |
| **hugging-face-trackio** | Tracking de experimentos ML |
| **hugging-face-paper-publisher** | Publicação de papers |
| **hugging-face-tool-builder** | Scripts de operações API |

### Trail of Bits Security (23 skills)

Auditoria de smart contracts, scanning APK, análise constant-time, review diferencial, property-based testing, Semgrep rules, static analysis, variant analysis, e mais.

### Sentry Team (7 skills)

Code review, commit best practices, PR creation, bug detection, feedback iteration, AGENTS.md generation, settings audits.

### Expo Team (3 skills)

Design, deployment, e SDK upgrade para apps Expo.

### Microsoft Skills (40+ skills)

Azure AI, Cosmos DB, Event Grid, Key Vault, Service Bus, .NET, Java, Python enterprise patterns.

---

## Top Skills da Comunidade

### 1. Superpowers ⭐⭐⭐⭐⭐ (ESSENCIAL)

**Autor:** obra | **GitHub:** https://github.com/obra/superpowers

**O que faz:** Força Claude a agir como senior engineer — planejamento antes de código, TDD, debugging sistemático.

**Inclui 20+ skills:**
- Planning-first methodology
- Red-Green-Refactor TDD cycle
- 4-phase root cause analysis para debugging
- Pre-review checklists
- Collaboration patterns

**Instalação:**
```bash
/plugin marketplace add obra/superpowers-marketplace
/plugin install superpowers@superpowers-marketplace
```

**Por que é essencial:** "Most coding agents rush to write code, leading to bugs and poor architecture." Superpowers resolve isso.

---

### 2. UI/UX Pro Max ⭐⭐⭐⭐⭐

**Autor:** nextlevelbuilder | **GitHub:** https://github.com/nextlevelbuilder/ui-ux-pro-max-skill

**O que faz:** Design system generator automático — paletas de cores, tipografia, component patterns.

**Features:**
- Landing pages otimizadas para conversão
- Dashboards e data visualization
- Stack-specific: React, Vue, SwiftUI, Tailwind

**Instalação:**
```bash
npm install -g uipro-cli && uipro init --ai claude
```

---

### 3. Planning with Files (Manus) ⭐⭐⭐⭐⭐

**Autor:** OthmanAdi | **GitHub:** https://github.com/OthmanAdi/planning-with-files

**O que faz:** Tracking persistente de tarefas via filesystem — resolve limitação de context window.

**Cria:** `task_plan.md`, `findings.md`, `progress.md`

**Por que usar:** Previne "goal drift" e hallucinations em tarefas longas, permite recovery entre sessões.

**Instalação:**
```bash
claude plugins install OthmanAdi/planning-with-files
```

---

### 4. Obsidian Skills ⭐⭐⭐⭐

**Autor:** kepano | **GitHub:** https://github.com/kepano/obsidian-skills

**O que faz:** Integração com Obsidian vault — Obsidian Flavored Markdown, JSON Canvas, note linking.

**Instalação:**
```bash
/plugin marketplace add kepano/obsidian-skills
/plugin install obsidian@obsidian-skills
```

---

### 5. Humanizer ⭐⭐⭐⭐

**Autor:** blader | **GitHub:** https://github.com/blader/humanizer

**O que faz:** Remove 24 padrões identificáveis de escrita AI — "significance inflation", tom sycophantic, "chatbot artifacts".

**Instalação:**
```bash
git clone https://github.com/blader/humanizer.git ~/.claude/skills/humanizer
```

---

### 6. Dev Browser ⭐⭐⭐⭐

**Autor:** SawyerHood | **GitHub:** https://github.com/SawyerHood/dev-browser

**O que faz:** Controle visual do browser + E2E testing via linguagem natural.

**Instalação:**
```bash
/plugin marketplace add sawyerhood/dev-browser
/plugin install dev-browser@sawyerhood/dev-browser
```

---

### 7. Claude Scientific Skills ⭐⭐⭐⭐

**Autor:** K-Dense-AI | **GitHub:** https://github.com/K-Dense-AI/claude-scientific-skills

**O que faz:** 140+ skills para pesquisa científica — drug discovery, genomics, PubMed, RDKit.

**Instalação:**
```bash
/plugin marketplace add K-Dense-AI/claude-scientific-skills
/plugin install scientific-skills@claude-scientific-skills
```

---

### 8. Marketing Skills ⭐⭐⭐

**Autor:** coreyhaines31 | **GitHub:** https://github.com/coreyhaines31/marketingskills

**O que faz:** Copywriting, SEO auditing, schema markup, conversion optimization, product launch.

**Instalação:**
```bash
npx skills add coreyhaines31/marketingskills
```

---

### 9. Systematic Debugging (parte do Superpowers) ⭐⭐⭐⭐⭐

**O que faz:** Debugging metódico em 4 fases — root cause investigation, pattern analysis, hypothesis testing, implementation.

---

### 10. Verify-Work ⭐⭐⭐⭐

**Autor:** Ilia Karelin

**O que faz:** End-of-session review — verifica coding practices, segurança, feature completeness. Detecta imports não usados, console.logs, edge cases.

---

## DevOps Skills (Top 8)

| Skill | Autor | Função | Instalação |
|-------|-------|--------|------------|
| **pulumi-typescript** | dirien | IaC Pulumi com TypeScript best practices | `npx skills add dirien/claude-skills --skill pulumi-typescript` |
| **pulumi-esc** | pulumi | Environment & secrets management | `npx skills add pulumi/agent-skills --skill pulumi-esc` |
| **pulumi-best-practices** | pulumi | Production-grade infra patterns | `npx skills add pulumi/agent-skills --skill pulumi-best-practices` |
| **kubernetes-specialist** | jeffallan | K8s configs production-ready | `npx skills add jeffallan/claude-skills --skill kubernetes-specialist` |
| **monitoring-expert** | jeffallan | Observability (Prometheus, Grafana, DataDog) | `npx skills add jeffallan/claude-skills --skill monitoring-expert` |
| **sre-engineer** | jeffallan | SLI/SLO, error budgets, golden signals | `npx skills add jeffallan/claude-skills --skill sre-engineer` |
| **security-review** | sickn33 | App & infra security scanning | `npx skills add sickn33/antigravity-awesome-skills --skill security-review` |
| **systematic-debugging** | obra | Debugging metódico 4 fases | `npx skills add obra/superpowers --skill systematic-debugging` |

---

## Criando Suas Próprias Skills

### Skill Mínima

```bash
mkdir -p .claude/skills/minha-skill
```

`.claude/skills/minha-skill/SKILL.md`:
```yaml
---
name: minha-skill
description: O que faz e QUANDO usar. Incluir keywords que o usuário diria naturalmente.
---

Instruções claras para Claude seguir quando esta skill for ativada.
```

### Skill com Task (Manual Only)

```yaml
---
name: deploy
description: Deploy the application to production
disable-model-invocation: true
context: fork
---

Deploy $ARGUMENTS to production:
1. Run test suite
2. Build application
3. Push to deployment target
4. Verify deployment succeeded
```

### Skill com Context Dinâmico

```yaml
---
name: pr-summary
description: Summarize changes in a pull request
context: fork
agent: Explore
allowed-tools: Bash(gh *)
---

## Pull request context
- PR diff: !`gh pr diff`
- PR comments: !`gh pr view --comments`
- Changed files: !`gh pr diff --name-only`

## Your task
Summarize this pull request...
```

### Skill Read-Only

```yaml
---
name: safe-reader
description: Read files without making changes
allowed-tools: Read, Grep, Glob
---
```

### Skill com Script Executável

```
codebase-visualizer/
├── SKILL.md
└── scripts/
    └── visualize.py    # Script que gera HTML interativo
```

```yaml
---
name: codebase-visualizer
description: Generate interactive tree visualization of codebase
allowed-tools: Bash(python *)
---

Run the visualization script from project root:

```bash
python ~/.claude/skills/codebase-visualizer/scripts/visualize.py .
```
```

### Skill com Ultrathink

Incluir "ultrathink" em qualquer parte do conteúdo ativa extended thinking:

```yaml
---
name: deep-analysis
description: Deep architectural analysis
---

Use ultrathink mode for this analysis.
[instruções...]
```

---

## Best Practices

### Escrita do SKILL.md

1. **Description é TUDO** — Claude usa para decidir auto-invocação. Incluir keywords que o usuário diria
2. **Manter SKILL.md < 500 linhas** — mover referências para arquivos separados
3. **Progressive disclosure** — não carregar tudo no context; referenciar arquivos extras
4. **Ser específico nos triggers** — description vaga = skill ativa quando não devia

### Controle de Invocação

| Cenário | Configuração |
|---------|-------------|
| Skill normal (Claude + usuário) | Default (sem flags) |
| Só manual (`/deploy`) | `disable-model-invocation: true` |
| Só background knowledge | `user-invocable: false` |
| Isolada em subagent | `context: fork` |

### Performance

- Skill descriptions consomem budget de 2% do context window (fallback: 16K chars)
- Muitas skills podem exceder budget → `/context` para ver warnings
- Override: `SLASH_COMMAND_TOOL_CHAR_BUDGET=32000`
- Skills com `disable-model-invocation: true` não consomem budget

### Segurança

- **Auditar sempre** antes de instalar skills de terceiros
- Skills maliciosas podem conter instruções perigosas ou scripts
- `allowed-tools` restringe ferramentas disponíveis
- Hooks scoped limitam comportamento lateral

### Troubleshooting

| Problema | Solução |
|----------|---------|
| Skill não ativa | Verificar description com keywords naturais |
| Skill ativa demais | Description mais específica, ou `disable-model-invocation: true` |
| Claude não vê todas skills | Budget excedido — `SLASH_COMMAND_TOOL_CHAR_BUDGET` |
| Skill não aparece no menu | Verificar path: `.claude/skills/<name>/SKILL.md` |

---

## Recomendações por Stack (Escritório Legal - Next.js + TypeScript + Prisma)

### Must-Have (Instalar Agora)

```bash
# Vercel Engineering — Next.js + React best practices
npx skills add vercel-labs/agent-skills

# Superpowers — planning-first, TDD, debugging metódico
/plugin marketplace add obra/superpowers-marketplace
/plugin install superpowers@superpowers-marketplace

# Stripe — se usando Stripe billing
npx skills add stripe/agent-skills
```

### Should-Have

```bash
# Google Labs — shadcn/ui components
npx skills add google-labs/stitch-agent-skills --skill shadcn-ui

# Obsidian — integração com vault
/plugin marketplace add kepano/obsidian-skills
/plugin install obsidian@obsidian-skills
```

### Custom Skills para Este Projeto (Criar)

| Skill | Descrição | Tipo |
|-------|-----------|------|
| `tenant-api` | Padrões de API com tenant-scoping, Prisma 7, Zod 4 | Background knowledge |
| `deploy-wowlaw` | Deploy via deploy.sh para VPS | Manual only |
| `cobranca-workflow` | Workflow de cobrança: kanban, follow-ups, WhatsApp | Background knowledge |
| `prisma-patterns` | Prisma 7 + PrismaPg adapter patterns, findFirst vs findUnique | Background knowledge |
| `nextauth-edge` | NextAuth v5 em Edge Runtime com getToken | Background knowledge |

---

## Ecossistema em Números (Fev 2026)

- **339+** skills oficiais (Anthropic + dev teams) no VoltAgent
- **8.348** skills no Chat2AnyLLM registry
- **15.000+** skills via SkillKit (awesome-claude-code-toolkit)
- **140+** skills científicas (K-Dense-AI)
- **78+** integrações SaaS via Composio skills
- **40+** skills Microsoft (.NET, Java, Python)
- **23** skills de segurança Trail of Bits
- Portável entre 17+ agentes AI (claude-code, codex, cursor, windsurf, etc.)

---

## Recursos

### Documentação Oficial
- **Claude Code Skills Docs:** https://code.claude.com/docs/en/skills
- **Agent Skills API Docs:** https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
- **Anthropic Skills Repo:** https://github.com/anthropics/skills
- **Agent Skills Spec:** https://agentskills.io
- **Complete Guide (PDF):** https://resources.anthropic.com/hubfs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf

### Awesome Lists
- **VoltAgent (339+ official):** https://github.com/VoltAgent/awesome-agent-skills
- **travisvn:** https://github.com/travisvn/awesome-claude-skills
- **ComposioHQ:** https://github.com/ComposioHQ/awesome-claude-skills
- **Chat2AnyLLM (8K+):** https://github.com/Chat2AnyLLM/awesome-claude-skills
- **BehiSecc:** https://github.com/BehiSecc/awesome-claude-skills
- **Awesome Claude Code:** https://github.com/hesreallyhim/awesome-claude-code

### Ferramentas
- **npx skills (Vercel):** https://github.com/vercel-labs/skills
- **npx add-skill:** https://add-skill.org/
- **Skills.sh (directory):** https://skills.sh
- **OpenSkills (universal installer):** https://www.npmjs.com/package/openskills

### Artigos
- **Anthropic Blog:** https://claude.com/blog/equipping-agents-for-the-real-world-with-agent-skills
- **Vercel Changelog:** https://vercel.com/changelog/introducing-skills-the-open-agent-skills-ecosystem
- **10 Best Agent Skills:** https://www.scriptbyai.com/best-agent-skills/
- **8 DevOps Skills (Pulumi):** https://www.pulumi.com/blog/top-8-claude-skills-devops-2026/
- **36 Skills Examples:** https://aiblewmymind.substack.com/p/claude-skills-36-examples
- **Deep Dive:** https://leehanchung.github.io/blogs/2025/10/26/claude-skills-deep-dive/

### Dev Team Skill Repos
- **Vercel:** https://github.com/vercel-labs/agent-skills
- **Cloudflare:** https://github.com/cloudflare/agent-skills
- **Stripe:** https://github.com/stripe/agent-skills
- **Hugging Face:** https://github.com/huggingface/agent-skills
- **Trail of Bits:** https://github.com/trailofbits/agent-skills
- **Sentry:** https://github.com/getsentry/agent-skills
- **Expo:** https://github.com/expo/agent-skills

---

## Lacunas de Conhecimento

- Benchmarks comparativos de qualidade de código com/sem skills específicas não existem
- Impacto real de skills no context window budget em projetos grandes não documentado
- Compatibilidade entre versões de skills e Claude Code versions não clara
- Não há mecanismo de dependency management entre skills (skill A requer skill B)
- Skills.sh leaderboard metrics não são transparentes (como medem popularidade)

---

**Data da Pesquisa:** 2026-02-10
**Fontes Consultadas:** 25+ páginas de documentação oficial, artigos técnicos e repositórios GitHub
