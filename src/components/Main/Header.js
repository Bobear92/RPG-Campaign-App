import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

import "./Header.css";
import { Login, Register } from ".";
import { getUser } from "../../auth";

const Header = ({ loggedIn, setLoggedIn }) => {
  const [logToggle, setLogToggle] = useState(false);
  const [registerToggle, setRegisterToggle] = useState(false);
  const [characterToggle, setCharacterToggle] = useState(false);
  const [itemToggle, setItemToggle] = useState(false);
  const [narrativeToggle, setNarrativeToggle] = useState(false);
  const [worldInfoToggle, setWorldInfoToggle] = useState(false);
  const [mechanicsToggle, setMechanicsToggle] = useState(false);

  const user = getUser();

  return (
    <div className="header-main-container">
      {loggedIn ? (
        <>
          <div className="header-top-container">
            <NavLink
              className="nav-button"
              to="/"
              onClick={() => {
                setCharacterToggle(false);
                setItemToggle(false);
                setNarrativeToggle(false);
                setWorldInfoToggle(false);
                setMechanicsToggle(false);
              }}
            >
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
          <div className="border"></div>
          <div className="header-main-buttons">
            <button
              className="nav-main-button"
              onClick={() => {
                setCharacterToggle(true);
                setItemToggle(false);
                setNarrativeToggle(false);
                setWorldInfoToggle(false);
                setMechanicsToggle(false);
              }}
            >
              Character Sheet
            </button>
            <button
              className="nav-main-button"
              onClick={() => {
                setCharacterToggle(false);
                setItemToggle(true);
                setNarrativeToggle(false);
                setWorldInfoToggle(false);
                setMechanicsToggle(false);
              }}
            >
              Items
            </button>
            <button
              className="nav-main-button"
              onClick={() => {
                setCharacterToggle(false);
                setItemToggle(false);
                setNarrativeToggle(true);
                setWorldInfoToggle(false);
                setMechanicsToggle(false);
              }}
            >
              Narrative
            </button>
            <button
              className="nav-main-button"
              onClick={() => {
                setCharacterToggle(false);
                setItemToggle(false);
                setNarrativeToggle(false);
                setWorldInfoToggle(true);
                setMechanicsToggle(false);
              }}
            >
              World Info
            </button>
            <button
              className="nav-main-button"
              onClick={() => {
                setCharacterToggle(false);
                setItemToggle(false);
                setNarrativeToggle(false);
                setWorldInfoToggle(false);
                setMechanicsToggle(true);
              }}
            >
              Mechanics
            </button>
          </div>
          <div className="border"></div>
          <div className="header-sub-buttons">
            {characterToggle ? (
              <div className="header-sub-button-links">
                <NavLink className="nav-button" to="/sheet">
                  Character Sheet
                </NavLink>
                <NavLink className="nav-button" to="/class">
                  Class
                </NavLink>
                <NavLink className="nav-button" to="/sub-class">
                  Sub Class
                </NavLink>
                <NavLink className="nav-button" to="/feats">
                  Feats
                </NavLink>
                <NavLink className="nav-button" to="/spell-list">
                  Spell List
                </NavLink>
                <NavLink className="nav-button" to="/spell-book">
                  Spell Book
                </NavLink>
              </div>
            ) : itemToggle ? (
              <div className="header-sub-button-links">
                <NavLink className="nav-button" to="/equipment">
                  Equipment
                </NavLink>
                <NavLink className="nav-button" to="/inventory">
                  Inventory
                </NavLink>
                <NavLink className="nav-button" to="/saved-items">
                  Saved Items
                </NavLink>
              </div>
            ) : narrativeToggle ? (
              <div className="header-sub-button-links">
                <NavLink className="nav-button" to="/backstory">
                  Character Backstory
                </NavLink>
                <NavLink className="nav-button" to="/character-info">
                  Character Info
                </NavLink>
                <NavLink className="nav-button" to="/notes">
                  Notes
                </NavLink>
                <NavLink className="nav-button" to="/saved-info">
                  Saved Info
                </NavLink>
              </div>
            ) : worldInfoToggle ? (
              <div className="header-sub-button-links">
                <NavLink className="nav-button" to="/map">
                  Map
                </NavLink>
                <NavLink className="nav-button" to="/settings">
                  Settings
                </NavLink>
                <NavLink className="nav-button" to="/npcs">
                  NPCs
                </NavLink>
                <NavLink className="nav-button" to="/adventures">
                  Adventures
                </NavLink>
                <NavLink className="nav-button" to="/saved-plot-info">
                  Saved Plot Info
                </NavLink>
              </div>
            ) : mechanicsToggle ? (
              <div className="header-sub-button-links">
                <NavLink className="nav-button" to="/classes">
                  Class Info
                </NavLink>
                <NavLink className="nav-button" to="/game-rules">
                  Game Rules
                </NavLink>
                <NavLink className="nav-button" to="/home-brew-rules">
                  Home Brew Rules
                </NavLink>
                <NavLink className="nav-button" to="/saved-mechanics">
                  Saved Mechanics
                </NavLink>
              </div>
            ) : null}
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
