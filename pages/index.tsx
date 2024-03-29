import type { NextPage } from "next";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import BottomBar from "../components/BottomBar";
import { Calculate } from "../components/Calculate";
import {
  resetScore,
} from "../models/ScoreSlice";
import { IRootState } from "../models/store";

const Home: NextPage = () => {
  const score = useSelector(
    (state: IRootState) => state.score
  );
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(
      resetScore()
    );
  };

  return (
    <div style={{ width: "100%" }}>
      <Head>
        <title>7 Wonders Calculator</title>
        <meta
          name="description"
          content="Point calculator for the board game 7 Wonders"
        />
      </Head>
      <Calculate score={score} />

      <BottomBar score={score} handleReset={handleReset} />
    </div>
  );
};

export default Home;
