import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Equipment, Inventory, SavedItems } from ".";

const ItemsApp = () => {
  return (
    <Router>
      <div className="items-app">
        <Switch>
          <Route path="/equipment">
            <Equipment />
          </Route>
          <Route path="/inventory">
            <Inventory />
          </Route>
          <Route path="/saved-items">
            <SavedItems />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default ItemsApp;
