import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
        {
            protocol: 'https',
            hostname: 'hzssnblrfsfmhrawpbug.supabase.co',
        },
        {
          protocol: 'http',
          hostname: '127.0.0.1',
        }
    ],
  },
};

export default nextConfig;
