# Akan Reports

Hugo site for [akanreports.com](https://akanreports.com): reporting on consequential developments in Ghana and the wider world that shapes it.

## Local development

```sh
hugo server --buildDrafts
```

Production-like build (drafts excluded):

```sh
hugo --gc --minify --environment production
```

## Deploy (Vercel)

The repo includes `vercel.json` and `build.sh`. After the GitHub repo is connected to Vercel:

1. Import the project in Vercel (framework detection can stay blank; config is in `vercel.json`).
2. Confirm **Build Command** and **Output Directory** come from `vercel.json` (`./build.sh` → `public`).
3. Optionally set `HUGO_VERSION=0.165.0` in Vercel env vars (the build script already defaults to that).
4. Add the custom domain `akanreports.com` in Vercel, then point Cloudflare DNS to Vercel (usually CNAME/ALIAS for the apex and `www` as Vercel instructs). Keep Cloudflare DNS; proxy settings can stay as Vercel recommends for the records.

Production builds do **not** include `draft: true` pages. Publish stories and trust pages by clearing drafts only when ready to go live.

## Analytics

GA4 loads only on production builds when `params.analytics.gaMeasurementId` is set in `hugo.yaml`.
