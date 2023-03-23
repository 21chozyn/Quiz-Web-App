import React, { useState } from "react";
import "./index.scss";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Category = ({ name, handleClose, id }) => {
  const categoryName = name;
  const [className, setClassname] = useState("category");
  return (
    <div className={className}>
      <p>{categoryName}</p>
      <div
        className="remove-btn"
        onClick={() => {
          handleClose(id);
          setClassname("category-close");
        }}
      >
        <FontAwesomeIcon icon={faX} />
      </div>
    </div>
  );
};

export default Category;
