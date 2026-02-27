# Claude Code: Subagentes em Paralelo e Background

## Resumo Executivo

O Claude Code oferece capacidades avançadas de execução paralela através da **Task tool**, permitindo orquestrar múltiplos subagentes simultaneamente. A resposta à pergunta principal é **SIM** - é possível chamar o mesmo tipo de agente múltiplas vezes em paralelo, inclusive com execução em background.

---

## 1. Arquitetura de Subagentes

### 1.1 Task Tool - O Orquestrador

A Task tool é o mecanismo central para spawning de subagentes:

```javascript
// Estrutura básica da Task tool
{
  name: "Task",
  parameters: {
    description: "Descrição curta (3-5 palavras)",
    prompt: "Instrução detalhada para o agente",
    subagent_type: "tipo-do-agente",
    run_in_background: true,  // CHAVE para execução em background
    model: "sonnet" | "opus" | "haiku"  // opcional
  }
}
```

### 1.2 Características dos Subagentes

| Característica | Valor |
|----------------|-------|
| Janela de contexto | 200k tokens (isolada) |
| Limite de paralelismo | **10 operações concorrentes** |
| Persistência | Efêmeros (terminam após tarefa) |
| Comunicação | Resultado retornado ao agente pai |
| Resumption | Suportado via `agent_id` |

---

## 2. Execução em Paralelo

### 2.1 Como Executar Múltiplos Agentes em Paralelo

Para executar agentes em paralelo, você deve fazer **múltiplas chamadas de Task tool em uma única mensagem**:

```
// Pseudocódigo - 2 agentes do mesmo tipo em paralelo
[Task call 1: subagent_type="Explore", prompt="Pesquisar API Binance"]
[Task call 2: subagent_type="Explore", prompt="Pesquisar API Bybit"]
// Ambos executam simultaneamente!
```

### 2.2 Regras para Paralelismo

1. **Máximo de 10 operações concorrentes** - Limite hard-coded
2. **Chamadas independentes** - Sem dependências entre si
3. **Mesma mensagem** - Todas as chamadas na mesma resposta do agente
4. **Mesmo tipo de agente** - Sim, pode usar o mesmo `subagent_type` múltiplas vezes

---

## 3. Execução em Background

### 3.1 Parâmetro `run_in_background`

O parâmetro `run_in_background: true` permite que um agente execute de forma assíncrona:

```javascript
// Agente em background
{
  name: "Task",
  parameters: {
    description: "Análise longa de código",
    prompt: "Faça uma análise completa do repositório",
    subagent_type: "Explore",
    run_in_background: true  // <-- Executa em background
  }
}
```

### 3.2 Comportamento do Background

| Aspecto | Comportamento |
|---------|---------------|
| Retorno imediato | Tool retorna `output_file` path |
| Verificação | Usar `Read` tool no output_file |
| Continuidade | Agente pai pode continuar trabalhando |
| Notificação | Sistema notifica quando termina |

### 3.3 Verificando Progresso

```bash
# Via Bash tool
tail -f /path/to/output_file

# Ou via Read tool para checar status
Read(file_path: output_file_path)
```

---

## 4. Combinando Paralelo + Background

### 4.1 Cenário: 2 Agentes do Mesmo Tipo, 1 em Background

**SIM, isso é possível!** Exemplo:

```
Mensagem única com 2 Task calls:

[Task 1]
  subagent_type: "Explore"
  prompt: "Pesquisa rápida sobre X"
  run_in_background: false  // Aguarda resultado

[Task 2]
  subagent_type: "Explore"
  prompt: "Pesquisa longa sobre Y"
  run_in_background: true   // Executa em background
```

**Resultado:**
- Task 1: Executa e retorna resultado
- Task 2: Inicia em background, retorna output_file path
- Ambos rodam em paralelo
- Agente pai continua com resultado de Task 1 enquanto Task 2 processa

### 4.2 Background Agents (v2.0.60+)

Desde a versão 2.0.60, Claude Code introduziu **Background Agents**:

```bash
# Iniciar agente em background via CLI
claude --background "Faça refactoring do módulo X"

# Listar agentes em background
claude background:list

# Ver status de agente específico
claude background:status <agent_id>
```

---

