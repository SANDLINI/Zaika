import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useSelector } from "react-redux";
const Navbar = () => {
  const activeNavlink = ({ isActive }) => {
    return {
      color: isActive ? "Blue" : "white",
    };
  };

  const favoriteItems = useSelector((state) => state.favorite.favoriteItems);

  return (
    <div className={styles.navContainer}>
      <NavLink to="/" style={activeNavlink} className={styles.navlink}>
        Home
      </NavLink>
      <NavLink to="/favorite" style={activeNavlink} className={styles.navlink}>
        Favorites
        {favoriteItems.length >= 1 ? <span> ( {favoriteItems.length} )</span> : " "}
      </NavLink>
    </div>
  );
};

export default Navbar;
