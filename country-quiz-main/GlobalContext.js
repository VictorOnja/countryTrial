import React, { useState, useEffect, createContext } from "react";
const Context = createContext(null);

function GlobalContext(props) {
  // Create all necessaries variable
  const [isLoading, setIsLoading] = useState(false);
  const [dataCountry, setDataCountry] = useState([]);
  const [randomName, setRandomName] = useState([]);
  const question = [
    { text: "is the capital of ?" },
    { text: "Which country does this flag belong to?" },
  ];
  const [randomQuestion, setRandomQuestion] = useState([]);
  const [testAnswer, setTestAnswer] = useState([]);
  const [counter, setCounter] = useState(0);
  const [isDisable, setIsDisable] = useState(false);
  const [correct, setCorrect] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);
  const [isRetryGame, setIsRetryGame] = useState(false);

  async function fetchData() {
    setIsLoading(true);
    // Fetch the whole country
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    setDataCountry(data);

    // Get random country by index
    const randomIndex = Math.floor(Math.random() * data.length);
    setRandomName(data[randomIndex]);
    const randomIndex2 = Math.floor(Math.random() * data.length);
    const randomIndex3 = Math.floor(Math.random() * data.length);
    const randomIndex4 = Math.floor(Math.random() * data.length);

    // Stored everything in an array
    const randomQuestionIndex = Math.floor(Math.random() * question.length);
    setRandomQuestion(question[randomQuestionIndex]);
    setTestAnswer([
      {
        answer: data[randomIndex].name.common,
        id: 1,
      },
      {
        answer: data[randomIndex2].name.common,
        id: 2,
      },
      {
        answer: data[randomIndex3].name.common,
        id: 3,
      },
      {
        answer: data[randomIndex4].name.common,
        id: 4,
      },
    ]);
    setCorrect(data[randomIndex].name.common);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Show the modal if the user is lost
  function show() {
    setIsShowModal(true);
  }

  let questionChoice = "";

  if (randomQuestion.text === "is the capital of ?") {
    questionChoice = `${randomName.capital} ${randomQuestion.text}`;
  }

  if (randomQuestion.text === "Which country does this flag belong to?") {
    questionChoice = "Which country does this flag belong to?";
  }

  return (
    <Context.Provider
      value={{
        dataCountry,
        setDataCountry,
        randomName,
        setRandomName,
        question,
        randomQuestion,
        setRandomQuestion,
        testAnswer,
        setTestAnswer,
        counter,
        setCounter,
        isDisable,
        setIsDisable,
        correct,
        setCorrect,
        isShowModal,
        setIsShowModal,
        show,
        questionChoice,
        fetchData,
        isRetryGame,
        setIsRetryGame,
        isLoading,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export { GlobalContext, Context };
