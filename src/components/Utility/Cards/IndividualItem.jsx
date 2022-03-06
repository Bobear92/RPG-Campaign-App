import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router";

import "./IndividualItem.css";

const IndividualItem = ({ allMyEquipment, GM }) => {
  const { id } = useParams();
  const item = allMyEquipment.find((element) => element.id == id);

  const type = item.item_type;
  const name = item.name;
  const desc = item.description;
  const cost = item.cost[0];
  const currency = item.cost[1];
  const weapon_cat = item.weapon_cat;
  const weapon_type = item.range_type;
  const damage = item.damage ? item.damage[1] : null;
  const two_handed = item.two_handed_damage ? item.two_handed_damage[1] : null;
  const damage_type = item.damage ? item.damage[0] : null;
  const two_handed_damage_type = item.two_handed_damage
    ? item.two_handed_damage[0]
    : null;
  const range_short = item.range ? item.range[0] : null;
  const range_long = item.range ? item.range[1] : null;
  const properties = item.properties ? item.properties : null;
  const armor_cat = item.armor_cat ? item.armor_cat : null;
  const ac =
    item.ac_max_dex_bonus !== null
      ? `${item.ac_base} + Dex modifier (max ${item.ac_max_dex_bonus})`
      : item.ac_dex === true && item.ac_max_dex_bonus === null
      ? `${item.ac_base} + Dex modifier`
      : item.ac_base && item.ac_dex === false
      ? `${item.ac_base}`
      : null;
  const str_min = item.str_min ? item.str_min : null;
  const stealth_dis = item.stealth_dis
    ? "Item imposes disadvantage on stealth checks."
    : null;
  const gmNotes = item.gm_notes;
  const visible = item.visible;

  return (
    <div className="individual-item-main-container">
      <div className="individual-item-border"></div>

      {type === "Adventuring Gear" ||
      type === "Tools" ||
      type === "Mounts and Vehicles" ? (
        <>
          <div className="individual-item-name-container">
            <div className="individual-item-name-inner-container">
              <h1 className="individual-item-name">{name}</h1>
              <p className="individual-item-type">{type}</p>
              <p className="individual-item-cost">
                {cost} {currency}
              </p>
            </div>
          </div>
          <div className="individual-item-border"></div>

          <div className="individual-item-desc-container">
            {desc && desc.length ? (
              <>
                <h3>Description</h3>
                <div className="individual-item-desc">
                  {desc.map((data, idx) => {
                    return (
                      <p key={`data in desc map: ${data} at ${idx}`}>{data}</p>
                    );
                  })}
                </div>
                <div className="individual-item-border"></div>
              </>
            ) : null}
          </div>
        </>
      ) : type === "Weapon" ? (
        <>
          <div className="individual-item-name-container">
            <div className="individual-item-name-inner-container">
              <h1 className="individual-item-name">{name}</h1>
              <p className="individual-item-type">{type}</p>
              <p className="individual-item-cost">
                {cost} {currency}
              </p>
            </div>
          </div>
          <div className="individual-item-border"></div>
          <div className="individual-item-desc-container">
            {desc && desc.length ? (
              <>
                <h3>Description</h3>
                <div className="individual-item-desc">
                  {desc.map((data, idx) => {
                    return (
                      <p key={`data in desc map: ${data} at ${idx}`}>{data}</p>
                    );
                  })}
                </div>
                <div className="individual-item-border"></div>
              </>
            ) : null}
          </div>

          <div className="individual-item-weapon-properties-main-container">
            <p>Weapon Category: {weapon_cat}</p>
            <p>Weapon Type: {weapon_type}</p>
            <p>Damage: {damage}</p>
            <p>Damage Type: {damage_type}</p>
            {two_handed ? (
              <>
                <p>Two Handed Damage: {two_handed}</p>
                <p>Two handed Damage Type: {two_handed_damage_type}</p>
              </>
            ) : null}
            {range_long !== null ? (
              <p>
                Range: {range_short} - {range_long} Feet
              </p>
            ) : (
              <p>Range: {range_short} Feet</p>
            )}
            {properties && properties.length ? (
              <>
                <div className="individual-item-border"></div>
                <h3>Properties</h3>
                <div className="individual-item-properties">
                  {properties.map((data, idx) => {
                    return (
                      <p key={`data in properties map: ${data} at ${idx}`}>
                        {data}
                      </p>
                    );
                  })}
                </div>
              </>
            ) : null}
          </div>
          <div className="individual-item-border"></div>
          <div className="individual-item-desc-container">
            {desc && desc.length ? (
              <>
                <h3>Description</h3>
                <div className="individual-item-desc">
                  {desc.map((data, idx) => {
                    return (
                      <p key={`data in desc map: ${data} at ${idx}`}>{data}</p>
                    );
                  })}
                </div>
                <div className="individual-item-border"></div>
              </>
            ) : null}
          </div>
        </>
      ) : type === "Armor" ? (
        <>
          <div className="individual-item-name-container">
            <div className="individual-item-name-inner-container">
              <h1 className="individual-item-name">{name}</h1>
              <p className="individual-item-type">{type}</p>
              <p className="individual-item-cost">
                {cost} {currency}
              </p>
            </div>
          </div>
          <div className="individual-item-border"></div>
          <div className="individual-item-armor-properties-main-container">
            <p>Armor Type: {armor_cat}</p>
            <p>Armor Class (AC): {ac}</p>
            {str_min ? (
              <p>Minimum strength needed to wear without penalty: {str_min}.</p>
            ) : null}
            {stealth_dis ? <p>Stealth: {stealth_dis}</p> : null}
          </div>
          <div className="individual-item-border"></div>
          <div className="individual-item-desc-container">
            {desc && desc.length ? (
              <>
                <h3>Description</h3>
                <div className="individual-item-desc">
                  {desc.map((data, idx) => {
                    return (
                      <p key={`data in desc map: ${data} at ${idx}`}>{data}</p>
                    );
                  })}
                </div>
                <div className="individual-item-border"></div>
              </>
            ) : null}
          </div>

          {properties && properties.length ? (
            <>
              <div className="individual-item-border"></div>
              <h3>Properties</h3>
              <div className="individual-item-properties">
                {properties.map((data, idx) => {
                  return (
                    <p key={`data in properties map: ${data} at ${idx}`}>
                      {data}
                    </p>
                  );
                })}
              </div>
            </>
          ) : null}
        </>
      ) : (
        <p>Item type not found</p>
      )}
      {GM ? (
        <div className="individual-item-gm-container">
          <p>Dungeon Master Notes: {gmNotes}</p>
          <p>Visible: {visible}</p>
        </div>
      ) : null}
      <div className="individual-item-border"></div>
    </div>
  );
};

export default IndividualItem;
