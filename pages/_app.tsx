import "../styles/globals.css";
import { NextPageContext } from "next";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { StoreProvider } from "store";

type TAppProps = { initialValue: Record<string, any> } & AppProps;

export default function App({ initialValue, Component, pageProps }: TAppProps) {
  return (
    <StoreProvider initialValue={initialValue}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  );
}

App.getInitialProps = ({ ctx }: { ctx: NextPageContext }) => {
  console.log((ctx.req as any).cookies);
  const { userId, nickname, avatar } = (ctx.req as any).cookies || {};
  return {
    initialValue: {
      user: {
        userInfo: { nickname, userId, avatar }
      }
    }
  };
};
