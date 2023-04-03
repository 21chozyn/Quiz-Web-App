import React, { useEffect, useState } from "react";
import { useQuiz } from "../QuizContextProvider";
import Timer from "../Timer";
import "./index.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const choiceletters = ["A", "B", "C", "D"];
const initialClassNames = [
  "answer-btn",
  "answer-btn",
  "answer-btn",
  "answer-btn",
];
const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { quizData, setQuizData } = useQuiz();

  const [answerClassName, setAnswerClassName] = useState(initialClassNames);
  const [intervalID, setIntervalId] = useState(null);
  const [curQuestions, setCurQuestions] = useState(
    id < quizData.length
      ? [...quizData[id].incorrectAnswers, quizData[id].correctAnswer].sort(
          () => Math.random() - 0.5
        )
      : null
  );

  const toNextQuestion = () => {
    if (id < quizData.length - 1) {
      const intervalId = setInterval(() => {
        navigate(`/quiz/${+id + 1}`);
      }, 1200);
      setIntervalId(intervalId);
    } else {
      console.log("quiz complete");
    }
  };
  useEffect(() => {
    console.log(intervalID)
    clearInterval(intervalID);
    setAnswerClassName(initialClassNames);
  }, [id]);

  const handleAnswerClick = (index) => {
    function modifyClassNameList(value) {
      const modifiedList = [...initialClassNames];
      modifiedList[index] = value;
      return modifiedList;
    }
    curQuestions[index] === quizData[id].correctAnswer
      ? setAnswerClassName(modifyClassNameList("answer-btn selected-correct"))
      : setAnswerClassName(modifyClassNameList("answer-btn selected-wrong"));
    toNextQuestion();
  };
  const timeUp = () => {
    toNextQuestion();
  };
  return (
    <div className="quiz-container">
      <div className="top-section">
        <p>
          Category: {quizData[id].category} <br /> <br /> Tags:{" "}
          {quizData[id].tags.join(" ,")}
        </p>
        <Timer
          time={15}
          timeUpCallback={timeUp}
          id={id}
        ></Timer>
      </div>
      <div className="quiz-section">
        <h3>
          {+id + 1}.{quizData[id].question}
        </h3>
        {curQuestions.map((question, index) => (
          <div
            className={answerClassName[index]}
            key={index}
            onClick={() => handleAnswerClick(index)}
          >
            <div className="letter-container">{choiceletters[index]}</div>
            {question}
            <FontAwesomeIcon
              icon={
                answerClassName[index] === "answer-btn selected-correct"
                  ? faCheck
                  : faXmark
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
