const WIKI_API_BASE = 'https://oldschool.runescape.wiki/api.php';
const CACHE_KEY_BOSSES = 'osrng_bosses_cache';
const CACHE_KEY_SKILLS = 'osrng_skills_cache';
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

// Combat skills for classification
const COMBAT_SKILLS = ['Attack', 'Strength', 'Defence', 'Ranged', 'Prayer', 'Magic', 'Hitpoints'];

// F2P skills list
const F2P_SKILLS = [
  'Attack', 'Strength', 'Defence', 'Ranged', 'Prayer', 'Magic', 'Hitpoints',
  'Runecraft', 'Crafting', 'Mining', 'Smithing', 'Fishing', 'Cooking',
  'Firemaking', 'Woodcutting'
];

// Keywords to detect boss categories from section headers and context
const CATEGORY_KEYWORDS = {
  isWILDY: ['wilderness', 'wildy'],
  isGWD: ['god wars', 'godwars', 'gwd'],
  isRaids: ['chambers of xeric', 'theatre of blood', 'tombs of amascut', 'raid'],
  isMinigame: ['minigame', 'skilling boss', 'tempoross', 'wintertodt', 'zalcano', 'guardians of the rift', 'gauntlet', 'fight cave', 'inferno']
};

// Known multi-combat bosses (since wiki doesn't explicitly state this)
const MULTI_COMBAT_BOSSES = [
  'general graardor', 'commander zilyana', 'k\'ril tsutsaroth', 'kree\'arra',
  'nex', 'corporeal beast', 'the nightmare', 'dagannoth', 'kalphite queen',
  'giant mole', 'callisto', 'venenatis', 'vet\'ion', 'scorpia', 'sarachnis',
  'king black dragon', 'chaos fanatic'
];

function getCachedData(cacheKey) {
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TTL) {
        return data;
      }
    }
  } catch (e) {
    console.warn('Cache read error:', e);
  }
  return null;
}

function setCachedData(cacheKey, data) {
  try {
    localStorage.setItem(cacheKey, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
  } catch (e) {
    console.warn('Cache write error:', e);
  }
}

async function fetchWikiPage(pageName) {
  const url = `${WIKI_API_BASE}?action=parse&page=${encodeURIComponent(pageName)}&format=json&origin=*`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${pageName}: ${response.status}`);
  }
  const data = await response.json();
  if (data.error) {
    throw new Error(`Wiki API error: ${data.error.info}`);
  }
  return data.parse.text['*'];
}

function detectBossCategory(bossName, sectionContext) {
  const lowerName = bossName.toLowerCase();
  const lowerContext = sectionContext.toLowerCase();

  const categories = {
    isGWD: false,
    isWILDY: false,
    isMulti: false,
    isRaids: false,
    isMinigame: false
  };

  // Check each category
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    for (const keyword of keywords) {
      if (lowerContext.includes(keyword) || lowerName.includes(keyword)) {
        categories[category] = true;
        break;
      }
    }
  }

  // Check multi-combat
  categories.isMulti = MULTI_COMBAT_BOSSES.some(boss => lowerName.includes(boss));

  // GWD bosses are also multi
  if (categories.isGWD) {
    categories.isMulti = true;
  }

  return categories;
}

function generateBossLinks(bossName) {
  const encodedName = encodeURIComponent(bossName.replace(/ /g, '_'));
  return {
    osrswiki: `https://oldschool.runescape.wiki/w/${encodedName}`,
    youtube: null // Wiki doesn't provide YouTube links
  };
}

