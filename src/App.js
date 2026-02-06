import './App.css';
import React, { useState, useEffect } from 'react';

import UsernameInput from './components/UsernameInput';
import { fetchBosses, fetchSkills, clearCache } from './services/wikiParser';
import { getPlayerStats, getBossKillCount, getSkillData, formatNumber } from './services/hiscoresApi';



function App() {
  //GLOBAL
  const [bossesSelected, setBossesSelected] = useState(false);
  const [skillSelected, setSkillSelected] = useState(false);

  // Data from wiki
  const [bosses, setBosses] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  // Player stats from hiscores
  const [playerStats, setPlayerStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(false);
  const [statsError, setStatsError] = useState(null);

  //BOSSES
  const [bossName, setBossName] = useState('');
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
  const [filteredBosses, setFilteredBosses] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [error, setError] = useState(null);

  // Fetch data from OSRS Wiki on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [bossData, skillData] = await Promise.all([
          fetchBosses(),
          fetchSkills()
        ]);
        setBosses(bossData);
        setSkills(skillData);
        setFilteredBosses(bossData);
        setFilteredSkills(skillData);
        setError(null);
      } catch (err) {
        console.error('Failed to load data from wiki:', err);
        setError('Failed to load data from OSRS Wiki. Please try refreshing the page.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Refresh data from wiki
  const refreshData = async () => {
    try {
      setLoading(true);
      clearCache();
      const [bossData, skillData] = await Promise.all([
        fetchBosses(true),
        fetchSkills(true)
      ]);
      setBosses(bossData);
      setSkills(skillData);
      setFilteredBosses(bossData);
      setFilteredSkills(skillData);
      setError(null);
    } catch (err) {
      console.error('Failed to refresh data:', err);
      setError('Failed to refresh data from OSRS Wiki.');
    } finally {
      setLoading(false);
    }
  };

  // Handle username lookup
  const handleStatsLookup = async (username, gamemode) => {
    if (!username) {
      setPlayerStats(null);
      setStatsError(null);
      return;
    }

    try {
      setStatsLoading(true);
      setStatsError(null);
      const stats = await getPlayerStats(username, gamemode);
      setPlayerStats(stats);
    } catch (err) {
      console.error('Failed to fetch player stats:', err);
      setStatsError(err.message || 'Failed to fetch player stats');
      setPlayerStats(null);
    } finally {
      setStatsLoading(false);
    }
  };

  // Load saved username on mount
  useEffect(() => {
    const savedUsername = localStorage.getItem('osrng_username');
    const savedGamemode = localStorage.getItem('osrng_gamemode') || 'main';
    if (savedUsername) {
      handleStatsLookup(savedUsername, savedGamemode);
    }
  }, []);

  useEffect(() => {
    if (bosses.length === 0) return;
    const newFilteredBosses = bosses.filter(boss => {
      return Object.keys(bossFilters).every(key => {
        return !bossFilters[key] || boss[key];
      });
    });
    setFilteredBosses(newFilteredBosses);
  }, [bossFilters, bosses]);

  useEffect(() => {
    if (skills.length === 0) return;
    const newFilteredSkills = skills.filter(skill => {
      return !skillFilters.isCombat || skill.isCombat;
    });
    setFilteredSkills(newFilteredSkills);
  }, [skillFilters, skills]);

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

  const ClearAllSelections = () => {
    setBossesSelected(false);
    setSkillSelected(false);
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
      default:
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

  if (loading) {
    return (
      <div className="App">
        <header className="App-header">
          <div className="loading-container">
            <h2>Loading data from OSRS Wiki...</h2>
            <p>Fetching the latest bosses and skills</p>
          </div>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <UsernameInput
          onStatsLoaded={handleStatsLookup}
          loading={statsLoading}
          error={statsError}
        />

        <div className="button-container">
          <div className="main-buttons">
            <button className="ui button main-button" onClick={() => selectContent('boss')} disabled={bosses.length === 0}>Pick your random boss</button>
            <button className="ui button main-button" onClick={() => selectContent('skill')} disabled={skills.length === 0}>Pick your random skill</button>
          </div>
          <div className="secondary-buttons">
            <button className="ui button" onClick={refreshData}>Refresh Data</button>
            <button className="ui button" onClick={ClearAllSelections}>Clear All</button>
            <a href="https://telep.io/pricing" target="_blank" rel="noopener noreferrer" className="ui button support-button">Support</a>
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
              {playerStats && (
                <div className="ui inverted segment player-stats">
                  <p className="stats-label">Your Kill Count:</p>
                  <p className="stats-value">
                    {(() => {
                      const killCount = getBossKillCount(playerStats, bossName);
                      return killCount !== null ? formatNumber(killCount) : 'Not ranked';
                    })()}
                  </p>
                </div>
              )}
              <div className="ui inverted segment">
                <p>Attributes:</p>
                <div className="boss-attributes">
                  {(() => {
                    const boss = bosses.find(b => b.name === bossName);
                    return boss ? getBossAttributes(boss).map((attr, index) => (
                      <span key={index} className="boss-attribute">{attr}</span>
                    )) : null;
                  })()}
                </div>
              </div>
              <div className="ui inverted segment">
                <a href={bossWiki} target="_blank" rel="noopener noreferrer">OSRS Wiki</a>
              </div>
            </div>
          )}

          {skillSelected && (
            <div className="ui piled segments">
              <div className="ui inverted segment">
                <h2>{skillName}</h2>
              </div>
              {playerStats && (
                <div className="ui inverted segment player-stats">
                  {(() => {
                    const skillData = getSkillData(playerStats, skillName);
                    if (skillData) {
                      return (
                        <>
                          <p className="stats-label">Your Level: <span className="stats-value">{skillData.level}</span></p>
                          <p className="stats-label">XP: <span className="stats-value">{formatNumber(skillData.xp)}</span></p>
                        </>
                      );
                    }
                    return <p className="stats-value">Not ranked</p>;
                  })()}
                </div>
              )}
            </div>
          )}
        </div>

        <footer className="app-footer">
          Made by <a href="https://telep.io" target="_blank" rel="noopener noreferrer">telep.io</a>
        </footer>
      </header>
    </div>
  );
}

export default App;
