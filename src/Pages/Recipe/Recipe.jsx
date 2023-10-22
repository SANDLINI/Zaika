import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Recipe.module.css";
import Loader from "../../components/Loader/Loader";
const Recipe = () => {
  const [recipeDetail, setRecipeDetail] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const params = useParams();

  const getRecipeDetails = async () => {
    setLoading(true);
    try {
      const data = await fetch(
        `https://api.spoonacular.com/recipes/${
          params.name
        }/information?apiKey=${import.meta.env.VITE_SOME_KEY}`
      );

      if (!data.ok) {
        throw Error("Something went wrong. Try again.");
      }
      const result = await data.json();
      setRecipeDetail(result);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.log(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getRecipeDetails();
  }, [params.name]);

  return (
    <>
      {loading && <Loader />}
      {error && <h2 className={styles.error}>{error}</h2>}
      {!loading & !error ? (
        <div>
          <div className={styles.recipeBox}>
            <div className={styles.imageBox}>
              <img
                src={recipeDetail.image}
                alt={recipeDetail.title}
                className={styles.image}
              />
            </div>
            <div className={styles.instructions}>
              <h1 className={styles.title}>{recipeDetail.title}</h1>
              <div
                dangerouslySetInnerHTML={{
                  __html: recipeDetail.instructions,
                }}
              ></div>
            </div>
          </div>
          <h2 className={styles.summaryHeading}>Summary</h2>
          <div
            className={styles.summary}
            dangerouslySetInnerHTML={{ __html: recipeDetail.summary }}
          ></div>
        </div>
      ) : (
        " "
      )}
    </>
  );
};

export default Recipe;
