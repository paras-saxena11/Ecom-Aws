import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Payment from "../assets/payment.png";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="Footer">
      <div className="social-icons">
        <Link to="https://www.instagram.com//">
          <FaInstagram />
        </Link>
        <Link to="https://twitter.com/">
          <FaTwitter />
        </Link>
        <Link to="https://www.youtube.com">
          <FaYoutube />
        </Link>
      </div>
      <div className="Links">
        <LinkContainer to="/about-us">
          <span>Home</span>
        </LinkContainer>
        <LinkContainer to="/login">
          <span>Login</span>
        </LinkContainer>
        <LinkContainer to="/term-conditions">
          <span>Fair Use Policy</span>
        </LinkContainer>
        <LinkContainer to="/Contact-form">
          <span>Contact Us</span>
        </LinkContainer>
      </div>
      <h2 className="my-4">Payment Partner</h2>
      <img
        src={Payment}
        className="img-fluid"
        style={{ width: 80, height: 70 }}
        alt="Payment"
      />
      <p className="my-4">© Copyright 2022</p>
    </div>
  );
};

export default Footer;
