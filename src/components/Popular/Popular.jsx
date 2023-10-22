import React, { useEffect, useState } from "react";
import styles from "./Popular.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorite } from "../../features";
import Loader from "../Loader/Loader";
const Popular = () => {
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const favoriteItems = useSelector((state) => state.favorite.favoriteItems);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    const checkData = localStorage.getItem("popularDishes");

    if (checkData) {
      setPopular(JSON.parse(checkData));
    } else {
      setLoading(true);
      try {
        const data = await fetch(
          `https://api.spoonacular.com/recipes/random?apiKey=${
            import.meta.env.VITE_SOME_KEY
          }&number=20`
        );
        if (!data.ok) {
          throw Error("something went wrong, try again.");
        }
        const result = await data.json();
        localStorage.setItem("popularDishes", JSON.stringify(result.recipes));
        // console.log(result.recipes);
        setPopular(result.recipes);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
  };

  const dispatch = useDispatch();

  const addToFavoriteBtnHandler = (recipe) => {
    dispatch(addToFavorite(recipe));
    // console.log(recipe);
  };

  return (
    <>
      {loading && <Loader />}
      {error && (
        <h2 className={styles.error}>Something went wrong, try again...</h2>
      )}
      {!loading & !error ? (
        <>
          <div>
            <h2 className={styles.popular}>Popular Dishes</h2>
          </div>
          <div className={styles.cardContainer}>
            {popular.map((recipe) => {
              return (
                <div key={recipe.id} className={styles.card}>
                  <NavLink
                    to={"/recipe/" + recipe.id}
                    className={styles.navlink}
                  >
                    <div>
                      <img
                        src={recipe.image}
                        alt={recipe.title.slice(0, 11)}
                        className={styles.image}
                      />
                    </div>
                    <h4 className={styles.title}>
                      {recipe.title.slice(0, 16)}...
                    </h4>
                  </NavLink>
                  <button
                    disabled={favoriteItems.find(
                      (items) => items.id === recipe.id
                    )}
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
        </>
      ) : (
        " "
      )}
    </>
  );
};

export default Popular;
