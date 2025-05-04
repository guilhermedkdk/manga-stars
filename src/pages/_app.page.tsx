import "react-toastify/dist/ReactToastify.css";
import "@/styles/nprogress.css";

import type { AppProps } from "next/app";
import Router from "next/router";
import { SessionProvider } from "next-auth/react";
import { DefaultSeo } from "next-seo";
import NProgress from "nprogress";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

import { globalStyles } from "@/styles/global";

globalStyles();

// Configuração do NProgress
NProgress.configure({
  minimum: 0.3,
  easing: "ease",
  speed: 800,
  showSpinner: false,
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };

    const handleStop = () => {
      NProgress.done();
    };

    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleStop);
    Router.events.on("routeChangeError", handleStop);

    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      NProgress.start();
      try {
        const response = await originalFetch(...args);
        return response;
      } finally {
        NProgress.done();
      }
    };

    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleStop);
      Router.events.off("routeChangeError", handleStop);
      window.fetch = originalFetch;
    };
  }, []);

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
