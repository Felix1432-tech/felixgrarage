# Claude Code - Ultimate Cheat Sheet (2026)

> Compiled from official docs, community guides, and 15+ sources. Updated 2026-02-10.

---

## Installation

```bash
# macOS/Linux
curl -fsSL https://claude.ai/install.sh | bash

# Homebrew
brew install --cask claude-code

# npm
npm install -g @anthropic-ai/claude-code

# Windows (PowerShell)
irm https://claude.ai/install.ps1 | iex

# Update
claude update
```

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Esc` | Stop current action |
| `Esc` + `Esc` | Open rewind menu (restore code/conversation) |
| `Shift+Tab` | Toggle auto-accept mode |
| `Shift+Tab+Tab` | Toggle **Plan Mode** (research without changes) |
| `Ctrl+R` / `Ctrl+O` | Toggle verbose mode (show full output) |
| `Ctrl+V` | Paste image into prompt |
| `Ctrl+G` | Open plan in text editor |
| `Option+T` / `Alt+T` | Toggle extended thinking |
| `Shift+Enter` / `\+Enter` | New line without sending |
| `Up Arrow` | Previous command history |
| `Cmd+Esc` / `Ctrl+Esc` | Quick launch in IDEs |
| `Cmd+Option+K` / `Alt+Ctrl+K` | Insert file references |
| `!` | Bash mode prefix |
| `@` | File/folder reference |
| `Ctrl+C` | Cancel operation |
| `Ctrl+D` | Exit Claude Code |
| `Ctrl+A` / `Ctrl+E` | Jump to start/end of line |
| `Option+F` / `Option+B` | Jump forward/back by word |
| `Ctrl+W` | Delete word |

---

## Slash Commands

### Session Management
| Command | Purpose |
|---------|---------|
| `/clear` | Reset conversation history |
| `/compact [focus]` | Condense history, optionally focus on topic |
| `/context` | Visualize context usage |
| `/cost` | Token usage stats for current session |
| `/usage` | Show plan limits and rate limits |
| `/rewind` | Restore previous checkpoint |
| `/rename` | Name current session |

### Configuration
| Command | Purpose |
|---------|---------|
| `/config` | View/modify settings |
| `/permissions` | Update access controls |
| `/hooks` | Set up automation triggers |
| `/sandbox` | Enable isolated bash |
| `/model` | Change AI model |
| `/vim` | Enter vim mode |
| `/terminal-setup` | Install keyboard shortcuts |
| `/statusline` | Customize status bar |

### Development
| Command | Purpose |
|---------|---------|
| `/init` | Initialize CLAUDE.md for project |
| `/memory` | Edit CLAUDE.md files |
| `/review` | Request code review |
| `/pr_comments` | View PR comments |
| `/add-dir` | Add working directories |
| `/chrome` | Browser integration |

### Agents & Tools
| Command | Purpose |
|---------|---------|
| `/agents` | Manage custom subagents |
| `/mcp` | Manage MCP servers |
| `/plugin` | Plugin management |
| `/stats` | Activity graph |

### System
| Command | Purpose |
|---------|---------|
| `/help` | Display all commands |
| `/doctor` | Check installation health |
| `/login` / `/logout` | Account management |
| `/bug` | Report bugs |
| `/status` | Account/system status |
| `/install-github-app` | GitHub Actions integration |

---

## CLI Flags (Complete Reference)

### Core Flags
```bash
claude                          # Start interactive REPL
claude "query"                  # Start with initial prompt
claude -p "query"               # Print mode (query then exit)
claude -c                       # Continue most recent conversation
claude -r "session-id" "query"  # Resume specific session
claude --model sonnet           # Use specific model (sonnet/opus/haiku)
claude --verbose                # Enable verbose logging
claude -v                       # Show version
```

### Session & Context
```bash
--continue, -c                  # Load most recent conversation
--resume, -r                    # Resume by ID/name or show picker
--fork-session                  # Fork when resuming (new ID)
--from-pr 123                   # Resume sessions linked to a PR
--session-id "uuid"             # Use specific session ID
--no-session-persistence        # Don't save to disk (print mode)
```

### Model & Prompt
```bash
--model claude-sonnet-4-5-20250929  # Full model name
--model sonnet                      # Model alias
--fallback-model sonnet             # Auto-fallback on overload (print mode)
--system-prompt "text"              # Replace entire system prompt
--system-prompt-file ./file.txt     # Replace from file (print mode)
--append-system-prompt "text"       # Append to default prompt
--append-system-prompt-file f.txt   # Append from file (print mode)
```

### Tools & Permissions
```bash
--allowedTools "Bash(git *)" "Read"    # Pre-approve tools
--disallowedTools "Bash(rm *)"         # Block tools entirely
--tools "Bash,Edit,Read"               # Restrict available tools
--tools ""                             # Disable all tools
--tools "default"                      # All tools (default)
--dangerously-skip-permissions         # Skip ALL prompts (use in sandbox!)
--allow-dangerously-skip-permissions   # Enable as composable option
--permission-mode plan                 # Start in plan mode
--permission-prompt-tool mcp_tool      # External permission handler
```

### Output & Automation
```bash
--output-format text                   # Plain text (default)
--output-format json                   # JSON with metadata
--output-format stream-json            # Real-time streaming JSON
--input-format stream-json             # Streaming input
--include-partial-messages             # Include partial events
--json-schema '{"type":"object",...}'  # Validated JSON output
--max-turns 3                          # Limit agentic turns
--max-budget-usd 5.00                 # Cost cap
```

### Directories & Config
```bash
--add-dir ../apps ../lib               # Additional working directories
--mcp-config ./mcp.json                # Load MCP from file
--strict-mcp-config                    # Only use specified MCP
--plugin-dir ./plugins                 # Load plugins from dir
--settings ./settings.json             # Additional settings file
--setting-sources user,project         # Control settings loading
--disable-slash-commands               # No skills/commands
```

### Agents & Teams
```bash
--agent my-agent                       # Use specific agent
--agents '{"name":{...}}'             # Define subagents via JSON
--teammate-mode auto|in-process|tmux   # Agent team display mode
```

### Advanced
```bash
--chrome                               # Enable Chrome integration
--no-chrome                            # Disable Chrome
--remote "Fix the bug"                 # Create web session on claude.ai
--teleport                             # Resume web session locally
--ide                                  # Auto-connect to IDE
--init                                 # Run init hooks + interactive
--init-only                            # Run init hooks + exit
--maintenance                          # Run maintenance hooks + exit
--debug "api,hooks"                    # Debug mode with categories
--betas interleaved-thinking           # Beta features (API key users)
```

---

## Configuration Files

### Settings Hierarchy (highest to lowest priority)
1. `/etc/claude-code/managed-settings.json` (Enterprise)
2. `.claude/settings.local.json` (Project, git-ignored)
3. `.claude/settings.json` (Team/project, version-controlled)
4. `~/.claude/settings.json` (User global)

### Config CLI
```bash
claude config list                     # View all settings
claude config get <key>                # Check specific setting
claude config set <key> <value>        # Change setting
claude config add <key> <value>        # Push to array
claude config remove <key> <value>     # Remove from array
```

### Permission Rules
```json
{
  "permissions": {
    "allowedTools": [
      "Read",
      "Write(src/**)",
      "Bash(git *)",
      "Bash(npm *)",
      "Bash(npx prettier *)",
      "mcp__github__get_issue"
    ],
    "deny": [
      "Read(.env*)",
      "Write(production.config.*)",
      "Bash(rm *)",
      "Bash(sudo *)"
    ]
  }
}
```

---

## CLAUDE.md Best Practices

### File Locations
| Location | Scope | Shared? |
|----------|-------|---------|
| `~/.claude/CLAUDE.md` | All projects (global) | No |
| `./CLAUDE.md` | Project root (team) | Yes (git) |
| `./CLAUDE.local.md` | Project root (personal) | No (.gitignore) |
| `./subdir/CLAUDE.md` | Subdirectory (on-demand) | Yes |

### What to Include
- Bash commands Claude can't guess (build, test, lint)
- Code style rules that differ from defaults
- Testing instructions and preferred runners
- Repo etiquette (branch naming, PR conventions)
- Architectural decisions specific to your project
- Common gotchas or non-obvious behaviors

### What to Exclude
- Anything Claude can figure out by reading code
- Standard language conventions
- Detailed API docs (link instead)
- Information that changes frequently
- File-by-file codebase descriptions
- Self-evident practices

### Import Syntax
```markdown
See @README.md for project overview.
Git workflow: @docs/git-instructions.md
Personal overrides: @~/.claude/my-project-instructions.md
```

### Key Rules
- Keep under 150 lines (bloated = ignored)
- Run `/init` first, then refine
- Prune regularly - if removing a line won't cause mistakes, cut it
- Add emphasis for critical rules: "IMPORTANT" or "YOU MUST"
- Check into git for team benefit

---

## Hooks (Automation)

### Event Types
| Event | When | Can Block? |
|-------|------|-----------|
| `SessionStart` | Session begins/resumes | No |
| `UserPromptSubmit` | User sends prompt | Yes |
| `PreToolUse` | Before tool executes | Yes |
| `PermissionRequest` | Permission dialog appears | Yes |
| `PostToolUse` | After tool succeeds | No* |
| `PostToolUseFailure` | After tool fails | No |
| `Notification` | Claude sends notification | No |
| `SubagentStart` | Subagent spawned | No |
| `SubagentStop` | Subagent finishes | Yes |
| `Stop` | Claude finishes responding | Yes |
| `TeammateIdle` | Team member about to idle | Yes |
| `TaskCompleted` | Task marked complete | Yes |
| `PreCompact` | Before context compaction | No |
| `SessionEnd` | Session terminates | No |

*PostToolUse can provide feedback to Claude via `decision: "block"`

### Configuration Example
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/format.sh",
            "timeout": 30
          }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/block-rm.sh"
          }
        ]
      }
    ]
  }
}
```

