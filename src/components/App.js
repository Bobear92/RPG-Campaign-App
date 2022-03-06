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
import { getMyRules } from "../api/home_brew_rules";

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

import {
  HomeBrewRulesManipulation,
  AllSpellsList,
  AllMonstersList,
  AllEquipmentList,
} from "./GM";

import {
  IndividualSpell,
  IndividualMonster,
  IndividualItem,
  Dash,
  Disengage,
  Dodge,
  Attack,
  Cast_a_Spell,
  Help,
  Ready,
  Hide,
  Search,
  Use_an_Object,
} from "./Utility";

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
  const [gmName, setGmName] = useState("");
  const user = getUser();

  const handleUser = async () => {
    const userName = await getUserByUsername(user);

    if (userName.admin) {
      setAdmin(true);
    } else if (userName.gm) {
      setGM(true);
      setGmName(userName.username);
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

  // all the rules from my database

  const [allMyRules, setAllMyRules] = useState([]);

  const myRules = async () => {
    const rules = await getMyRules();
    if (rules) {
      setAllMyRules(rules);
    }
  };

  // end of rule stuff

  useEffect(() => {
    isUserLoggedIn();
    handleUser();
    mySpells();
    myMonsters();
    myEquipment();
    myRules();
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
            <HomeBrewRules allMyRules={allMyRules} />
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
          <Route path="/home-brew-rules-control-center">
            <HomeBrewRulesManipulation
              gmName={gmName}
              allMyRules={allMyRules}
            />
          </Route>
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
          <Route path="/mechanics-combat-actions-attack">
            <Attack />
          </Route>
          <Route path="/mechanics-combat-actions-cast-a-spell">
            <Cast_a_Spell />
          </Route>
          <Route path="/mechanics-combat-actions-dash">
            <Dash />
          </Route>
          <Route path="/mechanics-combat-actions-disengage">
            <Disengage />
          </Route>
          <Route path="/mechanics-combat-actions-dodge">
            <Dodge />
          </Route>
          <Route path="/mechanics-combat-actions-help">
            <Help />
          </Route>
          <Route path="/mechanics-combat-actions-hide">
            <Hide />
          </Route>
          <Route path="/mechanics-combat-actions-ready">
            <Ready />
          </Route>
          <Route path="/mechanics-combat-actions-search">
            <Search />
          </Route>
          <Route path="/mechanics-combat-actions-use-an-object">
            <Use_an_Object />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
