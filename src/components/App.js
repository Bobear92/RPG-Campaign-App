// ___            ___
// /   \          /   \
// \_   \        /  __/
//  _\   \      /  /__
//  \___  \____/   __/
//      \_       _/
//        | @ @  \_
//        |
//      _/     /\
//     /o)  (o/\ \_
//     \_____/ /
//       \____/

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { getToken } from "../auth";
import { getAllSpells, spellDetails, getMySpells } from "../api/spells";
import { Home, Header } from "./Main";
import {
  CharacterSheet,
  ClassInfo,
  Feats,
  SpellBook,
  SpellList,
  SubClass,
} from "./CharacterSheet";
import { Equipment, Inventory, SavedItems } from "./Items";
import { Calendar } from "./Calendar";
import { Classes, GameRules, HomeBrewRules, SavedMechanics } from "./Mechanics";
import { Backstory, CharacterInfo, Notes, SavedInfo } from "./Narrative";
import { Adventures, Map, NPCs, SavedPlotInfo, Settings } from "./WorldInfo";
import { SpellInit } from "./Admin";
import { AllSpellsList } from "./GM";

const App = () => {
  // Log in stuff
  const [loggedIn, setLoggedIn] = useState(false);

  function isUserLoggedIn() {
    const token = getToken();

    if (token) {
      setLoggedIn(true);
    }
  }

  useEffect(() => {
    isUserLoggedIn();
  }, []);
  // end of log in stuff

  // all the spells from my database
  const [allMySpells, setAllMySpells] = useState([]);

  const mySpells = async () => {
    const spells = await getMySpells();
    if (spells) {
      setAllMySpells(spells);
    }
  };
  useEffect(() => {
    mySpells();
  }, []);

  // below will be empty if database is not populated
  // console.log(allMySpells, "my spells in app");

  // end of all the spells from my database

  // All of the spell stuff from the 5E api
  const [allSpells, setAllSpells] = useState([]);
  const [spellDescriptions, setSpellDescriptions] = useState([]);

  // look at the if else - if my database is already populated with spells then get spells from there else get spells from 5E api.

  const handleSpells = async () => {
    const data = await getAllSpells();
    const dataResults = data.results;
    const details = dataResults.map((spell) => {
      const spellUrl = spell.url;
      return spellUrl;
    });
    if (allMySpells.length === 0) {
      setAllSpells(details);
    } else {
      setAllSpells([]);
    }
  };
  useEffect(() => {
    handleSpells();
  }, []);

  const handleSpellDetails = async () => {
    const data = await Promise.all(
      allSpells.map(async (spellUrl) => {
        const spell = await spellDetails(spellUrl);
        return spell;
      })
    );
    if (allMySpells.length === 0) {
      setSpellDescriptions(data);
    } else {
      setSpellDescriptions([]);
    }
  };

  useEffect(() => {
    handleSpellDetails();
  }, [allSpells]);

  // console log below should be empty unless my database is not populated with spells
  // console.log(spellDescriptions, " 5E spells in app");

  // end of 5E api spell stuff

  return (
    <>
      <Router>
        <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Switch>
          {/* Top Level Routes */}

          <Route exact path="/">
            <Home />
          </Route>
          {/* // */}
          {/* Calendar routes */}
          {/* // */}
          <Route path="/calendar">
            <Calendar />
          </Route>
          {/* // */}
          {/* Character Sheet routes */}
          {/* // */}
          <Route path="/spell-list">
            <SpellList />
          </Route>
          <Route path="/spell-book">
            <SpellBook />
          </Route>
          <Route path="/feats">
            <Feats />
          </Route>
          <Route path="/sub-class">
            <SubClass />
          </Route>
          <Route path="/class">
            <ClassInfo />
          </Route>
          <Route path="/sheet">
            <CharacterSheet />
          </Route>
          {/* // */}
          {/* Items routes*/}
          {/* // */}
          <Route path="/equipment">
            <Equipment />
          </Route>
          <Route path="/inventory">
            <Inventory />
          </Route>
          <Route path="/saved-items">
            <SavedItems />
          </Route>
          {/* // */}
          {/* Mechanics Routes */}
          {/* // */}
          <Route path="/classes">
            <Classes />
          </Route>
          <Route path="/game-rules">
            <GameRules />
          </Route>
          <Route path="/home-brew-rules">
            <HomeBrewRules />
          </Route>
          <Route path="/saved-mechanics">
            <SavedMechanics />
          </Route>
          {/* // */}
          {/* Narrative Routes */}
          {/* // */}
          <Route path="/backstory">
            <Backstory />
          </Route>
          <Route path="/character-info">
            <CharacterInfo />
          </Route>
          <Route path="/notes">
            <Notes />
          </Route>
          <Route path="/saved-info">
            <SavedInfo />
          </Route>
          {/* // */}
          {/* World Info Routes */}
          {/* // */}
          <Route path="/adventures">
            <Adventures />
          </Route>
          <Route path="/map">
            <Map />
          </Route>
          <Route path="/npcs">
            <NPCs />
          </Route>
          <Route path="/saved-plot-info">
            <SavedPlotInfo />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          {/* // */}
          {/* Admin Routes */}
          {/* // */}
          <Route path="/spell-init">
            <SpellInit spellDescriptions={spellDescriptions} />
          </Route>
          {/* // */}
          {/* GM Routes */}
          <Route path="/all-spells-list">
            <AllSpellsList allMySpells={allMySpells} />
          </Route>
          {/* // */}
        </Switch>
      </Router>
    </>
  );
};

export default App;
