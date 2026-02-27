a# Claude Cowork - Base de Conhecimento Completa (2026)

**Data da Pesquisa:** 2026-02-09
**Fontes Consultadas:** 40+ páginas de documentação oficial, blogs técnicos, repositórios GitHub e artigos especializados

---

## 1. O que é Claude Cowork

Claude Cowork é a ferramenta agêntica da Anthropic lançada em **12 de janeiro de 2026** como research preview. Diferente do chat tradicional, o Cowork transforma o Claude em um **colega de trabalho digital** capaz de executar tarefas multi-etapas de forma autônoma no seu computador.

**Slogan oficial:** *"Claude Code for the rest of your work"* — traz o poder do Claude Code para profissionais não-técnicos.

### Diferença fundamental do Chat

| Aspecto | Chat Tradicional | Cowork |
|---------|-----------------|--------|
| Modelo de interação | Pergunta → Resposta | Descreva resultado → Claude executa |
| Acesso a arquivos | Upload manual | Leitura/escrita direta em pastas locais |
| Execução de tarefas | Uma por vez | Paralela com sub-agentes |
| Duração | Limitada por contexto | Sessões longas sem timeout |
| Output | Texto/código | Documentos formatados, planilhas, apresentações |

### Disponibilidade

| Plano | Acesso | Preço |
|-------|--------|-------|
| **Pro** | Sim (desde 16/jan/2026) | $20/mês |
| **Max 5x** | Sim | $100/mês |
| **Max 20x** | Sim | $200/mês |
| **Team** | Sim (Premium Seat) | $125/mês por seat ($100 anual) |
| **Enterprise** | Sim | Preço customizado |

**Plataforma:** macOS apenas (Windows previsto para Q2 2026)

---

## 2. Arquitetura Técnica

### 2.1 VM Isolada (Apple Virtualization Framework)

O Cowork **não** executa comandos diretamente no macOS host. Em vez disso:

```
┌─────────────────────────────────────┐
│         macOS Host (seu Mac)        │
│                                     │
│  ┌───────────────────────────────┐  │
│  │   VZVirtualMachine (AVF)      │  │
│  │   ┌───────────────────────┐   │  │
│  │   │  Custom Linux rootfs   │   │  │
│  │   │  ┌─────────────────┐  │   │  │
│  │   │  │  Claude Agent    │  │   │  │
│  │   │  │  Loop            │  │   │  │
│  │   │  └─────────────────┘  │   │  │
│  │   │  ┌─────────────────┐  │   │  │
│  │   │  │  Mounted Folder  │  │   │  │
│  │   │  │  (seu workspace) │  │   │  │
│  │   │  └─────────────────┘  │   │  │
│  │   └───────────────────────┘   │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

**Benefícios de segurança:**
- Mesmo que um comando malicioso como `rm -rf /` seja executado, o dano fica confinado à VM temporária
- O host macOS permanece intacto
- Apple Virtualization Framework (AVF) é nativo do Apple Silicon — overhead mínimo

### 2.2 Agentic Loop (Observe-Plan-Act-Reflect)

```
┌──────────────────────────────────────────┐
│              AGENTIC LOOP                │
│                                          │
│  1. OBSERVE → Analisa request do user    │
│  2. PLAN    → Decompõe em subtarefas     │
│  3. ACT     → Executa (pode spawnar      │
│               sub-agentes em paralelo)   │
│  4. REFLECT → Verifica resultados        │
│  5. LOOP    → Repete até conclusão       │
│                                          │
│  Se necessário → Pede clarificação       │
└──────────────────────────────────────────┘
```

### 2.3 Sub-Agentes Paralelos

O Cowork pode spawnar múltiplos sub-agentes que trabalham simultaneamente:

```
Main Agent (Team Lead)
├── Sub-Agent 1: Analisa contratos A-F
├── Sub-Agent 2: Analisa contratos G-L
├── Sub-Agent 3: Analisa contratos M-Z
└── Síntese: Combina resultados em relatório final
```

**Impacto prático:** Uma tarefa de 50 minutos (10 arquivos × 5 min cada) pode ser concluída em **5 minutos** com execução paralela.

---

## 3. Plugins — O Coração do Cowork

### 3.1 O que são Plugins

Plugins são **pacotes completos** que combinam:

| Componente | Descrição | Exemplo |
|------------|-----------|---------|
| **Skills** | Conhecimento de domínio + instruções de workflow | "Como revisar contratos de SaaS" |
| **Slash Commands** | Ações específicas invocáveis pelo usuário | `/legal:review-contract` |
| **Connectors (MCP)** | Integrações com ferramentas externas | Slack, Box, Jira |
| **Sub-Agents** | Instâncias especializadas do Claude | Agente de compliance, agente de redline |

### 3.2 Estrutura de Arquivos de um Plugin

```
plugin-name/
├── .claude-plugin/
│   └── plugin.json          # Manifesto: nome, versão, autor, descrição
├── .mcp.json                # Configuração de MCP servers (connectors)
├── commands/                # Um arquivo .md por slash command
│   ├── review-contract.md   # /plugin:review-contract
│   ├── triage-nda.md        # /plugin:triage-nda
│   └── brief.md             # /plugin:brief
├── skills/                  # Conhecimento de domínio (auto-ativados)
│   ├── contract-review.md   # Expertise em revisão de contratos
│   ├── compliance.md        # Conhecimento de compliance
│   └── risk-assessment.md   # Framework de avaliação de risco
└── agents/                  # Sub-agentes especializados (opcional)
    └── redline-agent.md     # Agente especializado em redlines
