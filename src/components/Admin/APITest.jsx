import React, { useState, useEffect } from "react";
import { eachFeature, allFeatures } from "../../api/features";

const APITest = () => {
  const [features, setFeatures] = useState([]);
  const [everyFeature, setEachFeature] = useState([]);

  const featureData = async () => {
    try {
      const featureData = await allFeatures();
      setFeatures(featureData);
    } catch (error) {
      throw error;
    }
  };

  const details = features.map((feature) => {
    const featureUrl = feature.url;
    return featureUrl;
  });

  const featuresDescriptionsResponse = async () => {
    const featureArray = await Promise.all(
      details.map((featureUrl) => {
        const feature = eachFeature(featureUrl);
        return feature;
      })
    );
    setEachFeature(featureArray);
  };

  useEffect(() => {
    featureData();
    featuresDescriptionsResponse();
  }, []);

  console.log(everyFeature, "lets see it");

  return (
    <div>
      <p>This is where I test api before I put it in the scripts file</p>
    </div>
  );
};

export default APITest;

//  // data to look at all the monsters on the api data
//  const [monsters, setMonsters] = useState([]);
//  const [everyMonster, setEveryMonster] = useState([]);

//  const monstersData = async () => {
//    try {
//      const monsterData = await allMonsters();
//      setMonsters(monsterData);
//    } catch (error) {
//      throw error;
//    }
//  };

//  const details = monsters.map((monster) => {
//    const monsterUrl = monster.url;
//    return monsterUrl;
//  });

//  const monsterDescriptionsResponse = async () => {
//    const monsterArray = await Promise.all(
//      details.map((monsterUrl) => {
//        const monster = eachMonster(monsterUrl);
//        return monster;
//      })
//    );
//    setEveryMonster(monsterArray);
//  };

//  useEffect(() => {
//    monstersData();
//    monsterDescriptionsResponse();
//  }, []);

//  console.log(everyMonster);

//
//
//

// data to look at all the equipment on the api data
//  const [equipment, setEquipment] = useState([]);
//  const [everyItem, setEveryItem] = useState([]);

//  const equipmentData = async () => {
//    try {
//      const equipmentData = await allEquipment();
//      setEquipment(equipmentData);
//    } catch (error) {
//      throw error;
//    }
//  };

//  const details = equipment.map((item) => {
//    const itemUrl = item.url;
//    return itemUrl;
//  });

//  const equipmentDescriptionsResponse = async () => {
//    const equipmentArray = await Promise.all(
//      details.map((itemUrl) => {
//        const item = eachItem(itemUrl);
//        return item;
//      })
//    );
//    setEveryItem(equipmentArray);
//  };

//  useEffect(() => {
//    equipmentData();
//    equipmentDescriptionsResponse();
//  }, []);

//  console.log(everyItem, "come on!");
