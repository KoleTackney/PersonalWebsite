import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { Analytics } from "@vercel/analytics/react";
import { SessionProvider } from "next-auth/react";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
};

export default trpc.withTRPC(MyApp);
