import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./OfficialRuleCard.css";

const OfficialRuleCard = ({ rule }) => {
  const name = rule.name;

  return (
    <div className="main-official-rule-card-container">
      <Link to={`/individual-official-rule/${rule.id}`}>
        <h4 className="individual-official-rule-card-rule-name">{name}</h4>
      </Link>
    </div>
  );
};

export default OfficialRuleCard;
