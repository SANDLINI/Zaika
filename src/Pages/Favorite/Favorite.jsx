import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../components/Popular/Popular.module.css";
import { NavLink } from "react-router-dom";
import { removeFromFavorite } from "../../Features/Features";
const Favorite = () => {
  const getFavoriteItems = useSelector((state) => state.favorite.favoriteItems);

  const dispatch = useDispatch();

  const removeItemHandler = (items) => {
    dispatch(removeFromFavorite(items));
  };

  return (
    <div className={styles.cardContainer}>
      {getFavoriteItems.length === 0 ? (
        <h1>Nothing in the favorites</h1>
      ) : (
        getFavoriteItems.map((items) => {
          return (
            <div key={items.id}>
              <div className={styles.card}>
                <NavLink to={"/recipe/" + items.id} className={styles.navlink}>
                  <div>
                    <img
                      src={items.image}
                      alt={items.title.slice(0, 11)}
                      className={styles.image}
                    />
                  </div>
                  <h4 className={styles.title}>
                    {items.title.slice(0, 21)}...
                  </h4>
                </NavLink>
                <button
                  className={styles.btn}
                  onClick={() => {
                    removeItemHandler(items);
                  }}
                >
                  Remove From Favorite
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Favorite;
