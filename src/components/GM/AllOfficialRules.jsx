import React, { useState, Fragment } from "react";
import { OfficialRuleCard } from "../Utility";
import "./AllOfficialRules.css";

const AllOfficialRules = ({ allOfficialRules }) => {
  return (
    <div className="all-official-rules-main-container">
      {allOfficialRules && allOfficialRules.length ? (
        allOfficialRules.map((rule, idx) => {
          return (
            <Fragment key={`Rule in main rule list ${rule.name} ${idx}`}>
              <OfficialRuleCard rule={rule} />
            </Fragment>
          );
        })
      ) : (
        <div className="all-official-rules-list-unpopulated-container">
          <h1>Rules not populated</h1>
        </div>
      )}
    </div>
  );
};

export default AllOfficialRules;