```

### 3.3 Manifesto do Plugin (plugin.json)

```json
{
  "name": "legal",
  "version": "1.0.0",
  "description": "Legal document review, NDA triage, and compliance workflows",
  "author": "Anthropic",
  "skills": ["contract-review", "compliance", "risk-assessment"],
  "commands": ["review-contract", "triage-nda", "vendor-check", "brief", "respond"]
}
```

### 3.4 Connectors via MCP (.mcp.json)

```json
{
  "mcpServers": {
    "slack": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-slack"],
      "env": { "SLACK_TOKEN": "${SLACK_TOKEN}" }
    },
    "box": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-box"],
      "env": { "BOX_TOKEN": "${BOX_TOKEN}" }
    }
  }
}
```

### 3.5 Os 11 Plugins Oficiais

| Plugin | Função | Connectors |
|--------|--------|------------|
| **legal** | Revisão de contratos, NDA, compliance | Slack, Box, Egnyte, Jira, Microsoft 365 |
| **sales** | Prospecção, prep calls, pipeline | Slack, HubSpot, Close, Clay, ZoomInfo |
| **finance** | Journal entries, reconciliação, DRE | Snowflake, Databricks, BigQuery, Slack |
| **marketing** | Conteúdo, campanhas, análise competitiva | Slack, Canva, Figma, HubSpot, Ahrefs |
| **customer-support** | Triagem tickets, respostas, escalation | Slack, Intercom, HubSpot, Guru, Jira |
| **product-management** | Specs, roadmap, user research | Slack, Linear, Jira, Notion, Figma |
| **data** | SQL, análise estatística, dashboards | Snowflake, Databricks, BigQuery, Hex |
| **productivity** | Tarefas, calendário, automação | Slack, Notion, Asana, Linear, Jira, ClickUp |
| **enterprise-search** | Busca unificada cross-tools | Slack, Notion, Guru, Jira, Asana |
| **bio-research** | Literatura, genômica, targets | PubMed, BioRender, bioRxiv, Benchling |
| **cowork-plugin-management** | Criar/customizar plugins | — |

---

## 4. Plugin Legal — Detalhamento Completo

### 4.1 Comandos Disponíveis

#### `/legal:review-contract`
Revisão cláusula por cláusula contra playbook configurado.

**Output:** Sistema de semáforo:
- **VERDE** 🟢 → Padrão, sem problemas
- **AMARELO** 🟡 → Risco moderado, sugestões de ajuste
- **VERMELHO** 🔴 → Desvio de alto risco, atenção obrigatória

**Entrega:**
- Tracked changes em formato Word editável
- Sugestões de redline com justificativa
- Posições de fallback e priorização

#### `/legal:triage-nda`
Pré-triagem rápida de NDAs em 3 buckets:
1. **Aprovação padrão** → Seguro para assinar
2. **Precisa revisão de counsel** → Yellow flags
3. **Negociação completa necessária** → Red flags

**Entrega:** Pastas categorizadas + logs para handoff

#### `/legal:vendor-check`
Verifica status de acordos com fornecedores.

#### `/legal:brief`
Gera briefings contextuais:
- Atualizações diárias
- Resumos de pesquisa
- Relatórios de incidentes

#### `/legal:respond`
Gera respostas templadas para:
- Data Subject Access Requests (DSAR)
- Discovery holds
- Consultas internas frequentes

### 4.2 Análise de Cláusulas

O plugin analisa automaticamente:
- **Limitação de responsabilidade:** cap structures, mutual application, carveouts, danos consequenciais
- **Tipos de contrato:** SaaS, serviços, licenças, parcerias, procurement
- **Papel da parte:** vendor, customer, licensor, licensee
- **Avaliação holística de risco**

### 4.3 Resultados Reportados (Early Adopters 2026)

| Métrica | Resultado |
|---------|-----------|
| Redução no tempo de first-pass review | **70-90%** |
| Aplicação consistente de playbook | **Sim** |
| Capacidade de lidar com picos de volume | **M&A, vendor expansions** |
| Redirecionamento de horas faturáveis | **De "grunt work" para alto valor** |

### 4.4 Limitações Importantes

- **NÃO substitui advogado** — sempre requer verificação humana
- Pode perder **sutilezas jurisdicionais** ou jurisprudência emergente
- **Alucinações raras mas possíveis** — Claude pode inventar cláusulas
- Melhor para **padrão matching** do que análise criativa
- **Não tem conhecimento específico** de direito brasileiro por padrão

---

## 5. Integrações Google Workspace

### 5.1 Integrações Nativas do Claude

| Serviço | Tipo | Capacidades | Limitações |
|---------|------|-------------|------------|
| **Gmail** | Nativa (connector) | Buscar emails, entender contexto | Somente leitura, não envia emails |
| **Google Calendar** | Nativa (connector) | Acessar compromissos, sintetizar agenda | Somente leitura, não cria eventos |
| **Google Drive** | Nativa (connector) | Surfar documentos, resumir seções | Apenas Google Docs, não Sheets/Slides |
| **Google Docs** | Nativa (connector) | Sync automático, resumos | Apenas texto (sem imagens/comentários) |
| **Google Sheets** | Add-on | Fórmulas Claude em células | Plugin separado (não connector) |

### 5.2 MCP Servers para Google Workspace (Comunidade)

#### Google Workspace MCP Server (taylorwilsdon/google_workspace_mcp)

**O mais completo** — Production-ready com OAuth 2.1

| Serviço | Capacidades |
|---------|-------------|
| **Gmail** | Gerenciamento completo end-to-end |
| **Google Drive** | Operações de arquivo com suporte a Office |
| **Google Calendar** | Gerenciamento completo com features avançadas |
| **Google Docs** | Criação, edição, comentários — suporte profundo |
| **Google Sheets** | Operações de planilha com gestão flexível de células |
| **Google Slides** | Criação, atualização, manipulação de conteúdo |
| **Google Forms** | Criação, publicação, gestão de respostas |
| **Google Chat** | Gestão de espaços e mensagens |
| **Google Tasks** | Gestão de tarefas com hierarquia |
| **Google Contacts** | Gestão via People API com grupos |
| **Google Apps Script** | Automação customizada, execução de código |
| **Programmable Search** | Busca customizada na web |

**Instalação:**
```bash
# Claude Desktop (one-click)
# Download .dxt de github.com/taylorwilsdon/google_workspace_mcp/releases
# Duplo-clique → configura em Claude Desktop

