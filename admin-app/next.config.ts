import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ahmedengineeringcompany.vercel.app",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
