import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Classes, GameRules, HomeBrewRules, SavedMechanics } from ".";

const MechanicsApp = () => {
  return (
    <Router>
      <div className="mechanics-app">
        <Switch>
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
        </Switch>
      </div>
    </Router>
  );
};

export default MechanicsApp;