### Exit Codes
- **0** = Success, proceed (parse JSON from stdout)
- **2** = Block the action (stderr shown as error)
- **Other** = Non-blocking error (stderr in verbose mode)

### Hook Types
- **Command** (`type: "command"`) - Shell script, receives JSON on stdin
- **Prompt** (`type: "prompt"`) - LLM evaluation, returns `{ok: true/false}`
- **Agent** (`type: "agent"`) - Subagent with tools (Read, Grep, Glob)

### Environment Variables
- `$CLAUDE_PROJECT_DIR` - Project root
- `${CLAUDE_PLUGIN_ROOT}` - Plugin root
- `$CLAUDE_ENV_FILE` - Write exports here (SessionStart only)
- `$CLAUDE_CODE_REMOTE` - "true" in remote environments

### Async Hooks
```json
{
  "type": "command",
  "command": "./run-tests.sh",
  "async": true,
  "timeout": 120
}
```

---

## MCP (Model Context Protocol)

### Management
```bash
claude mcp add <name> <command> [args...]        # Add stdio transport
claude mcp add --transport sse <name> <url>      # Add SSE server
claude mcp add --transport http <name> <url>     # Add HTTP server
claude mcp add <name> -e API_KEY=123 -- cmd      # With env vars
claude mcp list                                   # List installed
claude mcp remove <name>                          # Remove server
```

