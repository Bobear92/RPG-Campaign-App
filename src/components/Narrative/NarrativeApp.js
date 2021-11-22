import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Backstory, CharacterInfo, Notes, SavedInfo } from ".";

const NarrativeApp = () => {
  return (
    <Router>
      <div className="narrative-app">
        <Switch>
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
        </Switch>
      </div>
    </Router>
  );
};

export default NarrativeApp;
