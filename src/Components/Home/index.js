import React, { useReducer, useState } from "react";
import { act } from "react-dom/test-utils";
import Category from "../Category";
import "./index.scss";

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

const reducer = (state, action) => {
  var currCategories = state;
  switch (action.type) {
    case "remove":
      console.log("remove");
      state.forEach((category) => {
        if (category.id === action.id) {
          currCategories[action.id - 1] = { ...category, selected: false };
          console.log(currCategories);
        }
      });
      return currCategories;
    case "reset":
      console.log("reset");

      state.forEach((category, index) => {
        currCategories[index] = { ...category, selected: true };
        console.log(currCategories);
      });
      return currCategories;
  }
};

const Home = () => {
  const [categories, removeCategory] = useReducer(reducer, initialCategories);
  const [difficulty, setDifficulty] = useState("none");
  const [categoryContainerClass, setCategoryContainerClass] =
    useState("category-container");
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
  const handleStartQuiz =()=>{
    
  }
  return (
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

      <div className="btn startquiz" onClick={handleStartQuiz}>Start Quiz</div>
    </div>
  );
};

export default Home;
