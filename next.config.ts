import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  devIndicators: false,
  webpack: (config) => {
    config.resolve.alias["@components"] = path.join(__dirname, "components");
    config.resolve.alias["@styles"] = path.join(__dirname, "styles");
    return config;
  },
  matcher: [
    "/dashboard/:path*",
    "/staff/register/:path*",
    "/staff/invite/:path*",
  ],
};

export default nextConfig;
