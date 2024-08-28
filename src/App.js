import './App.css';
import React, { useState, useEffect } from 'react';

import Donation from './components/donation';
import Future from './components/future';
import OtherProjects from './components/OtherProjects';
// Add new flag to all bosses called isMinigame and default to false
const bosses = [
  {
    name: 'Kree\'arra',
    isGWD: true,
    isWILDY: false,
    isMulti: true,
    isRaids: false,
    isMinigame: false,
    youtube: 'https://youtu.be/Xvbmz3Itfx8',
    osrswiki: 'https://oldschool.runescape.wiki/w/Kree%27arra/Strategies'
  },
  {
    name: 'General Graardor',
    isGWD: true,
    isWILDY: false,
    isMulti: true,
    isRaids: false,
    isMinigame: false,
    youtube: 'https://youtu.be/JK3_IDlQzUI',
    osrswiki: 'https://oldschool.runescape.wiki/w/General_Graardor/Strategies'
  },
  {
    name: 'K\'ril Tsutsaroth',
    isGWD: true,
    isWILDY: false,
    isMulti: true,
    isRaids: false,
    isMinigame: false,
    youtube: 'https://youtu.be/bIVvp50wrNA',
    osrswiki: 'https://oldschool.runescape.wiki/w/K%27ril_Tsutsaroth/Strategies'
  },
  {
    name: 'Commander Zilyana',
    isGWD: true,
    isWILDY: false,
    isMulti: true,
    isRaids: false,
    isMinigame: false,
    youtube: 'https://youtu.be/jWaIYzH5raE',
    osrswiki: 'https://oldschool.runescape.wiki/w/Commander_Zilyana/Strategies'
  },
  {
    name: 'Callisto',
    isGWD: false,
    isWILDY: true,
    isMulti: true,
    isRaids: false,
    isMinigame: false,
    youtube: 'https://youtu.be/M3HB0g1vJsY',
    osrswiki: 'https://oldschool.runescape.wiki/w/Callisto/Strategies'
  },
  {
    name: 'Chaos Elemental',
    isGWD: false,
    isWILDY: true,
    isMulti: false,
    isRaids: false,
    isMinigame: false,
    youtube: 'https://youtu.be/OZLUJA_y7hw',
    osrswiki: 'https://oldschool.runescape.wiki/w/Chaos_Elemental/Strategies'
  },
  {
    name: 'Crazy Archaeologist',
    isGWD: false,
    isWILDY: true,
    isMulti: false,
    isRaids: false,
    isMinigame: false,
    youtube: 'https://youtu.be/lujbZUGMz7g',
    osrswiki: 'https://oldschool.runescape.wiki/w/Crazy_archaeologist/Strategies'
  },
  {
    name: 'King Black Dragon',
    isGWD: false,
    isWILDY: true,
    isMulti: true,
    isRaids: false,
    isMinigame: false,
    youtube: 'https://youtu.be/UVH7j_5xP6g',
    osrswiki: 'https://oldschool.runescape.wiki/w/King_Black_Dragon/Strategies'
  },
  {
    name: 'Scorpio',
    isGWD: false,
    isWILDY: true,
    isMulti: true,
    isRaids: false,
    isMinigame: false,
    youtube: 'https://youtu.be/mMS20r5xEyE',
    osrswiki: 'https://oldschool.runescape.wiki/w/Scorpia/Strategies'
  },
  {
    name: 'Venenatis',
    isGWD: false,
    isWILDY: true,
    isMulti: true,
    isRaids: false,
    isMinigame: false,
    youtube: 'https://youtu.be/KvlkjdOB4tg',
    osrswiki: 'https://oldschool.runescape.wiki/w/Venenatis/Strategies'
  },
  {
    name: 'Vet\'ion',
    isGWD: false,
    isWILDY: true,
    isMulti: true,
    isRaids: false,
    isMinigame: false,
    youtube: 'https://youtu.be/2yXc9bKdvOE',
    osrswiki: 'https://oldschool.runescape.wiki/w/Vet%27ion/Strategies'
  },
  {
    name: 'Obor',
    isGWD: false,
    isWILDY: false,
    isMulti: false,
    isRaids: false,
    isMinigame: false,
    youtube: 'https://youtu.be/4VXoE6-5cA4',
    osrswiki: 'https://oldschool.runescape.wiki/w/Obor'
  },
  {
    name: 'Brophyta',
    isGWD: false,
    isWILDY: false,
    isMulti: false,
    isRaids: false,
    isMinigame: false,
    youtube: 'https://youtu.be/BgbFVxap1Ec',
    osrswiki: 'https://oldschool.runescape.wiki/w/Bryophyta'
  },
  {
    name: 'Tempoross',
    isGWD: false,
    isWILDY: false,
    isMulti: false,
    isRaids: false,
    isMinigame: true,
    youtube: 'https://youtu.be/R4Ws-xxOS-A',
    osrswiki: 'https://oldschool.runescape.wiki/w/Tempoross/Strategies'
  },
  {
    name: 'Guardians of the Rift',
    isGWD: false,
    isWILDY: false,
    isMulti: false,
    isRaids: false,
    isMinigame: true,
    youtube: 'https://youtu.be/IH57v4PqsUM',
    osrswiki: 'https://oldschool.runescape.wiki/w/Guardians_of_the_Rift'
  },
  {
    name: 'Wintertodt',
    isGWD: false,
    isWILDY: false,
    isMulti: false,
    isRaids: false,
    isMinigame: true,
    youtube: 'https://youtu.be/5mOXlO0DzU8',
    osrswiki: 'https://oldschool.runescape.wiki/w/Wintertodt/Strategies'
  },
  {
    name: 'Zalcano',
    isGWD: false,
    isWILDY: false,
    isMulti: false,
    isRaids: false,
    isMinigame: true,
    youtube: 'https://youtu.be/aP56mYJB_EY',
    osrswiki: 'https://oldschool.runescape.wiki/w/Zalcano/Strategies'
  },
  {
    name: 'Chambers of Xeric',
    isGWD: false,
    isWILDY: false,
    isMulti: false,
    isRaids: true,
    isMinigame: false,
    youtube: 'https://youtu.be/wlmYhW6qmmw',
    osrswiki: 'https://oldschool.runescape.wiki/w/Chambers_of_Xeric/Strategies'
  },
  {
    name: 'Chambers of Xeric (Challenge Mode)',
    isGWD: false,
    isWILDY: false,
    isMulti: false,
    isRaids: true,
    isMinigame: false,
    youtube: 'https://youtu.be/wlmYhW6qmmw',
    osrswiki: 'https://oldschool.runescape.wiki/w/Chambers_of_Xeric/Strategies'
  },
  {
    name: 'Theater of Blood',
    isGWD: false,
    isWILDY: false,
    isMulti: false,
    isRaids: true,
    isMinigame: false,
    youtube: 'https://youtu.be/7hzX4552lso',
    osrswiki: 'https://oldschool.runescape.wiki/w/Theatre_of_Blood/Strategies'
  },
  {
    name: 'Theater of Blood (Hard Mode)',
    isGWD: false,
    isWILDY: false,
    isMulti: false,
    isRaids: true,
    isMinigame: false,
    youtube: 'https://youtu.be/7hzX4552lso',
    osrswiki: 'https://oldschool.runescape.wiki/w/Theatre_of_Blood/Strategies'
  },
  {
    name: 'Giant Mole',
    isGWD: false,
    isWILDY: false,
    isMulti: true,
    isRaids: false,
    isMinigame: false,
    youtube: 'https://youtu.be/Tl1aNgoO2hs',
    osrswiki: 'https://oldschool.runescape.wiki/w/Giant_Mole/Strategies'
  },
  {
    name: 'Deranged Archaeologist',
    isGWD: false,
    isWILDY: false,
    isMulti: true,
    isRaids: false,
    isMinigame: false,
    youtube: 'https://youtu.be/yG0h2bKOzuY',
    osrswiki: 'https://oldschool.runescape.wiki/w/Deranged_archaeologist/Strategies'
  },
  {
    name: 'Dagannoth Kings',
    isGWD: false,
    isWILDY: false,
    isMulti: true,
    isRaids: false,
    isMinigame: false,
    youtube: 'https://youtu.be/pfjvjt95Fow',
    osrswiki: 'https://oldschool.runescape.wiki/w/Dagannoth_Kings/Strategies'
  },
  {
    name: 'Sarachnis',
    isGWD: false,
    isWILDY: false,
    isMulti: true,
    isRaids: false,
    isMinigame: false,
    youtube: 'https://youtu.be/Ce_jV9iJNiE',
    osrswiki: 'https://oldschool.runescape.wiki/w/Sarachnis/Strategies'
  },
  {
    name: 'Kalphite Queen',
    isGWD: false,
    isWILDY: false,
    isMulti: true,
    isRaids: false,
    isMinigame: false,
    youtube: 'https://youtu.be/qmFvRtJkKHk',
    osrswiki: 'https://oldschool.runescape.wiki/w/Kalphite_Queen/Strategies'
  },
  {
    name: 'Zulrah',
    isGWD: false,
    isWILDY: false,
    isMulti: false,
    isRaids: false,
    isMinigame: false,
    youtube: 'https://youtu.be/CZFzB71k6wU',
    osrswiki: 'https://oldschool.runescape.wiki/w/Zulrah/Strategies'
  },
  {
    name: 'Vorkath',
    isGWD: false,
    isWILDY: false,
    isMulti: false,
    isRaids: false,
    isMinigame: false,
    youtube: 'https://youtu.be/d6kR7eBSw1k',
    osrswiki: 'https://oldschool.runescape.wiki/w/Vorkath/Strategies'
  },
  {
    name: 'Corporeal Beast',
    isGWD: false,
    isWILDY: false,
    isMulti: true,
    isRaids: false,
    isMinigame: false,
    youtube: 'https://youtu.be/3ZNGpC90zEI',
    osrswiki: 'https://oldschool.runescape.wiki/w/Corporeal_Beast/Strategies'
  },
  {
    name: 'The Nightmare',
    isGWD: false,
    isWILDY: false,
    isMulti: true,
    isRaids: false,
    isMinigame: false,
    youtube: 'https://youtu.be/tihXu1-KYVk',
    osrswiki: 'https://oldschool.runescape.wiki/w/The_Nightmare/Strategies'
  },
  {
    name: 'Phosani\'s Nightmare',
    isGWD: false,
    isWILDY: false,
    isMulti: false,
    isRaids: false,
    isMinigame: false,
    youtube: 'https://youtu.be/pEMxp1PA93A',
    osrswiki: 'https://oldschool.runescape.wiki/w/Phosani%27s_Nightmare'
  },
  {
    name: 'Nex',
    isGWD: false,
    isWILDY: false,
    isMulti: true,
    isRaids: false,
    isMinigame: false,
    youtube: 'https://youtu.be/6f_eFLBft-s',
    osrswiki: 'https://oldschool.runescape.wiki/w/Nex'
  },
  {
    name: 'Tombs of Amascut (Entry Mode)',
    isGWD: false,
    isWILDY: false,
    isMulti: false,
    isRaids: true,
    isMinigame: false,
    youtube: 'https://youtu.be/RkqAFedFpYw',
    osrswiki: 'https://oldschool.runescape.wiki/w/Tombs_of_Amascut'
  },
  {
    name: 'Tombs of Amascut (Normal Mode)',
    isGWD: false,
    isWILDY: false,
    isMulti: false,
    isRaids: true,
    isMinigame: false,
    youtube: 'https://youtu.be/Lf_xslLv744',
    osrswiki: 'https://oldschool.runescape.wiki/w/Tombs_of_Amascut'
  },
  {
    name: 'Tombs of Amascut (Expert Mode)',
    isGWD: false,
    isWILDY: false,
    isMulti: false,
    isRaids: true,
    isMinigame: false,
    youtube: 'https://youtu.be/eS6PsclMwKo',
    osrswiki: 'https://oldschool.runescape.wiki/w/Tombs_of_Amascut'
  },
  {
    name: 'Calvar\'ion',
    isGWD: false,
    isWILDY: true,
    isMulti: false,
    isRaids: false,
    isMinigame: false,
    youtube: 'https://youtu.be/ZeCtopOim9I',
    osrswiki: 'https://oldschool.runescape.wiki/w/Calvar%27ion'
  },
  {
    name: 'Spindel',
    isGWD: false,
    isWILDY: true,
    isMulti: false,
    isRaids: false,
    isMinigame: false,
    youtube: 'https://youtu.be/Esi8nSgmZZ8',
    osrswiki: 'https://oldschool.runescape.wiki/w/Spindel'
  },
  {
    name: 'Artio',
    isGWD: false,
    isWILDY: true,
    isMulti: false,
    isRaids: false,
    isMinigame: false,
    youtube: 'https://youtu.be/1kifybH4PWg',
    osrswiki: 'https://oldschool.runescape.wiki/w/Artio'
  },
  {
    name: 'Phantom Muspah',
    isGWD: false,
    isWILDY: false,
    isMulti: false,
    isRaids: false,
    isMinigame: false,
    youtube: 'https://youtu.be/FybdiHaqOh4',
    osrswiki: 'https://oldschool.runescape.wiki/w/Phantom_Muspah'
  },
  {
    name: 'TzKal-Zuk',
    isGWD: false,
    isWILDY: false,
    isMulti: false,
    isRaids: false,
    isMinigame: true,
    youtube: 'https://youtu.be/uaoSaUT4SZc',
    osrswiki: 'https://oldschool.runescape.wiki/w/TzKal-Zuk'
  },
  {
    name: 'TzTok-Jad',
    isGWD: false,
    isWILDY: false,
    isMulti: false,
    isRaids: false,
    isMinigame: true,
    youtube: 'https://youtu.be/NzADS_aFTZ8',
    osrswiki: 'https://oldschool.runescape.wiki/w/TzTok-Jad'
  },
  {
    name: 'Crystalline Hunllef',
    isGWD: false,
    isWILDY: false,
    isMulti: false,
    isRaids: false,
    isMinigame: true,
    youtube: 'https://youtu.be/CDuv_0XmGEY',
    osrswiki: 'https://oldschool.runescape.wiki/w/Crystalline_Hunllef'
  },
  {
    name: 'Corrupted Hunllef',
    isGWD: false,
    isWILDY: false,
    isMulti: false,
    isRaids: false,
    isMinigame: true,
    youtube: 'https://youtu.be/5i7uQ5SevSw',
    osrswiki: 'https://oldschool.runescape.wiki/w/Corrupted_Hunllef'
  }
]
const skills = [
  {
    name: 'Agility',
    isCombat: false,
    isSkilling: true,
    isF2p: false,
  },
  {
    name: 'Attack',
    isCombat: true,
    isSkilling: false,
    isF2p: true,
  },
  {
    name: 'Strength',
    isCombat: true,
    isSkilling: false,
    isF2p: true,
  },
  {
    name: 'Defence',
    isCombat: true,
    isSkilling: false,
    isF2p: true,
  },
  {
    name: 'Ranged',
    isCombat: true,
    isSkilling: false,
    isF2p: true,
  },
  {
    name: 'Prayer',
    isCombat: false,
    isSkilling: true,
    isF2p: true,
  },
  {
    name: 'Magic',
    isCombat: true,
    isSkilling: false,
    isF2p: true,
  },
  {
    name: 'Runecraft',
    isCombat: false,
    isSkilling: true,
    isF2p: true,
  },
  {
    name: 'Hitpoints',
    isCombat: true,
    isSkilling: false,
    isF2p: true,
  },
  {
    name: 'Crafting',
    isCombat: false,
    isSkilling: true,
    isF2p: true,
  },
  {
    name: 'Mining',
    isCombat: false,
    isSkilling: true,
    isF2p: true,
  },
  {
    name: 'Smithing',
    isCombat: false,
    isSkilling: true,
    isF2p: true,
  },
  {
    name: 'Fishing',
    isCombat: false,
    isSkilling: true,
    isF2p: true,
  },
  {
    name: 'Cooking',
    isCombat: false,
    isSkilling: true,
    isF2p: true,
  },
  {
    name: 'Firemaking',
    isCombat: false,
    isSkilling: true,
    isF2p: true,
  },
  {
    name: 'Woodcutting',
    isCombat: false,
    isSkilling: true,
    isF2p: true,
  },
  {
    name: 'Fletching',
    isCombat: false,
    isSkilling: true,
    isF2p: false,
  },
  {
    name: 'Herblore',
    isCombat: false,
    isSkilling: true,
    isF2p: false,
  },
  {
    name: 'Thieving',
    isCombat: false,
    isSkilling: true,
    isF2p: false,
  },
  {
    name: 'Farming',
    isCombat: false,
    isSkilling: true,
    isF2p: false,
  },
  {
    name: 'Slayer',
    isCombat: true,
    isSkilling: false,
    isF2p: false,
  },
  {
    name: 'Hunter',
    isCombat: false,
    isSkilling: true,
    isF2p: false,
  },
  {
    name: 'Construction',
    isCombat: false,
    isSkilling: true,
    isF2p: false,
  },
];



