import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import "./IndividualOfficialRule.css";

const IndividualOfficialRule = ({ allOfficialRules }) => {
  const { id } = useParams();
  const rule = allOfficialRules.find((element) => element.id == id);
  const name = rule.name;
  const description = rule.description;

  return (
    <div>
      <p>{name}</p>
      <p>{description}</p>
    </div>
  );
};

export default IndividualOfficialRule;
