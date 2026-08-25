import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  transpilePackages: ["design-system-mars"],
  turbopack: {
    root: path.join(__dirname, ".."),
  },
};

export default nextConfig;
