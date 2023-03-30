import React, { useEffect, useState } from "react";
import { useQuiz } from "../QuizContextProvider";
import Timer from "../Timer";
import "./index.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

const choiceletters = ["A", "B", "C", "D"];
const initialClassNames = [
  "answer-btn",
  "answer-btn",
  "answer-btn",
  "answer-btn",
];
const Quiz = () => {
  const { quizData, setQuizData } = useQuiz();

  const [quizNumber, setQuizNumber] = useState(1);
  const [answerClassName, setAnswerClassName] = useState(initialClassNames);
  const [curQuestions, setCurQuestions] = useState(
    [...quizData[0].incorrectAnswers, quizData[0].correctAnswer].sort(
      () => Math.random() - 0.5
    )
  );

  const handleAnswerClick = (index) => {
    function modifyClassNameList(value) {
      const modifiedList = [...initialClassNames];
      modifiedList[index] = value;
      return modifiedList;
    }
    curQuestions[index] === quizData[0].correctAnswer
      ? setAnswerClassName(modifyClassNameList("answer-btn selected-correct"))
      : setAnswerClassName(modifyClassNameList("answer-btn selected-wrong"));
  };

  return (
    <div className="quiz-container">
      <div className="top-section">
        <p>
          Category: {quizData[0].category} <br /> <br /> Tags:{" "}
          {quizData[0].tags.join(" ,")}
        </p>
        <Timer></Timer>
      </div>
      <div className="quiz-section">
        <h3>
          {quizNumber}.{quizData[0].question}
        </h3>
        {curQuestions.map((question, index) => (
          <div
            className={answerClassName[index]}
            key={index}
            onClick={() => handleAnswerClick(index)}
          >
            <div className="letter-container">{choiceletters[index]}</div>
            {question}
            <FontAwesomeIcon icon={answerClassName[index]==="answer-btn selected-correct"? faCheck : faXmark} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
