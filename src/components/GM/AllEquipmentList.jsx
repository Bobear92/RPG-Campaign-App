import React, { useState, Fragment } from "react";
import { EquipmentCard } from "../Utility";

const AllEquipmentList = ({ allMyEquipment }) => {
  return (
    <div>
      {allMyEquipment && allMyEquipment.length ? (
        allMyEquipment.map((item, idx) => {
          return (
            <Fragment key={`Item in main equipment list ${item.name} ${idx}`}>
              <EquipmentCard item={item} />
            </Fragment>
          );
        })
      ) : (
        <div>
          <h1>Equipment not populated</h1>
        </div>
      )}
    </div>
  );
};

export default AllEquipmentList;
