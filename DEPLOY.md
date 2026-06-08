# Deploy — Online Mağaza (butik-ev-yemekleri-nextjs)

This is the **customer-facing** Vercel project. Deploy it **after** the panel,
so you have the panel's URL for `NEXT_PUBLIC_PANEL_URL`.

## 1. Put the code on GitHub
```bash
git init
git add .
git commit -m "Online magaza"
git remote add origin https://github.com/<you>/butik-ev-magaza.git
git branch -M main
git push -u origin main
```
(Or Vercel CLI: `npm i -g vercel`, then `vercel` from this folder.)

## 2. Import to Vercel
- vercel.com → **Add New… → Project** → import the repo → framework **Next.js**.
- Add the env vars below for **Production**.

## 3. Environment variables
| Name | Value | Notes |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | (same as `.env.local`) | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (same) | public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | (same) | **secret** — server only |
| `NEXT_PUBLIC_PANEL_URL` | the panel's deployed URL | e.g. `https://butik-ev-panel.vercel.app` (used by the retired `/admin` notice) |
| `IYZICO_API_KEY` | your iyzico key | **standard merchant** sandbox or production |
| `IYZICO_SECRET_KEY` | your iyzico secret | secret |
| `IYZICO_URI` | `https://sandbox-api.iyzipay.com` | switch to `https://api.iyzipay.com` for live |

`ADMIN_PASSWORD` / `ADMIN_SECRET` from the old admin are no longer needed (admin retired) — you can omit them.

## 4. iyzico
- The payment **callback URL is derived automatically** from the deployed origin
  (`https://<store>/api/payment/iyzico/callback`) — no env needed, but make sure
  the same domain is whitelisted in your iyzico merchant panel if it requires it.
- Going live = real merchant keys + `IYZICO_URI=https://api.iyzipay.com`.

## 5. Custom domain (optional)
Project → Settings → Domains → e.g. `hazalchef.com` / `www.hazalchef.com`.

## Notes
- Shares the **same Supabase project** as the panel.
- `serverExternalPackages: ['iyzipay']` is already set in `next.config.ts` (required for the SDK).
- Customer orders placed here appear in the panel within ~2-3s automatically.
