import type { NextPage } from "next";
import Head from "next/head";
import { Calculate } from "../components/Calculate";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>7 Wonders Calculator</title>
        <meta
          name="description"
          content="Point calculator for the board game 7 Wonders"
        />
      </Head>
      <Calculate />
    </>
  );
};

export default Home;