# Via uvx
uvx workspace-mcp --tool-tier core

# Docker
docker run -e GOOGLE_OAUTH_CLIENT_ID=... workspace-mcp
```

**Configuração:**
```json
{
  "mcpServers": {
    "google-workspace": {
      "command": "uvx",
      "args": ["workspace-mcp", "--tool-tier", "complete"],
      "env": {
        "GOOGLE_OAUTH_CLIENT_ID": "your-client-id",
        "GOOGLE_OAUTH_CLIENT_SECRET": "your-secret"
      }
    }
  }
}
```

#### Google Sheets MCP (xing5/mcp-google-sheets)
- Criar e modificar planilhas
- Leitura/escrita bulk de dados
- Geração automatizada de gráficos

#### Google Docs MCP (a-bonus/google-docs-mcp)
- Acesso completo a Google Docs
- Edição direta com formatação
- Suporte a Google Sheets também

### 5.3 Uso Jurídico com Google Workspace

**Cenários práticos para escritório de advocacia:**

```
1. INTAKE DE CLIENTE
   Gmail → Claude lê email do cliente
   → Extrai dados relevantes (nome, CPF, tipo de demanda)
   → Cria planilha de acompanhamento em Sheets
   → Agenda reunião em Calendar
   → Cria pasta no Drive com documentos

2. REVISÃO DE CONTRATOS
   Drive → Claude acessa pasta de contratos
   → Analisa cláusula por cláusula
   → Gera relatório de risco em Docs
   → Envia resumo por Gmail

3. GESTÃO DE PRAZOS
   Calendar → Claude monitora prazos processuais
   → Sheets mantém planilha de controle
   → Gmail envia lembretes automáticos

