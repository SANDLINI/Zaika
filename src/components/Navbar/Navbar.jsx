import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useSelector } from "react-redux";

const Navbar = () => {
  const activeNavlink = ({ isActive }) => {
    return {
      color: isActive ? "Blue" : "Black",
    };
  };

  const favoriteItems = useSelector((state) => state.favorite.favoriteItems);

  return (
    <div className={styles.navContainer}>
      <NavLink to="/" style={activeNavlink} className={styles.navlink}>
        Home
      </NavLink>
      <NavLink to="/favorite" style={activeNavlink} className={styles.navlink}>
        Favorite {favoriteItems.length >= 1 ? favoriteItems.length : " "}
      </NavLink>
    </div>
  );
};

export default Navbar;
