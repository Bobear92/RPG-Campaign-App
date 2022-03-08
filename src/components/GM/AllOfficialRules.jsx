import React, { useState, Fragment } from "react";
import { OfficialRuleCard } from "../Utility";

const AllOfficialRules = ({ allOfficialRules }) => {
  return (
    <div>
      {allOfficialRules && allOfficialRules.length ? (
        allOfficialRules.map((rule, idx) => {
          return (
            <Fragment key={`Rule in main rule list ${rule.name} ${idx}`}>
              <OfficialRuleCard rule={rule} />
            </Fragment>
          );
        })
      ) : (
        <div>
          <h1>Rules not populated</h1>
        </div>
      )}
    </div>
  );
};

export default AllOfficialRules;
