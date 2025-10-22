import type { NextConfig } from "next";

/**
 * Next.js configuration for runtime server mode.
 * Removing `output: "export"` ensures the app runs with `next dev/start`
 * on port 3000 as required by the preview system.
 */
const nextConfig: NextConfig = {
  // Add future config options here as needed.
};

export default nextConfig;
