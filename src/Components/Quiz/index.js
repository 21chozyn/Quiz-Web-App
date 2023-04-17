import React, { useEffect, useState } from "react";
import { useQuiz } from "../QuizContextProvider";
import "./index.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MyTimer from "../Mytimer";

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

  const { quizData, setQuizData, curQuestion, setCurQuestion,  hasQuizEnded,
    setHasQuizEnded,
    setStopTheTimer,} = useQuiz();

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
      const intervalId = setTimeout(() => {
        console.log(`navigate to /quiz/${+id + 1}` )
        navigate(`/quiz/${+id + 1}`);
        setCurQuestion(id);
      }, 1200);
      setIntervalId(intervalId);
    } else {
      console.log("quiz complete");
      setHasQuizEnded(true)
    }
  };
  useEffect(() => {
    console.log(intervalID);
    clearInterval(intervalID);
    setAnswerClassName(initialClassNames);
    setCurQuestions(
      [...quizData[id].incorrectAnswers, quizData[id].correctAnswer].sort(
        () => Math.random() - 0.5
      )
    );
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
        <MyTimer time={30} expiryTimeStamp={()=>{const time = new Date; time.setSeconds(time.getSeconds()+30); return time}} ></MyTimer>
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
