import React from "react";
import Sidenav from "react-simple-sidenav";
import Items from "./items";

const MainNav = (props) => {
  return (
    <Sidenav
      showNav={props.showNav}
      onHideNav={props.onHideNav}
      navStyle={{
        background: "#303030",
        maxWidth: "220px",
      }}
    >
      <Items onHideNav={props.onHideNav}></Items>
    </Sidenav>
  );
};

export default MainNav;
