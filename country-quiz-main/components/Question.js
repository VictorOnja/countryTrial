import React, { useContext, useState } from "react";
import { Context } from "../GlobalContext";
import adventure from "../icons/adventure.svg";
import wrongIcon from "../icons/wrong.svg";
import correctIcon from "../icons/correct.svg";
import loader from "../images/loader.gif";
const addIcon = document.createElement("img");

export default function Question() {
  const {
    fetchData,
    isDisable,
    setIsDisable,
    setCounter,
    correct,
    testAnswer,
    questionChoice,
    randomName,
    show,
    isLoading,
  } = useContext(Context);

  const letter = ["A", "B", "C", "D"];
  const [isShowButton, setIsShowButton] = useState(false);
  const [isLose, setIsLose] = useState(false);

  // Answer button
  function handleClickAnswer(e) {
    const container = document.querySelector(".container");
    const buttons = Array.from(container.querySelectorAll(".button-answer"));
    const trueAnswer = e.currentTarget.value === correct;
    addIcon.classList.add("response-icon");
    if (trueAnswer) {
      e.currentTarget.classList.add("true");
      e.currentTarget.appendChild(addIcon);
      addIcon.src = correctIcon;
      setIsDisable(true);
      setIsLose(false);
      setIsShowButton(true);
      setCounter((prevState) => prevState + 1);
    }

    if (!trueAnswer) {
      const wrongAnswer = document.createElement("img");
      e.currentTarget.classList.add("false");
      wrongAnswer.src = wrongIcon;
      e.currentTarget.appendChild(wrongAnswer);
      wrongAnswer.classList.add("response-icon");
      setIsDisable(true);
      setIsLose(true);
      setIsShowButton(true);
    }

    const correctButton = buttons.find((button) => button.value === correct);
    addIcon.src = correctIcon;
    correctButton.appendChild(addIcon);
    correctButton.classList.add("true");
  }

  // Next button
  function handleClick() {
    const container = document.querySelector(".container");
    const buttons = Array.from(container.querySelectorAll(".button-answer"));
    buttons.forEach((button) => button.classList.remove("true"));
    const text = Array.from(document.querySelectorAll(".response-icon"));
    text.forEach((name) => name.remove());
    setIsShowButton(false);
    fetchData();
    setIsDisable(false);
  }

  // Sort the random answer by the length of the letter
  const sortingAnswer = testAnswer.sort(
    (a, b) => a.answer.length - b.answer.length
  );

  return (
    <div className="container">
      <header className="header">
        <div className="header-wrapper">
          <h1 className="heading">Country quiz</h1>
          <picture>
            <img src={adventure} className="adventure" alt="adventure" />
          </picture>
        </div>
      </header>

      <article className={`card ${isLoading ? "loading" : ""}`}>
        {isLoading ? (
          <img src={loader} alt="loading" className="loader" />
        ) : (
          <>
            {questionChoice === "Which country does this flag belong to?" && (
              <img src={randomName.flags.svg} alt="flag" className="flag" />
            )}
            <h3 className="question">{questionChoice}</h3>
            <ul className="list">
              {sortingAnswer.map((test, index) => (
                <li className="list-item" key={test.id}>
                  <button
                    disabled={isDisable ? "disabled" : ""}
                    className="button-answer"
                    value={test.answer}
                    id={test.answer}
                    onClick={handleClickAnswer}
                  >
                    <span
                      className="letter"
                      value={test.answer}
                      id={test.answer}
                    >
                      {letter[index]}
                    </span>
                    {test.answer}
                  </button>
                </li>
              ))}
              {isLose === true && (
                <button className="next" onClick={show}>
                  Next
                </button>
              )}
              {isShowButton === true && isLose === false && (
                <button className="next" onClick={handleClick}>
                  Next
                </button>
              )}
            </ul>
          </>
        )}
      </article>
    </div>
  );
}
