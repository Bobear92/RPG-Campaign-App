import React, { useState, Fragment } from "react";
import { SpellCard } from "../Utility";

const AllSpellsList = ({ allMySpells }) => {
  // console.log(allMySpells);

  return (
    <div>
      {allMySpells && allMySpells.length ? (
        allMySpells.map((spell, idx) => {
          return (
            <Fragment key={`Spell in main spell list ${spell.name} ${idx}`}>
              <SpellCard spell={spell} />
            </Fragment>
          );
        })
      ) : (
        <div>
          <h1>Spells not populated</h1>
        </div>
      )}
    </div>
  );
};

export default AllSpellsList;
