const API_BASE = 'http://localhost:3001/api';

// Mapping from wiki boss names to hiscores API keys
// Based on osrs-json-hiscores boss names
export const BOSS_NAME_TO_KEY = {
  // God Wars Dungeon
  "Kree'arra": "kreeArra",
  "General Graardor": "generalGraardor",
  "K'ril Tsutsaroth": "krilTsutsaroth",
  "Commander Zilyana": "commanderZilyana",
  "Nex": "nex",

  // Wilderness bosses
  "Callisto": "callisto",
  "Artio": "artio",
  "Chaos Elemental": "chaosElemental",
  "Chaos Fanatic": "chaosFanatic",
  "Crazy Archaeologist": "crazyArchaeologist",
  "King Black Dragon": "kingBlackDragon",
  "Scorpia": "scorpia",
  "Venenatis": "venenatis",
  "Spindel": "spindel",
  "Vet'ion": "vetion",
  "Calvar'ion": "calvarion",

  // Raids
  "Chambers of Xeric": "chambersOfXeric",
  "Chambers of Xeric (Challenge Mode)": "chambersOfXericChallengeMode",
  "Theatre of Blood": "theatreOfBlood",
  "Theater of Blood": "theatreOfBlood",
  "Theatre of Blood (Hard Mode)": "theatreOfBloodHardMode",
  "Theater of Blood (Hard Mode)": "theatreOfBloodHardMode",
  "Tombs of Amascut": "tombsOfAmascut",
  "Tombs of Amascut (Entry Mode)": "tombsOfAmascut",
  "Tombs of Amascut (Normal Mode)": "tombsOfAmascut",
  "Tombs of Amascut (Expert Mode)": "tombsOfAmascutExpertMode",

  // Other bosses
  "Zulrah": "zulrah",
  "Vorkath": "vorkath",
  "Corporeal Beast": "corporealBeast",
  "Giant Mole": "giantMole",
  "Dagannoth Kings": "dagannothKings",
  "Dagannoth Prime": "dagannothPrime",
  "Dagannoth Rex": "dagannothRex",
  "Dagannoth Supreme": "dagannothSupreme",
  "Kalphite Queen": "kalphiteQueen",
  "Sarachnis": "sarachnis",
  "The Nightmare": "nightmare",
  "Phosani's Nightmare": "phosanisNightmare",
  "Phantom Muspah": "phantomMuspah",
  "Obor": "obor",
  "Bryophyta": "bryophyta",
  "Brophyta": "bryophyta",
  "Deranged Archaeologist": "derangedArchaeologist",

  // Slayer bosses
  "Abyssal Sire": "abyssalSire",
  "Alchemical Hydra": "alchemicalHydra",
  "Cerberus": "cerberus",
  "Grotesque Guardians": "grotesqueGuardians",
  "Kraken": "kraken",
  "Thermonuclear Smoke Devil": "thermonuclearSmokeDevil",

  // Minigame bosses
  "TzTok-Jad": "tzTokJad",
  "TzKal-Zuk": "tzKalZuk",
  "Crystalline Hunllef": "gauntlet",
  "Corrupted Hunllef": "corruptedGauntlet",
  "Tempoross": "tempoross",
  "Wintertodt": "wintertodt",
  "Zalcano": "zalcano",

  // Other
  "Barrows": "barrowsChests",
  "Hespori": "hespori",
  "Mimic": "mimic",
  "Skotizo": "skotizo",
  "The Gauntlet": "gauntlet",
  "The Corrupted Gauntlet": "corruptedGauntlet",
  "Araxxor": "araxxor",
  "Duke Sucellus": "dukeSucellus",
  "Vardorvis": "vardorvis",
  "The Leviathan": "leviathan",
  "The Whisperer": "whisperer",
  "Scurrius": "scurrius",
  "Moons of Peril": "moonsOfPeril",
  "Sol Heredit": "solHeredit",
  "Amoxliatl": "amoxliatl",
  "The Hueycoatl": "hueycoatl"
};

// Get player stats from our backend
export async function getPlayerStats(username, gamemode = 'main') {
  const response = await fetch(
    `${API_BASE}/hiscores/${encodeURIComponent(username)}/${gamemode}`
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || 'Failed to fetch player stats');
  }

  return response.json();
}

// Get player stats with auto-detected gamemode
export async function getPlayerStatsAuto(username) {
  const response = await fetch(
    `${API_BASE}/hiscores/${encodeURIComponent(username)}`
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || 'Failed to fetch player stats');
  }

  return response.json();
}

// Get boss kill count from player stats
export function getBossKillCount(playerStats, bossName) {
  if (!playerStats || !playerStats.bosses) return null;

  const bossKey = BOSS_NAME_TO_KEY[bossName];
  if (!bossKey) return null;

  const bossData = playerStats.bosses[bossKey];
  if (!bossData || bossData.rank === -1) return null;

  return bossData.score;
}

// Get skill data from player stats
export function getSkillData(playerStats, skillName) {
  if (!playerStats || !playerStats.skills) return null;

  const skillKey = skillName.toLowerCase();
  const skillData = playerStats.skills[skillKey];

  if (!skillData || skillData.rank === -1) return null;

  return {
    level: skillData.level,
    xp: skillData.xp,
    rank: skillData.rank
  };
}

// Format number with commas
export function formatNumber(num) {
  if (num === null || num === undefined) return 'N/A';
  return num.toLocaleString();
}
