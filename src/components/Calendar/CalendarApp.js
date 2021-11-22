import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Calendar } from ".";

const CalendarApp = () => {
  return (
    <Router>
      <div className="calendar-app">
        <Switch>
          <Route path="/calendar">
            <Calendar />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default CalendarApp;
