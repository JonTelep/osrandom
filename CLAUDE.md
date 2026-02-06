# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

OSRng is an Old School RuneScape (OSRS) content randomizer web application built with React. It helps players decide what PvM bosses, skills, or minigames to engage in through randomization with filtering options.

## Build & Development Commands

```bash
npm start          # Start development server (port 3000)
npm run build      # Create production build
npm test           # Run tests (Jest via react-scripts)
```

## Tech Stack

- React 17.0.2 with Create React App
- Semantic UI 2.4.1 (via CDN)
- Framer Motion for animations
- Chakra UI components

## Architecture

### Main Application Structure

The app is primarily contained in `src/App.js`, which manages:
- **Dynamic data fetching**: Boss and skill data is fetched from the OSRS Wiki at runtime
- **Navigation state**: Boolean flags for section visibility (bossesSelected, skillSelected, etc.)
- **Filter state**: Active filters and filtered content arrays
- **Loading state**: Shows loading indicator while fetching from wiki

### Wiki Parser Service (`src/services/wikiParser.js`)

Fetches and parses boss/skill data from the OSRS Wiki using the MediaWiki API:
- `fetchBosses()`: Fetches from `https://oldschool.runescape.wiki/w/Boss`, parses HTML tables
- `fetchSkills()`: Fetches from `https://oldschool.runescape.wiki/w/Skills`, parses skill listings
- `clearCache()`: Clears localStorage cache (24-hour TTL)

Category detection uses section headers and keywords to classify bosses (GWD, Wilderness, Raids, Minigame, Multi-combat).

### Data Structures

Boss entry format:
```javascript
{ name: 'Boss Name', isGWD: bool, isWILDY: bool, isMulti: bool, isRaids: bool, isMinigame: bool, osrswiki: 'url' }
```

Skill entry format:
```javascript
{ name: 'Skill Name', isCombat: bool, isSkilling: bool, isF2p: bool }
```

### Key Functions in App.js

- `refreshData()`: Force re-fetch data from wiki (clears cache)
- `SelectRandomBoss()` / `SelectRandomSkill()`: Filter and select random content
- `handleBossFilterChange()` / `handleSkillFilterChange()`: Toggle filter logic using `.every()` to combine criteria
- `getBossAttributes()`: Returns array of active boss attribute tags

### Components

- `src/components/donation.js` - Donation/support page
- `src/components/future.js` - Future features roadmap
- `src/components/OtherProjects.js` - Community OSRS projects showcase

### Styling

- Dark theme with gold (#ffd700) accent colors
- Custom RuneScape font (`src/fonts/runescape_uf.ttf`) for headings
- Component CSS files colocated with their JS files

## External Integrations

- Google Analytics (G-TL7CN5Z9DY) in `public/index.html`
- YouTube tutorial links and OSRS Wiki strategy links for each boss/skill
