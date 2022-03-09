import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";

import "./Footer.css";

const Footer = ({ GM }) => {
  return (
    <div className="footer-main-container">
      <div className="footer-campaign-chooser-container">
        {GM ? (
          <Link to={`/create-campaign`}>Create Campaign</Link>
        ) : (
          "Select Campaign"
        )}
      </div>
    </div>
  );
};

export default Footer;
