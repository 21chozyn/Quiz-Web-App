import React, { useEffect, useReducer, useState } from "react";
import { useQuiz } from "../QuizContextProvider";
import Category from "../Category";
import RulesPopup from "../RulesPopup";
import "./index.scss";
import Popup from "reactjs-popup";
import axios from "axios";
import { NavLink } from "react-router-dom";

// import 'reactjs-popup/dist/index.css';

const initialCategories = [
  { name: "Arts & Literature", selected: true, id: 1 },
  { name: "Film & TV", selected: true, id: 2 },
  { name: "Food & Drink", selected: true, id: 3 },
  { name: "General Knowledge", selected: true, id: 4 },
  { name: "Geography", selected: true, id: 5 },
  { name: "History", selected: true, id: 6 },
  { name: "Music", selected: true, id: 7 },
  { name: "Science", selected: true, id: 8 },
  { name: "Society & Culture", selected: true, id: 9 },
  { name: "Sport & Leisure", selected: true, id: 10 },
];

const Home = () => {
  const [categories, removeCategory] = useReducer(reducer, initialCategories);
  const [difficulty, setDifficulty] = useState("medium");
  const [openPopup, setOpenPopup] = useState(false);
  const [categoryContainerClass, setCategoryContainerClass] =
    useState("category-container");
  const { quizData, setQuizData } = useQuiz();
  const [numberOfQuestions, setNumberOfQuestion] = useState(10);
  const client = axios.create({
    baseURL: "https://the-trivia-api.com/api/questions",
  });

  function fetchQuestions() {
    const regex1 = / /g;
    const regex2 = /&/g;
    var formatedCategories = "";
    categories.forEach((category) => {
      category.selected &&
        (() => {
          formatedCategories += category.name
            .toLowerCase()
            .replace(regex1, "_")
            .replace(regex2, "and");
          formatedCategories += ",";
        })();
    });
    formatedCategories = formatedCategories.slice(0, -1);
    client
      .get(
        `?categories=${formatedCategories}&limit=${numberOfQuestions}&difficulty=${difficulty}`
      )
      .then((response) => {
        setQuizData(response.data);
      });
  }
  useEffect(() => {
    console.log(quizData);
  }, [quizData]);
  const selectDifficulty = (e) => {
    const levels = document.getElementsByClassName("difficulty");
    Array.prototype.forEach.call(levels, function (level) {
      level.style.backgroundColor = "";
    });
    if (e.target.className === "difficulty _1") {
      e.target.style.backgroundColor = "#1fe633";
      setDifficulty("easy");
    } else if (e.target.className === "difficulty _2") {
      e.target.style.backgroundColor = "#ffbf00";

      setDifficulty("medium");
    } else {
      e.target.style.backgroundColor = "red";

      setDifficulty("hard");
    }
  };
  function reducer(state, action) {
    var currCategories = state;
    switch (action.type) {
      case "remove":
        shakeCategory(1000);
        state.forEach((category) => {
          if (category.id === action.id) {
            currCategories[action.id - 1] = { ...category, selected: false };
          }
        });
        return currCategories;
      case "reset":
        shakeCategory(100);

        state.forEach((category, index) => {
          currCategories[index] = { ...category, selected: true };
        });
        return currCategories;
    }
  }

  function shakeCategory(time) {
    setTimeout(function () {
      setCategoryContainerClass("category-container-close");
    }, time);
    setTimeout(function () {
      setCategoryContainerClass("category-container");
    }, 2000);
  }
  const handleClose = (id) => {
    removeCategory({ type: "remove", id: id });
  };
  const handleReset = () => {
    removeCategory({ type: "reset", id: null });
  };
  const handleStartQuiz = () => {
    fetchQuestions();
    setOpenPopup((o) => !o);
  };
  const closeModal = () => setOpenPopup(false);
  return (
    <>
      <div className="home">
        <h1>Quiz App</h1>
        <section>
          <div className="section _1">
            <h2 className="title">Select Category</h2>
            <div className="btn reset-category-selection" onClick={handleReset}>
              Reset
            </div>
            <div className={categoryContainerClass}>
              {categories.map((category) => {
                if (category.selected === true) {
                  return (
                    <Category
                      key={category.id}
                      name={category.name}
                      handleClose={handleClose}
                      id={category.id}
                    />
                  );
                }
              })}
            </div>
          </div>
          <div className="section _2">
            <h2 className="title">Select Difficulty</h2>
            <div className="difficulty-container">
              <div className="difficulty _1" onClick={selectDifficulty}>
                Easy
              </div>
              <div className="difficulty _2" onClick={selectDifficulty}>
                Medium
              </div>
              <div className="difficulty _3" onClick={selectDifficulty}>
                Difficult
              </div>
            </div>
          </div>
        </section>
        
        <div className="btn startquiz" onClick={handleStartQuiz}>
          Start Quiz
        </div>
        <Popup open={openPopup} closeOnDocumentClick onClose={closeModal}>
          <RulesPopup />
        </Popup>
      </div>
    </>
  );
};

export default Home;
