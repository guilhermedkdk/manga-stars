import "react-toastify/dist/ReactToastify.css";

import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { DefaultSeo } from "next-seo";
import { ToastContainer } from "react-toastify";

import { globalStyles } from "@/styles/global";

globalStyles();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <DefaultSeo
        openGraph={{
          type: "website",
          locale: "pt_BR",
          url: "",
          siteName: "Manga Stars",
        }}
      />
      <Component {...pageProps} />
      <ToastContainer theme="dark" />
    </SessionProvider>
  );
}