### Permission Syntax
```json
{
  "allowedTools": [
    "mcp__github",
    "mcp__github__get_issue"
  ]
}
```

### Popular MCP Servers
Airtable, Asana, Atlassian, Box, Canva, ClickUp, Cloudflare, Context7, Figma, GitHub, HubSpot, Linear, Monday, Netlify, Notion, PayPal, Playwright, Puppeteer, Sentry, Serena, Stripe, Supabase, Vercel, Zapier

---

## Custom Slash Commands

### Location
- `.claude/commands/` (project-specific, shareable)
- `~/.claude/commands/` (personal, global)

### File Format
```markdown
---
allowed-tools: Read, Edit, Bash
model: opus
argument-hint: <issue-number>
description: Fix a GitHub issue
disable-model-invocation: true
---

Fix the issue: $ARGUMENTS

1. Use `gh issue view $1` to get details
2. Search codebase for relevant files
3. Implement the fix
4. Write and run tests
5. Commit with descriptive message
```

### Placeholders
- `$ARGUMENTS` - All arguments
- `$1`, `$2`, `$3` - Positional arguments
- `` !`command` `` - Inline bash execution

---

## Skills

### Location
- `.claude/skills/` (project)
- `~/.claude/skills/` (personal/global)

### Structure
```
.claude/skills/my-skill/
├── SKILL.md          # Required: frontmatter + instructions
└── scripts/          # Optional: executable code
    └── index.mjs
```

### SKILL.md Format
```markdown
---
name: my-skill
description: What this skill does (for auto-discovery)
allowed-tools: Read, Edit, Bash
disable-model-invocation: true
---

# Instructions
Your skill instructions here...
```

