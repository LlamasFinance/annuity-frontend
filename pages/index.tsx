import type { NextPage } from "next";
import { Hero } from "web3uikit";
import { LandingNav } from "../components";

const Home: NextPage = () => {
  return (
    <div>
      <h1>Landing Page</h1>
      <Hero
        backgroundURL="https://moralis.io/wp-content/uploads/2021/06/blue-blob-background-2.svg"
        title="web3uiKit, my hero!"
      />
    </div>
  );
};

export default Home;
