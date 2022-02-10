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
import { getMySpells } from "../api/spells";
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
import { APITest } from "./Admin";
import { AllSpellsList } from "./GM";
import { IndividualSpell } from "./Utility";

import { allMonsters, eachMonster } from "../api/monsters";

const App = () => {
  // Log in stuff
  const [loggedIn, setLoggedIn] = useState(false);

  function isUserLoggedIn() {
    const token = getToken();

    if (token) {
      setLoggedIn(true);
    }
  }

  // end of log in stuff

  // all the spells from my database
  const [allMySpells, setAllMySpells] = useState([]);

  const mySpells = async () => {
    const spells = await getMySpells();
    if (spells) {
      setAllMySpells(spells);
    }
  };

  // end of my spells stuff

  //

  useEffect(() => {
    isUserLoggedIn();
    mySpells();
  }, []);

  // test area

  const [monsters, setMonsters] = useState([]);
  const [everyMonster, setEveryMonster] = useState([]);

  const monstersData = async () => {
    try {
      const monsterData = await allMonsters();
      setMonsters(monsterData);
    } catch (error) {
      throw error;
    }
  };

  const details = monsters.map((monster) => {
    const monsterUrl = monster.url;
    return monsterUrl;
  });

  const monsterDescriptionsResponse = async () => {
    const monsterArray = await Promise.all(
      details.map((monsterUrl) => {
        const monster = eachMonster(monsterUrl);
        return monster;
      })
    );
    setEveryMonster(monsterArray);
  };

  useEffect(() => {
    monstersData();
    monsterDescriptionsResponse();
  }, []);

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
          <Route path="/api-test">
            <APITest everyMonster={everyMonster} />
          </Route>
          {/* // */}
          {/* GM Routes */}
          <Route path="/all-spells-list">
            <AllSpellsList allMySpells={allMySpells} />
          </Route>
          {/* // */}
          {/* Utility Routes */}
          {/* // */}
          <Route path="/individual-spell/:id">
            <IndividualSpell allMySpells={allMySpells} />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