4. PESQUISA JURÍDICA
   Docs → Claude compila pesquisa de jurisprudência
   → Sheets organiza precedentes por tema
   → Drive armazena documentos de referência
```

---

## 6. Integrações Meta (WhatsApp, Instagram)

### 6.1 WhatsApp via MCP

**NÃO existe integração oficial Anthropic↔Meta.** Todas as integrações são via MCP servers de terceiros.

#### WhatsApp MCP Server (lharries/whatsapp-mcp)

**Arquitetura:**
```
Claude Desktop ←→ Python MCP Server ←→ Go WhatsApp Bridge ←→ WhatsApp Web API
                                                                      ↕
                                                              SQLite (local)
```

**Ferramentas disponíveis:**

| Categoria | Tool | Descrição |
|-----------|------|-----------|
| **Dados** | `search_contacts` | Busca contatos por nome/telefone |
| **Dados** | `list_messages` | Lista mensagens com filtros |
| **Dados** | `list_chats` | Lista conversas com metadados |
| **Dados** | `get_chat` | Detalhes de conversa específica |
| **Dados** | `get_direct_chat_by_contact` | Chat direto por contato |
| **Dados** | `get_contact_chats` | Todos os chats de um contato |
| **Dados** | `get_last_interaction` | Última interação com contato |
| **Dados** | `get_message_context` | Contexto de mensagem |
| **Envio** | `send_message` | Enviar texto (individual/grupo) |
| **Envio** | `send_file` | Enviar imagem/vídeo/documento |
| **Envio** | `send_audio_message` | Enviar áudio de voz |
| **Mídia** | `download_media` | Baixar mídia recebida |

**Setup:**
```bash
# Pré-requisitos: Go, Python 3.6+, UV, FFmpeg (opcional)

# 1. Clonar repositório
git clone https://github.com/lharries/whatsapp-mcp.git

# 2. Build do Go Bridge
cd whatsapp-bridge && go build

# 3. Configurar Claude Desktop
# Em claude_desktop_config.json:
{
  "mcpServers": {
    "whatsapp": {
      "command": "uv",
      "args": ["run", "--directory", "/path/to/whatsapp-mcp/mcp-server", "main.py"],
      "env": {
        "WHATSAPP_BRIDGE_URL": "http://localhost:8765"
      }
    }
  }
}

# 4. Escanear QR code com WhatsApp
```

#### WhatsApp Business API MCP (Composio)

Para uso empresarial com WhatsApp Business API:

```bash
# Adicionar MCP server via Claude Code
composio mcp add whatsapp --api-key YOUR_KEY
```

**Capacidades Business:**
- Mensagens automatizadas para follow-up
- Gestão de templates para marketing/transacional
- Gerenciamento de perfil business
- Webhooks para mensagens recebidas

#### WhatsApp Cloud API MCP (Apify)

- Enviar e receber texto, mídia e mensagens interativas
- Gestão de webhooks
- Gestão de conversas

### 6.2 Instagram via MCP

#### Instagram MCP Server

```json
{
  "mcpServers": {
    "instagram": {
      "command": "npx",
      "args": ["-y", "instagram-mcp"],
      "env": {
        "INSTAGRAM_ACCESS_TOKEN": "your-token"
      }
    }
  }
}
```

#### Meta Ads MCP (brijr/meta-mcp)

25 ferramentas para Facebook/Instagram Ads:

| Categoria | Ferramentas |
|-----------|-------------|
| **Analytics** | `get_insights`, `compare_performance` |
| **Campaigns** | `create_campaign`, `update_campaign` |
| **Creative** | `create_ad_creative`, `get_ad_creative` |
| **Targeting** | `get_audiences`, `create_audience` |
| **Budget** | `get_budget_spend`, `update_budget` |

#### Xpoz MCP — Multi-Platform Social

```
Claude ←→ Xpoz MCP ←→ Twitter + Instagram + TikTok + Reddit
```

Permite consultas em linguagem natural sobre dados de múltiplas plataformas sociais.

### 6.3 Uso Jurídico com WhatsApp/Instagram

**Cenários práticos para escritório:**

```
1. ATENDIMENTO AO CLIENTE VIA WHATSAPP
   WhatsApp MCP → Claude lê mensagens do cliente
   → Classifica urgência (trabalhista/cível/criminal)
   → Gera resposta padrão personalizada
   → Envia resposta via send_message
   → Registra atendimento no sistema

2. COBRANÇA AUTOMATIZADA
   WhatsApp MCP → Claude identifica devedores inadimplentes
   → Gera mensagem de cobrança personalizada
   → Envia via send_message com template aprovado
   → Registra tentativa de contato
   → Agenda follow-up

