import React from "react";

import ContentWrapper from "../contentWrapper/ContentWrapper";

import Logo from "../../assets/images/logo.png";

import "./Header.styles.scss";

const Header = () => {
  return (
    <header className="header  show">
      <ContentWrapper>
        {/* logo */}
        <div className="logoContainer">
          <img src={Logo} alt="" />
        </div>
        {/* menu items */}

        <ul className="menuItems">
          <li className="menuItem">Movies</li>
          <li className="menuItem">TV Shows</li>
          <li className="menuItem">Seach</li>
        </ul>
      </ContentWrapper>
    </header>
  );
};

export default Header;
