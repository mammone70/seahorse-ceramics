import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
        {
            protocol: 'https',
            hostname: 'hzssnblrfsfmhrawpbug.supabase.co',
        },
    ],
  },
};

export default nextConfig;
