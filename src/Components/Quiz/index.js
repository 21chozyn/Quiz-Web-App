import React, { useEffect } from "react";
import { useQuiz } from "../QuizContextProvider";
import Timer from "../Timer";

const Quiz = () => {
  const { quizData, setQuizData } = useQuiz();
  useEffect(() => {
    console.log(quizData);
  }, [quizData]);
  const handleClick = () => {
    setQuizData(["5"]);
  };
  return <Timer initialTime={10}/>;
};

export default Quiz;
