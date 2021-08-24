import './App.css';
import React, { useState } from 'react';

import Donation from './components/donation';
import Filler from './components/filler';
import Future from './components/future';

const bosses = [
  {
    name: 'Kree\'arra',
    isGWD: true,
    isWILDY: false,
    isMulti: true,
    isRaids: false,
    youtube: 'https://youtu.be/Xvbmz3Itfx8',
    osrswiki: 'https://oldschool.runescape.wiki/w/Kree%27arra/Strategies'
  },
  {
    name: 'General Graardor',
    isGWD: true,
    isWILDY: false,
    isMulti: true,
    isRaids: false,
    youtube: 'https://youtu.be/JK3_IDlQzUI',
    osrswiki: 'https://oldschool.runescape.wiki/w/General_Graardor/Strategies'
  },
  {
    name: 'K\'ril Tsutsaroth',
    isGWD: true,
    isWILDY: false,
    isMulti: true,
    isRaids: false,
    youtube: 'https://youtu.be/bIVvp50wrNA',
    osrswiki: 'https://oldschool.runescape.wiki/w/K%27ril_Tsutsaroth/Strategies'
  },
  {
    name: 'Commander Zilyana',
    isGWD: true,
    isWILDY: false,
    isMulti: true,
    isRaids: false,
    youtube: 'https://youtu.be/jWaIYzH5raE',
    osrswiki: 'https://oldschool.runescape.wiki/w/Commander_Zilyana/Strategies'
  },
  {
    name: 'Callisto',
    isGWD: false,
    isWILDY: true,
    isMulti: true,
    isRaids: false,
    youtube: 'https://youtu.be/M3HB0g1vJsY',
    osrswiki: 'https://oldschool.runescape.wiki/w/Callisto/Strategies'
  },
  {
    name: 'Chaos Elemental',
    isGWD: false,
    isWILDY: true,
    isMulti: false,
    isRaids: false,
    youtube: 'https://youtu.be/OZLUJA_y7hw',
    osrswiki: 'https://oldschool.runescape.wiki/w/Chaos_Elemental/Strategies'
  },
  {
    name: 'Crazy Archaeologist',
    isGWD: false,
    isWILDY: true,
    isMulti: false,
    isRaids: false,
    youtube: 'https://youtu.be/lujbZUGMz7g',
    osrswiki: 'https://oldschool.runescape.wiki/w/Crazy_archaeologist/Strategies'
  },
  {
    name: 'King Black Dragon',
    isGWD: false,
    isWILDY: true,
    isMulti: true,
    isRaids: false,
    youtube: 'https://youtu.be/UVH7j_5xP6g',
    osrswiki: 'https://oldschool.runescape.wiki/w/King_Black_Dragon/Strategies'
  },
  {
    name: 'Scorpio',
    isGWD: false,
    isWILDY: true,
    isMulti: true,
    isRaids: false,
    youtube: 'https://youtu.be/mMS20r5xEyE',
    osrswiki: 'https://oldschool.runescape.wiki/w/Scorpia/Strategies'
  },
  {
    name: 'Venenatis',
    isGWD: false,
    isWILDY: true,
    isMulti: true,
    isRaids: false,
    youtube: 'https://youtu.be/KvlkjdOB4tg',
    osrswiki: 'https://oldschool.runescape.wiki/w/Venenatis/Strategies'
  },
  {
    name: 'Vet\'ion',
    isGWD: false,
    isWILDY: true,
    isMulti: true,
    isRaids: false,
    youtube: 'https://youtu.be/2yXc9bKdvOE',
    osrswiki: 'https://oldschool.runescape.wiki/w/Vet%27ion/Strategies'
  },
  {
    name: 'Obor',
    isGWD: false,
    isWILDY: false,
    isMulti: false,
    isRaids: false,
    youtube: 'https://youtu.be/4VXoE6-5cA4',
    osrswiki: 'https://oldschool.runescape.wiki/w/Obor'
  },
  {
    name: 'Brophyta',
    isGWD: false,
    isWILDY: false,
    isMulti: false,
    isRaids: false,
    youtube: 'https://youtu.be/BgbFVxap1Ec',
    osrswiki: 'https://oldschool.runescape.wiki/w/Bryophyta'
  },
  {
    name: 'Tempoross',
    isGWD: false,
    isWILDY: false,
    isMulti: false,
    isRaids: false,
    youtube: 'https://youtu.be/R4Ws-xxOS-A',
    osrswiki: 'https://oldschool.runescape.wiki/w/Tempoross/Strategies'
  },
  {
    name: 'Wintertodt',
    isGWD: false,
    isWILDY: false,
    isMulti: false,
    isRaids: false,
    youtube: 'https://youtu.be/5mOXlO0DzU8',
    osrswiki: 'https://oldschool.runescape.wiki/w/Wintertodt/Strategies'
  },
  {
    name: 'Zalcano',
    isGWD: false,
    isWILDY: false,
    isMulti: false,
    isRaids: false,
    youtube: 'https://youtu.be/aP56mYJB_EY',
    osrswiki: 'https://oldschool.runescape.wiki/w/Zalcano/Strategies'
  },
  {
    name: 'Chambers of Xeric',
    isGWD: false,
    isWILDY: false,
    isMulti: false,
    isRaids: true,
    youtube: 'https://youtu.be/wlmYhW6qmmw',
    osrswiki: 'https://oldschool.runescape.wiki/w/Chambers_of_Xeric/Strategies'
  },
  {
    name: 'Chambers of Xeric (Challenge Mode)',
    isGWD: false,
    isWILDY: false,
    isMulti: false,
    isRaids: true,
    youtube: 'https://youtu.be/wlmYhW6qmmw',
    osrswiki: 'https://oldschool.runescape.wiki/w/Chambers_of_Xeric/Strategies'
  },
  {
    name: 'Theater of Blood',
    isGWD: false,
    isWILDY: false,
    isMulti: false,
    isRaids: true,
    youtube: 'https://youtu.be/7hzX4552lso',
    osrswiki: 'https://oldschool.runescape.wiki/w/Theatre_of_Blood/Strategies'
  },
  {
    name: 'Theater of Blood (Hard Mode)',
    isGWD: false,
    isWILDY: false,
    isMulti: false,
    isRaids: true,
    youtube: 'https://youtu.be/7hzX4552lso',
    osrswiki: 'https://oldschool.runescape.wiki/w/Theatre_of_Blood/Strategies'
  },
  {
    name: 'Giant Mole',
    isGWD: false,
    isWILDY: false,
    isMulti: true,
    isRaids: false,
    youtube: 'https://youtu.be/Tl1aNgoO2hs',
    osrswiki: 'https://oldschool.runescape.wiki/w/Giant_Mole/Strategies'
  },
  {
    name: 'Deranged Archaeologist',
    isGWD: false,
    isWILDY: false,
    isMulti: true,
    isRaids: false,
    youtube: 'https://youtu.be/yG0h2bKOzuY',
    osrswiki: 'https://oldschool.runescape.wiki/w/Deranged_archaeologist/Strategies'
  },
  {
    name: 'Dagannoth Kings',
    isGWD: false,
    isWILDY: false,
    isMulti: true,
    isRaids: false,
    youtube: 'https://youtu.be/pfjvjt95Fow',
    osrswiki: 'https://oldschool.runescape.wiki/w/Dagannoth_Kings/Strategies'
  },
  {
    name: 'Sarachnis',
    isGWD: false,
    isWILDY: false,
    isMulti: true,
    isRaids: false,
    youtube: 'https://youtu.be/Ce_jV9iJNiE',
    osrswiki: 'https://oldschool.runescape.wiki/w/Sarachnis/Strategies'
  },
  {
    name: 'Kalphite Queen',
    isGWD: false,
    isWILDY: false,
    isMulti: true,
    isRaids: false,
    youtube: 'https://youtu.be/qmFvRtJkKHk',
    osrswiki: 'https://oldschool.runescape.wiki/w/Kalphite_Queen/Strategies'
  },
  {
    name: 'Zulrah',
    isGWD: false,
    isWILDY: false,
    isMulti: false,
    isRaids: false,
    youtube: 'https://youtu.be/CZFzB71k6wU',
    osrswiki: 'https://oldschool.runescape.wiki/w/Zulrah/Strategies'
  },
  {
    name: 'Vorkath',
    isGWD: false,
    isWILDY: false,
    isMulti: false,
    isRaids: false,
    youtube: 'https://youtu.be/d6kR7eBSw1k',
    osrswiki: 'https://oldschool.runescape.wiki/w/Vorkath/Strategies'
  },
  {
    name: 'Corporeal Beast',
    isGWD: false,
    isWILDY: false,
    isMulti: true,
    isRaids: false,
    youtube: 'https://youtu.be/3ZNGpC90zEI',
    osrswiki: 'https://oldschool.runescape.wiki/w/Corporeal_Beast/Strategies'
  },
  {
    name: 'The Nightmare',
    isGWD: false,
    isWILDY: false,
    isMulti: true,
    isRaids: false,
    youtube: 'https://youtu.be/tihXu1-KYVk',
    osrswiki: 'https://oldschool.runescape.wiki/w/The_Nightmare/Strategies'
  },
  {
    name: 'Phosani\'s Nightmare',
    isGWD: false,
    isWILDY: false,
    isMulti: false,
    isRaids: false,
    youtube: 'https://youtu.be/pEMxp1PA93A',
    osrswiki: 'https://oldschool.runescape.wiki/w/Phosani%27s_Nightmare'
  }
]


