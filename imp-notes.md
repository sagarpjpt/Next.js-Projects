### dashboard/(auth) --- its not a route/resource name its just a grouping name which contain related route together for eg /login/page.jsx, /register/page.jsx

### layout and components

- src/app/layout.js apply to all pages
- loading layout -- loading.jsx is default loader provided by next.js 
- default error page error.jsx
- Root layout wraps everything (HTML, body, global stuff)

Route layout wraps only that route and its children

- same class name usable using page.module.css -- belong to each page.jsx file .container at global css and .container in /contact/page.jsx using page.module.css

- Image stores or cache img to .next/image folder

- next js dont allowed external img url by default have to config external domains

- In newer Next.js App Router:
params, searchParams, headers, cookies
are async dynamic APIs
accessing them synchronously throws on purpose
to prevent accidental blocking during streaming
So Next.js forces you to do one of:
await params
use(params)

- Client Component → imports Server Component ❌ (NOT allowed)
Client Component → imports another Client Component ✅
Client Component → imports unmarked component ✅ (becomes client)

- 1️⃣ Server Components (default)

All page.js, layout.js are Server Components

Data fetching happens on the server

Can directly use fetch, DB, secrets

const data = await fetch(url).then(res => res.json());


✔ Fast
✔ Secure
✔ SEO friendly

2️⃣ fetch() in Next.js

Next.js extends fetch

await fetch(url, { cache: "force-cache" });

Cache options
Option	Meaning
force-cache	Static (default)
no-store	Dynamic (no cache)
revalidate: 10	ISR (revalidate every 10s)
fetch(url, { next: { revalidate: 10 } });

3️⃣ Static Rendering (SSG)

Data fetched at build time

Page is static

fetch(url, { cache: "force-cache" });


Use when:

Data rarely changes

Blogs, docs

4️⃣ Dynamic Rendering (SSR)

Data fetched on every request

fetch(url, { cache: "no-store" });


Use when:

User-specific data

Real-time data

5️⃣ Incremental Static Regeneration (ISR)

Static page + background revalidation

fetch(url, { next: { revalidate: 60 } });


✔ Fast
✔ Fresh data

6️⃣ Parallel Fetching

Run multiple fetches together

const [posts, users] = await Promise.all([
  fetch(postsUrl),
  fetch(usersUrl),
]);

7️⃣ Streaming with Suspense
Show UI while data loads
<Suspense fallback={<Loading />}>
  <Posts />
</Suspense>
✔ Better UX

- client side data fetching with SWR