import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import styles from "../../components/Popular/Popular.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorite } from "../../Features/Features";
import Loader from "../../components/Loader/Loader";

const Searched = () => {
  const [searchRecipe, setSearchRecipe] = useState([]);
  const searchItems = useSelector((state) => state.favorite.favoriteItems);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const params = useParams();
  // console.log(params.search);

  const getSearch = async (name) => {
    setLoading(true);
    try {
      const data = await fetch(
        ` https://api.spoonacular.com/recipes/complexSearch?apiKey=${
          import.meta.env.VITE_SOME_KEY
        }&query=${name}`
      );
      if (!data.ok) {
        throw Error("Something went wrong. Try again..");
      }
      const result = await data.json();
      // console.log(result.results);

      if (result.results.length === 0) {
        throw Error("No recipe found.");
      }

      setSearchRecipe(result.results);
      setLoading(false);
      setError(null);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getSearch(params.search);
  }, [params.search]);

  const dispatch = useDispatch();

  const addToFavoriteBtnHandler = (recipe) => {
    dispatch(addToFavorite(recipe));
  };

  return (
    <>
      {loading && <Loader />}
      {error && <h2 className={styles.error}>{error}</h2>}
      {!loading & !error ? (
        <div className={styles.cardContainer}>
          {searchRecipe.map((recipe) => {
            return (
              <div key={recipe.id} className={styles.card}>
                <NavLink to={"/recipe/" + recipe.id} className={styles.navlink}>
                  <div>
                    <img
                      src={recipe.image}
                      alt={recipe.title.slice(0, 11)}
                      className={styles.image}
                    />
                  </div>
                  <h4 className={styles.title}>
                    {recipe.title.slice(0, 15)}...
                  </h4>
                </NavLink>
                <button
                  disabled={searchItems.find((item) => item.id === recipe.id)}
                  className={styles.btn}
                  onClick={() => {
                    addToFavoriteBtnHandler(recipe);
                  }}
                >
                  Add To Favorite
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Searched;
