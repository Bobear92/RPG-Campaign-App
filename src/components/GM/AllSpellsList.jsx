import React, { useState, Fragment } from "react";
import { SpellCard } from "../Utility";
import "./AllSpellsList.css";

const AllSpellsList = ({ allMySpells }) => {
  return (
    <div className="all-spell-list-main-container">
      <div className="all-spells-list-map-container">
        {allMySpells && allMySpells.length ? (
          allMySpells.map((spell, idx) => {
            return (
              <Fragment key={`Spell in main spell list ${spell.name} ${idx}`}>
                <div className="all-spells-list-each-spell-card-container">
                  <SpellCard spell={spell} />
                </div>
              </Fragment>
            );
          })
        ) : (
          <div className="all-spells-list-unpopulated-container">
            <h1>Spells not populated</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllSpellsList;
