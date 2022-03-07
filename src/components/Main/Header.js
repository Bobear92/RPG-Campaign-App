import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";

import "./Header.css";
import { Login, Register } from ".";
import { getUser } from "../../auth";
import { getUserByUsername } from "../../api";

const Header = ({ loggedIn, setLoggedIn, GM, admin }) => {
  const [logToggle, setLogToggle] = useState(false);
  const [registerToggle, setRegisterToggle] = useState(false);
  const [characterToggle, setCharacterToggle] = useState(false);
  const [itemToggle, setItemToggle] = useState(false);
  const [narrativeToggle, setNarrativeToggle] = useState(false);
  const [worldInfoToggle, setWorldInfoToggle] = useState(false);
  const [mechanicsToggle, setMechanicsToggle] = useState(false);
  const [gmListToggle, setGmListToggle] = useState(false);
  const [contentToggle, setContentToggle] = useState(false);
  const [testingToggle, setTestingToggle] = useState(false);
  const [controlToggle, setControlToggle] = useState(false);

  const user = getUser();

  return (
    <div className="header-main-container">
      {admin && loggedIn ? (
        <>
          <div className="header-top-container">
            <NavLink className="nav-button" to="/">
              Home
            </NavLink>
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
          <div className="border"></div>
          <div className="header-main-buttons">
            <button
              className="nav-main-button"
              onClick={() => {
                setControlToggle(false);
                setTestingToggle(true);
              }}
            >
              Testing
            </button>
            <button
              className="nav-main-button"
              onClick={() => {
                setTestingToggle(false);
                setControlToggle(true);
              }}
            >
              Control Center
            </button>
          </div>
          <div className="border"></div>
          <div className="header-sub-buttons">
            {testingToggle ? (
              <div className="header-sub-button-links">
                <NavLink className="nav-button" to="/api-test">
                  Api Testing
                </NavLink>
              </div>
            ) : controlToggle ? (
              <div className="header-sub-button-links">
                <NavLink className="nav-button" to="/user-control-center">
                  Users Control Center
                </NavLink>
              </div>
            ) : null}
          </div>
        </>
      ) : GM && loggedIn ? (
        <>
          <div className="header-top-container">
            <NavLink className="nav-button" to="/">
              Home
            </NavLink>
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
          <div className="border"></div>
          <div className="header-main-buttons">
            <button
              className="nav-main-button"
              onClick={() => {
                setContentToggle(false);
                setGmListToggle(true);
              }}
            >
              Database
            </button>
            <button
              className="nav-main-button"
              onClick={() => {
                setGmListToggle(false);
                setContentToggle(true);
              }}
            >
              Create/Edit Content
            </button>
          </div>
          <div className="border"></div>
          <div className="header-sub-buttons">
            {gmListToggle ? (
              <div className="header-sub-button-links">
                <NavLink className="nav-button" to="/all-spells-list">
                  All Spells
                </NavLink>
                <NavLink className="nav-button" to="/all-monsters-list">
                  All Monsters
                </NavLink>
                <NavLink className="nav-button" to="/all-equipment-list">
                  All Equipment
                </NavLink>
              </div>
            ) : contentToggle ? (
              <div className="header-sub-button-links">
                <NavLink
                  className="nav-button"
                  to="/home-brew-rules-control-center"
                >
                  Home Brew Rules
                </NavLink>
              </div>
            ) : null}
          </div>
          <div className="border"></div>
        </>
      ) : loggedIn === true && admin === false && GM === false ? (
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

                // setPage('item') nate's idea
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

// nate's stuff

// const TAB_CONTENT = {
//   itemPage: <ItemPage />,
//   character: <CharacterPage />
// }

// switch(page) {
//   case 'character':
//     return (

//     )
//       case 'ite,s'

// }

// {TAB_CONENT[page]}
