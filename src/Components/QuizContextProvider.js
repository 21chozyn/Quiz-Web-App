import React, { createContext, useState, useContext } from "react";

const QuizContext = createContext();
export const useQuiz = () => useContext(QuizContext);

const quiz_data = [
  {
    category: "Film & TV",
    id: "62573fe89da29df7b05f73b5",
    correctAnswer:
      "A group of thieves feel the pressure from the police when they leave a clue at their latest heist.",
    incorrectAnswers: [
      "A general accuses soldiers of cowardice and their commanding officer must defend them.",
      "The stepdaughter of a sadistic army officer escapes into an eerie fantasy world.",
      "An ex-prize fighter struggles to stand up to his corrupt union bosses.",
    ],
    question: "What is the plot of the movie Heat?",
    tags: ["film", "film_and_tv"],
    type: "Multiple Choice",
    difficulty: "medium",
    regions: [],
    isNiche: false,
  },
  {
    category: "Geography",
    id: "623b57a1fd6c701a9211836d",
    correctAnswer: "Northern Ireland",
    incorrectAnswers: ["Greece", "New Zealand", "Vietnam"],
    question: "In which country would you find the Giant's Causeway?",
    tags: ["tourist_attractions", "natural_wonders", "geography"],
    type: "Multiple Choice",
    difficulty: "medium",
    regions: [],
    isNiche: false,
  },
  {
    category: "Arts & Literature",
    id: "622a1c397cc59eab6f950ef1",
    correctAnswer: "Charles Dickens",
    incorrectAnswers: ["Oscar Wilde", "Joseph Conrad", "Henryk Sienkiewicz"],
    question: "Which author wrote 'The Pickwick Papers'?",
    tags: ["literature", "arts_and_literature"],
    type: "Multiple Choice",
    difficulty: "hard",
    regions: [],
    isNiche: false,
  },
  {
    category: "Food & Drink",
    id: "622a1c367cc59eab6f950282",
    correctAnswer: "Greece ",
    incorrectAnswers: ["India", "Morocco", "Russia"],
    question: "Where Might You Be Offered Ouzo?",
    tags: ["drink", "general_knowledge", "food_and_drink"],
    type: "Multiple Choice",
    difficulty: "medium",
    regions: [],
    isNiche: false,
  },
  {
    category: "Arts & Literature",
    id: "622a1c397cc59eab6f950e10",
    correctAnswer: "James Fenimore Cooper",
    incorrectAnswers: [
      "Edgar Rice Burroughs",
      "Jack London",
      "Edgar Allan Poe",
    ],
    question: "Which author wrote 'Leatherstocking Tales'?",
    tags: ["arts_and_literature"],
    type: "Multiple Choice",
    difficulty: "hard",
    regions: [],
    isNiche: false,
  },
];

export default function QuizContextProvider({ children }) {
  const [quizData, setQuizData] = useState(quiz_data);
  const [curQuestion, setCurQuestion] = useState(0);
  const [hasQuizEnded, setHasQuizEnded] = useState(false);
  return (
    <QuizContext.Provider
      value={{
        quizData,
        setQuizData,
        curQuestion,
        setCurQuestion,
        hasQuizEnded,
        setHasQuizEnded,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
