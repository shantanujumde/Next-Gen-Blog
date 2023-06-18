import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "@components/utils/api";
import "@components/styles/globals.css";
import Head from "next/head";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Next Gen Blog </title>
        <meta name="description" content="this is a blog site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto flex">
        <div className="flex-grow- min-h-screen border-x">
          <Component {...pageProps} />
        </div>
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
