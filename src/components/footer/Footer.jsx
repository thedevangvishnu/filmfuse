import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";

import ContentWrapper from "../contentWrapper/ContentWrapper";

import "./Footer.styles.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footerContainer">
        <ContentWrapper>
          <div className="footerMenuItems">
            <Link to="/" className="footerMenuItem">
              Terms of use
            </Link>
            <Link to="/" className="footerMenuItem">
              Privacy policy
            </Link>
            <Link to="/" className="footerMenuItem">
              About
            </Link>
            <Link to="/" className="footerMenuItem">
              Blog
            </Link>
          </div>

          <div className="footerContent">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
          </div>

          <div className="socialItems">
            <Link to="/" className="socialItem">
              <FaFacebookF className="icon" />
            </Link>
            <Link to="/" className="socialItem">
              <FaInstagram className="icon" />
            </Link>
            <Link to="/" className="socialItem">
              <FaYoutube className="icon" />
            </Link>
            <Link to="/" className="socialItem">
              <FaLinkedinIn className="icon" />
            </Link>
          </div>
        </ContentWrapper>
      </div>
    </footer>
  );
};

export default Footer;