const skills = [
  {
    name: 'Agility',
    isCombat: false,
  },
  {
    name: 'Attack',
    iCombat: true,
  },
  {
    name: 'Strength',
    isCombat: true,
  },
  {
    name: 'Defence',
    isCombat: true,
  },
  {
    name: 'Ranged',
    isCombat: true,
  },
  {
    name: 'Prayer',
    isCombat: false,
  },
  {
    name: 'Magic',
    isCombat: true
  },
  {
    name: 'Runecraft',
    isCombat: false,
  },
  {
    name: 'Hitpoints',
    isCombat: true,
  },
  {
    name: 'Crafting',
    isCombat: false,
  },
  {
    name: 'Mining',
    isCombat: false,
  },
  {
    name: 'Smithing',
    isCombat: false,
  },
  {
    name: 'Fishing',
    isCombat: false,
  },
  {
    name: 'Cooking',
    isCombat: false,
  },
  {
    name: 'Firemaking',
    isCombat: false,
  },
  {
    name: 'Woodcutting',
    isCombat: false,
  },
  {
    name: 'Herblore',
    isCombat: false,
  },
  {
    name: 'Thieving',
    isCombat: false,
  },
  {
    name: 'Fletching',
    isCombat: false,
  },
  {
    name: 'Slayer',
    isCombat: true,
  },
  {
    name: 'Farming',
    isCombat: false,
  },
  {
    name: 'Construction',
    isCombat: false,
  },
  {
    name: 'Hunter',
    isCombat: false,
  }
];



