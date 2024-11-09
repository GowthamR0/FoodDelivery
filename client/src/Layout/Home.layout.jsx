import React from "react";
import Navbar from "../Components/Navbar/index";
import BottomNavbar from "../Components/FoodTab/bottomNavbar";


const HomeLayout = (props) => {
  return (
    <>
      <Navbar />
      <BottomNavbar />
      {props.children}
    </>
  );
}

export default HomeLayout;
   