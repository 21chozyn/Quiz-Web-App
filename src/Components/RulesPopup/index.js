import React from "react";
import { NavLink } from "react-router-dom";
import "./index.scss";

const rules = [
  "You get 25 seconds to answer each question, Watch the timer at the top;",
  "10 points for the correct answer.",
  "Up to 10 additional points as a Speed bonus if you answer quickly.",
  "There is no negative marking for wrong answers.",
  "And lastly, ALL THE BEST ! ! !",
];
const RulesPopup = () => {
  const spanRules = rules.map((rule, index) => <li key={index}>{rule}</li>);
  return (
    <div className="popup rules">
      <ul>{spanRules}</ul>
      <NavLink
          exact="true"
          activeclassname="active"
          to="/quiz/0"
          className="team-link"
          
        >
          Got It
        </NavLink>
    </div>
  );
};

export default RulesPopup;
