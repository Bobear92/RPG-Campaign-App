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

// auth imports
import { getToken, getUser } from "../auth";

// api imports
import { getUserByUsername } from "../api";
import { getMySpells } from "../api/spells";
import { getMyMonsters } from "../api/monsters";
import { getMyEquipment } from "../api/equipment";

// component imports
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
import { AllSpellsList, AllMonstersList, AllEquipmentList } from "./GM";
import { IndividualSpell, IndividualMonster, IndividualItem } from "./Utility";

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

  // user info stuff

  const [admin, setAdmin] = useState(false);
  const [GM, setGM] = useState(false);
  const user = getUser();

  const handleUser = async () => {
    const userName = await getUserByUsername(user);

    if (userName.admin) {
      setAdmin(true);
    } else if (userName.gm) {
      setGM(true);
    }
  };

  // end user info stuff

  // all the spells from my database
  const [allMySpells, setAllMySpells] = useState([]);

  const mySpells = async () => {
    const spells = await getMySpells();
    if (spells) {
      setAllMySpells(spells);
    }
  };

  // end of my spells stuff

  //all the monsters from my database

  const [allMyMonsters, setAllMyMonsters] = useState([]);

  const myMonsters = async () => {
    const monsters = await getMyMonsters();
    if (monsters) {
      setAllMyMonsters(monsters);
    }
  };

  // end of monster stuff

  //all the equipment from my database

  const [allMyEquipment, setAllMyEquipment] = useState([]);

  const myEquipment = async () => {
    const equipment = await getMyEquipment();
    if (equipment) {
      setAllMyEquipment(equipment);
    }
  };

  // end if equipment stuff

  useEffect(() => {
    isUserLoggedIn();
    handleUser();
    mySpells();
    myMonsters();
    myEquipment();
  }, []);

  // test area

  return (
    <>
      <Router>
        <Header
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          GM={GM}
          admin={admin}
        />
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
            <APITest />
          </Route>
          {/* // */}
          {/* GM Routes */}
          <Route path="/all-spells-list">
            <AllSpellsList allMySpells={allMySpells} />
          </Route>
          <Route path="/all-monsters-list">
            <AllMonstersList allMyMonsters={allMyMonsters} />
          </Route>
          <Route path="/all-equipment-list">
            <AllEquipmentList allMyEquipment={allMyEquipment} />
          </Route>
          {/* // */}
          {/* Utility Routes */}
          {/* // */}
          <Route path="/individual-spell/:id">
            <IndividualSpell allMySpells={allMySpells} GM={GM} />
          </Route>
          <Route path="/individual-monster/:id">
            <IndividualMonster
              allMyMonsters={allMyMonsters}
              GM={GM}
              allMySpells={allMySpells}
            />
          </Route>
          <Route path="/individual-item/:id">
            <IndividualItem allMyEquipment={allMyEquipment} GM={GM} />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
