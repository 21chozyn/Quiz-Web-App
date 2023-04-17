import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import "./index.scss";
import { useQuiz } from "../QuizContextProvider";

function formatTimeLeft(time) {
  const minutes = Math.floor(time / 60);

  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

const Timer = ({ time = 25, timeUpCallback, id }) => {
  const [timeLeft, setTimeLeft] = useState(time);
  const [timePassed, setTimePassed] = useState(0);
  const [timerIntervalId, setTimerIntervalId] = useState(null);
  const ringRef = useRef();
  const [dashArrayValue, setDashArrayValue] = useState(283);
  const [ringColor, setRingColor] = useState("amber");
  const [labelClassname, setLabelClass] = useState("base-timer__label");

  const { hasQuizEnded } = useQuiz();

  useEffect(() => {
    if (time !== timeLeft) {
      restartTimer();
    }
  }, [id]);
  function startTimer() {
    setTimerIntervalId(
      setInterval(() => {
        // I have no idea why i have to have setTimePassed but if we remove it we get unexpected behaviour
        setTimeLeft((prev) => prev - 1);
        setTimePassed((ellapsedTime) => ellapsedTime + 1);
      }, 1000)
    );
  }
  useEffect(() => {
    startTimer();
    return restartTimer();
  }, []);

  useEffect(() => {
    setLabelClass("base-timer__label bounceAnimation");
    setTimeout(() => {
      setLabelClass("base-timer__label");
    }, 1200);
  }, [ringColor]);

  useEffect(() => {
    const dashArrayVal = (timeLeft / time) * 283;
    if (timeLeft > 0) {
      setDashArrayValue(dashArrayVal);
    } else if (timeLeft === 0) {
      setDashArrayValue(dashArrayVal);
      restartTimer();
    } else {
      restartTimer();
    }
    if (dashArrayVal > 140) {
      setRingColor("green");
    } else if (dashArrayVal > 70) {
      setRingColor("orange");
    } else {
      setRingColor("red");
    }
  }, [timeLeft, time]);

  function restartTimer() {
    if (timerIntervalId != null) {
      if (hasQuizEnded) {
        setLabelClass("base-timer__label bounceAnimation");
        clearInterval(timerIntervalId);
        timeUpCallback();
      } else {
        setLabelClass("base-timer__label bounceAnimation");
        clearInterval(timerIntervalId);
        setTimeLeft(time);
        timeUpCallback();
        setTimeout(() => {
          startTimer();
        }, 500);
      }
    }
  }
  useEffect(()=>{
    if (hasQuizEnded) {
      console.log("useeffect ran")
      setLabelClass("base-timer__label bounceAnimation");
      clearInterval(timerIntervalId);
      timeUpCallback();
    }
  },[hasQuizEnded])

  return (
    <>
      <div className={`timer-container ${id}`}>
        <div className="base-timer">
          <svg
            className="base-timer__svg"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g className="base-timer__circle">
              <circle
                className="base-timer__path-elapsed"
                cx="50"
                cy="50"
                r="45"
              />
              <path
                ref={ringRef}
                id="base-timer-path-remaining"
                strokeDasharray="283"
                className={`base-timer__path-remaining ${ringColor}`}
                style={{
                  stroke: ringColor,
                  strokeDasharray: `${dashArrayValue} 283`,
                }}
                d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0

        "
              ></path>
            </g>
          </svg>
          <span className={labelClassname}>{formatTimeLeft(timeLeft)}</span>
        </div>
      </div>
      <div className="btn" onClick={startTimer}>
        start
      </div>
      <div className="btn" onClick={restartTimer}>
        stop
      </div>
    </>
  );
};

export default Timer;
