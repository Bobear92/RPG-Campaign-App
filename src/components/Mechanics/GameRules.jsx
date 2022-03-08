import React, { useState, Fragment } from "react";
import { OfficialRuleCard } from "../Utility";
import "./GameRules.css";

const GameRules = ({ allOfficialRules }) => {
  const ruleNames = allOfficialRules.map((rule) => {
    return rule.name;
  });

  const sortedRules = ruleNames.sort();

  return (
    <div className="game-rules-main-container">
      <h2 className="game-rules-title">Official Game Rules</h2>
      <div className="game-rules-rules-map-container">
        {sortedRules && sortedRules.length ? (
          sortedRules.map((rule, idx) => {
            const exactRule = allOfficialRules.find(
              (element) => element.name == rule
            );
            console.log(exactRule);
            return (
              <Fragment
                key={`Rule in game rules component rule list ${rule.name} ${idx}`}
              >
                <div className="game-rules-each-rule-container">
                  <OfficialRuleCard rule={exactRule} />
                </div>
              </Fragment>
            );
          })
        ) : (
          <div>
            <h1>Rules not populated</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameRules;
