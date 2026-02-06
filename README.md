# Watch Lake Community Association

Official website for the Watch Lake Community Association — built with **Next.js**, deployed on **Cloudflare Workers / Pages**, with **SimplyBook.me** for booking.

---

## Tech Stack

| Layer | Technology |
| -------------- | ------------------------------------------ |
| Framework | [Next.js 16](https://nextjs.org/) (App Router, TypeScript, Tailwind CSS) |
| Hosting | [Cloudflare Workers](https://developers.cloudflare.com/workers/) via [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare) |
| Booking | [SimplyBook.me](https://simplybook.me/) widget + JSON-RPC API |
| Package mgr | npm |

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and fill in your SimplyBook credentials:

- `NEXT_PUBLIC_SIMPLYBOOK_COMPANY` — your SimplyBook company login / subdomain
- `SIMPLYBOOK_API_KEY` — API key (from SimplyBook admin → Settings → API)
- `SIMPLYBOOK_SECRET_KEY` — secret key

### 3. Run locally (Next.js dev server)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Preview on Cloudflare (local Workers simulation)

```bash
npm run preview
```

This builds with `@opennextjs/cloudflare` and runs your app through `wrangler` locally.

### 5. Deploy to Cloudflare Workers

```bash
npm run deploy
```

The first deploy will prompt you to log in to Cloudflare and create the Workers project.

---

## Project Structure

```
├── open-next.config.ts      # OpenNext / Cloudflare adapter config
├── wrangler.jsonc            # Cloudflare Workers configuration
├── cloudflare-env.d.ts       # Type declarations for CF bindings
├── next.config.ts            # Next.js configuration
├── .env.local.example        # Template for env vars
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout + nav
│   │   ├── page.tsx          # Home page
│   │   ├── booking/
│   │   │   └── page.tsx      # Booking page (SimplyBook widget)
│   │   └── api/
│   │       └── simplybook/
│   │           └── services/
│   │               └── route.ts  # Edge API route → SimplyBook
│   ├── components/
│   │   └── SimplyBookWidget.tsx  # Client component: loads SB widget
│   └── lib/
│       └── simplybook.ts     # Server-side SimplyBook JSON-RPC client
└── public/                   # Static assets
```

## Scripts

| Command | Description |
| --------------- | ---------------------------------------------------------- |
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build (Next.js) |
| `npm run preview` | Build + preview with Cloudflare Workers locally |
| `npm run deploy` | Build + deploy to Cloudflare Workers |
| `npm run lint` | Run ESLint |
| `npm run cf-typegen` | Regenerate `cloudflare-env.d.ts` from `wrangler.jsonc` |

## License

MIT