3. COMUNICAÇÃO PROCESSUAL
   WhatsApp MCP → Claude notifica cliente sobre movimentação
   → Anexa documento relevante via send_file
   → Confirma leitura e entendimento

4. MARKETING JURÍDICO (Instagram)
   Meta Ads MCP → Claude analisa performance de posts
   → Sugere conteúdo baseado em tendências
   → Cria campanhas segmentadas
   → Monitora métricas de engajamento
```

---

## 7. Claude Apps (Integrações Interativas)

Lançado em **26 de janeiro de 2026**, os Claude Apps são integrações interativas embutidas diretamente no Claude.

### Apps Disponíveis (janeiro/2026)

| App | Função |
|-----|--------|
| **Slack** | Redigir, preview, revisar mensagens antes de postar |
| **Canva** | Criação de design e conteúdo visual |
| **Figma** | Flowcharts, Gantt charts, diagramas em FigJam |
| **Box** | Acesso a arquivos em cloud storage |
| **Clay** | Enriquecimento de dados e lead generation |
| **Asana** | Gestão de projetos e tarefas |
| **Amplitude** | Analytics de produto e visualização |
| **Hex** | Business intelligence e queries |
| **Monday.com** | Automação de workflows |
| **Salesforce** | Em breve — contexto empresarial via Agentforce 360 |

**Tecnologia:** MCP (Model Context Protocol) + iframe sandboxed para interface interativa.

**Disponibilidade:** Pro, Max, Team, Enterprise — sem custo adicional.

---

## 8. Segurança e Compliance Enterprise

### 8.1 Certificações

| Certificação | Status |
|-------------|--------|
| **ISO 27001:2022** | Certificado |
| **ISO/IEC 42001:2023** | Certificado (AI Management) |
| **SOC 2 Type II** | Atestado (relatório sob NDA) |
| **SOC 3** | Relatório público em trust.anthropic.com |
| **HIPAA** | Configurável com BAA |
| **GDPR** | Compliance disponível |
| **BYOK** | Previsto H1 2026 |

### 8.2 Modelo de Segurança do Cowork

1. **VM Isolation** — Execução em máquina virtual isolada
2. **Permissão explícita** — Usuário aprova cada pasta/connector
3. **Confirmação de ações destrutivas** — Delete requer aprovação
4. **Dados locais** — Processamento acontece no dispositivo
5. **Sem memória cross-session** — Claude não retém contexto entre sessões

### 8.3 Limitações de Segurança

- Vulnerável a **prompt injection** de conteúdo da internet
- Atividade do Cowork **excluída** de Audit Logs, Compliance API e Data Exports
- Agente pode executar **ações destrutivas** se instruído
- Safety de agentes é **área de desenvolvimento ativo**

---

## 9. Planejamento para o Meio Jurídico Brasileiro

### 9.1 Plugin Legal Customizado para Direito Brasileiro

O plugin legal oficial é genérico (common law). Para direito brasileiro, precisamos customizar:

#### Estrutura Proposta

```
plugin-juridico-br/
├── .claude-plugin/
│   └── plugin.json
├── .mcp.json
├── commands/
│   ├── revisar-contrato.md        # /juridico:revisar-contrato
│   ├── triagem-petição.md         # /juridico:triagem-peticao
│   ├── pesquisar-jurisprudencia.md # /juridico:pesquisar
│   ├── calcular-trabalhista.md    # /juridico:calcular
│   ├── gerar-peticao.md           # /juridico:gerar-peticao
│   ├── analisar-prazo.md          # /juridico:prazo
│   ├── cobrar-devedor.md          # /juridico:cobrar
│   └── briefing-diario.md         # /juridico:briefing
├── skills/
│   ├── direito-trabalhista.md     # CLT, reforma trabalhista, súmulas TST
│   ├── direito-civil.md           # CC, CPC, contratos
│   ├── direito-previdenciario.md  # INSS, aposentadoria
│   ├── cobranca-extrajudicial.md  # Técnicas, CDC, LGPD
│   ├── processo-judicial.md       # TJ, TRT, STJ, STF
│   ├── calculo-judicial.md        # Correção monetária, juros, SELIC
│   ├── lgpd-compliance.md         # LGPD específico
│   └── prazos-processuais.md      # Prazos do CPC, CLT, etc.
└── agents/
    ├── defensor.md                # Perspectiva de defesa
    ├── adversario.md              # Perspectiva adversarial
    └── magistrado.md              # Perspectiva judicial
