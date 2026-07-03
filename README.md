# Felix Garage — Site Institucional

Site da oficina Felix Garage: apresentação, contato e botão de WhatsApp.

## Stack

- Vite + React + TypeScript
- Tailwind CSS + shadcn/ui (Radix)
- Exportado do Lovable

## Rodar localmente

```bash
npm install
npm run dev
```

Build de produção: `npm run build` (saída em `dist/`).

## Notas

- `src/integrations/supabase/` é boilerplate do Lovable **não utilizado** — o
  projeto Supabase referenciado não existe mais. Se for reativar, mova URL e
  chave para variáveis de ambiente (`.env`) em vez de hardcode.
- Não relacionado ao [FelixOS](https://github.com/Felix1432-tech/FelixOS)
  (SaaS de gestão de oficinas) — este repo é apenas o site institucional.
