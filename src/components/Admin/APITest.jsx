import React, { useState, useEffect } from "react";
import { eachClass, allClasses } from "../../api/classes";

const APITest = () => {
  const [dndClasses, setDndClasses] = useState([]);
  const [individualClass, setIndividualClass] = useState([]);

  const classData = async () => {
    try {
      const classData = await allClasses();
      setDndClasses(classData);
    } catch (error) {
      throw error;
    }
  };

  const details = dndClasses.map((dndClass) => {
    const dndClassUrl = dndClass.url;
    return dndClassUrl;
  });

  const classDescriptionsResponse = async () => {
    const classArray = await Promise.all(
      details.map((classUrl) => {
        const dndClass = eachClass(classUrl);
        return dndClass;
      })
    );
    setIndividualClass(classArray);
  };

  useEffect(() => {
    classData();
    classDescriptionsResponse();
  }, []);

  console.log(individualClass, "Here we go");

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