export async function fetchBosses(forceRefresh = false) {
  if (!forceRefresh) {
    const cached = getCachedData(CACHE_KEY_BOSSES);
    if (cached) {
      return cached;
    }
  }

  const html = await fetchWikiPage('Boss');
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const bosses = [];
  const seenBosses = new Set();

  // Track current section for context
  let currentSection = '';

  // Process the document to find section headers and tables
  const allElements = doc.querySelectorAll('h2, h3, h4, table');

  for (const element of allElements) {
    if (element.tagName.match(/^H[234]$/)) {
      // Update current section context
      const headerText = element.textContent || '';
      currentSection = headerText;
      continue;
    }

    if (element.tagName === 'TABLE') {
      // Look for boss entries in table rows
      const rows = element.querySelectorAll('tr');

      for (const row of rows) {
        // Skip header rows
        if (row.querySelector('th')) continue;

        const cells = row.querySelectorAll('td');
        if (cells.length < 2) continue;

        // First cell usually contains the boss name/link
        const firstCell = cells[0];
        const link = firstCell.querySelector('a');

        if (link) {
          let bossName = link.textContent?.trim();

          // Skip if no name or already seen
          if (!bossName || seenBosses.has(bossName.toLowerCase())) continue;

          // Skip non-boss entries (items, locations, etc.)
          if (bossName.length < 2) continue;

          // Skip entries that look like numbers or levels
          if (/^\d+$/.test(bossName)) continue;

          seenBosses.add(bossName.toLowerCase());

          const categories = detectBossCategory(bossName, currentSection);
          const links = generateBossLinks(bossName);

          bosses.push({
            name: bossName,
            ...categories,
            ...links
          });
        }
      }
    }
  }

  // If parsing didn't find enough bosses, try alternative parsing
  if (bosses.length < 10) {
    // Look for links that point to boss pages
    const allLinks = doc.querySelectorAll('a[href*="/w/"]');

    for (const link of allLinks) {
      const bossName = link.textContent?.trim();
      if (!bossName || seenBosses.has(bossName.toLowerCase())) continue;
      if (bossName.length < 3) continue;
      if (/^\d+$/.test(bossName)) continue;

      // Check if parent context suggests it's a boss
      const parentText = link.closest('td')?.parentElement?.textContent || '';

      // Look for combat level indicators
      if (parentText.match(/level\s*\d+/i) || parentText.match(/\d+\s*hitpoints/i)) {
        seenBosses.add(bossName.toLowerCase());

        const categories = detectBossCategory(bossName, parentText);
        const links = generateBossLinks(bossName);

        bosses.push({
          name: bossName,
          ...categories,
          ...links
        });
      }
    }
  }

  setCachedData(CACHE_KEY_BOSSES, bosses);
  return bosses;
}

export async function fetchSkills(forceRefresh = false) {
  if (!forceRefresh) {
    const cached = getCachedData(CACHE_KEY_SKILLS);
    if (cached) {
      return cached;
    }
  }

  const html = await fetchWikiPage('Skills');
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const skills = [];
  const seenSkills = new Set();

  // Find skill entries - they're typically in tables with skill icons
  const tables = doc.querySelectorAll('table');

  for (const table of tables) {
    const rows = table.querySelectorAll('tr');

    for (const row of rows) {
      const cells = row.querySelectorAll('td');

      for (const cell of cells) {
        // Look for links that might be skill names
        const links = cell.querySelectorAll('a');

        for (const link of links) {
          const skillName = link.textContent?.trim();

          if (!skillName || seenSkills.has(skillName.toLowerCase())) continue;
          if (skillName.length < 3) continue;

          // Check if it's a known skill name pattern (capitalized single word or two words)
          if (!/^[A-Z][a-z]+(\s[A-Z]?[a-z]+)?$/.test(skillName)) continue;

          // Check against known combat and F2P skills to validate
          const isCombat = COMBAT_SKILLS.includes(skillName);
          const isF2p = F2P_SKILLS.includes(skillName);
          const isSkilling = !isCombat;

          // Only add if it looks like a real skill
          if (isCombat || isF2p ||
              ['Agility', 'Thieving', 'Slayer', 'Farming', 'Hunter', 'Construction',
               'Herblore', 'Fletching', 'Sailing'].includes(skillName)) {
            seenSkills.add(skillName.toLowerCase());

            skills.push({
              name: skillName,
              isCombat,
              isSkilling,
              isF2p
            });
          }
        }
      }
    }
  }

  // Fallback: if parsing didn't work well, use known skill list
  if (skills.length < 20) {
    const allSkillNames = [
      'Attack', 'Strength', 'Defence', 'Ranged', 'Prayer', 'Magic', 'Hitpoints',
      'Runecraft', 'Crafting', 'Mining', 'Smithing', 'Fishing', 'Cooking',
      'Firemaking', 'Woodcutting', 'Agility', 'Herblore', 'Thieving', 'Fletching',
      'Slayer', 'Farming', 'Construction', 'Hunter'
    ];

    skills.length = 0; // Clear any partial results

    for (const skillName of allSkillNames) {
      skills.push({
        name: skillName,
        isCombat: COMBAT_SKILLS.includes(skillName),
        isSkilling: !COMBAT_SKILLS.includes(skillName),
        isF2p: F2P_SKILLS.includes(skillName)
      });
    }
  }

  setCachedData(CACHE_KEY_SKILLS, skills);
  return skills;
}

export function clearCache() {
  localStorage.removeItem(CACHE_KEY_BOSSES);
  localStorage.removeItem(CACHE_KEY_SKILLS);
}
