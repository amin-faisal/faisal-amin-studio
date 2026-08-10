import type { NextConfig } from 'next'

/* GitHub Pages is a static host: no Node server, no image optimiser, and
   project sites are served from /<repo>/ rather than the domain root.

   BASE_PATH is supplied by the deploy workflow. Left empty locally so
   `npm run dev` still serves from / — and empty is also correct if this ever
   moves to a custom domain or a <user>.github.io repo. */
const basePath = process.env.BASE_PATH ?? ''

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath || undefined,
  // next/image does NOT apply basePath to `src` when unoptimized, so anything
  // out of /public has to prefix itself. See src/lib/asset.ts.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  // Pages resolves /work/ to /work/index.html; without this, /work 404s.
  trailingSlash: true,
  images: {
    // The optimiser needs a server. Static export ships the originals.
    unoptimized: true,
  },
}

export default nextConfig
