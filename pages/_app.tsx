import "../styles/globals.css";
import "../styles/components/AppNav.css";
import "../styles/components/Account.css";

import type { AppProps } from "next/app";
import { MoralisProvider } from "react-moralis";
import { moralisConfig } from "../components/config";
import { Layout } from "../components";
import { NotificationProvider } from "web3uikit";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider {...moralisConfig}>
      <NotificationProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NotificationProvider>
    </MoralisProvider>
  );
}

export default MyApp;
