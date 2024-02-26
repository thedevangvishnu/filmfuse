import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { FaXmark, FaBars, FaX } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Logo from "../../assets/images/logo.png";
import Search from "../../pages/search/Search";

import "./Header.styles.scss";

const Header = () => {
  const [headerBgClass, setHeaderBgClass] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showMobileMenu, setShowMobileMenu] = useState(null);
  const [showSearch, setShowSearch] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    window.addEventListener("scroll", monitorHeaderBgState);

    return () => {
      window.removeEventListener("scroll", monitorHeaderBgState);
    };
  }, [lastScrollY]);

  const monitorHeaderBgState = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !showMobileMenu) {
        setHeaderBgClass("hide");
      } else {
        setHeaderBgClass("show");
      }
    } else {
      setHeaderBgClass("top");
    }

    setLastScrollY(window.scrollY);
  };

  const openMobileMenu = () => {
    setShowMobileMenu(true);
    setShowSearch(false);
  };

  const openSearchMenu = () => {
    setShowMobileMenu(false);
    setShowSearch(true);

    const sourceRoute = location.pathname;
    navigate("/searchPage", { state: { source: sourceRoute } });
  };

  const navigateToExplore = (type) => {
    type === "movie" ? navigate("/explore/movie") : navigate("/explore/tv");
    setShowMobileMenu(false);
  };

  return (
    <header
      className={`header ${
        showMobileMenu ? "mobileViewActive" : ""
      } ${headerBgClass}`}
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
    </header>
  );
};

export default Header;
