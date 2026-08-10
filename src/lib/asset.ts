/* Prefix a /public path with the deployment's base path.

   Next rewrites its own bundle URLs with basePath automatically, but
   `next/image` with `unoptimized: true` emits `src` verbatim — and static
   export forces unoptimized. On a GitHub Pages project site served from
   /<repo>/, an un-prefixed "/logos/x.webp" resolves against the domain root
   and 404s. Every reference to a file in /public goes through here.

   NEXT_PUBLIC_BASE_PATH is inlined at build time, so this works identically in
   server and client components, and is "" for local dev and custom domains. */
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`
