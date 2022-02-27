import React, { useState, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import "./EquipmentCard.css";

const EquipmentCard = ({ item }) => {
  console.log(item);
  const name = item.name;
  const type = item.item_type;
  const cost = item.cost[0];
  const currency = item.cost[1];

  return (
    <div className="main-equipment-card-container">
      <div className="equipment-card-info-container">
        <Link to={`/individual-item/${item.id}`}>
          <h4 className="equipment-card-item-name">{name}</h4>
        </Link>
        <h4 className="equipment-card-item-type">{type}</h4>
        <h4 className="equipment-card-item-cost">
          {cost} {currency}
        </h4>
      </div>
    </div>
  );
};

export default EquipmentCard;
