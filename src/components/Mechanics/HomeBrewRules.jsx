import React, { useState, Fragment } from "react";
import "./HomeBrewRules.css";

const HomeBrewRules = ({ allMyRules }) => {
  return (
    <div className="home-brew-rules-main-component">
      <h1>Home Brew Rules</h1>
      <div className="home-brew-rules-rule-map-main-component">
        {allMyRules && allMyRules.length
          ? allMyRules.map((rule, idx) => {
              return rule.visible ? (
                <div
                  className="home-brew-rules-rule-map-component"
                  key={`rule inside of rules map in home brew rules ${rule.name} ${idx}`}
                >
                  <h3>{rule.name}</h3>
                  <p>{rule.description}</p>
                </div>
              ) : null;
            })
          : null}
      </div>
    </div>
  );
};
export default HomeBrewRules;

// need to be able to only see the rules for the campaign they are in once campaign selection is figured out.
