/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "ro"],
    defaultLocale: "ro",
  },
  publicRuntimeConfig: {
    timeZone: "Europe/Romania",
  },
};

export default nextConfig;
