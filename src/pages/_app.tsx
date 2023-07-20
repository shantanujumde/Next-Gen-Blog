import SideNav from "@components/components/SideNav";
import "@components/styles/globals.css";
import { api } from "@components/utils/api";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
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

      <div className="container">
        <SideNav />
        <div className="">
          <Component {...pageProps} />
        </div>
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
