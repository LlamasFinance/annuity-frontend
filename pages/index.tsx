import type { NextPage } from "next";
import { Hero } from "web3uikit";
import Head from "next/head";
import { Header, WhyAnnuities, HowItWork, WhyUs, Questions, Footer } from "../components/Landing";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Llama Finance</title>
        <link rel="icon" href="images/black-logo.svg" />
      </Head>

      <Header />
      <WhyAnnuities />
      <HowItWork />
      <WhyUs />
      <Questions />
      <Footer />

    </div>
  );
};

export default Home;
