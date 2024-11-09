import React from "react";
import Navbar from "../Components/Navbar/index";
import BottomNavbar from "../Components/FoodTab/bottomNavbar";


const ItemsDescriptionLayout = (props) => {
  return (
    <>
      <Navbar />
      <BottomNavbar />
      {props.children}
    </>
  );
}

export default ItemsDescriptionLayout
   