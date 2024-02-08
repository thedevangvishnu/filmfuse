import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FaXmark, FaBars, FaX } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Logo from "../../assets/images/logo.png";

import "./Header.styles.scss";

const Header = () => {
  const [headerBg, setHeaderBg] = useState("top");
  //   showMobileMenu is the state where mobile menu is being shown
  const [showMobileMenu, setShowMobileMenu] = useState(null);
  const [showSearch, setShowSearch] = useState(null);
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const openMobileMenu = () => {
    setShowMobileMenu(true);
    setShowSearch(false);
  };

  const openSearchMenu = () => {
    setShowMobileMenu(false);
    setShowSearch(true);
  };

  const onKeyUpHandler = (event) => {
    if (event.target.value !== "" && event.key === "Enter") {
      navigate(`/search/${query}`);
      setShowSearch(false);
      setQuery("");
    }
  };

  const navigateToExplore = (type) => {
    type === "movie" ? navigate("/explore/movie") : navigate("/explore/tv");
    setShowMobileMenu(false);
  };

  return (
    <header
      className={`header ${showMobileMenu ? "mobileViewActive" : ""} top`}
    >
      <ContentWrapper>
        {/* logo */}
        <div className="logoContainer">
          <img src={Logo} alt="" onClick={() => navigate("/")} />
        </div>
        {/* menu items */}

        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigateToExplore("movie")}>
            Movies
          </li>
          <li className="menuItem" onClick={() => navigateToExplore("tv")}>
            TV Shows
          </li>
          {!showMobileMenu ? (
            <li className="menuItem">
              <FaSearch className="searchIcon" onClick={openSearchMenu} />
            </li>
          ) : null}
        </ul>

        {/* mobile view menu items */}
        <div className="mobileMenuItems">
          <FaSearch className="searchIcon icon" onClick={openSearchMenu} />
          {showMobileMenu ? (
            <FaXmark
              className="closeIcon icon"
              onClick={() => setShowMobileMenu(false)}
            />
          ) : (
            <FaBars className="menuIcon icon" onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>

      {showSearch && (
        <div className="searchContainer">
          <input
            type="text"
            placeholder="Search movies or TV shows..."
            className="searchInput"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyUp={onKeyUpHandler}
          />
          <span>
            <FaXmark
              className="closeIcon icon"
              onClick={() => setShowSearch(false)}
              title="Close searchbar"
            />
          </span>
        </div>
      )}
    </header>
  );
};

export default Header;
