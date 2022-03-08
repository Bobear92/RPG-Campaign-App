import React, { useState, Fragment } from "react";
import { MonsterCard } from "../Utility";
import "./AllMonstersList.css";

const AllMonstersList = ({ allMyMonsters }) => {
  return (
    <div className="all-monsters-list-main-container">
      {allMyMonsters && allMyMonsters.length ? (
        allMyMonsters.map((monster, idx) => {
          return (
            <Fragment
              key={`Monster in main monster list ${monster.name} ${idx}`}
            >
              <div className="all-monsters-list-monster-card-container">
                <MonsterCard monster={monster} />
              </div>
            </Fragment>
          );
        })
      ) : (
        <div className="all-monsters-list-unpopulated-container">
          <h1>Monsters not populated</h1>
        </div>
      )}
    </div>
  );
};

export default AllMonstersList;
