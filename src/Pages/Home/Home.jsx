import React from "react";
import Popular from "../../components/Popular/Popular";
import Search from "../../components/Search/Search";
import styles from './Home.module.css'
import Footer from "../../components/Footer/Footer";
const Home = () => {
  return (
    <div className= {styles.main}>
      <Search />
      <Popular />
      <Footer/>
    </div>
  );
};

export default Home;
