import React from "react";
import { Route, Routes } from "react-router-dom";
import HomeLayout from "../Layout/Home.layout";

const HomeHoc = ({ Component, ...rest }) => {
  return (
    <Routes>
      <Route
        {...rest}
        // element={(
        //   <HomeLayout>
        //     <Component {...rest} />
        //   </HomeLayout>
        // )}
        Component={(props) => (
          <HomeLayout>
            <Component {...props} />
          </HomeLayout>
        )}
      />
    </Routes>
  );
}

export default HomeHoc;