function App() {
  //GLOBAL
  const [bossesSelected, setBossesSelected] = useState(false);
  const [skillSelected, setSkillSelected] = useState(false);
  const [donationSelected, setDonationSelected] = useState(false);
  const [futureSelected, setFutureSelected] = useState(false);
  const [otherProjectsSelected, setOtherProjectsSelected] = useState(false);

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

  const [bossFilters, setBossFilters] = useState({
    isGWD: false,
    isWILDY: false,
    isMulti: false,
    isRaids: false,
    isMinigame: false
  });
  const [skillFilters, setSkillFilters] = useState({
    isCombat: false,
    isF2p: false,
    
  });
  const [filteredBosses, setFilteredBosses] = useState(bosses);
  const [filteredSkills, setFilteredSkills] = useState(skills);
  const [error, setError] = useState(null);

  useEffect(() => {
    const newFilteredBosses = bosses.filter(boss => {
      return Object.keys(bossFilters).every(key => {
        return !bossFilters[key] || boss[key];
      });
    });
    setFilteredBosses(newFilteredBosses);
  }, [bossFilters]);

  useEffect(() => {
    const newFilteredSkills = skills.filter(skill => {
      return !skillFilters.isCombat || skill.isCombat;
    });
    setFilteredSkills(newFilteredSkills);
  }, [skillFilters]);

  const handleBossFilterChange = (filterName) => {
    setBossFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName]
    }));
  };

  const handleSkillFilterChange = (filterName) => {
    setSkillFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName]
    }));
  };

  const SelectRandomBoss = () => {
    if (filteredBosses.length === 0) {
      setError("No bosses match the selected filters. Please adjust your filters and try again.");
      setBossesSelected(false);
      return;
    }

    setError(null);
    setBossesSelected(true);
    setSkillSelected(false);
    const randomNum = getRandomNumber(filteredBosses.length);
    const selectedBoss = filteredBosses[randomNum];
    setBossName(selectedBoss.name);
    setBossIsGWD(selectedBoss.isGWD);
    setBossIsWildy(selectedBoss.isWILDY);
    setBossIsMulti(selectedBoss.isMulti);
    setBossIsRaids(selectedBoss.isRaids);
    setBossYoutube(selectedBoss.youtube);
    setBossWiki(selectedBoss.osrswiki);
  }

  const SelectRandomSkill = () => {
    if (filteredSkills.length === 0) {
      setError("No skills match the selected filters. Please adjust your filters and try again.");
      setSkillSelected(false);
      return;
    }

    setError(null);
    setSkillSelected(true);
    setBossesSelected(false);
    const randomNum = getRandomNumber(filteredSkills.length);
    setSkillName(filteredSkills[randomNum].name);
  }

  const SelectDonation = () => {
    setDonationSelected(true);
  }

  const SelectFuture = () => {
    setFutureSelected(true);
  }

  const SelectOtherProjects = () => {
    setOtherProjectsSelected(true);
  }

  const ClearAllSelections = () => {
    setBossesSelected(false);
    setSkillSelected(false);
    setFutureSelected(false);
    setOtherProjectsSelected(false);
    setDonationSelected(false);
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
    setOtherProjectsSelected(false);
  }

  // Simplified selection functions
  const selectContent = (contentType) => {
    ClearAllSelections();
    switch(contentType) {
      case 'boss':
        SelectRandomBoss();
        break;
      case 'skill':
        SelectRandomSkill();
        break;
      case 'future':
        setFutureSelected(true);
        break;
      case 'otherProjects':
        setOtherProjectsSelected(true);
        break;
      case 'donation':
        setDonationSelected(true);
        break;
    }
  }

  const getBossAttributes = (boss) => {
    const attributes = [
      { name: 'Wilderness', value: boss.isWILDY },
      { name: 'God Wars Dungeon', value: boss.isGWD },
      { name: 'Multi-combat', value: boss.isMulti },
      { name: 'Raid', value: boss.isRaids },
      { name: 'Minigame', value: boss.isMinigame },
    ];

    return attributes.filter(attr => attr.value).map(attr => attr.name);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="button-container">
          <div className="main-buttons">
            <button className="ui button main-button" onClick={() => selectContent('boss')}>Pick your random boss</button>
            <button className="ui button main-button" onClick={() => selectContent('skill')}>Pick your random skill</button>
          </div>
          <div className="secondary-buttons">
            <button className="ui button" onClick={() => selectContent('future')}>This site's future</button>
            <button className="ui button" onClick={() => selectContent('otherProjects')}>Other OSRS Projects</button>
            <button className="ui button" onClick={ClearAllSelections}>Clear All</button>
          </div>
        </div>

        {bossesSelected && (
          <div className="filter-container">
            <h3>Boss Filters:</h3>
            <div className="filter-buttons">
              <button 
                className={`ui toggle button ${bossFilters.isGWD ? 'active' : ''}`} 
                onClick={() => handleBossFilterChange('isGWD')}
              >
                God Wars Dungeon
              </button>
              <button 
                className={`ui toggle button ${bossFilters.isWILDY ? 'active' : ''}`} 
                onClick={() => handleBossFilterChange('isWILDY')}
              >
                Wilderness
              </button>
              <button 
                className={`ui toggle button ${bossFilters.isMulti ? 'active' : ''}`} 
                onClick={() => handleBossFilterChange('isMulti')}
              >
                Multi-combat
              </button>
              <button 
                className={`ui toggle button ${bossFilters.isRaids ? 'active' : ''}`} 
                onClick={() => handleBossFilterChange('isRaids')}
              >
                Raids
              </button>
              <button 
                className={`ui toggle button ${bossFilters.isMinigame ? 'active' : ''}`} 
                onClick={() => handleBossFilterChange('isMinigame')}
              >
                Minigame
              </button>
            </div>
            {error && <p className="error-message">{error}</p>}
            <p>Matching bosses: {filteredBosses.length}</p>
          </div>
        )}

        {skillSelected && (
          <div className="filter-container">
            <h3>Skill Filters:</h3>
            <div className="filter-buttons">
              <button 
                className={`ui toggle button ${skillFilters.isCombat ? 'active' : ''}`} 
                onClick={() => handleSkillFilterChange('isCombat')}
              >
                Combat Skills
              </button>
              <button 
                className={`ui toggle button ${skillFilters.isF2p ? 'active' : ''}`} 
                onClick={() => handleSkillFilterChange('isF2p')}
              >
                F2P Skills
              </button>
            </div>
            {error && <p className="error-message">{error}</p>}
            <p>Matching skills: {filteredSkills.length}</p>
          </div>
        )}

        <div className="content-container">
          {bossesSelected && (
            <div className="ui piled segments">
              <div className="ui inverted segment">
                <h2>{bossName}</h2>
              </div>
              <div className="ui inverted segment">
                <p>Attributes:</p>
                <div className="boss-attributes">
                  {getBossAttributes(bosses.find(b => b.name === bossName)).map((attr, index) => (
                    <span key={index} className="boss-attribute">{attr}</span>
                  ))}
                </div>
              </div>
              <div className="ui inverted segment">
                <a href={bossWiki} target="_blank" rel="noopener noreferrer">OSRS Wiki Strategy</a>
              </div>
              <div className="ui inverted segment">
                <a href={bossYoutube} target="_blank" rel="noopener noreferrer">YouTube Guide</a>
              </div>
            </div>
          )}

          {skillSelected && (
            <div className="ui piled segments">
              <div className="ui inverted segment">
                <h2>{skillName}</h2>
              </div>
            </div>
          )}

          {futureSelected && (
            <div className="ui piled segments">
              <div className="ui inverted segment">
                <Future />
                <button className="ui secondary button" onClick={() => selectContent('donation')}>Support the site</button>
              </div>
            </div>
          )}

          {otherProjectsSelected && (
            <OtherProjects />
          )}

          {donationSelected && (
            <div className="ui piled segments">
              <div className="ui inverted segment">
                <Donation />
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
