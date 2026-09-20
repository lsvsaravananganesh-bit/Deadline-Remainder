import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/Deadline-Remainder",
  images: { unoptimized: true },
};

export default nextConfig;
