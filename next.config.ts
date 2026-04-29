import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/((?!_next/static|_next/image|favicon\\.ico).*)",
        headers: [
          { key: "Content-Signal", value: "search=yes, ai-train=no" },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
