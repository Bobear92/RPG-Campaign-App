import React, { useState } from "react";
import "./Search.css";

const Search = () => {
  return (
    <div className="search-main-container">
      <h1>Search</h1>
      <h4>Type: Action</h4>
      <p>
        When you take the Search action, you devote your attention to finding
        something. Depending on the Nature of your Search, the GM might have you
        make a Wisdom (Perception) check or an Intelligence (Investigation)
        check.
      </p>
    </div>
  );
};

export default Search;
