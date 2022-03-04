import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import "./GameRules.css";

const GameRules = () => {
  const actions = [
    { name: "Attack", url: "/mechanics-combat-actions-attack" },
    { name: "Cast a Spell", url: "/mechanics-combat-actions-cast-a-spell" },
    { name: "Cast a Spell", url: "/mechanics-combat-actions-cast-a-spell" },
    { name: "Dash", url: "/mechanics-combat-actions-dash" },
    { name: "Disengage", url: "/mechanics-combat-actions-disengage" },
    { name: "Dodge", url: "/mechanics-combat-actions-dodge" },
    { name: "Help", url: "/mechanics-combat-actions-help" },
    { name: "Hide", url: "/mechanics-combat-actions-hide" },
    { name: "Ready", url: "/mechanics-combat-actions-ready" },
    { name: "Search", url: "/mechanics-combat-actions-search" },
    { name: "Use an Object", url: "/mechanics-combat-actions-use-an-object" },
  ];

  return (
    <div className="game-rules-main-container">
      <h1>Rules and Mechanics</h1>
      <div className="game-rule-actions-container">
        <h4>Types of Actions</h4>
        {actions.map((action, index) => {
          return (
            <Fragment
              key={`Map inside of actions array of objects with ${action.name} at ${index}`}
            >
              <div className="action map card">
                <Link to={action.url}>
                  <h5>{action.name}</h5>
                </Link>
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default GameRules;
