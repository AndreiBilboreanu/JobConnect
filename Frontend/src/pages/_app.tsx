import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import RootLayout from "../components/layout";
import type { AppProps } from "next/app";
import { ThemeProvider } from "src/providers/theming";
import { useRouter } from "next/router";
import getConfig from "next/config";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { publicRuntimeConfig } = getConfig();
  return (
    <NextIntlClientProvider
      locale={router.locale}
      messages={pageProps.messages}
      timeZone={publicRuntimeConfig.timeZone}
    >
      <ThemeProvider defaultTheme="light" storageKey="ui-theme">
        <Component {...pageProps} />
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