function App() {
  //GLOBAL
  const [bossesSelected, setBossesSelected] = useState(false);
  const [skillSelected, setSkillSelected] = useState(false);
  const [donationSelected, setDonationSelected] = useState(false);
  const [futureSelected, setFutureSelected] = useState(false);

  //BOSSES
  const [bossName, setBossName] = useState('');
  const [bossIsGWD, setBossIsGWD] = useState('');
  const [bossIsWildy, setBossIsWildy] = useState('');
  const [bossIsMulti, setBossIsMulti] = useState('');
  const [bossIsRaids, setBossIsRaids] = useState('');
  const [bossYoutube, setBossYoutube] = useState('');
  const [bossWiki, setBossWiki] = useState('');


  //SKILLS
  const [skillName, setSkillName] = useState('');


  //Governing the Randomness
  const getRandomNumber = (max) => {
    return Math.floor(Math.random() * max);
  }


  const SelectRandomBoss = () => {
    setBossesSelected(true);
    const randomNum = getRandomNumber(bosses.length);
    setBossName(bosses[randomNum].name);
    setBossIsGWD(bosses[randomNum].isGWD);
    setBossIsWildy(bosses[randomNum].isWILDY);
    setBossIsMulti(bosses[randomNum].isMulti);
    setBossIsRaids(bosses[randomNum].isRaids);
    setBossYoutube(bosses[randomNum].youtube);
    setBossWiki(bosses[randomNum].osrswiki);
  }

  const SelectRandomSkill = () => {
    setSkillSelected(true);
    const randomNum = getRandomNumber(skills.length);
    setSkillName(skills[randomNum].name);
  }

  const SelectDonation = () => {
    setDonationSelected(true);
  }

  const SelectFuture = () => {
    setFutureSelected(true);
  }

  const ClearAllSelections = () => {
    setBossesSelected(false);
    setSkillSelected(false);
  }
  const ClearBossSelection = () => {
    setBossesSelected(false);
  }
  const ClearSkillSelection = () => {
    setSkillSelected(false);
  }
  const ClearDonationFuture = () => {
    setDonationSelected(false);
    setFutureSelected(false);
  }

  return (
      <div className="App">
        <header className="App-header">
          <div className="ui vertical segment">
            <button className="ui secondary button" onClick={SelectRandomBoss}>Pick your random boss</button>
            {bossesSelected ? <button className="ui secondary button" onClick={ClearBossSelection}>Clear</button> : ''  }
            {bossesSelected ?
            <div className="ui piled segments"> 
                <div className="ui inverted segment">
                    <h2>{bossName} </h2>
                </div>         
                <div className="ui inverted segment">
                    { bossIsWildy ? ` is in the wildy.` : ` is not in the wildy.`}
                </div>
                <div className="ui inverted segment">
                    { bossIsGWD ? ` is in the God Wars Dungeon.` : ` is not in the God Wars Dungeon.`}
                </div>
                <div className="ui inverted segment">
                    { bossIsMulti ? ` is in Multi.` : ` is not Multi.`}
                </div>
                <div className="ui inverted segment">
                    { bossIsRaids ? ` is a Raid.` : ` is not a Raid.`}
                </div>
                <div className="ui inverted segment">
                  <a href={bossWiki}>OSRS Wiki Strategy</a>
                </div>
                <div className="ui inverted segment">
                  <a href={bossYoutube}>A youtube video of a guide</a>
                </div>
            </div> : ''
            }
          </div>
          <div className="ui vertical segment">
            <button className="ui secondary button" onClick={SelectRandomSkill}>Pick your random skill</button>
            {skillSelected ? <button className="ui secondary button" onClick={ClearSkillSelection}>Clear</button> : ''}
            {skillSelected ?
              <div className="ui piled segments"> 
                <div className="ui inverted segment">
                  <h2>{skillName}</h2>
                </div>
              </div>
              : ''
            }                    
            <Filler />
            <Filler />
            <Filler />
            <Filler />
            <Filler />
          </div>
          <div className="ui vertical segment">
             {bossesSelected || skillSelected ?<button className="ui secondary button" onClick={ClearAllSelections}>Clear All</button>: '' }
          </div>        

          <div className="ui vertical segment">
              {!futureSelected ? <button className="ui secondary button" onClick={SelectFuture}>This site's future</button> : ''}
              {futureSelected ?
                <div className="ui piled segments"> 
                  <div className="ui inverted segment">
                  <Future />
                  <Filler />
                  <Filler />
                    {donationSelected ? <Donation />: ''}
                    {!donationSelected ? <button className="ui secondary button" onClick={SelectDonation}>Support the site</button> : ''}
                    
                  </div>
                </div>
                : ''
              }
              {donationSelected || futureSelected ? <button className="ui secondary button" onClick={ClearDonationFuture}>Clear</button> : ''}
            </div>
          </header>
      </div>
  );
}

export default App;

/*

              {!donationSelected ? <button className="ui secondary button" onClick={SelectDonation}>This Site's Future</button> : ''}
              {donationSelected ?
                <div className="ui piled segments"> 
                  <div className="ui inverted segment">
                    <Donation />
                    {futureSelected ? <Future />: ''}
                    {!futureSelected ? <button className="ui secondary button" onClick={SelectFuture}>Site's Future</button> : ''}
                    {donationSelected || futureSelected ? <button className="ui secondary button" onClick={ClearDonationFuture}>Clear</button> : ''}
                  </div>
                </div>
                : ''
              }


*/
