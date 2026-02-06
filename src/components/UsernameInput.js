import React, { useState, useEffect } from 'react';
import './UsernameInput.css';

const GAMEMODES = [
  { value: 'main', label: 'Main' },
  { value: 'ironman', label: 'Ironman' },
  { value: 'hardcore', label: 'Hardcore' },
  { value: 'ultimate', label: 'Ultimate' }
];

function UsernameInput({ onStatsLoaded, loading, error }) {
  const [username, setUsername] = useState('');
  const [gamemode, setGamemode] = useState('main');
  const [savedUsername, setSavedUsername] = useState('');

  // Load saved username from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('osrng_username');
    const savedMode = localStorage.getItem('osrng_gamemode');
    if (saved) {
      setUsername(saved);
      setSavedUsername(saved);
    }
    if (savedMode) {
      setGamemode(savedMode);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    // Save to localStorage
    localStorage.setItem('osrng_username', username.trim());
    localStorage.setItem('osrng_gamemode', gamemode);
    setSavedUsername(username.trim());

    onStatsLoaded(username.trim(), gamemode);
  };

  const handleClear = () => {
    localStorage.removeItem('osrng_username');
    localStorage.removeItem('osrng_gamemode');
    setUsername('');
    setSavedUsername('');
    onStatsLoaded(null, null);
  };

  return (
    <div className="username-input-container">
      <form onSubmit={handleSubmit} className="username-form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter OSRS username"
          className="username-input"
          maxLength={12}
          disabled={loading}
        />
        <select
          value={gamemode}
          onChange={(e) => setGamemode(e.target.value)}
          className="gamemode-select"
          disabled={loading}
        >
          {GAMEMODES.map(mode => (
            <option key={mode.value} value={mode.value}>
              {mode.label}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="ui button lookup-button"
          disabled={loading || !username.trim()}
        >
          {loading ? 'Loading...' : 'Lookup'}
        </button>
        {savedUsername && (
          <button
            type="button"
            className="ui button clear-button"
            onClick={handleClear}
            disabled={loading}
          >
            Clear
          </button>
        )}
      </form>
      {error && <p className="username-error">{error}</p>}
      {savedUsername && !error && (
        <p className="username-welcome">Playing as: <strong>{savedUsername}</strong></p>
      )}
    </div>
  );
}

export default UsernameInput;