```

### 9.2 Comandos Detalhados para o Escritório

#### `/juridico:revisar-contrato`
```markdown
---
name: revisar-contrato
description: Revisa contratos sob legislação brasileira
---

## Workflow
1. Identificar tipo de contrato (prestação de serviços, locação, trabalho, etc.)
2. Verificar cláusulas obrigatórias por tipo
3. Analisar contra Código Civil, CDC, CLT conforme aplicável
4. Sinalizar cláusulas abusivas (CDC art. 51)
5. Verificar LGPD compliance
6. Gerar relatório com semáforo (verde/amarelo/vermelho)
7. Sugerir redlines com fundamentação legal
```

#### `/juridico:gerar-peticao`
```markdown
---
name: gerar-peticao
description: Gera petições jurídicas com fundamentação
---

## Workflow
1. Identificar tipo de ação (trabalhista, cível, previdenciária)
2. Classificar pedidos e causas de pedir
3. Pesquisar jurisprudência aplicável (STF, STJ, TJ, TRT)
4. Redigir petição com:
   - Qualificação das partes
   - Dos Fatos
   - Do Direito (fundamentação legal + jurisprudência)
   - Dos Pedidos (específicos e valorados)
   - Do Valor da Causa
5. Gerar em formato DOCX com formatação ABNT
6. Análise 3-perspectivas (defesa/acusação/julgamento)
```

#### `/juridico:calcular`
```markdown
---
name: calcular-trabalhista
description: Cálculos trabalhistas com memória auditável
---

## Workflow
1. Coletar dados: salário, admissão, demissão, tipo
2. Calcular verbas rescisórias
3. Aplicar correção monetária (SELIC/IPCA-E/TR)
4. Calcular INSS e IRPF
5. Gerar memória de cálculo detalhada
6. Exportar para Excel/PDF com fórmulas
```

### 9.3 Integrações Necessárias

```
plugin-juridico-br/.mcp.json
{
  "mcpServers": {
    "whatsapp": {
      "description": "Comunicação com clientes e devedores",
      "command": "uv",
      "args": ["run", "whatsapp-mcp"]
    },
    "google-workspace": {
      "description": "Gmail, Drive, Sheets, Calendar, Docs",
      "command": "uvx",
      "args": ["workspace-mcp", "--tool-tier", "complete"]
    },
    "meta-ads": {
      "description": "Marketing jurídico no Instagram/Facebook",
      "command": "npx",
      "args": ["-y", "meta-ads-mcp"]
    },
    "datajud": {
      "description": "Consulta processual CNJ",
      "command": "node",
      "args": ["datajud-mcp-server.js"]
    },
    "pje": {
      "description": "Integração PJe",
      "command": "node",
      "args": ["pje-mcp-server.js"]
    }
  }
}
```

### 9.4 Workflows Integrados por Área

#### Workflow 1: Intake de Cliente (WhatsApp → Google)

```
1. Cliente envia mensagem via WhatsApp
2. WhatsApp MCP → Claude recebe e classifica
3. Claude extrai: nome, tipo de demanda, urgência
4. Google Sheets → Cria registro em planilha de clientes
5. Google Calendar → Agenda consulta inicial
6. Gmail → Envia confirmação com detalhes
7. Google Drive → Cria pasta do caso
8. WhatsApp → Confirma agendamento ao cliente
```

#### Workflow 2: Cobrança Inteligente (Sistema → WhatsApp)

```
1. Sistema identifica dívida vencida > X dias
2. Claude gera mensagem personalizada por perfil do devedor
3. WhatsApp MCP → Envia primeiro contato (amigável)
4. Se sem resposta em 48h → segundo contato (formal)
5. Se sem resposta em 7 dias → notificação extrajudicial
6. Google Sheets → Registra todas as tentativas
7. Se necessário → Gera petição de execução
```

#### Workflow 3: Gestão de Prazos (Calendar → Notificações)

```
1. Google Calendar → Claude monitora prazos processuais
2. 5 dias antes → Gmail envia alerta ao advogado responsável
3. 3 dias antes → WhatsApp envia lembrete
4. 1 dia antes → Alerta urgente em todos os canais
5. Google Sheets → Atualiza planilha de controle de prazos
6. Se prazo perdido → Gera relatório de incidente
```

#### Workflow 4: Marketing Jurídico (Instagram/Facebook)

```
1. Claude analisa tendências jurídicas da semana
2. Gera conteúdo educativo (posts, carrosséis, reels)
3. Meta Ads MCP → Publica em Instagram/Facebook
4. Monitora métricas de engajamento
5. Google Sheets → Dashboard de marketing
6. Ajusta estratégia baseado em performance
7. WhatsApp → Responde leads gerados
```

#### Workflow 5: Revisão de Contratos em Lote

```
1. Google Drive → Claude acessa pasta de contratos pendentes
2. Cowork spawna sub-agentes paralelos (1 por contrato)
3. Cada sub-agente:
   a. Analisa contrato contra playbook brasileiro
   b. Classifica cláusulas (verde/amarelo/vermelho)
   c. Gera redlines com fundamentação
