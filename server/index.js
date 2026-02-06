const express = require('express');
const cors = require('cors');
const { getStats, getStatsByGamemode } = require('osrs-json-hiscores');

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for React dev server
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000']
}));

app.use(express.json());

// Get player stats with auto-detected gamemode
app.get('/api/hiscores/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const stats = await getStats(username);
    res.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error.message);
    if (error.message.includes('Player not found')) {
      res.status(404).json({ error: 'Player not found' });
    } else {
      res.status(500).json({ error: 'Failed to fetch player stats' });
    }
  }
});

// Get player stats for specific gamemode
app.get('/api/hiscores/:username/:gamemode', async (req, res) => {
  try {
    const { username, gamemode } = req.params;

    // Validate gamemode
    const validGamemodes = ['main', 'ironman', 'hardcore', 'ultimate', 'deadman', 'seasonal'];
    if (!validGamemodes.includes(gamemode)) {
      return res.status(400).json({ error: 'Invalid gamemode' });
    }

    const stats = await getStatsByGamemode(username, gamemode);
    res.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error.message);
    if (error.message.includes('Player not found') || error.message.includes('404')) {
      res.status(404).json({ error: 'Player not found on this gamemode' });
    } else {
      res.status(500).json({ error: 'Failed to fetch player stats' });
    }
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`OSRNG Hiscores server running on port ${PORT}`);
});