## 5. Tipos de Subagentes Disponíveis

### 5.1 Agentes Principais

| Tipo | Uso | Ferramentas |
|------|-----|-------------|
| `Explore` | Exploração de codebase | Glob, Grep, Read, WebSearch |
| `Bash` | Comandos shell | Bash |
| `general-purpose` | Tarefas complexas | Todas |
| `Plan` | Arquitetura | Todas (sem Edit/Write) |

### 5.2 Agentes Especializados

- `code-reviewer` - Revisão de código
- `debugger` - Debug de erros
- `frontend-developer` - Desenvolvimento frontend
- `backend-architect` - Arquitetura backend
- `database-architect` - Design de banco de dados
- E muitos outros...

---

## 6. Exemplos Práticos

### 6.1 Pesquisa Paralela em Múltiplas Fontes

```
// 3 agentes Explore em paralelo
Task 1: "Pesquisar documentação React"
Task 2: "Pesquisar documentação Vue"
Task 3: "Pesquisar documentação Angular"
// Todos executam simultaneamente, resultados combinados depois
```

### 6.2 Análise de Código com Background

```
// Foreground: análise rápida
Task 1: subagent_type="Explore", prompt="Encontre todos os TODOs"

// Background: análise profunda
Task 2: subagent_type="Explore", prompt="Análise completa de segurança",
        run_in_background=true
```

### 6.3 Build + Test em Paralelo

```
// Dois processos simultâneos
Task 1: subagent_type="Bash", prompt="npm run build"
Task 2: subagent_type="Bash", prompt="npm run lint", run_in_background=true
```

---

## 7. Limitações e Considerações

### 7.1 Limitações

| Limitação | Descrição |
|-----------|-----------|
| Máximo 10 paralelos | Hard limit do sistema |
| Contexto isolado | Subagentes não compartilham contexto |
| Sem comunicação direta | Subagentes não conversam entre si |
| Resultados não visíveis | Usuário não vê output do subagente diretamente |

### 7.2 Melhores Práticas

1. **Use background para tarefas longas** - Evita timeout
2. **Combine resultados** - Sintetize outputs dos paralelos
3. **Modelo adequado** - Use `haiku` para tarefas simples (mais rápido/barato)
4. **Prompts claros** - Subagentes têm contexto limitado
5. **Verifique dependências** - Não paralelizar tarefas dependentes

---

## 8. TaskOutput Tool

Para recuperar resultados de tarefas em background:

```javascript
{
  name: "TaskOutput",
  parameters: {
    task_id: "abc123",      // ID retornado pelo Task
    block: true,            // Aguardar conclusão (default)
    timeout: 30000          // Timeout em ms (max 600000)
  }
}
```

---

## 9. Resumindo Agentes

Agentes podem ser retomados usando o `agent_id`:

```javascript
{
  name: "Task",
  parameters: {
    resume: "a81c45d",  // ID do agente anterior
    prompt: "Continue a análise de onde parou"
  }
}
```

---

## 10. Resposta Direta à Pergunta

### "Dá para chamar 2x um mesmo agente em paralelo para que ele execute duas tarefas sendo uma delas em background?"

**SIM, absolutamente!**

1. ✅ Mesmo tipo de agente múltiplas vezes: **PERMITIDO**
2. ✅ Execução em paralelo: **PERMITIDO** (até 10)
3. ✅ Uma em foreground, outra em background: **PERMITIDO**
4. ✅ Ambas em background: **PERMITIDO**

**Exemplo concreto:**
```
// Na mesma mensagem:
Task(subagent_type="Explore", prompt="Tarefa rápida", run_in_background=false)
Task(subagent_type="Explore", prompt="Tarefa longa", run_in_background=true)

// Resultado:
// - Tarefa rápida executa e retorna resultado
// - Tarefa longa inicia em background
// - Agente pai continua trabalhando
// - Notificação quando tarefa longa termina
```

---

## Fontes

- Claude Code Official Documentation
- Anthropic Claude Code GitHub Repository
- Claude Code v2.0.60 Release Notes
- Claude Code Tool Specifications
- Community discussions and examples

---

*Documento gerado em: Janeiro 2026*
*Versão do Claude Code referenciada: 2.0.60+*