4. Main agent → Consolida em relatório unificado
5. Google Docs → Cria relatório final
6. Gmail → Envia ao sócio responsável
7. Google Sheets → Atualiza tracker de contratos
```

---

## 10. Agent Teams (Multi-Agente)

### 10.1 Conceito

Lançado com Opus 4.6 (fevereiro 2026), Agent Teams permite coordenar **múltiplas instâncias do Claude Code** trabalhando como equipe.

```
Team Lead (Principal)
├── Teammate 1: Pesquisa jurisprudência
├── Teammate 2: Redige fundamentação
├── Teammate 3: Calcula valores
└── Team Lead: Sintetiza em petição final
```

### 10.2 Habilitação

```bash
# Em settings.json ou variável de ambiente
CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=true
```

### 10.3 Casos de Uso Jurídicos

| Caso | Team Lead | Teammates |
|------|-----------|-----------|
| **Petição complexa** | Redator principal | Pesquisador, Calculista, Revisor |
| **Due diligence** | Coordenador | Analista contratual, Compliance, Fiscal |
| **Análise 3-perspectivas** | Síntese | Defensor, Adversário, Magistrado |
| **Batch de contratos** | Consolidador | N analistas (1 por contrato) |

---

## 11. Roadmap e Futuro

### Confirmado

| Feature | Status | Previsão |
|---------|--------|----------|
| Windows | Em desenvolvimento | Q2 2026 |
| Cross-device sync | Planejado | 2026 |
| Plugin marketplace | Em andamento | 2026 |
| Organization-wide sharing | Planejado | 2026 |
| BYOK (Bring Your Own Key) | Planejado | H1 2026 |

### Esperado

- Mais integrações nativas (Gmail write, Calendar create)
- Plugins mais granulares por jurisdição
- Integração com DMS (Document Management Systems)
- API para automação de plugins
- Suporte a Linux

---

## 12. Comparação com Soluções Existentes

### Cowork vs. Legal Tech Tradicional

| Aspecto | Cowork + Plugin Legal | Legal Tech (ex: ContractPodAi, Kira) |
|---------|----------------------|--------------------------------------|
| **Custo** | $20-200/mês | $500-5000+/mês |
| **Setup** | Minutos (instalar plugin) | Semanas/meses |
| **Customização** | Editar markdown files | Requer vendor/consultoria |
| **Integrações** | MCP (aberto, extensível) | APIs proprietárias |
| **Jurisdição** | Genérico (customizável) | Específico por produto |
| **Qualidade** | Boa para first-pass | Superior em análise profunda |
| **Compliance** | ISO, SOC2, HIPAA | Varia por vendor |

### Cowork vs. Nossa Stack (Escritório Legal v2)

| Aspecto | Cowork | Escritório Legal v2 (OpenClaw) |
|---------|--------|-------------------------------|
| **Execução** | Desktop do advogado (macOS) | Servidor (VPS, Docker) |
| **Multi-tenant** | Não | Sim (com isolamento) |
| **WhatsApp nativo** | Via MCP terceiro | Via OpenClaw channels |
| **Customização profunda** | Plugin files | Workspaces completos |
| **API/automação** | Limitada | Total (API routes + BullMQ) |
| **Billing/subscription** | Anthropic cobra | BYOT (bring your own token) |
| **Vault/Knowledge** | Pasta local | MinIO + Neo4j + Obsidian |
| **Multi-agente** | Sub-agents do Cowork | 7+ agentes especializados |

**Conclusão:** São **complementares**. O Cowork é ideal para advogados individuais; o Escritório Legal v2 é para o **escritório como plataforma**.

---

## 13. Implementação Prática — Plano de Ação

### Fase 1: Setup Básico (1 dia)
1. Instalar Claude Desktop (macOS)
2. Ativar Cowork no plano Pro/Max
3. Instalar plugin Legal oficial
4. Configurar pasta de trabalho

### Fase 2: Google Workspace (2-3 dias)
1. Criar projeto no Google Cloud Console
2. Habilitar APIs (Gmail, Calendar, Drive, Docs, Sheets)
3. Configurar OAuth 2.0 credentials
4. Instalar Google Workspace MCP Server
5. Testar cada integração individualmente

### Fase 3: WhatsApp (1-2 dias)
1. Instalar WhatsApp MCP Server
2. Build do Go Bridge
3. Escanear QR code
4. Testar envio/recebimento
5. Configurar templates de mensagens

### Fase 4: Plugin Jurídico BR (3-5 dias)
1. Fork do plugin Legal oficial
2. Adaptar skills para direito brasileiro
3. Criar playbooks por área (trabalhista, cível, previdenciário)
4. Adicionar comandos específicos
5. Configurar connectors MCP
6. Testar workflows integrados

### Fase 5: Meta/Instagram (1-2 dias)
1. Configurar Meta Business Account
2. Instalar Meta Ads MCP
3. Configurar Instagram MCP
4. Testar publicação e analytics
5. Integrar com workflow de marketing

### Fase 6: Integração com Escritório Legal v2 (Contínuo)
1. Conectar Cowork plugins com APIs do Escritório Legal
2. Sincronizar dados entre sistemas
3. Usar Cowork como interface do advogado + Escritório Legal como backend
4. Dashboard unificado em Google Sheets para métricas

---

## 14. Recursos e Links

### Documentação Oficial
- [Introducing Cowork](https://claude.com/blog/cowork-research-preview)
- [Cowork Plugins Blog](https://claude.com/blog/cowork-plugins)
- [Getting Started with Cowork](https://support.claude.com/en/articles/13345190-getting-started-with-cowork)
- [Claude Plugins Page](https://claude.com/plugins/legal)
- [Create Plugins Docs](https://code.claude.com/docs/en/plugins)

### Repositórios GitHub
- [knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins) — 11 plugins oficiais
- [WhatsApp MCP](https://github.com/lharries/whatsapp-mcp) — WhatsApp integration
- [Google Workspace MCP](https://github.com/taylorwilsdon/google_workspace_mcp) — Full Google suite
- [Meta Ads MCP](https://github.com/brijr/meta-mcp) — Facebook/Instagram Ads
- [Meta Ads MCP (Pipeboard)](https://github.com/pipeboard-co/meta-ads-mcp) — Alternativa

### Google Workspace
- [Gmail Integration Guide](https://support.claude.com/en/articles/11088742-using-the-gmail-and-google-calendar-integrations)
- [Google Drive Integration](https://support.claude.com/en/articles/10166901-using-the-google-drive-integration)
- [Google Docs Integration](https://support.claude.com/en/articles/10389539-using-the-google-docs-integration)
- [Google Sheets Add-on](https://support.claude.com/en/articles/13162029-google-sheets-add-on)

### Análises e Reviews
- [Simon Willison - First Impressions](https://simonwillison.net/2026/Jan/12/claude-cowork/)
- [Artificial Lawyer - Anthropic Moves Into Legal Tech](https://www.artificiallawyer.com/2026/02/02/anthropic-moves-into-legal-tech/)
- [LawSites - Legal Plugin Analysis](https://www.lawnext.com/2026/02/anthropics-legal-plugin-for-claude-cowork-may-be-the-opening-salvo-in-a-competition-between-foundation-models-and-legal-tech-incumbents.html)
- [TechCrunch - Cowork Launch](https://techcrunch.com/2026/01/12/anthropics-new-cowork-tool-offers-claude-code-without-the-code/)
- [TechCrunch - Plugins Launch](https://techcrunch.com/2026/01/30/anthropic-brings-agentic-plugins-to-cowork/)
- [Architecture Deep Dive](https://claudecn.com/en/blog/claude-cowork-architecture/)

---

## 15. Lacunas de Conhecimento

1. **Direito brasileiro:** O plugin legal oficial não tem conhecimento específico de legislação brasileira — precisa customização completa
2. **Integração PJe:** Não existe MCP server para PJe/e-SAJ — precisaria ser desenvolvido
3. **DATAJUD:** Não existe MCP server para consulta processual CNJ — precisaria ser desenvolvido
4. **LGPD no Cowork:** Dados processados localmente na VM, mas compliance formal precisa ser verificada
5. **Windows:** Sem data oficial de lançamento — impacto se advogados usam Windows
6. **Limites de uso:** Cowork consome muito mais tokens que chat — pode ser limitante no plano Pro
7. **Audit Logs:** Atividade do Cowork **não aparece** em Audit Logs — gap de compliance
8. **Multi-tenant no Cowork:** Não existe — cada advogado precisa seu próprio setup

---

*Relatório compilado em 2026-02-09 | 40+ fontes consultadas | Escritório Legal v2*
