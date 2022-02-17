import React, { useState, Fragment } from "react";
import { MonsterCard } from "../Utility";

const AllMonstersList = ({ allMyMonsters }) => {
  return (
    <div>
      {allMyMonsters && allMyMonsters.length ? (
        allMyMonsters.map((monster, idx) => {
          return (
            <Fragment
              key={`Monster in main monster list ${monster.name} ${idx}`}
            >
              <MonsterCard monster={monster} />
            </Fragment>
          );
        })
      ) : (
        <div>
          <h1>Monsters not populated</h1>
        </div>
      )}
    </div>
  );
};

export default AllMonstersList;
