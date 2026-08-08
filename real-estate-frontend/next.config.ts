import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  allowedDevOrigins: ["*.trycloudflare.com", "trycloudflare.com"],

  async redirects() {
    return [
      // Property type filter redirects
      {
        source: "/projects",
        has: [{ type: "query", key: "propertyType", value: "APARTMENT" }],
        destination: "/projects/apartments-mumbai-thane",
        permanent: true,
      },
      {
        source: "/projects",
        has: [{ type: "query", key: "propertyType", value: "FLAT" }],
        destination: "/projects/apartments-mumbai-thane",
        permanent: true,
      },
      {
        source: "/projects",
        has: [{ type: "query", key: "propertyType", value: "PLOT" }],
        destination: "/projects/plots-mumbai-thane",
        permanent: true,
      },
      {
        source: "/projects",
        has: [{ type: "query", key: "propertyType", value: "COMMERCIAL" }],
        destination: "/projects/commercial-projects-mumbai-thane",
        permanent: true,
      },
      // Construction status filter redirect
      {
        source: "/projects",
        has: [{ type: "query", key: "constructionStatus", value: "NEW_LAUNCH" }],
        destination: "/projects/new-launch-projects-mumbai-thane",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        // Cache static assets (fonts, icons, images) aggressively for 1 year
        source: "/:path*(png|jpg|jpeg|webp|avif|svg|woff|woff2|ttf|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  images: {
    // Enable Next.js image optimisation only in production, disable in dev to bypass SSRF localhost blocks
    unoptimized: process.env.NODE_ENV === 'development',
    formats: ["image/avif", "image/webp"],
    // Sizes for srcset generation — matched to common breakpoints used in the app
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // ── Cloudinary CDN (primary image source) ───────────────────────────
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      // Local dev — backend running on port 5000
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "5000",
        pathname: "/**",
      },
      // Cloudflare Tunnel (dev/staging)
      {
        protocol: "https",
        hostname: "*.trycloudflare.com",
        pathname: "/**",
      },
      // Production domain — bricksage.in
      {
        protocol: "https",
        hostname: "bricksage.in",
        pathname: "/**",
      },
      // Production domain — api subdomain if used
      {
        protocol: "https",
        hostname: "api.bricksage.in",
        pathname: "/**",
      },
    ],
    // Cache Cloudinary images for 7 days on the Next.js server
    minimumCacheTTL: 60 * 60 * 24 * 7,
  },
};

export default nextConfig;