### Key Differences from CLAUDE.md
- **CLAUDE.md**: Loaded every session (always-on context)
- **Skills**: Loaded on-demand when relevant (saves context)
- **Slash Commands**: User-invoked only (explicit)

---

## Subagents

### Location
- `.claude/agents/` (project)
- `~/.claude/agents/` (personal)

### Agent File Format
```markdown
---
name: security-reviewer
description: Reviews code for security vulnerabilities
tools: Read, Grep, Glob, Bash
model: opus
---
You are a senior security engineer. Review code for:
- Injection vulnerabilities (SQL, XSS, command injection)
- Authentication and authorization flaws
- Secrets or credentials in code
```

### CLI Definition
```bash
claude --agents '{
  "code-reviewer": {
    "description": "Expert code reviewer",
    "prompt": "You are a senior code reviewer...",
    "tools": ["Read", "Grep", "Glob", "Bash"],
    "model": "sonnet"
  }
}'
```

### Agent JSON Fields
| Field | Required | Description |
|-------|----------|-------------|
| `description` | Yes | When to invoke |
| `prompt` | Yes | System prompt |
| `tools` | No | Allowed tools (inherits all if omitted) |
| `disallowedTools` | No | Blocked tools |
| `model` | No | sonnet/opus/haiku/inherit |
| `skills` | No | Preloaded skills |
| `mcpServers` | No | MCP servers for this agent |
| `maxTurns` | No | Turn limit |

---

## Plugins

```bash
/plugin                                    # Open management
/plugin marketplace add <url-or-path>      # Add marketplace
/plugin install <name>@<marketplace>       # Install
/plugin enable <name>@<marketplace>        # Enable
/plugin disable <name>@<marketplace>       # Disable
/plugin uninstall <name>@<marketplace>     # Remove
```

Plugins bundle: skills, hooks, subagents, MCP servers, and custom commands.

---

## Git Worktrees (Parallel Development)

```bash
git worktree add <path> <branch>           # Existing branch
git worktree add <path> -b <branch> <start> # New branch
git worktree list                           # List all
git worktree remove <path>                  # Remove
git worktree prune                          # Clean references
git worktree move <worktree> <new-path>    # Relocate
```

---

## Headless Mode (CI/Scripting)

```bash
# Basic
claude -p "query"

# JSON output
claude -p --output-format json "query"

# Streaming
claude -p --output-format stream-json "query"

# Continue session
claude -c -p "query"

# Resume specific
claude --resume <id> -p "query"

# Piped input
cat logs.txt | claude -p "explain errors"
echo "query" | claude -p

# With limits
claude -p --max-turns 3 --max-budget-usd 5.00 "query"

# Fan-out pattern
for file in $(cat files.txt); do
  claude -p "Migrate $file from React to Vue" \
    --allowedTools "Edit,Bash(git commit *)"
done
```

---

## Models

| Alias | Model | Best For |
|-------|-------|----------|
| `sonnet` | Claude Sonnet 4.5 | Default, strong general performance |
| `haiku` | Claude Haiku 4.5 | Fast, simpler tasks |
| `opus` | Claude Opus 4.6 | SOTA, complex multi-step tasks |

```bash
claude --model sonnet                      # Alias
claude --model claude-sonnet-4-5-20250929  # Full name
/model                                     # Change mid-session
```

---

## Thinking Modes

| Trigger | Depth |
|---------|-------|
| `think` | Basic reasoning |
| `think hard` | Deeper analysis |
| `think harder` | Extended reasoning |
| `ultrathink` | Maximum reasoning depth |

Toggle: `Option+T` (macOS) / `Alt+T` (Windows/Linux)

Limit budget: `export MAX_THINKING_TOKENS=10000`

---

## File References

```
@./src/components/Button.tsx     # Single file
@./src/                          # Directory (recursive)
@./src/**/*.test.ts              # Glob patterns
> !npm test                      # Shell command execution
```

---

## Session Management

```bash
claude -c                        # Continue most recent
claude --continue                # Same as -c
claude -r "session-id"           # Resume specific session
claude --resume                  # Show session picker
claude --resume auth-refactor    # Resume by name
claude --fork-session            # Fork when resuming
claude --from-pr 123             # Resume PR-linked sessions
```

