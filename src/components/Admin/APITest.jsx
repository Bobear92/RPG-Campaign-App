import React, { useState, useEffect } from "react";
import { eachMonster, allMonsters } from "../../api/monsters";

const APITest = () => {
  // data to look at all the monsters on the api data
  const [monsters, setMonsters] = useState([]);
  const [everyMonster, setEveryMonster] = useState([]);

  const monstersData = async () => {
    try {
      const monsterData = await allMonsters();
      setMonsters(monsterData);
    } catch (error) {
      throw error;
    }
  };

  const details = monsters.map((monster) => {
    const monsterUrl = monster.url;
    return monsterUrl;
  });

  const monsterDescriptionsResponse = async () => {
    const monsterArray = await Promise.all(
      details.map((monsterUrl) => {
        const monster = eachMonster(monsterUrl);
        return monster;
      })
    );
    setEveryMonster(monsterArray);
  };

  useEffect(() => {
    monstersData();
    monsterDescriptionsResponse();
  }, []);

  console.log(everyMonster);

  return (
    <div>
      <p>This is where I test api before I put it in the scripts file</p>
    </div>
  );
};

export default APITest;
