import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Home } from ".";
import { CharacterSheetApp } from "./CharacterSheet";
import { ItemsApp } from "./Items";
import { CalendarApp } from "./Calendar";
import { MechanicsApp } from "./Mechanics";
import { NarrativeApp } from "./Narrative";
import { WorldInfoApp } from "./WorldInfo";

const App = () => {
  return (
    <>
      <Route path="/">
        <Home />
      </Route>
      {/* Need to figure out how to call different sub apps with routes here so this page isn't huge. */}
    </>
  );
};

export default App;