### In-Session
- `/clear` - Fresh start (do this between unrelated tasks!)
- `/compact [focus]` - Summarize history
- `/rewind` or `Esc+Esc` - Restore checkpoint
- `/rename` - Name the session
- `/cost` - Check token usage
- `/context` - See what's consuming context

---

## Best Practice Workflows

### Explore -> Plan -> Implement -> Commit
1. **Plan Mode** (`Shift+Tab+Tab`): Read files, ask questions
2. **Plan**: Create implementation plan, edit with `Ctrl+G`
3. **Normal Mode**: Implement with verification
4. **Commit**: `commit with a descriptive message and open a PR`

### Writer/Reviewer Pattern
- **Session A**: Implement feature
- **Session B**: Review Session A's code in fresh context

### Investigation with Subagents
```
Use subagents to investigate how auth handles token refresh,
and whether we have existing OAuth utilities to reuse.
```

### Verification-First Development
Always provide tests, screenshots, or expected outputs so Claude can self-check.

---

## Common Failure Patterns & Fixes

| Pattern | Fix |
|---------|-----|
| Kitchen sink session (mixing unrelated tasks) | `/clear` between tasks |
| Correcting over and over (>2 corrections) | `/clear` + better initial prompt |
| Over-specified CLAUDE.md (>150 lines) | Prune ruthlessly, convert to hooks |
| Trust-then-verify gap | Always provide verification |
| Infinite exploration | Scope narrowly or use subagents |

---

## Cost & Token Management

- `/cost` - Current session stats
- `/usage` - Plan limits
- `/statusline` - Add token counter to status bar
- `npx ccusage` - External cost tracker
- `/clear` often - Prevents wasted tokens
- `/compact` - Reclaims context space
- Subagents - Isolate exploration from main context

---

## Environment Variables

```bash
ANTHROPIC_API_KEY=sk-ant-...        # API authentication
CLAUDE_MODEL=claude-sonnet-4-5      # Default model
MAX_THINKING_TOKENS=10000           # Thinking budget
CLAUDE_CODE_REMOTE=true             # Set in remote environments
```

---

## Checkpointing & Undo

Every Claude action creates an automatic checkpoint.

- `Esc+Esc` or `/rewind` - Open rewind menu
- Options: Restore conversation only, code only, both, or summarize from point
- Checkpoints persist across sessions
- **Limitation**: Only tracks Claude's changes, not external edits

---

## Quick Reference Card

```
START SESSION       claude
WITH PROMPT         claude "explain this project"
HEADLESS            claude -p "query"
CONTINUE            claude -c
RESUME              claude -r "name"

PLAN MODE           Shift+Tab+Tab
AUTO-ACCEPT         Shift+Tab
STOP                Esc
REWIND              Esc+Esc
VERBOSE             Ctrl+O
PASTE IMAGE         Ctrl+V
THINKING TOGGLE     Option+T / Alt+T
EDIT PLAN           Ctrl+G

CLEAR CONTEXT       /clear
COMPACT             /compact
CHECK COST          /cost
CHECK USAGE         /usage
INIT PROJECT        /init
EDIT MEMORY         /memory
REVIEW CODE         /review
MANAGE HOOKS        /hooks
MANAGE MCP          /mcp
MANAGE AGENTS       /agents
MANAGE PLUGINS      /plugin
HEALTH CHECK        /doctor
```

---

## Sources

- [Official CLI Reference](https://code.claude.com/docs/en/cli-reference)
- [Official Hooks Reference](https://code.claude.com/docs/en/hooks)
- [Official Best Practices](https://code.claude.com/docs/en/best-practices)
- [AwesomeClaude Cheatsheet](https://awesomeclaude.ai/code-cheatsheet)
- [Njengah/claude-code-cheat-sheet](https://github.com/Njengah/claude-code-cheat-sheet)
- [devhints.io/claude-code](https://devhints.io/claude-code)
- [Shipyard Cheatsheet](https://shipyard.build/blog/claude-code-cheat-sheet/)
- [Neon's Cheatsheet](https://neon.com/blog/our-claude-code-cheatsheet)
- [ykdojo/claude-code-tips (45 tips)](https://github.com/ykdojo/claude-code-tips)
- [builder.io Claude Code Tips](https://www.builder.io/blog/claude-code)
- [CLAUDE.md Complete Guide](https://www.builder.io/blog/claude-md-guide)
- [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)

---

**Compiled**: 2026-02-10 | **Sources consulted**: 15+ pages of official docs and community guides
