import React, { useState } from "react";
import styles from "./Search.module.css";
import { useNavigate } from "react-router-dom";
const Search = () => {
  const [input, setInput] = useState("");

  const navigate = useNavigate();
  const searchHandler = () => {
    if (input.length) {
      navigate("/searched/" + input);
    }
  };

  return (
    <>
      <div className={styles.form}>
        <input
          type="text"
          className={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="recipe, ingredients, dish"
        />
        <button className={styles.btn} onClick={searchHandler}>
          Search
        </button>
      </div>
    </>
  );
};

export default Search;
