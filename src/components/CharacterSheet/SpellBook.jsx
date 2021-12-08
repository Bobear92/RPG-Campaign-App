import React, { Fragment } from "react";
import { SpellCard } from ".";

const SpellBook = ({ spellDescriptions }) => {
  return (
    <div>
      <h1>This is the Spell Book page.</h1>
      {spellDescriptions && spellDescriptions.length
        ? spellDescriptions.map((spell, idx) => {
            return (
              <Fragment key={`Spell in main spell list ${spell.name} ${idx}`}>
                <SpellCard spell={spell} />
              </Fragment>
            );
          })
        : null}
    </div>
  );
};

export default SpellBook;
