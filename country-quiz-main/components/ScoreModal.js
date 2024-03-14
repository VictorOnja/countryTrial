import React, { useContext } from "react";
import { Context } from "../GlobalContext";
import scoreImage from "../icons/win.svg";

export default function ScoreModal() {
  const {
    fetchData,
    setIsDisable,
    setIsShowModal,
    setCounter,
    counter,
    setIsRetryGame,
  } = useContext(Context);

  // For retry button, everything will be reseted.
  function retryAgain() {
    fetchData();
    setIsRetryGame(false);
    setIsShowModal(false);
    setIsDisable(false);
    setCounter(0);
  }

  // Set condition on the letter answer in order to get the right grammar
  let scoreLetter = "";

  if (counter === 0 || counter === 1) {
    scoreLetter = "answer";
  } else {
    scoreLetter = "answers";
  }

  return (
    <>
      <header className="header">
        <div className="header-wrapper">
          <h1 className="heading">Country quiz</h1>
        </div>
      </header>
      <div className="card score-card">
        <img src={scoreImage} alt="score" />
        <h1 className="heading-result">Results</h1>
        <p className="score-text">
          You got <span className="score">{counter}</span> correct {scoreLetter}
        </p>
        <button className="retry-button" onClick={retryAgain}>
          Try again
        </button>
      </div>
    </>
  );
}
