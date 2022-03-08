import React, { useState, Fragment } from "react";
import { EquipmentCard } from "../Utility";
import "./AllEquipmentList.css";

const AllEquipmentList = ({ allMyEquipment }) => {
  return (
    <div className="all-equipment-list-main-container">
      {allMyEquipment && allMyEquipment.length ? (
        allMyEquipment.map((item, idx) => {
          return (
            <Fragment key={`Item in main equipment list ${item.name} ${idx}`}>
              <div className="all-equipment-list-equipment-card-container">
                <EquipmentCard item={item} />
              </div>
            </Fragment>
          );
        })
      ) : (
        <div className="all-equipment-list-unpopulated-container">
          <h1>Equipment not populated</h1>
        </div>
      )}
    </div>
  );
};

export default AllEquipmentList;
