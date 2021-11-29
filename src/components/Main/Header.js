import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

import "./Header.css";
import { Login, Register } from ".";
import { getUser } from "../../auth";

const Header = ({ loggedIn, setLoggedIn }) => {
  const [logToggle, setLogToggle] = useState(false);
  const [registerToggle, setRegisterToggle] = useState(false);

  const user = getUser();

  return (
    <div className="header-main-container">
      {loggedIn ? (
        <>
          <div className="header-top-container">
            <NavLink className="nav-button" to="/">
              Home
            </NavLink>
            <div className="log-reg-container">
              <NavLink
                className="nav-button"
                to="/my-info"
              >{`${user}`}</NavLink>
              <NavLink
                className="nav-button"
                to="/"
                onClick={() => {
                  localStorage.clear();
                  setLoggedIn(false);
                }}
              >
                Log Out
              </NavLink>
            </div>
          </div>

          <div className="drop-down-container">
            <form>
              <label className="drop-down-label">
                Character
                <select className="drop-down-options">
                  <option>Select</option>
                  <option>Character Sheet</option>
                  <option>Class</option>
                  <option>Sub-Class</option>
                  <option>Feats</option>
                  <option>SpellList</option>
                  <option>SpellBook</option>
                </select>
              </label>
            </form>
          </div>
        </>
      ) : (
        <>
          <div className="header-top-container">
            <NavLink className="nav-button" to="/">
              Home
            </NavLink>
            <div className="log-reg-container">
              <div className="login-container">
                <button
                  className="nav-button"
                  onClick={() => setLogToggle(true)}
                >
                  Login
                </button>
                {logToggle ? <Login setLoggedIn={setLoggedIn} /> : null}
              </div>
              <div
                className="register-container"
                onClick={() => setRegisterToggle(true)}
              >
                <button className="nav-button">Register</button>
                {registerToggle ? <Register setLoggedIn={setLoggedIn} /> : null}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
