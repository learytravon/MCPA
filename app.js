const tabs = document.querySelectorAll("[data-tab]");
const screens = document.querySelectorAll(".screen");
const shortcutButtons = document.querySelectorAll("[data-tab-target]");
const toast = document.querySelector("#toast");
const loginScreen = document.querySelector("#loginScreen");
const appShell = document.querySelector(".app-shell");
const bottomNav = document.querySelector(".bottom-nav");
const avatarButton = document.querySelector(".avatar-button");
const menuToggle = document.querySelector("#menuToggle");
const sideMenu = document.querySelector("#sideMenu");
const menuBackdrop = document.querySelector("#menuBackdrop");
const menuClose = document.querySelector("#menuClose");
const profileModal = document.querySelector("#profileModal");
const enterAppButton = document.querySelector("#enterApp");
const signOutButton = document.querySelector("#signOutButton");
const accountState = {
  platform: null,
  discord: false,
  twitch: false,
  role: "player",
  signedIn: false,
  registration: null,
};
const officialTeams = [
  { name: "Shockers", short: "SHK", color: "red", division: "east", image: "./assets/team-shockers.png" },
  { name: "Sharks", short: "SHA", color: "teal", division: "east", image: "./assets/team-sharks.png" },
  { name: "Rage", short: "RGE", color: "orange", division: "east", image: "./assets/team-rage.png" },
  { name: "Pride", short: "PRD", color: "red", division: "east", image: "./assets/team-pride.png" },
  { name: "Kings", short: "KNG", color: "orange", division: "east", image: "./assets/team-kings.png" },
  { name: "Huskies", short: "HUS", color: "lime", division: "east", image: "./assets/team-huskies.png" },
  { name: "Hoyas", short: "HOY", color: "teal", division: "west", image: "./assets/team-hoyas.png" },
  { name: "Fusion", short: "FUS", color: "teal", division: "west", image: "./assets/team-fusion.png" },
  { name: "Wave", short: "WAV", color: "teal", division: "west", image: "./assets/team-wave.png" },
  { name: "Energy", short: "NRG", color: "orange", division: "west", image: "./assets/team-energy.png" },
  { name: "Dragons", short: "DRG", color: "red", division: "west", image: "./assets/team-dragons.png" },
  { name: "Crush", short: "CRU", color: "orange", division: "west", image: "./assets/team-crush.png" },
];
const teamLogos = Object.fromEntries(
  officialTeams.map((team) => [team.name, { text: team.short, color: team.color, image: team.image }]),
);

function createDraftOrder() {
  const rounds = 2;
  const picks = [];

  for (let round = 1; round <= rounds; round += 1) {
    const roundTeams = round % 2 === 1 ? officialTeams : [...officialTeams].reverse();
    roundTeams.forEach((team, index) => {
      picks.push({
        overall: picks.length + 1,
        round,
        pick: index + 1,
        team: team.name,
        prospectId: null,
      });
    });
  }

  return picks;
}

const players = [
  {
    name: "DreLock",
    tag: "DreLock#204",
    team: "Shockers",
    position: "PG",
    platform: "Xbox",
    accountAge: "6 years",
    trustScore: 98,
    identityStatus: "Verified",
    identityNote: "Console ID locked with no duplicate matches",
    build: "6'6 Shot-Creating Guard",
    initials: "DL",
    color: "lime",
    ppg: 28.4,
    rpg: 4.8,
    apg: 9.1,
    spg: 1.9,
    bpg: 0.6,
    fg: "61%",
    fgValue: 61,
    three: "43%",
    threeValue: 43,
    record: "8-1",
    teamRole: "Team Owner",
    chatAccess: "Team chat, roster, logo",
    accolades: ["2025 MVP", "2025 Champion", "2025 Finals MVP", "2024 All-MCPA First Team"],
    discord: "DreLock#204",
    twitch: "drelock2k",
    isLive: true,
    viewers: 184,
    streamTitle: "MCPA Week 4 - Shockers ranked run",
  },
  {
    name: "JCity",
    tag: "JCityLive",
    team: "Sharks",
    position: "SG",
    platform: "PSN",
    accountAge: "5 years",
    trustScore: 95,
    identityStatus: "Verified",
    identityNote: "PSN profile, Discord, and payment profile match",
    build: "Two-Way Playmaker",
    initials: "JC",
    color: "teal",
    ppg: 23.7,
    rpg: 3.6,
    apg: 11.4,
    spg: 1.4,
    bpg: 0.2,
    fg: "58%",
    fgValue: 58,
    three: "39%",
    threeValue: 39,
    record: "7-2",
    teamRole: "Captain",
    chatAccess: "Team chat, lineup posts",
    accolades: ["2025 Assists Leader", "2025 All-Star Starter", "2024 Teammate of the Year"],
    discord: "jcitylive",
    twitch: "jcitylive",
    isLive: true,
    viewers: 96,
    streamTitle: "Sharks pregame lobby",
  },
  {
    name: "MaskOn",
    tag: "MaskOnPF",
    team: "Rage",
    position: "C",
    platform: "Xbox",
    accountAge: "4 years",
    trustScore: 91,
    identityStatus: "Verified",
    identityNote: "Returning account with clean roster history",
    build: "Glass-Cleaning Finisher",
    initials: "MO",
    color: "orange",
    ppg: 18.9,
    rpg: 13.2,
    apg: 4.1,
    spg: 2.8,
    bpg: 2.1,
    fg: "67%",
    fgValue: 67,
    three: "24%",
    threeValue: 24,
    record: "6-3",
    teamRole: "Player",
    chatAccess: "Team chat",
    accolades: ["2025 Defensive Player", "2025 All-Defense First Team", "2024 Rebounding Leader"],
    discord: "maskonpf",
    twitch: "maskonpf",
    isLive: false,
    viewers: 0,
    streamTitle: "Offline",
  },
  {
    name: "SplashMia",
    tag: "SplashMia2K",
    team: "Pride",
    position: "SF",
    platform: "PSN",
    accountAge: "3 years",
    trustScore: 89,
    identityStatus: "Verified",
    identityNote: "Platform identity cleared before team chat access",
    build: "Perimeter Lockdown",
    initials: "SM",
    color: "red",
    ppg: 16.8,
    rpg: 5.2,
    apg: 3.9,
    spg: 2.2,
    bpg: 0.7,
    fg: "52%",
    fgValue: 52,
    three: "45%",
    threeValue: 45,
    record: "5-4",
    teamRole: "Player",
    chatAccess: "Team chat",
    accolades: ["2025 Clutch Player", "2025 All-Star Reserve"],
    discord: "splashmia",
    twitch: "splashmia2k",
    isLive: true,
    viewers: 61,
    streamTitle: "Clutch guard lab - Pride scrims",
  },
  {
    name: "KashFive",
    tag: "KashFive",
    team: "Kings",
    position: "PF",
    platform: "Xbox",
    accountAge: "11 months",
    trustScore: 74,
    identityStatus: "Watchlist",
    identityNote: "Newer account, no duplicate identity match yet",
    build: "Inside-Out Scorer",
    initials: "KF",
    color: "lime",
    ppg: 21.5,
    rpg: 6.1,
    apg: 5.6,
    spg: 1.1,
    bpg: 0.4,
    fg: "55%",
    fgValue: 55,
    three: "41%",
    threeValue: 41,
    record: "4-5",
    teamRole: "Free Agent",
    chatAccess: "No team chat until owner approval",
    accolades: ["2024 Most Improved Player"],
    discord: "kashfive",
    twitch: "kashfive",
    isLive: false,
    viewers: 0,
    streamTitle: "Offline",
  },
];

const leaderStats = {
  ppg: { label: "Points", suffix: "PPG", precision: 1 },
  rpg: { label: "Rebounds", suffix: "RPG", precision: 1 },
  apg: { label: "Assists", suffix: "APG", precision: 1 },
  spg: { label: "Steals", suffix: "SPG", precision: 1 },
  bpg: { label: "Blocks", suffix: "BPG", precision: 1 },
  fgValue: { label: "Field Goal", suffix: "FG%", precision: 0 },
  threeValue: { label: "Three Point", suffix: "3PT%", precision: 0 },
};

let activeLeaderStat = "ppg";
let activeLeaderPosition = "all";

const identityReviews = [
  {
    name: "QuickIso23",
    platform: "Xbox",
    risk: "High",
    score: 38,
    issue: "New account matches a blocked payment profile and two device patterns.",
    action: "Roster and team chat held",
  },
  {
    name: "GreenWindow",
    platform: "PSN",
    risk: "Medium",
    score: 62,
    issue: "Brand-new PSN profile with same IP range as an active player.",
    action: "Staff verification needed",
  },
  {
    name: "DreLock",
    platform: "Xbox",
    risk: "Low",
    score: 98,
    issue: "Trusted owner account with long console history.",
    action: "Cleared",
  },
];

const awardCatalog = [
  "Most Valuable Player",
  "Defensive Player of the Year",
  "Rookie of the Year",
  "Most Improved Player",
  "Sixth Man of the Year",
  "Clutch Player of the Year",
  "Coach of the Year",
  "Executive of the Year",
  "Finals MVP",
  "Hustle Award",
  "Sportsmanship Award",
  "Twyman-Stokes Teammate of the Year",
  "Social Justice Champion",
  "All-MCPA First Team",
  "All-MCPA Second Team",
  "All-MCPA Third Team",
  "All-Defensive First Team",
  "All-Defensive Second Team",
  "All-Rookie Team",
  "All-Star Game MVP",
];

const awardPolls = [
  {
    id: "mvp",
    title: "Most Valuable Player",
    close: "Poll closes Week 8, Sunday 9:00 PM",
    voters: "Players, owners, and approved staff",
    options: [
      { name: "DreLock", team: "Shockers", stat: "28.4 PPG · 9.1 APG", votes: 42 },
      { name: "JCity", team: "Sharks", stat: "23.7 PPG · 11.4 APG", votes: 31 },
      { name: "MaskOn", team: "Rage", stat: "13.2 RPG · 67 FG%", votes: 18 },
    ],
  },
  {
    id: "dpoy",
    title: "Defensive Player of the Year",
    close: "Poll closes Week 8, Sunday 9:00 PM",
    voters: "Players and approved staff",
    options: [
      { name: "MaskOn", team: "Rage", stat: "2.8 STL · 2.1 BLK", votes: 39 },
      { name: "SplashMia", team: "Pride", stat: "Perimeter lock · 5.2 RPG", votes: 28 },
      { name: "DreLock", team: "Shockers", stat: "1.9 STL · +142 diff", votes: 17 },
    ],
  },
  {
    id: "mip",
    title: "Most Improved Player",
    close: "Poll closes Week 8, Sunday 9:00 PM",
    voters: "Players, owners, and approved staff",
    options: [
      { name: "KashFive", team: "Kings", stat: "+8.2 PPG from last season", votes: 35 },
      { name: "SplashMia", team: "Pride", stat: "+4.4 PPG · better splits", votes: 26 },
      { name: "JCity", team: "Sharks", stat: "+3.1 APG", votes: 19 },
    ],
  },
  {
    id: "clutch",
    title: "Clutch Player of the Year",
    close: "Poll closes Week 8, Sunday 9:00 PM",
    voters: "Players and approved staff",
    options: [
      { name: "SplashMia", team: "Pride", stat: "4 game-winners", votes: 33 },
      { name: "DreLock", team: "Shockers", stat: "61% clutch FG", votes: 29 },
      { name: "JCity", team: "Sharks", stat: "11 late assists", votes: 21 },
    ],
  },
  {
    id: "teammate",
    title: "Teammate of the Year",
    close: "Poll closes Week 8, Sunday 9:00 PM",
    voters: "Players only",
    options: [
      { name: "JCity", team: "Sharks", stat: "Captain · lineup organizer", votes: 38 },
      { name: "MaskOn", team: "Rage", stat: "Role-first big", votes: 24 },
      { name: "KashFive", team: "Kings", stat: "Free agent mentor", votes: 16 },
    ],
  },
];

const allStarPolls = [
  {
    id: "allstar-backcourt",
    title: "All-Star Backcourt",
    close: "All-Star voting closes Friday 8:00 PM",
    voters: "One guard vote per user",
    options: [
      { name: "DreLock", team: "Shockers", stat: "28.4 PPG", votes: 58 },
      { name: "JCity", team: "Sharks", stat: "11.4 APG", votes: 45 },
      { name: "SplashMia", team: "Pride", stat: "52 FG%", votes: 26 },
    ],
  },
  {
    id: "allstar-frontcourt",
    title: "All-Star Frontcourt",
    close: "All-Star voting closes Friday 8:00 PM",
    voters: "One frontcourt vote per user",
    options: [
      { name: "MaskOn", team: "Rage", stat: "18.9 PPG · 13.2 RPG", votes: 53 },
      { name: "KashFive", team: "Kings", stat: "21.5 PPG", votes: 34 },
      { name: "DreLock", team: "Shockers", stat: "Guard/wing eligible", votes: 22 },
    ],
  },
  {
    id: "allstar-captain",
    title: "All-Star Captain",
    close: "All-Star voting closes Friday 8:00 PM",
    voters: "Top overall vote-getter becomes captain",
    options: [
      { name: "DreLock", team: "Shockers", stat: "League-best record", votes: 61 },
      { name: "MaskOn", team: "Rage", stat: "Defensive anchor", votes: 37 },
      { name: "JCity", team: "Sharks", stat: "Floor general", votes: 32 },
    ],
  },
];

const historyRecords = [
  { type: "champion", season: "2025 Summer", title: "League Champion", winner: "Shockers", detail: "Finals MVP: DreLock" },
  { type: "award", season: "2025 Summer", title: "Most Valuable Player", winner: "DreLock", detail: "28.4 PPG, 9.1 APG" },
  { type: "award", season: "2025 Summer", title: "Defensive Player of the Year", winner: "MaskOn", detail: "2.8 STL, 2.1 BLK" },
  { type: "award", season: "2025 Summer", title: "Clutch Player of the Year", winner: "SplashMia", detail: "4 game-winners" },
  { type: "award", season: "2025 Summer", title: "Teammate of the Year", winner: "JCity", detail: "Captain vote winner" },
  { type: "tournament", season: "2025 Summer", title: "Midnight Madness Champion", winner: "Rage", detail: "Tournament MVP: MaskOn" },
  { type: "tournament", season: "2025 Spring", title: "Weekend Rec Classic Champion", winner: "Sharks", detail: "Tournament MVP: JCity" },
  { type: "champion", season: "2024 Winter", title: "League Champion", winner: "Pride", detail: "Finals MVP: SplashMia" },
  { type: "award", season: "2024 Winter", title: "Most Improved Player", winner: "KashFive", detail: "+7.8 PPG" },
];

const scheduledGames = [
  {
    id: "g42",
    home: "Shockers",
    away: "Rage",
    time: "Tonight · 8:30 PM",
    court: "Pro-Am Court 2",
    status: "Published",
    checkIn: "Open at 7:45 PM",
    statSubmitter: "Winning captain",
    tags: ["all", "today", "week"],
  },
  {
    id: "g43",
    home: "Sharks",
    away: "Pride",
    time: "Tonight · 9:15 PM",
    court: "Rec Center A",
    status: "Live stats",
    checkIn: "Open now",
    statSubmitter: "Both captains",
    tags: ["all", "today", "week"],
  },
  {
    id: "g44",
    home: "Kings",
    away: "Huskies",
    time: "Tomorrow · 7:00 PM",
    court: "Rec Center B",
    status: "Court pending",
    checkIn: "Opens 45 min before tip",
    statSubmitter: "Assigned staff",
    tags: ["all", "week"],
  },
  {
    id: "g45",
    home: "Shockers",
    away: "Sharks",
    time: "Friday · 8:00 PM",
    court: "Pro-Am Court 1",
    status: "Featured",
    checkIn: "Roster lock at 7:15 PM",
    statSubmitter: "Home captain",
    tags: ["all", "week"],
  },
  {
    id: "t12",
    home: "Midnight Madness",
    away: "Quarterfinals",
    time: "Saturday · 10:00 PM",
    court: "Event Lobby",
    status: "Tournament",
    checkIn: "Teams must check in 20 min early",
    statSubmitter: "Event staff",
    tags: ["all", "week", "tournament"],
  },
];

const calendarEvents = [
  { date: "Jun 1", label: "Draft night", detail: "Captains enter the draft room and the 1-minute pick clock starts.", type: "Draft" },
  { date: "Jun 3", label: "Season tip-off", detail: "Opening week games and required check-ins begin.", type: "Season" },
  { date: "Jun 10", label: "Free agency opens", detail: "Released players can sign after the 24-hour waiting period.", type: "Roster" },
  { date: "Jun 17", label: "Trade deadline", detail: "All trades require admin approval before midnight.", type: "Deadline" },
  { date: "Jun 24", label: "All-Star voting closes", detail: "Final poll totals lock and selections move to history.", type: "Awards" },
  { date: "Jul 1", label: "Play-in tournament", detail: "Seeds 5-8 compete for the final two playoff spots.", type: "Playoffs" },
];

const gameResults = [
  { id: "r42", label: "MCPA Final", game: "Week 4 Rec Center A", home: "Shockers", away: "Rage", homeScore: 84, awayScore: 77, winner: "Shockers", submitted: "10:18 PM" },
  { id: "r41", label: "Final", game: "Week 4 Pro-Am Court 1", home: "Sharks", away: "Pride", homeScore: 79, awayScore: 74, winner: "Sharks", submitted: "9:44 PM" },
  { id: "r40", label: "Tournament Final", game: "Midnight Madness", home: "Rage", away: "Kings", homeScore: 92, awayScore: 88, winner: "Rage", submitted: "Saturday" },
  { id: "r39", label: "Forfeit", game: "Week 3 Rec Center B", home: "Huskies", away: "Crush", homeScore: 20, awayScore: 0, winner: "Huskies", submitted: "Admin ruling" },
];

const teamStandings = [
  { team: "Shockers", division: "east", w: 8, l: 1, home: "4-0", away: "4-1", last10: "8-1", streak: "W4", pf: 84.8, pa: 69.0 },
  { team: "Sharks", division: "east", w: 7, l: 2, home: "4-1", away: "3-1", last10: "7-2", streak: "W4", pf: 81.2, pa: 72.4 },
  { team: "Rage", division: "east", w: 6, l: 3, home: "3-1", away: "3-2", last10: "6-3", streak: "W1", pf: 88.2, pa: 80.1 },
  { team: "Pride", division: "east", w: 6, l: 3, home: "3-1", away: "3-2", last10: "6-3", streak: "L1", pf: 82.5, pa: 76.2 },
  { team: "Kings", division: "east", w: 5, l: 4, home: "3-2", away: "2-2", last10: "5-4", streak: "W2", pf: 79.5, pa: 77.7 },
  { team: "Huskies", division: "east", w: 5, l: 4, home: "3-2", away: "2-2", last10: "5-4", streak: "W1", pf: 78.8, pa: 77.1 },
  { team: "Wave", division: "west", w: 4, l: 5, home: "2-2", away: "2-3", last10: "4-5", streak: "W1", pf: 75.0, pa: 76.5 },
  { team: "Hoyas", division: "west", w: 4, l: 5, home: "2-2", away: "2-3", last10: "4-5", streak: "L1", pf: 76.8, pa: 78.9 },
  { team: "Fusion", division: "west", w: 4, l: 5, home: "2-2", away: "2-3", last10: "4-5", streak: "L2", pf: 74.4, pa: 76.2 },
  { team: "Energy", division: "west", w: 3, l: 6, home: "2-3", away: "1-3", last10: "3-6", streak: "L1", pf: 72.1, pa: 79.6 },
  { team: "Dragons", division: "west", w: 2, l: 7, home: "1-4", away: "1-3", last10: "2-7", streak: "L3", pf: 68.2, pa: 81.3 },
  { team: "Crush", division: "west", w: 1, l: 8, home: "1-4", away: "0-4", last10: "1-8", streak: "L5", pf: 66.7, pa: 83.9 },
];

const supportTickets = [
  {
    id: "MCPA-1042",
    type: "Payment",
    subject: "Registration payment still says pending",
    status: "Open",
    owner: "DreLock",
    detail: "Player paid team registration but the roster slot did not unlock.",
  },
  {
    id: "MCPA-1041",
    type: "Bug report",
    subject: "Twitch live light did not update",
    status: "In review",
    owner: "JCity",
    detail: "Stream was live for ten minutes before the card refreshed.",
  },
];

const LeagueFinanceConfig = readStore("mcpaLeagueFinanceConfig", {
  playerRegistrationFee: 35,
  integrityDeposit: 15,
  totalPlayerCost: 50,
  prizePoolPercent: 55,
  operationsPercent: 25,
  platformProfitPercent: 20,
  prizeExample: {
    championTeam: 1200,
    runnerUp: 400,
    leagueMvp: 100,
    finalsMvp: 100,
    otherAwards: 50,
    totalPrizePool: 1850,
  },
  paymentMode: "MOCK_SANDBOX",
});

function calculateLeagueFinanceSummary(playerCount = 96, finesCollected = 0) {
  const entryRevenue = playerCount * LeagueFinanceConfig.playerRegistrationFee;
  const depositPool = playerCount * LeagueFinanceConfig.integrityDeposit;
  const totalCollected = playerCount * LeagueFinanceConfig.totalPlayerCost + finesCollected;
  const prizePool = Math.round(entryRevenue * (LeagueFinanceConfig.prizePoolPercent / 100) + finesCollected * 0.5);
  const operations = Math.round(entryRevenue * (LeagueFinanceConfig.operationsPercent / 100));
  const platformProfit = entryRevenue - prizePool - operations;
  return { playerCount, entryRevenue, depositPool, totalCollected, prizePool, operations, platformProfit, finesToPrizePool: Math.round(finesCollected * 0.5), mode: LeagueFinanceConfig.paymentMode };
}

let notifications = readStore("mcpaNotifications", [
  {
    id: "note-checkin",
    userId: "preview-player",
    type: "game-check-in",
    title: "Game check-in opens soon",
    message: "Shockers vs Sharks locks after all five players confirm position.",
    read: false,
    createdAt: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
    actionUrl: "league:schedule",
  },
  {
    id: "note-ocr",
    userId: "preview-player",
    type: "stat-review",
    title: "Stat review required",
    message: "Upload a final score screenshot so staff can approve stats and MMR.",
    read: false,
    createdAt: new Date(Date.now() - 42 * 60 * 1000).toISOString(),
    actionUrl: "scan",
  },
  {
    id: "note-ticket",
    userId: "preview-player",
    type: "support-ticket-reply",
    title: "Support queue active",
    message: "Open disputes and bugs from your profile or the side menu.",
    read: true,
    createdAt: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
    actionUrl: "support",
  },
]);

const voiceRooms = [
  {
    id: "community",
    name: "Community Lobby",
    type: "Open voice",
    locked: false,
    topic: "League lobby, schedule talk, streams, and general help.",
    members: [
      { name: "DreLock", role: "Team Owner", initials: "DL", speaking: true, muted: false, deafened: false, votes: 0 },
      { name: "JCity", role: "Captain", initials: "JC", speaking: false, muted: false, deafened: false, votes: 0 },
      { name: "SplashMia", role: "Player", initials: "SM", speaking: true, muted: false, deafened: false, votes: 0 },
      { name: "MaskOn", role: "Player", initials: "MO", speaking: false, muted: false, deafened: false, votes: 0 },
    ],
  },
  {
    id: "captains",
    name: "Captains Voice",
    type: "Captains",
    locked: false,
    topic: "Captains and owners coordinate lineups, reschedules, and disputes.",
    members: [
      { name: "DreLock", role: "Team Owner", initials: "DL", speaking: true, muted: false, deafened: false, votes: 0 },
      { name: "JCity", role: "Captain", initials: "JC", speaking: true, muted: false, deafened: false, votes: 0 },
      { name: "LockTae", role: "Captain", initials: "LT", speaking: false, muted: false, deafened: false, votes: 0 },
    ],
  },
  {
    id: "shockers",
    name: "Shockers Team",
    type: "Private team",
    locked: false,
    topic: "Shockers private team room with roster-only access.",
    members: [
      { name: "DreLock", role: "Team Owner", initials: "DL", speaking: true, muted: false, deafened: false, votes: 0 },
      { name: "LockTae", role: "Captain", initials: "LT", speaking: false, muted: true, deafened: false, votes: 0 },
      { name: "ShotKev", role: "Player", initials: "SK", speaking: false, muted: false, deafened: false, votes: 0 },
    ],
  },
  {
    id: "rage",
    name: "Rage Team",
    type: "Locked team",
    locked: true,
    topic: "Invite-only room. Owner approval is required before joining.",
    members: [
      { name: "MaskOn", role: "Captain", initials: "MO", speaking: false, muted: false, deafened: false, votes: 0 },
      { name: "QuickIso23", role: "Review hold", initials: "QI", speaking: false, muted: false, deafened: false, votes: 0 },
    ],
  },
];

const rooms = [
  { id: "general", name: "General", unreadCount: 0 },
  { id: "announcements", name: "Announcements", unreadCount: 1 },
  { id: "game-day", name: "Game Day", unreadCount: 0 },
  { id: "support", name: "Support", unreadCount: 0 },
];

function chatTimestamp(minutesAgo) {
  return new Date(Date.now() - minutesAgo * 60 * 1000).toISOString();
}

const demoCommunityMessages = [
  {
    id: "msg-admin-welcome",
    roomId: "general",
    senderId: "admin-travon",
    senderName: "Travon Admin",
    senderRole: "Commissioner",
    avatarInitials: "TA",
    text: "Welcome to the Summer Rec League chat! Share updates, ask questions, and stay locked in.",
    createdAt: chatTimestamp(34),
    isAdmin: true,
  },
  {
    id: "msg-admin-reminder",
    roomId: "general",
    senderId: "admin-travon",
    senderName: "Travon Admin",
    senderRole: "Commissioner",
    avatarInitials: "TA",
    text: "Reminder: Games start next week. Check the schedule in the League tab.",
    createdAt: chatTimestamp(28),
    isAdmin: true,
  },
  {
    id: "msg-admin-practice",
    roomId: "general",
    senderId: "admin-travon",
    senderName: "Travon Admin",
    senderRole: "Commissioner",
    avatarInitials: "TA",
    text: "Practice this Thursday at 6PM. Bring light and dark jerseys.",
    createdAt: chatTimestamp(23),
    isAdmin: true,
  },
  {
    id: "msg-alex",
    roomId: "general",
    senderId: "user-alex",
    senderName: "Alex Johnson",
    senderRole: "Player",
    avatarInitials: "AJ",
    text: "Got it, appreciate the heads up!",
    createdAt: chatTimestamp(16),
    isAdmin: false,
  },
  {
    id: "msg-mike",
    roomId: "general",
    senderId: "user-mike",
    senderName: "Mike Rodriguez",
    senderRole: "Player",
    avatarInitials: "MR",
    text: "Anyone know if we're playing on Court 2 this weekend?",
    createdAt: chatTimestamp(11),
    isAdmin: false,
  },
  {
    id: "msg-sara",
    roomId: "general",
    senderId: "user-sara",
    senderName: "Sara Kim",
    senderRole: "Player",
    avatarInitials: "SK",
    text: "Yep! Court 2 at 11AM.",
    createdAt: chatTimestamp(7),
    isAdmin: false,
  },
  {
    id: "msg-announcement",
    roomId: "announcements",
    senderId: "admin-travon",
    senderName: "Travon Admin",
    senderRole: "Commissioner",
    avatarInitials: "TA",
    text: "Registration locks Sunday night. Captains should check roster payments before the draft pool closes.",
    createdAt: chatTimestamp(48),
    isAdmin: true,
  },
  {
    id: "msg-game-day",
    roomId: "game-day",
    senderId: "admin-travon",
    senderName: "Travon Admin",
    senderRole: "Commissioner",
    avatarInitials: "TA",
    text: "Post check-in questions here on game day so staff can answer fast.",
    createdAt: chatTimestamp(56),
    isAdmin: true,
  },
  {
    id: "msg-support",
    roomId: "support",
    senderId: "admin-travon",
    senderName: "Travon Admin",
    senderRole: "Commissioner",
    avatarInitials: "TA",
    text: "For disputes or bugs, open a ticket too. This room is for quick help only.",
    createdAt: chatTimestamp(63),
    isAdmin: true,
  },
];

const gifOptions = [
  { label: "Green Release", tone: "lime" },
  { label: "Game Winner", tone: "teal" },
  { label: "Lockdown", tone: "red" },
  { label: "Good Pass", tone: "orange" },
  { label: "GG", tone: "blue" },
  { label: "On My Way", tone: "purple" },
];

const directThreads = [
  {
    id: "dm-drelock",
    player: "DreLock",
    unread: 1,
    messages: [
      { from: "DreLock", type: "text", text: "Lock in for Court 1. I can run point if you need it.", time: "10:12 PM" },
      { from: "me", type: "voice", duration: "0:08", time: "10:13 PM" },
      { from: "DreLock", type: "gif", label: "Green Release", tone: "lime", time: "10:14 PM" },
    ],
  },
  {
    id: "dm-jcity",
    player: "JCity",
    unread: 0,
    messages: [
      { from: "JCity", type: "text", text: "Can you send the bracket after this game?", time: "9:51 PM" },
      { from: "me", type: "text", text: "Got you. I will send it after stat scan closes.", time: "9:52 PM" },
    ],
  },
  {
    id: "dm-splashmia",
    player: "SplashMia",
    unread: 0,
    messages: [
      { from: "SplashMia", type: "gif", label: "Lockdown", tone: "red", time: "8:40 PM" },
      { from: "me", type: "text", text: "That clip is going on the community feed.", time: "8:41 PM" },
    ],
  },
];

const leagueRules = [
  {
    title: "Registration & Team Information",
    items: [
      "Teams may only register a minimum of 5 players and a maximum of 8 players. Players may only be on one team for each event they are registered in.",
      {
        important: true,
        text: "Once you are registered to an event and your registration is approved, your spot is locked in. Registration fees are non-refundable and you will not receive your money back if you decide you no longer wish to participate. Failure to attend games or schedule properly will result in a forfeit and you will not receive your money back.",
      },
      "Upon your registration you are now a recognized representative of your brand and will be held accountable for your actions. Failure to uphold a positive image will result in punishment at the discretion of the admin team.",
      "By registering for any MCPA 2K League event, you accept that your image, gamertag, team information, win/loss record, and public 2K player data may be used for promotional purposes and may be published by MCPA at any time on any platform.",
      "Roster changes must be submitted via the website before the designated roster lock deadline. Any roster changes after the deadline are subject to admin approval and may result in penalties.",
    ],
  },
  {
    title: "Account Eligibility Rules",
    items: [
      "All infractions related to abuse of Take Two (2K) terms of service should be reported directly to 2K, not to MCPA. MCPA 2K League is unable to determine if 2K terms of service have been violated. MCPA 2K League will only respond to related complaints should the user be gaining a perceived unfair competitive advantage in its league.",
      {
        important: true,
        text: "All in-game usernames, PlayStation ID, or Xbox Live Gamertag must be registered to each team's roster in order to compete. Failure to follow this requirement will result in forfeit. Multiple occurrences will result in the team's removal from the event without a refund.",
      },
      "If using multiple 2K accounts, you must change and register the in-game username of each account to closely resemble the name you are commonly known as in the 2K community. Example: GGBrodie may compete as GGBrodie_, but GGBrodie may not compete as TUTimez.",
      "MCPA will only respond to stat correction requests if the in-game username matches the registered MCPA username exactly.",
      "If a team begins a game knowing that their opponent is in violation of any league rule, they are automatically accepting the results of that game.",
    ],
  },
  {
    title: "Trades & Transfers",
    items: [
      "Player trades between teams are allowed during the designated trade window. All trades must be submitted to and approved by league administration.",
      { important: true, text: "Players who leave a team mid-season may not join another team in the same event for the remainder of that season." },
      "Trade requests must include agreement from all parties involved, including the player(s) and both team captains.",
      "MCPA reserves the right to deny any trade that may compromise competitive integrity.",
      "Free agent signings are permitted during the roster change window. Players released from a team may sign with another team after a 24-hour waiting period.",
    ],
  },
  {
    title: "Gameplay Rules",
    items: [
      "All games must be played at the scheduled time unless both teams and an admin agree to a reschedule. Teams should be ready 15 minutes before game time.",
      { important: true, text: "Game settings are determined by the league and must not be modified. Any unauthorized changes to game settings may result in forfeit." },
      "In the event of a disconnection, the game should be restarted if it occurs before the end of the first quarter with the score reset unless the lead is 7+ or greater, at which point the spread should be kept upon restart. If disconnection occurs after the first quarter, the game continues from the current score upon reconnection. The only exception is if a lag out occurs with less than 2 minutes left in the game, at which point it should be played out.",
      "Any and all automated mechanics are explicitly banned. Any use of devices with this capability will result in a permanent ban from all events.",
      "All disputes must be reported immediately using the official ticket system. Evidence must be provided within 24 hours of the incident.",
      "Teams are expected to maintain good sportsmanship at all times. Excessive trash talk, trolling, or unsportsmanlike conduct may result in penalties.",
      "League logo must be on court for all games or the team will be subject to a $15 fine. If this request is not corrected after the first offense, it will be $5 for every additional game played in violation.",
      "League Logo: Xbox: MCPALeague. PlayStation: MCPALeague2k.",
    ],
  },
  {
    title: "General Player Conduct",
    items: [
      "By participating in any MCPA event you agree to not defame MCPA 2K League or its leagues on any form of social media, news outlet, or otherwise. MCPA will respond to concerns in DMs, the ticket support system, or email, not public social media.",
      "By participating in MCPA 2K League you agree to not harass players for any reason, including but not limited to race, color, national origin, religion, sex, gender identity, age, disability, or sexual orientation.",
      "By participating in any MCPA event you agree to not harass the administration team and to treat them with respect. Treating the administration team disrespectfully may result in a forfeit, brand strike, fine, or ban. Staff always has the intent to do the right thing and assist however they can. In the end, some rulings may not be in your favor. It is never personal.",
      {
        important: true,
        text: "All infractions against the Terms of Service or this rules page will result in a strike against the captain and/or player involved over the course of their lifetime participation in an MCPA event. Three strikes will result in a suspension or ban from the league at the discretion of the Admin Team. A brand, captain, or player must play a full season without a strike to get a strike removed from their lifetime participation. MCPA 2K League reserves the right to revise any punishment as it sees fit on a case by case basis.",
      },
    ],
  },
  {
    title: "Reporting & Disputes",
    items: [
      "All game results must be reported through the official MCPA 2K League website or Discord within 30 minutes of game completion.",
      { important: true, text: "Failure to report results on time may result in delays in standings updates and potential penalties." },
      "To send a dispute of a game result or report incorrectly recorded games, visit the MCPA 2K League website. MCPA will not make any decisions or accept any proof of disputes on the X timeline or via direct messages.",
      "If it has been 3 days since team stats were submitted but results are not showing in the standings, please contact the league's X page.",
      "Posting results on X is strongly encouraged for your own social media marketing benefit. However, it is insufficient for reporting tournament results. You must use the Discord server.",
      "If during the playoffs or tournaments you have exhausted all efforts to schedule the game and your opponent has not set a time, post proof on Discord before the end of the round, but not more than 8 hours before the end of the round.",
    ],
  },
  {
    title: "Season Schedules & Tournaments",
    items: [
      "Season schedules will be published before the start of each season. Teams are responsible for being available at their scheduled game times.",
      "All tournament series must be scheduled with the league X page in chat and approved by an admin.",
      "Open Tournament is an in-season tournament that runs throughout the season with a cash prize pool. Winners receive an automatic playoff berth.",
      "Mid-Season OVN will be a free entry, one-night event with a cash prize pool. Winners receive an automatic playoff berth.",
      {
        important: true,
        text: "Failure to show up or respond within 20 minutes of scheduled game time will result in a forfeit. Teams must signify they are ready with stream up and all five players ready to start within the timeliness window.",
      },
      "Playoff seeding is determined by regular season record, with tiebreakers decided by head-to-head record, then point differential.",
      "Playoff eligibility is awarded by completing 15 regular season games and maintaining a win percentage of 33% or better. Some exceptions may be made depending on the number of qualified teams and the activity of teams that fall below the win percentage minimum.",
      "Tournament brackets and schedules will be announced prior to tournament start dates. All tournament games must be played within the specified timeframe.",
      "Rescheduling requests must be submitted at least 2 hours in advance and are subject to admin approval.",
      "All fines and violations must be resolved to be playoff eligible.",
    ],
  },
  {
    title: "Memberships & Subscriptions",
    items: [
      "Memberships are offered as an optional premium service to enhance your experience within the leagues in MCPA 2K League and this website. Each membership has benefits, features, terms, and restrictions which the potential member must read and agree to before subscribing.",
      "Please visit the Memberships Page to view the different membership levels offered.",
      {
        important: true,
        text: "By purchasing a monthly subscription, you agree to an initial and recurring monthly subscription fee at the then-current subscription rate, and you accept responsibility for all recurring charges until you cancel your subscription.",
      },
      "If a free trial is applicable, the initial fee will be waived until that trial period has ended. Once the trial period has ended, the initial payment, subscription fee, and recurring payment will apply.",
      { important: true, text: "Subscription Fees: The subscriber's payment method is automatically charged on the same date as the original transaction date on each corresponding month. Discounts, rebates, or other special offers are only valid for the initial term. Subscriptions renew at the then-current full subscription rates." },
      { important: true, text: "Cancellation Policy: You can cancel your subscription from your account profile page. Once you cancel your membership subscription, you will not lose access immediately. Your membership will continue through the end of your current charge cycle." },
      { important: true, text: "Subscription fees are non-refundable." },
    ],
  },
  {
    title: "Court, Jersey & Logo Design",
    items: [
      "All team branding, including but not limited to logos, jerseys, and arena designs, must be appropriate for all audiences and cannot contain any form of offensive, explicit, or controversial content.",
      "Teams are prohibited from using logos or designs that infringe on copyrighted or trademarked material without proper authorization.",
      { important: true, text: "Teams found in violation of these guidelines will be required to change their branding immediately. Failure to comply may result in removal from the event without refund." },
      "MCPA 2K League reserves the right to request changes to any team branding at any time if deemed inappropriate or in violation of these guidelines.",
    ],
  },
];

const draftProspects = [
  {
    id: "dp-ace",
    name: "Ace Bishop",
    age: 22,
    email: "ace@example.com",
    city: "Atlanta",
    position: "PG",
    build: "Floor General",
    platform: "Xbox",
    status: "Draft eligible",
    drafted: false,
  },
  {
    id: "dp-nova",
    name: "Nova Miles",
    age: 19,
    email: "nova@example.com",
    city: "Raleigh",
    position: "SG",
    build: "Sharpshooter",
    platform: "PSN",
    status: "Draft eligible",
    drafted: false,
  },
  {
    id: "dp-reef",
    name: "Reef Carter",
    age: 24,
    email: "reef@example.com",
    city: "Columbia",
    position: "C",
    build: "Glass Lock",
    platform: "Xbox",
    status: "Draft eligible",
    drafted: false,
  },
  {
    id: "dp-king",
    name: "King Melo",
    age: 20,
    email: "melo@example.com",
    city: "Greensboro",
    position: "SF",
    build: "Wing Stopper",
    platform: "PSN",
    status: "Draft eligible",
    drafted: false,
  },
  {
    id: "dp-saint",
    name: "Saint Cole",
    age: 26,
    email: "saint@example.com",
    city: "Durham",
    position: "PF",
    build: "Stretch Four",
    platform: "Xbox",
    status: "Draft eligible",
    drafted: false,
  },
];

const bracketSets = [
  [
    ["1", "Shockers", "Bye"],
    ["8", "Wave", "vs Fusion"],
    ["4", "Pride", "vs Hoyas"],
    ["5", "Kings", "vs Huskies"],
  ],
  [
    ["1", "Sharks", "Bye"],
    ["8", "Fusion", "vs Wave"],
    ["4", "Shockers", "vs Pride"],
    ["5", "Rage", "vs Kings"],
  ],
  [
    ["1", "Rage", "Bye"],
    ["8", "Wave", "vs Energy"],
    ["4", "Pride", "vs Huskies"],
    ["5", "Sharks", "vs Kings"],
  ],
];

let bracketIndex = 0;
let toastTimer;
let rosterCount = 6;
let rosterPaymentChoice = "owner";
let historyFilter = "all";
let scheduleFilter = "all";
let standingsFilter = "all";
let selectedTeamName = "Shockers";
let chatMode = "text";
let activeCommunityRoomId = readStore("mcpaActiveCommunityRoom", "general");
let communityMessages = readStore("mcpaCommunityMessages", demoCommunityMessages);
let typingUsers = readStore("mcpaTypingUsers", []);
let typingClearTimer = null;
let typingDebounceTimer = null;
let demoTypingTimer = null;
let mmrFilter = "overall";
let mmrSort = "mmr";
let mmrSearch = "";
let userVotes = {};
let draftPicks = createDraftOrder();
let currentDraftPickIndex = 0;
let selectedProspectId = draftProspects[0]?.id || null;
let draftClock = 60;
let draftTimer = null;
let draftRunning = false;
let activeVoiceRoomId = "community";
let joinedVoiceRoomId = null;
let micMuted = false;
let voiceOutput = "speaker";
let voiceDeafened = false;
let activeDmId = directThreads[0]?.id || null;
let dmNotificationPing = directThreads.some((thread) => thread.unread);
const voiceInactiveLimit = 30 * 60 * 1000;

function readStore(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || "null") ?? fallback;
  } catch {
    return fallback;
  }
}

function writeStore(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getUserInitials(username) {
  const value = String(username || "").trim();
  if (!value) return "?";
  const parts = value.split(/\s+/).filter(Boolean);
  if (parts.length > 1) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  const letters = value.replace(/[^a-z0-9]/gi, "");
  return (letters.slice(0, 2) || "?").toUpperCase();
}

function getAvatarColor(username) {
  const palette = ["#38d5ff", "#75eef7", "#ff4d66", "#b7ff3d", "#c8d4e3", "#8b5cf6", "#f59e0b", "#14b8a6"];
  const value = String(username || "?");
  const hash = Array.from(value).reduce((total, char) => (total * 31 + char.charCodeAt(0)) >>> 0, 7);
  return palette[hash % palette.length];
}

function renderUserAvatar(user) {
  const name = typeof user === "string" ? user : user?.displayName || user?.name || user?.gamertag || "";
  const initials = getUserInitials(name);
  const color = getAvatarColor(name);
  return `<span class="generated-avatar" style="--avatar-color: ${color}">${escapeHtml(initials)}</span>`;
}

function normalizeConsoleName(platform) {
  if (!platform) return "";
  if (platform === "PSN" || platform === "PlayStation Network") return "PlayStation";
  if (platform === "XB" || platform === "XBL") return "Xbox";
  return platform;
}

function getUserConsoleLabel(user = accountState) {
  const platform = normalizeConsoleName(user.platform || user.primaryConsole);
  return platform || "Connect Console";
}

function refreshIdentityUI() {
  const displayName = accountState.signedIn || accountState.registration ? currentUserName() : "";
  const consoleLabel = getUserConsoleLabel();
  if (avatarButton) {
    avatarButton.textContent = getUserInitials(displayName);
    avatarButton.style.setProperty("--avatar-color", getAvatarColor(displayName));
    avatarButton.setAttribute("aria-label", `${displayName} profile`);
  }
  const badge = document.querySelector("#platformBadge");
  if (badge) badge.textContent = consoleLabel;
}

function makeMockProvider(providerName) {
  const stateKey = `mcpaProvider:${providerName}`;
  const read = () => readStore(stateKey, null);
  const write = (value) => writeStore(stateKey, value);
  return {
    providerName,
    mockMode: true,
    connectAccount(user = accountState) {
      const username = providerName === "Xbox"
        ? `${getUserInitials(currentUserName())}Xbox`
        : providerName === "PlayStation"
          ? `${getUserInitials(currentUserName())}PS`
          : `${currentUserName().replace(/\s+/g, "")}_${providerName.toLowerCase()}`;
      const record = {
        providerName,
        username,
        platformUserId: `${providerName.toLowerCase()}-${username.toLowerCase()}`,
        connectedAt: new Date().toISOString(),
        userId: user.registration?.id || "preview-user",
        duplicateRisk: false,
        mockMode: true,
      };
      write(record);
      return record;
    },
    disconnectAccount() {
      write(null);
      return true;
    },
    refreshConnection() {
      return read() || this.connectAccount();
    },
    getConnectedUsername() {
      return read()?.username || "";
    },
    getPlatformUserId() {
      return read()?.platformUserId || "";
    },
    getOnlineStatus() {
      return { providerName, status: "ONLINE", mockMode: true };
    },
    getLiveStatus() {
      return providerName === "Twitch"
        ? { isLive: true, title: "MCPA League ranked run", viewers: 42, mockMode: true }
        : { isLive: false, title: "", viewers: 0, mockMode: true };
    },
    validateOwnership() {
      return { valid: true, confidenceScore: 91, mockMode: true };
    },
    detectDuplicateLink() {
      return { duplicate: false, flags: [], mockMode: true };
    },
  };
}

const XboxProvider = makeMockProvider("Xbox");
const PlayStationProvider = makeMockProvider("PlayStation");
const TwitchProvider = makeMockProvider("Twitch");
const DiscordProvider = makeMockProvider("Discord");

const CommissionerEngine = {
  decisions: readStore("mcpaCommissionerDecisions", []),
  auditLog: readStore("mcpaCommissionerAuditLog", []),
  createDecision({ decisionType, userId = "system", teamId = null, gameId = null, systemDecision = "AUTO_PROCESSED", confidenceScore = 90, reasons = [], ruleReferences = [], appealAllowed = true, finalStatus = systemDecision }) {
    const decision = {
      id: `decision-${Date.now()}-${Math.random().toString(16).slice(2, 7)}`,
      decisionType,
      userId,
      teamId,
      gameId,
      systemDecision,
      confidenceScore,
      reasons,
      ruleReferences,
      createdAt: new Date().toISOString(),
      appealAllowed,
      appealDeadline: appealAllowed ? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() : null,
      appealStatus: appealAllowed ? "OPEN" : "NOT_ALLOWED",
      finalStatus,
    };
    this.decisions.unshift(decision);
    this.persist();
    return decision;
  },
  appealDecision(decisionId, userId, reason, evidence = "") {
    const decision = this.decisions.find((item) => item.id === decisionId);
    if (!decision || !decision.appealAllowed) return null;
    Object.assign(decision, {
      appealStatus: "SUBMITTED",
      finalStatus: "NEEDS_APPEAL_REVIEW",
      appealedBy: userId,
      appealReason: reason,
      appealEvidence: evidence,
      appealedAt: new Date().toISOString(),
    });
    this.persist();
    return decision;
  },
  resolveAppeal(decisionId, adminId, outcome, note) {
    const decision = this.decisions.find((item) => item.id === decisionId);
    if (!decision) return null;
    Object.assign(decision, {
      appealStatus: outcome,
      finalStatus: outcome === "OVERTURNED" ? "ADMIN_OVERRIDDEN" : "FINAL",
      reviewedBy: adminId,
      reviewNote: note,
      reviewedAt: new Date().toISOString(),
    });
    this.audit("APPEAL_RESOLVED", { decisionId, adminId, outcome, note });
    this.persist();
    return decision;
  },
  audit(action, details = {}) {
    this.auditLog.unshift({ id: `audit-${Date.now()}`, action, details, createdAt: new Date().toISOString() });
    this.persist();
  },
  persist() {
    writeStore("mcpaCommissionerDecisions", this.decisions);
    writeStore("mcpaCommissionerAuditLog", this.auditLog);
  },
};

try {
  userVotes = JSON.parse(localStorage.getItem("mcpaUserVotes") || "{}");
} catch {
  userVotes = {};
}

document.body.dataset.role = accountState.role;

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
    return entities[char];
  });
}

const eligibilityStatuses = ["ELIGIBLE", "FREE_PLAY_ONLY", "RESTRICTED", "NEEDS_LOCATION_VERIFICATION", "NEEDS_MANUAL_REVIEW", "KYC_REQUIRED", "UNDER_REVIEW", "BLOCKED"];

// Restricted states are placeholder defaults and must be reviewed by legal counsel before launch. This list should be editable by an admin/compliance user.
const defaultJurisdictionRules = {
  version: "2026-01",
  lastReviewedAt: null,
  reviewedBy: null,
  defaultRule: "ELIGIBLE",
  states: Object.fromEntries(
    ["AZ", "AR", "CT", "DE", "FL", "IN", "LA", "MD", "MT", "SC", "SD", "TN", "WY"].map((state) => [
      state,
      {
        payoutEligibility: "RESTRICTED",
        cashCompetitionEligibility: "RESTRICTED",
        freePlayAllowed: true,
        reason: "Paid competition not available in this jurisdiction.",
        requiresManualReview: false,
        lastUpdatedAt: null,
        updatedBy: null,
      },
    ]),
  ),
};

let jurisdictionRules = readStore("mcpaJurisdictionRules", defaultJurisdictionRules);
let jurisdictionRuleHistory = readStore("mcpaJurisdictionRuleHistory", []);
let eligibilityOverrideHistory = readStore("mcpaEligibilityOverrideHistory", []);
let registrationLocationVerification = readStore("mcpaRegistrationLocation", {
  statedCity: "Charlotte",
  statedState: "NC",
  statedZip: "28202",
  currentState: "",
  currentCountry: "US",
  currentLatitude: null,
  currentLongitude: null,
  ipState: "NC",
  ipCountry: "US",
  locationPermissionGranted: false,
  locationVerifiedAt: null,
  locationMismatch: false,
  vpnOrProxyDetected: false,
  eligibilityStatus: "NEEDS_LOCATION_VERIFICATION",
  eligibilityReason: "Location verification is required before entering paid competitions or receiving payouts.",
});

function persistJurisdictionRules() {
  writeStore("mcpaJurisdictionRules", jurisdictionRules);
  writeStore("mcpaJurisdictionRuleHistory", jurisdictionRuleHistory);
}

function persistEligibilityOverrides() {
  writeStore("mcpaEligibilityOverrideHistory", eligibilityOverrideHistory);
}

function normalizeState(state) {
  return String(state || "").trim().toUpperCase().slice(0, 2);
}

function calculateAgeFromDob(dob) {
  if (!dob) return Number(document.querySelector("#signupAge")?.value || 0);
  const birthDate = new Date(dob);
  if (Number.isNaN(birthDate.getTime())) return Number(document.querySelector("#signupAge")?.value || 0);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthOffset = today.getMonth() - birthDate.getMonth();
  if (monthOffset < 0 || (monthOffset === 0 && today.getDate() < birthDate.getDate())) age -= 1;
  return age;
}

function getJurisdictionRule(state, rules = jurisdictionRules) {
  const normalized = normalizeState(state);
  return (
    rules.states[normalized] || {
      payoutEligibility: rules.defaultRule,
      cashCompetitionEligibility: rules.defaultRule,
      freePlayAllowed: true,
      reason: "No restriction configured for this jurisdiction.",
      requiresManualReview: false,
    }
  );
}

function compareStatedLocationToCurrentLocation(playerRegistration) {
  const location = playerRegistration.locationVerification || {};
  return {
    statedState: normalizeState(location.statedState),
    currentState: normalizeState(location.currentState),
    statedCountry: "US",
    currentCountry: String(location.currentCountry || "US").toUpperCase(),
  };
}

function detectLocationMismatch(playerRegistration) {
  const comparison = compareStatedLocationToCurrentLocation(playerRegistration);
  if (!comparison.currentState) return false;
  return comparison.statedState !== comparison.currentState || comparison.currentCountry !== "US";
}

function getEligibilityMessage(eligibilityStatus) {
  const messages = {
    ELIGIBLE: "Your location appears eligible for paid competition, subject to final verification.",
    FREE_PLAY_ONLY: "Paid contests and payouts are not available in your current jurisdiction. You may still use free-play features if supported.",
    NEEDS_LOCATION_VERIFICATION: "Location verification is required before entering paid competitions or receiving payouts.",
    NEEDS_MANUAL_REVIEW: "Your eligibility requires manual review before cash competition or payout access can be enabled.",
    KYC_REQUIRED: "Identity verification is required before payouts can be released.",
    RESTRICTED: "Paid competition and payouts are not available for your account based on your current jurisdiction or eligibility status.",
    UNDER_REVIEW: "Your payout eligibility is under review by league staff.",
    BLOCKED: "Paid competition and payouts are blocked for this account.",
  };
  return messages[eligibilityStatus] || messages.NEEDS_MANUAL_REVIEW;
}

function buildEligibilityResult(status, reason, extra = {}) {
  return {
    eligibilityStatus: status,
    eligibilityReason: reason || getEligibilityMessage(status),
    ...extra,
  };
}

function checkCashCompetitionEligibility(playerRegistration, rules = jurisdictionRules) {
  const location = playerRegistration.locationVerification || {};
  const age = playerRegistration.age || calculateAgeFromDob(playerRegistration.dob);
  const currentRule = getJurisdictionRule(location.currentState, rules);
  const statedRule = getJurisdictionRule(location.statedState, rules);
  const locationMismatch = detectLocationMismatch(playerRegistration);

  if (age < 18) return buildEligibilityResult("RESTRICTED", "Player is under 18.");
  if (!location.locationPermissionGranted || !location.currentState) return buildEligibilityResult("NEEDS_LOCATION_VERIFICATION");
  if (locationMismatch) return buildEligibilityResult("NEEDS_MANUAL_REVIEW", "Stated home state and verified current location do not match.", { locationMismatch: true });
  if (location.vpnOrProxyDetected) return buildEligibilityResult("NEEDS_MANUAL_REVIEW", "VPN, proxy, or Tor risk requires manual review.");
  if (currentRule.requiresManualReview || currentRule.cashCompetitionEligibility === "REVIEW_REQUIRED") return buildEligibilityResult("NEEDS_MANUAL_REVIEW", currentRule.reason);
  if (currentRule.cashCompetitionEligibility === "RESTRICTED") return buildEligibilityResult(currentRule.freePlayAllowed ? "FREE_PLAY_ONLY" : "RESTRICTED", currentRule.reason);
  if (statedRule.cashCompetitionEligibility === "RESTRICTED") return buildEligibilityResult(statedRule.freePlayAllowed ? "FREE_PLAY_ONLY" : "RESTRICTED", statedRule.reason);
  return buildEligibilityResult("ELIGIBLE");
}

function checkPayoutEligibility(playerRegistration, rules = jurisdictionRules) {
  const location = playerRegistration.locationVerification || {};
  const age = playerRegistration.age || calculateAgeFromDob(playerRegistration.dob);
  const currentRule = getJurisdictionRule(location.currentState, rules);
  const statedRule = getJurisdictionRule(location.statedState, rules);
  const locationMismatch = detectLocationMismatch(playerRegistration);

  if (age < 18) return buildEligibilityResult("RESTRICTED", "Player is under 18.");
  if (!location.locationPermissionGranted || !location.currentState) return buildEligibilityResult("NEEDS_LOCATION_VERIFICATION");
  if (locationMismatch) return buildEligibilityResult("NEEDS_MANUAL_REVIEW", "Stated home state and verified current location do not match.", { locationMismatch: true });
  if (location.vpnOrProxyDetected) return buildEligibilityResult("NEEDS_MANUAL_REVIEW", "VPN, proxy, or Tor risk requires manual review.");
  if (currentRule.payoutEligibility === "RESTRICTED") return buildEligibilityResult(currentRule.freePlayAllowed ? "FREE_PLAY_ONLY" : "RESTRICTED", currentRule.reason);
  if (statedRule.payoutEligibility === "RESTRICTED") return buildEligibilityResult(statedRule.freePlayAllowed ? "FREE_PLAY_ONLY" : "RESTRICTED", statedRule.reason);
  if (playerRegistration.kycStatus !== "VERIFIED") return buildEligibilityResult("KYC_REQUIRED");
  return buildEligibilityResult("ELIGIBLE");
}

function logJurisdictionRuleChange(state, oldRule, newRule, adminId) {
  jurisdictionRuleHistory.unshift({
    id: `jur-${Date.now()}`,
    state: normalizeState(state),
    oldRule,
    newRule,
    adminId,
    timestamp: new Date().toISOString(),
  });
  jurisdictionRuleHistory = jurisdictionRuleHistory.slice(0, 50);
  persistJurisdictionRules();
}

function updateJurisdictionRule(state, rule, adminId) {
  const normalized = normalizeState(state);
  if (!normalized) return null;
  const oldRule = jurisdictionRules.states[normalized] || null;
  const newRule = {
    payoutEligibility: rule.payoutEligibility || rule.status || "RESTRICTED",
    cashCompetitionEligibility: rule.cashCompetitionEligibility || rule.status || "RESTRICTED",
    freePlayAllowed: rule.freePlayAllowed ?? true,
    reason: rule.reason || "Paid competition not available in this jurisdiction.",
    requiresManualReview: rule.requiresManualReview || rule.status === "REVIEW_REQUIRED",
    lastUpdatedAt: new Date().toISOString(),
    updatedBy: adminId,
  };
  if (rule.status === "ELIGIBLE") {
    delete jurisdictionRules.states[normalized];
  } else {
    jurisdictionRules.states[normalized] = newRule;
  }
  jurisdictionRules.lastReviewedAt = new Date().toISOString();
  jurisdictionRules.reviewedBy = adminId;
  logJurisdictionRuleChange(normalized, oldRule, rule.status === "ELIGIBLE" ? null : newRule, adminId);
  return newRule;
}

function adminOverrideEligibility(playerId, finalStatus, reason, adminId) {
  if (!reason || !reason.trim()) {
    showToast("Eligibility override reason is required.");
    return null;
  }
  const registration = accountState.registration || getRegistration();
  const original = checkPayoutEligibility(registration, jurisdictionRules).eligibilityStatus;
  const override = {
    id: `elig-${Date.now()}`,
    playerId,
    originalStatus: original,
    finalStatus,
    overrideReason: reason.trim(),
    adminId,
    timestamp: new Date().toISOString(),
  };
  eligibilityOverrideHistory.unshift(override);
  persistEligibilityOverrides();
  return override;
}

const movementStatuses = ["AUTO_APPROVED", "AUTO_DENIED", "NEEDS_REVIEW", "EMERGENCY_REVIEW", "ADMIN_APPROVED", "ADMIN_DENIED", "ADMIN_OVERRIDDEN"];

function getSystemDecision(score, hardRuleViolations = [], softRuleFlags = []) {
  if (hardRuleViolations.length) return "AUTO_DENIED";
  if (score < 50) return "AUTO_DENIED";
  if (score < 70) return "NEEDS_REVIEW";
  if (softRuleFlags.length) return "NEEDS_REVIEW";
  return "AUTO_APPROVED";
}

function evaluateMovementRequest(request, type) {
  const hardRuleViolations = [];
  const softRuleFlags = [];
  const reasons = [];
  const text = `${request.reason || ""} ${request.notes || ""}`.toLowerCase();

  if (request.destinationRosterCount > 8) hardRuleViolations.push("Team exceeds roster limit");
  if (request.sourceRosterCount < 5) hardRuleViolations.push("Team drops below minimum roster");
  if (request.playerStatus === "banned" || request.playerStatus === "suspended") hardRuleViolations.push("Player is banned or suspended");
  if (request.cooldown) hardRuleViolations.push("Player is in movement cooldown");
  if (request.deadlinePassed) hardRuleViolations.push("Trade deadline has passed");
  if (request.returningWithin14Days) hardRuleViolations.push("Player is trying to return to previous team within 14 days");
  if (request.leagueEligible === false) hardRuleViolations.push("Player is not league eligible");
  if (request.playoffEligible === false) hardRuleViolations.push("Move violates playoff eligibility rules");

  if ((request.tradeValueDifference || 0) > 100) softRuleFlags.push("Trade value difference above 100");
  if (request.topThreeGetsStronger) softRuleFlags.push("Top-3 team gets stronger");
  if (request.bottomThreeGetsWeaker) softRuleFlags.push("Bottom-3 team gets weaker");
  if ((request.allStarCountAfter || 0) >= 3) softRuleFlags.push("Team would have 3 or more All-Star-or-higher players");
  if (request.repeatedTeams) softRuleFlags.push("Same two teams trade repeatedly");
  if (request.friendHistory) softRuleFlags.push("Player has friend/history connection with receiving team");
  if (type === "releaseRequest" && text.includes("performance")) softRuleFlags.push("Release reason is skill/performance");
  if (request.stackingConcern) softRuleFlags.push("Waiver claim creates team stacking concern");
  if (request.closeToPlayoffs) softRuleFlags.push("Move happens close to playoffs");

  if (/(serious conduct|cheating|harassment|emergency availability)/.test(text)) {
    return {
      systemDecision: "EMERGENCY_REVIEW",
      systemConfidenceScore: 58,
      hardRuleViolations,
      softRuleFlags,
      systemReasons: ["Emergency or integrity keyword detected", ...hardRuleViolations, ...softRuleFlags],
    };
  }

  const systemConfidenceScore = hardRuleViolations.length ? 94 : softRuleFlags.length ? 72 : request.systemConfidenceScore || 96;
  const systemDecision = getSystemDecision(systemConfidenceScore, hardRuleViolations, softRuleFlags);
  if (systemConfidenceScore >= 90) reasons.push("90-100 confidence can auto-process");
  if (systemConfidenceScore >= 70 && systemConfidenceScore < 90) reasons.push("70-89 confidence can auto-process with warning");
  if (systemConfidenceScore >= 50 && systemConfidenceScore < 70) reasons.push("50-69 confidence requires review");
  if (systemConfidenceScore < 50) reasons.push("Below 50 confidence requires denial or commissioner review");
  if (!hardRuleViolations.length && !softRuleFlags.length) reasons.push("No hard violations or major soft flags");

  return {
    systemDecision,
    systemConfidenceScore,
    hardRuleViolations,
    softRuleFlags,
    systemReasons: [...reasons, ...hardRuleViolations, ...softRuleFlags],
  };
}

function evaluateTradeOffer(tradeOffer) {
  return evaluateMovementRequest(tradeOffer, "tradeOffer");
}

function evaluateWaiverClaim(waiverClaim) {
  return evaluateMovementRequest(waiverClaim, "waiverClaim");
}

function evaluateReleaseRequest(releaseRequest) {
  return evaluateMovementRequest(releaseRequest, "releaseRequest");
}

function evaluatePlayerTradeRequest(tradeRequest) {
  return evaluateMovementRequest(tradeRequest, "playerTradeRequest");
}

function buildMovementRequest(type, request) {
  const evaluator = { tradeOffer: evaluateTradeOffer, waiverClaim: evaluateWaiverClaim, releaseRequest: evaluateReleaseRequest, playerTradeRequest: evaluatePlayerTradeRequest }[type];
  const decision = evaluator(request);
  return {
    ...request,
    movementType: type,
    createdAt: request.createdAt || new Date().toISOString(),
    status: decision.systemDecision,
    adminDecision: request.adminDecision || "",
    adminOverrideReason: request.adminOverrideReason || "",
    adminId: request.adminId || "",
    reviewedAt: request.reviewedAt || "",
    ...decision,
  };
}

function demoMovementStore() {
  const requests = [
    buildMovementRequest("tradeOffer", { id: "move-101", title: "Shockers acquire Nova Miles", player: "Nova Miles", fromTeam: "Sharks", toTeam: "Shockers", destinationRosterCount: 8, sourceRosterCount: 6, tradeValueDifference: 58, notes: "Balanced guard-for-wing trade." }),
    buildMovementRequest("tradeOffer", { id: "move-102", title: "Kings send All-Star PF to Shockers", player: "KashFive", fromTeam: "Kings", toTeam: "Shockers", destinationRosterCount: 9, sourceRosterCount: 5, tradeValueDifference: 132, topThreeGetsStronger: true, allStarCountAfter: 3, notes: "Contender upgrade near playoffs." }),
    buildMovementRequest("waiverClaim", { id: "move-103", title: "Wave claim Reef Carter", player: "Reef Carter", toTeam: "Wave", destinationRosterCount: 7, waiverOrder: 4, stackingConcern: false, notes: "Open roster slot, no active hold." }),
    buildMovementRequest("releaseRequest", { id: "move-104", title: "Pride release SplashMia", player: "SplashMia", fromTeam: "Pride", sourceRosterCount: 5, reason: "Serious conduct and emergency availability review", notes: "Captain requested immediate admin ruling." }),
    buildMovementRequest("playerTradeRequest", { id: "move-105", title: "MaskOn requests trade to Sharks", player: "MaskOn", fromTeam: "Rage", toTeam: "Sharks", destinationRosterCount: 7, sourceRosterCount: 7, friendHistory: true, closeToPlayoffs: true, notes: "Player-initiated contender request." }),
  ];
  return {
    requests,
    history: requests.map((request) => ({ id: `hist-${request.id}`, movementType: request.movementType, movementId: request.id, originalDecision: request.systemDecision, finalDecision: request.status, reasons: request.systemReasons, createdAt: request.createdAt })),
  };
}

let movementStore = readStore("mcpaMovementStore", demoMovementStore());

function persistMovementStore() {
  writeStore("mcpaMovementStore", movementStore);
}

function logMovementDecision(movementType, movementId, originalDecision, finalDecision, reasons = []) {
  movementStore.history.unshift({ id: `hist-${Date.now()}`, movementType, movementId, originalDecision, finalDecision, reasons, createdAt: new Date().toISOString() });
  persistMovementStore();
}

function adminOverrideMovement(movementId, movementType, newDecision, overrideReason, adminId) {
  if (!overrideReason || !overrideReason.trim()) {
    showToast("Override reason is required before saving admin movement decisions.");
    return null;
  }
  const movement = movementStore.requests.find((item) => item.id === movementId && item.movementType === movementType);
  if (!movement) return null;
  const originalDecision = movement.systemDecision;
  movement.adminDecision = newDecision;
  movement.adminOverrideReason = overrideReason.trim();
  movement.adminId = adminId;
  movement.reviewedAt = new Date().toISOString();
  movement.status = newDecision;
  logMovementDecision(movementType, movementId, originalDecision, newDecision, [overrideReason.trim()]);
  persistMovementStore();
  return movement;
}

function generateLeagueCupGroups(teams) {
  return ["A", "B", "C"].map((group, groupIndex) => ({
    id: `GROUP_${group}`,
    name: `Group ${group}`,
    teams: teams.slice(groupIndex * 4, groupIndex * 4 + 4).map((team) => ({
      teamId: team.name,
      name: team.name,
      mmr: 1080 + groupIndex * 55 + team.short.length * 12,
      cupStatus: "GROUP_STAGE",
    })),
  }));
}

function generateCupGroupSchedule(groups) {
  const games = [];
  groups.forEach((group) => {
    group.teams.forEach((home, homeIndex) => {
      group.teams.slice(homeIndex + 1).forEach((away) => {
        games.push({
          id: `cup-${group.id}-${home.teamId}-${away.teamId}`.replace(/[^a-zA-Z0-9-]/g, "-"),
          groupId: group.id,
          type: "CUP_GROUP",
          homeTeamId: home.teamId,
          awayTeamId: away.teamId,
          status: "SCHEDULED",
          countsForSeason: true,
          mmrMultiplier: 1.05,
          scores: {},
        });
      });
    });
  });
  return games;
}

function makeCupState() {
  const groups = generateLeagueCupGroups(officialTeams);
  const seededGames = generateCupGroupSchedule(groups).map((game, index) =>
    index < 7
      ? {
          ...game,
          status: "FINAL",
          winningTeamId: index % 2 ? game.awayTeamId : game.homeTeamId,
          scores: { [game.homeTeamId]: 70 + index * 3, [game.awayTeamId]: 66 + index * 2 },
        }
      : game,
  );
  return { id: "midseason-cup-2026", name: "Midseason Cup", status: "GROUP_STAGE", groups, games: seededGames, standings: [], knockoutTeams: [], knockoutGames: [], championId: "", history: [], overrides: [], adminQueue: [], rosterLocks: {} };
}

let cupState = readStore("mcpaCupState", null) || makeCupState();

function persistCupState() {
  writeStore("mcpaCupState", cupState);
}

function logCupHistory(actionType, details) {
  cupState.history.unshift({ id: `cup-hist-${Date.now()}`, actionType, details, createdAt: new Date().toISOString() });
  cupState.history = cupState.history.slice(0, 50);
}

function submitCupGameResult(gameId, winningTeamId, scoreData = {}) {
  const game = cupState.games.find((item) => item.id === gameId);
  if (!game) return null;
  game.status = "FINAL";
  game.winningTeamId = winningTeamId;
  game.scores = scoreData;
  game.mmrMultiplier = 1.05;
  logCupHistory("CUP_GROUP_RESULT", { gameId, winningTeamId, scoreData });
  updateCupStandings();
  persistCupState();
  return game;
}

function updateCupStandings() {
  const standings = {};
  cupState.groups.forEach((group) => {
    group.teams.forEach((team) => {
      standings[team.teamId] = { ...team, groupId: group.id, wins: 0, losses: 0, pf: 0, pa: 0, pd: 0, forfeits: 0, strength: 0 };
    });
  });
  cupState.games.filter((game) => game.status === "FINAL").forEach((game) => {
    const homeScore = Number(game.scores[game.homeTeamId] || 0);
    const awayScore = Number(game.scores[game.awayTeamId] || 0);
    const cappedDiff = Math.max(-20, Math.min(20, homeScore - awayScore));
    const home = standings[game.homeTeamId];
    const away = standings[game.awayTeamId];
    if (!home || !away) return;
    home.pf += homeScore;
    home.pa += awayScore;
    home.pd += cappedDiff;
    away.pf += awayScore;
    away.pa += homeScore;
    away.pd -= cappedDiff;
    home.strength += away.mmr || 1000;
    away.strength += home.mmr || 1000;
    if (game.winningTeamId === game.homeTeamId) {
      home.wins += 1;
      away.losses += 1;
    } else {
      away.wins += 1;
      home.losses += 1;
    }
  });
  cupState.standings = Object.values(standings);
  applyCupGroupTiebreakers();
  persistCupState();
  return cupState.standings;
}

function cupSort(first, second) {
  return second.wins - first.wins || second.pd - first.pd || second.pf - first.pf || second.strength - first.strength || (second.mmr || 0) - (first.mmr || 0) || first.forfeits - second.forfeits || first.name.localeCompare(second.name);
}

function applyCupGroupTiebreakers() {
  cupState.groups.forEach((group) => {
    cupState.standings
      .filter((team) => team.groupId === group.id)
      .sort(cupSort)
      .forEach((row, index) => {
        row.seed = index + 1;
        row.cupStatus = index === 0 ? "QUALIFIED" : "ELIMINATED";
      });
  });
  return cupState.standings;
}

function determineGroupWinners() {
  updateCupStandings();
  return cupState.groups.map((group) => cupState.standings.filter((team) => team.groupId === group.id).sort(cupSort)[0]).filter(Boolean);
}

function determineWildCardTeam() {
  updateCupStandings();
  const winners = new Set(determineGroupWinners().map((team) => team.teamId));
  const wildCard = cupState.standings.filter((team) => !winners.has(team.teamId)).sort(cupSort)[0];
  if (wildCard) wildCard.cupStatus = "WILD_CARD";
  return wildCard;
}

function seedCupKnockoutTeams() {
  const teams = [...determineGroupWinners(), determineWildCardTeam()].filter(Boolean).sort(cupSort);
  cupState.knockoutTeams = teams.map((team, index) => ({ ...team, knockoutSeed: index + 1, cupStatus: team.cupStatus === "WILD_CARD" ? "WILD_CARD" : "QUALIFIED" }));
  cupState.status = teams.length === 4 ? "KNOCKOUT" : "GROUP_STAGE";
  persistCupState();
  return cupState.knockoutTeams;
}

function generateCupKnockoutBracket() {
  const seeds = seedCupKnockoutTeams();
  if (seeds.length < 4) return [];
  cupState.knockoutGames = [
    { id: "cup-semi-1", type: "CUP_SEMIFINAL", homeTeamId: seeds[0].teamId, awayTeamId: seeds[3].teamId, status: "SCHEDULED", mmrMultiplier: 1.1, scores: {} },
    { id: "cup-semi-2", type: "CUP_SEMIFINAL", homeTeamId: seeds[1].teamId, awayTeamId: seeds[2].teamId, status: "SCHEDULED", mmrMultiplier: 1.1, scores: {} },
  ];
  logCupHistory("KNOCKOUT_GENERATED", { seeds: seeds.map((team) => team.teamId) });
  persistCupState();
  return cupState.knockoutGames;
}

function submitCupSemifinalResult(gameId, winningTeamId, scoreData = {}) {
  const game = cupState.knockoutGames.find((item) => item.id === gameId);
  if (!game) return null;
  game.status = "FINAL";
  game.winningTeamId = winningTeamId;
  game.scores = scoreData;
  if (cupState.knockoutGames.filter((item) => item.type === "CUP_SEMIFINAL" && item.status === "FINAL").length === 2 && !cupState.knockoutGames.some((item) => item.type === "CUP_FINAL")) {
    const finalists = cupState.knockoutGames.filter((item) => item.type === "CUP_SEMIFINAL").map((item) => item.winningTeamId);
    cupState.knockoutGames.push({ id: "cup-final", type: "CUP_FINAL", homeTeamId: finalists[0], awayTeamId: finalists[1], status: "SCHEDULED", mmrMultiplier: 1.15, scores: {} });
  }
  logCupHistory("CUP_SEMIFINAL_RESULT", { gameId, winningTeamId, scoreData });
  persistCupState();
  return game;
}

function submitCupFinalResult(gameId, winningTeamId, scoreData = {}) {
  const game = cupState.knockoutGames.find((item) => item.id === gameId);
  if (!game) return null;
  game.status = "FINAL";
  game.winningTeamId = winningTeamId;
  game.scores = scoreData;
  declareCupChampion(winningTeamId);
  logCupHistory("CUP_FINAL_RESULT", { gameId, winningTeamId, scoreData });
  persistCupState();
  return game;
}

function declareCupChampion(teamId) {
  cupState.championId = teamId;
  cupState.status = "COMPLETED";
  logCupHistory("CUP_CHAMPION", { teamId });
  persistCupState();
  return teamId;
}

function validateCupEligibility(playerId, teamId, gameType) {
  const player = rankedPlayers.find((item) => item.id === playerId || item.name === playerId);
  const issues = [];
  if (!player) issues.push("Player not found");
  if (player && player.teamId !== teamId) issues.push("Player is not on this Cup roster");
  if (gameType === "CUP_FINAL" && !(player?.cupGroupGamesPlayed > 0)) issues.push("Player did not play a Cup group game");
  return { eligible: !issues.length, issues };
}

function lockCupRosters(stage) {
  cupState.rosterLocks[stage] = new Date().toISOString();
  logCupHistory("CUP_ROSTER_LOCK", { stage });
  persistCupState();
}

function requestCupEmergencyReplacement(teamId, removedPlayerId, replacementPlayerId, reason) {
  const request = { id: `cup-er-${Date.now()}`, teamId, removedPlayerId, replacementPlayerId, reason, createdAt: new Date().toISOString() };
  const decision = evaluateCupEmergencyReplacement(request);
  cupState.adminQueue.unshift({ ...request, ...decision });
  persistCupState();
  return request;
}

function evaluateCupEmergencyReplacement(request) {
  const removed = rankedPlayers.find((player) => player.id === request.removedPlayerId || player.name === request.removedPlayerId);
  const replacement = rankedPlayers.find((player) => player.id === request.replacementPlayerId || player.name === request.replacementPlayerId);
  const flags = [];
  if (replacement && removed && replacement.mmr > removed.mmr) flags.push("Emergency replacement higher MMR than removed player");
  if (/cheating|integrity|harassment/i.test(request.reason || "")) flags.push("Active cheating or integrity report");
  return { decision: flags.length ? "NEEDS_REVIEW" : "AUTO_APPROVED", flags, confidence: flags.length ? 64 : 93 };
}

function adminOverrideCupDecision(decisionId, finalDecision, reason, adminId) {
  if (!reason || !reason.trim()) {
    showToast("Cup override reason is required.");
    return null;
  }
  const original = cupState.adminQueue.find((item) => item.id === decisionId) || { decision: "SYSTEM" };
  const override = { id: `cup-override-${Date.now()}`, decisionId, originalDecision: original.decision, finalDecision, overrideReason: reason.trim(), adminId, timestamp: new Date().toISOString() };
  cupState.overrides.unshift(override);
  logCupHistory("CUP_ADMIN_OVERRIDE", override);
  persistCupState();
  return override;
}

let rankedPlayers = readStore("mcpaRankedPlayers", window.MCPA_MMR.createDemoRankedPlayers(players, officialTeams));

function persistRankedPlayers() {
  writeStore("mcpaRankedPlayers", rankedPlayers);
}

const defaultRecordBooks = {
  draftResults: [],
  leagueRecords: [
    { scope: "League", category: "Career high points", player: "DreLock", value: 52, detail: "2025 Summer vs Rage" },
    { scope: "League", category: "Career high assists", player: "JCity", value: 22, detail: "2025 Summer vs Pride" },
  ],
  teamRecords: [
    { scope: "Team", team: "Shockers", category: "Single-game points", player: "DreLock", value: 52 },
    { scope: "Team", team: "Rage", category: "Single-game rebounds", player: "MaskOn", value: 24 },
  ],
  seasonHighs: [
    { scope: "Season", category: "Points", player: "DreLock", value: 31, detail: "Current OCR sample" },
    { scope: "Season", category: "Assists", player: "JCity", value: 11, detail: "Current OCR sample" },
    { scope: "Season", category: "Rebounds", player: "MaskOn", value: 12, detail: "Current OCR sample" },
  ],
};

let recordBooks = readStore("mcpaRecordBooks", defaultRecordBooks);

function persistRecordBooks() {
  writeStore("mcpaRecordBooks", recordBooks);
}

const ocrStatuses = ["NO_SCREENSHOT", "SCREENSHOT_UPLOADED", "OCR_PROCESSING", "OCR_COMPLETE", "OCR_LOW_CONFIDENCE", "NEEDS_REVIEW", "APPROVED", "REJECTED", "MMR_UPDATED"];
const defaultStatReviewStore = {
  uploads: [],
  reviews: [],
  provisionalResults: [],
  wrongScreenshotReports: [],
  mmrHistory: [],
};
let statReviewStore = readStore("mcpaStatReviewStore", defaultStatReviewStore);
statReviewStore = { ...defaultStatReviewStore, ...statReviewStore };
let activeStatReviewId = statReviewStore.reviews[0]?.id || null;

function persistStatReviewStore() {
  writeStore("mcpaStatReviewStore", statReviewStore);
}

async function generateImageHash(file) {
  const fingerprint = `${file.name}-${file.size}-${file.lastModified}`;
  if (!crypto?.subtle || !file.arrayBuffer) return fingerprint;
  const buffer = await file.arrayBuffer();
  const hash = await crypto.subtle.digest("SHA-256", buffer);
  return Array.from(new Uint8Array(hash))
    .slice(0, 16)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", reject);
    reader.readAsDataURL(file);
  });
}

function previewUploadedScreenshot(file) {
  return fileToDataUrl(file);
}

async function runOcrOnScreenshot(file) {
  if (window.Tesseract?.recognize) {
    const result = await window.Tesseract.recognize(file, "eng");
    return {
      ocrStatus: result.data.confidence >= 80 ? "OCR_COMPLETE" : "OCR_LOW_CONFIDENCE",
      ocrRawText: result.data.text,
      ocrConfidence: Math.round(result.data.confidence || 0),
    };
  }

  return {
    ocrStatus: "OCR_LOW_CONFIDENCE",
    ocrRawText:
      "OCR engine not available in this build. Upload preview saved. Manual review required.\n\nDEMO MODE SAMPLE\nShockers 84 Sharks 77\nDreLock 31 PTS 6 REB 9 AST 2 STL 0 BLK 3 TO 2 FLS 11-18 FG 4-8 3PT\nJCity 24 PTS 3 REB 11 AST 1 STL 0 BLK 2 TO 1 FLS 9-15 FG 3-6 3PT\nMaskOn 19 PTS 12 REB 4 AST 2 STL 1 BLK 1 TO 3 FLS 8-12 FG 1-2 3PT\nSplashMia 10 PTS 4 REB 3 AST 1 STL 1 BLK 1 TO 1 FLS 4-7 FG 1-3 3PT",
    ocrConfidence: 52,
    demoMode: true,
  };
}

function matchOcrPlayerToRoster(detectedName, rosterPlayers = players) {
  const clean = detectedName.toLowerCase().replace(/[^a-z0-9]/g, "");
  const exact = rosterPlayers.find((player) => [player.name, player.tag].some((value) => String(value).toLowerCase().replace(/[^a-z0-9]/g, "") === clean));
  if (exact) return { player: exact, confidence: 98 };
  const partial = rosterPlayers.find((player) => player.name.toLowerCase().includes(detectedName.toLowerCase()) || detectedName.toLowerCase().includes(player.name.toLowerCase()));
  return partial ? { player: partial, confidence: 74 } : { player: null, confidence: 35 };
}

function parseOcrTextToStats(ocrText) {
  const scoreMatch = ocrText.match(/(Shockers|Sharks|Rage|Pride|Kings|Huskies|Hoyas|Fusion|Wave|Energy|Dragons|Crush)\s+(\d{2,3}).*?(Shockers|Sharks|Rage|Pride|Kings|Huskies|Hoyas|Fusion|Wave|Energy|Dragons|Crush)\s+(\d{2,3})/is);
  const gameScore = scoreMatch
    ? { home: scoreMatch[1], homeScore: Number(scoreMatch[2]), away: scoreMatch[3], awayScore: Number(scoreMatch[4]) }
    : { home: "Shockers", homeScore: 84, away: "Sharks", awayScore: 77 };

  const demoRows = [
    ["DreLock", "Shockers", 31, 6, 9, 2, 0, 3, 2, 11, 18, 4, 8],
    ["JCity", "Shockers", 24, 3, 11, 1, 0, 2, 1, 9, 15, 3, 6],
    ["MaskOn", "Shockers", 19, 12, 4, 2, 1, 1, 3, 8, 12, 1, 2],
    ["SplashMia", "Shockers", 10, 4, 3, 1, 1, 1, 1, 4, 7, 1, 3],
  ];

  const parsedPlayers = demoRows.map(([detectedName, teamId, pts, reb, ast, stl, blk, tov, fouls, fgm, fga, threePm, threePa]) => {
    const match = matchOcrPlayerToRoster(detectedName, players.filter((player) => player.team === teamId));
    return {
      playerId: match.player?.id || match.player?.name || null,
      detectedName,
      matchedPlayerName: match.player?.name || "",
      matchConfidence: match.confidence,
      teamId,
      pts,
      reb,
      ast,
      stl,
      blk,
      tov,
      fouls,
      fgm,
      fga,
      threePm,
      threePa,
      confidence: Math.min(92, match.confidence),
      needsCorrection: match.confidence < 80,
    };
  });

  return { parsedTeams: [gameScore.home, gameScore.away], parsedPlayers, gameScore };
}

function validateParsedStats(parsedStats, gameScore) {
  const errors = [];
  const teamPoints = parsedStats.reduce((totals, player) => {
    totals[player.teamId] = (totals[player.teamId] || 0) + Number(player.pts || 0);
    return totals;
  }, {});
  if (teamPoints[gameScore.home] && teamPoints[gameScore.home] !== gameScore.homeScore) errors.push(`${gameScore.home} player points do not match final score.`);
  if (teamPoints[gameScore.away] && teamPoints[gameScore.away] !== gameScore.awayScore) errors.push(`${gameScore.away} player points do not match final score.`);
  parsedStats.forEach((player) => {
    if (!player.matchedPlayerName) errors.push(`${player.detectedName} needs roster mapping.`);
    if (player.pts > 80 || player.ast > 35 || player.reb > 40 || player.tov > 15) errors.push(`${player.detectedName} has a stat that needs review.`);
  });
  return errors;
}

function calculateOcrConfidence(parsedStats) {
  if (!parsedStats.length) return 0;
  return Math.round(parsedStats.reduce((total, player) => total + Math.min(player.confidence, player.matchConfidence), 0) / parsedStats.length);
}

function parseOcrTextToGameResult(ocrText) {
  return parseOcrTextToStats(ocrText).gameScore;
}

function parseOcrTextToPlayerStats(ocrText) {
  return parseOcrTextToStats(ocrText).parsedPlayers;
}

function matchPlayerNamesToRoster(parsedNames, roster = players) {
  return parsedNames.map((name) => {
    const match = matchOcrPlayerToRoster(typeof name === "string" ? name : name.detectedName, roster);
    return {
      detectedName: typeof name === "string" ? name : name.detectedName,
      matchedPlayerName: match.player?.name || "",
      playerId: match.player?.id || null,
      matchConfidence: match.confidence,
    };
  });
}

function validateGameScore(parsedResult) {
  const errors = [];
  if (!parsedResult?.home || !parsedResult?.away) errors.push("Missing team names.");
  if (!Number.isFinite(parsedResult?.homeScore) || !Number.isFinite(parsedResult?.awayScore)) errors.push("Missing or invalid final score.");
  if (parsedResult?.home === parsedResult?.away) errors.push("Both teams cannot be the same.");
  return errors;
}

function validatePlayerStats(parsedStats) {
  const errors = [];
  parsedStats.forEach((stat) => {
    if (!stat.matchedPlayerName) errors.push(`${stat.detectedName} needs roster mapping.`);
    if (stat.pts > 80 || stat.reb > 40 || stat.ast > 35 || stat.stl > 12 || stat.blk > 12 || stat.tov > 15) errors.push(`${stat.detectedName} has an impossible-looking stat.`);
    if (stat.fga && stat.fgm > stat.fga) errors.push(`${stat.detectedName} has more FGM than FGA.`);
    if (stat.threePa && stat.threePm > stat.threePa) errors.push(`${stat.detectedName} has more 3PM than 3PA.`);
  });
  return errors;
}

function createProvisionalResult(gameId, parsedResult) {
  const playerValidation = validatePlayerStats(parsedResult.parsedPlayers || []);
  const scoreValidation = validateGameScore(parsedResult.gameScore || parsedResult);
  const confidence = parsedResult.ocrConfidence ?? calculateOcrConfidence(parsedResult.parsedPlayers || []);
  const result = {
    id: `result-${Date.now()}`,
    gameId,
    parsedResult,
    status: "PROVISIONAL",
    confidenceScore: confidence,
    validationErrors: [...scoreValidation, ...playerValidation, ...(parsedResult.validationErrors || [])],
    disputeWindowClosesAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    reports: [],
    createdAt: new Date().toISOString(),
    finalizedAt: null,
  };
  statReviewStore.provisionalResults.unshift(result);
  CommissionerEngine.createDecision({
    decisionType: "STAT_SCREENSHOT_PROVISIONAL_RESULT",
    gameId,
    systemDecision: "AUTO_PROCESSED",
    confidenceScore: confidence,
    reasons: result.validationErrors.length ? result.validationErrors : ["Screenshot parsed and provisional result created."],
    ruleReferences: ["OCR confidence", "Roster mapping", "Final score validation"],
    finalStatus: result.validationErrors.length || confidence < 80 ? "NEEDS_USER_ACTION" : "AUTO_PROCESSED",
  });
  persistStatReviewStore();
  return result;
}

function autoFinalizeResultIfEligible(resultId) {
  const result = statReviewStore.provisionalResults.find((item) => item.id === resultId);
  if (!result) return null;
  const severeReport = result.reports.some((report) => ["edited/tampered", "wrong winner detected", "duplicate screenshot"].includes(report.reason));
  if (result.confidenceScore < 80 || result.validationErrors.length || result.reports.length || severeReport) {
    result.status = severeReport ? "NEEDS_APPEAL_REVIEW" : "NEEDS_USER_ACTION";
    persistStatReviewStore();
    return result;
  }
  result.status = "FINAL";
  result.finalizedAt = new Date().toISOString();
  updateGameResultFromApprovedResult(resultId);
  updatePlayerStatsFromApprovedResult(resultId);
  updateMmrFromApprovedResult(resultId);
  updateCareerHighsFromApprovedResult(resultId);
  updateAccoladesFromApprovedResult(resultId);
  updateHistoryBooksFromApprovedResult(resultId);
  updateStandingsFromApprovedResult(resultId);
  CommissionerEngine.createDecision({
    decisionType: "GAME_RESULT_AUTO_FINALIZED",
    gameId: result.gameId,
    systemDecision: "AUTO_APPROVED",
    confidenceScore: result.confidenceScore,
    reasons: ["No dispute, high OCR confidence, no validation conflicts."],
    ruleReferences: ["30-minute dispute window", "OCR threshold >= 80", "No severe integrity flags"],
    finalStatus: "FINAL",
  });
  persistStatReviewStore();
  return result;
}

function reportWrongScreenshot(resultId, userId, reason) {
  const result = statReviewStore.provisionalResults.find((item) => item.id === resultId);
  if (!result) return null;
  const report = {
    id: `wrong-shot-${Date.now()}`,
    resultId,
    userId,
    reason,
    status: "SUBMITTED",
    createdAt: new Date().toISOString(),
  };
  result.reports.push(report);
  result.status = "NEEDS_APPEAL_REVIEW";
  statReviewStore.wrongScreenshotReports.unshift(report);
  CommissionerEngine.createDecision({
    decisionType: "WRONG_SCREENSHOT_REPORT",
    userId,
    gameId: result.gameId,
    systemDecision: "NEEDS_APPEAL_REVIEW",
    confidenceScore: 65,
    reasons: [`User reported: ${reason}`],
    ruleReferences: ["Screenshot dispute", "User appeal"],
    finalStatus: "NEEDS_APPEAL_REVIEW",
  });
  persistStatReviewStore();
  return report;
}

function resultReviewFor(resultId) {
  const result = statReviewStore.provisionalResults.find((item) => item.id === resultId);
  return statReviewStore.reviews.find((review) => review.resultId === resultId) || statReviewStore.reviews.find((review) => review.gameId === result?.gameId) || null;
}

function updateGameResultFromApprovedResult(resultId) {
  const review = resultReviewFor(resultId);
  if (!review) return null;
  return updateGameResultFromApprovedStats(review.id);
}

function updatePlayerStatsFromApprovedResult(resultId) {
  const review = resultReviewFor(resultId);
  if (!review) return null;
  return updatePlayerStatsFromApprovedStats(review.id);
}

function updateMmrFromApprovedResult(resultId) {
  const review = resultReviewFor(resultId);
  if (!review) return null;
  return updateMmrFromApprovedStats(review.id);
}

function updateCareerHighsFromApprovedResult(resultId) {
  const review = resultReviewFor(resultId);
  if (!review) return null;
  updateRecordBookFromApprovedStats(review.id);
  return review;
}

function updateAccoladesFromApprovedResult(resultId) {
  const review = resultReviewFor(resultId);
  if (!review) return null;
  const topScorer = [...review.parsedStats].sort((a, b) => b.pts - a.pts)[0];
  if (topScorer) {
    const player = players.find((item) => item.name === topScorer.matchedPlayerName || item.name === topScorer.detectedName);
    if (player) {
      player.accolades = Array.from(new Set([...(player.accolades || []), "Player of the Week Watch"]));
    }
  }
  renderPlayers();
  return true;
}

function updateHistoryBooksFromApprovedResult(resultId) {
  const review = resultReviewFor(resultId);
  if (!review) return null;
  updateRecordBookFromApprovedStats(review.id);
  return review;
}

function updateStandingsFromApprovedResult(resultId) {
  const result = statReviewStore.provisionalResults.find((item) => item.id === resultId);
  const score = result?.parsedResult?.gameScore;
  if (!score) return null;
  const winner = score.homeScore >= score.awayScore ? score.home : score.away;
  const loser = winner === score.home ? score.away : score.home;
  standingsData.forEach((team) => {
    if (team.team === winner) team.w += 1;
    if (team.team === loser) team.l += 1;
  });
  renderTeamStandings();
  return { winner, loser };
}

function createStatReview(gameId, parsedStats) {
  const validationErrors = validateParsedStats(parsedStats.parsedPlayers, parsedStats.gameScore);
  const confidence = calculateOcrConfidence(parsedStats.parsedPlayers);
  const review = {
    id: `review-${Date.now()}`,
    gameId,
    parsedStats: parsedStats.parsedPlayers,
    gameScore: parsedStats.gameScore,
    validationErrors,
    ocrConfidence: confidence,
    reviewStatus: confidence < 80 || validationErrors.length ? "NEEDS_REVIEW" : "OCR_COMPLETE",
    createdAt: new Date().toISOString(),
    reviewedBy: null,
    reviewedAt: null,
  };
  statReviewStore.reviews.unshift(review);
  activeStatReviewId = review.id;
  persistStatReviewStore();
  return review;
}

async function uploadStatScreenshot(gameId, file) {
  const imageUrl = await fileToDataUrl(file);
  const imageHash = await generateImageHash(file);
  const duplicate = statReviewStore.uploads.some((upload) => upload.imageHash === imageHash);
  const upload = {
    id: `upload-${Date.now()}`,
    gameId,
    uploadedBy: currentUserName(),
    imageUrl,
    imageHash,
    uploadedAt: new Date().toISOString(),
    ocrStatus: "SCREENSHOT_UPLOADED",
    ocrRawText: "",
    ocrConfidence: 0,
    parsedTeams: [],
    parsedPlayers: [],
    validationErrors: duplicate ? ["Duplicate screenshot hash detected."] : [],
    reviewStatus: "NEEDS_REVIEW",
    reviewedBy: null,
    reviewedAt: null,
  };
  statReviewStore.uploads.unshift(upload);
  renderStatReview(upload.id);
  const ocr = await runOcrOnScreenshot(file);
  const parsed = parseOcrTextToStats(ocr.ocrRawText);
  upload.ocrStatus = duplicate ? "NEEDS_REVIEW" : ocr.ocrStatus;
  upload.ocrRawText = ocr.ocrRawText;
  upload.ocrConfidence = ocr.ocrConfidence;
  upload.parsedTeams = parsed.parsedTeams;
  upload.parsedPlayers = parsed.parsedPlayers;
  upload.validationErrors = [...upload.validationErrors, ...validateParsedStats(parsed.parsedPlayers, parsed.gameScore)];
  const review = createStatReview(gameId, parsed);
  review.uploadId = upload.id;
  review.validationErrors = [...new Set([...review.validationErrors, ...upload.validationErrors])];
  const provisional = createProvisionalResult(gameId, {
    ...parsed,
    ocrConfidence: Math.min(ocr.ocrConfidence, review.ocrConfidence),
    validationErrors: review.validationErrors,
  });
  review.resultId = provisional.id;
  review.reviewStatus = provisional.confidenceScore >= 80 && !provisional.validationErrors.length ? "AUTO_PROCESSED" : "NEEDS_REVIEW";
  if (review.reviewStatus === "AUTO_PROCESSED") {
    autoFinalizeResultIfEligible(provisional.id);
    review.reviewStatus = "MMR_UPDATED";
    upload.reviewStatus = "APPROVED";
  }
  persistStatReviewStore();
  renderStatReview(review.id);
  renderAdminDashboard();
  return upload;
}

function currentStatReview() {
  return statReviewStore.reviews.find((review) => review.id === activeStatReviewId) || statReviewStore.reviews[0] || null;
}

function applyReviewEdits(review) {
  document.querySelectorAll("[data-ocr-stat]").forEach((input) => {
    const player = review.parsedStats.find((row) => row.detectedName === input.dataset.ocrPlayer);
    if (player) player[input.dataset.ocrStat] = Number(input.value || 0);
  });
}

function updateGameResultFromApprovedStats(reviewId) {
  const review = statReviewStore.reviews.find((item) => item.id === reviewId);
  if (!review) return null;
  gameResults.unshift({
    label: review.reviewStatus === "MMR_UPDATED" ? "APPROVED FINAL" : "PENDING FINAL",
    game: `${review.gameScore.home} vs ${review.gameScore.away}`,
    submitted: "Approved now",
    home: review.gameScore.home,
    away: review.gameScore.away,
    homeScore: review.gameScore.homeScore,
    awayScore: review.gameScore.awayScore,
    winner: review.gameScore.homeScore >= review.gameScore.awayScore ? review.gameScore.home : review.gameScore.away,
  });
  renderScoreResults();
  return review;
}

function updatePlayerStatsFromApprovedStats(reviewId) {
  const review = statReviewStore.reviews.find((item) => item.id === reviewId);
  if (!review) return;
  review.parsedStats.forEach((stat) => {
    const player = players.find((item) => item.name === stat.matchedPlayerName || item.name === stat.detectedName);
    if (!player) return;
    player.ppg = Math.round(((player.ppg || 0) * 9 + stat.pts) / 10 * 10) / 10;
    player.rpg = Math.round(((player.rpg || 0) * 9 + stat.reb) / 10 * 10) / 10;
    player.apg = Math.round(((player.apg || 0) * 9 + stat.ast) / 10 * 10) / 10;
  });
  renderPlayers();
  renderStatLeaders();
}

function updateMmrFromApprovedStats(reviewId) {
  const review = statReviewStore.reviews.find((item) => item.id === reviewId);
  if (!review) return;
  const winner = review.gameScore.homeScore >= review.gameScore.awayScore ? review.gameScore.home : review.gameScore.away;
  const homePlayers = rankedPlayers.filter((player) => player.teamId === review.gameScore.home);
  const awayPlayers = rankedPlayers.filter((player) => player.teamId === review.gameScore.away);
  const avgHome = homePlayers.reduce((total, player) => total + player.mmr, 0) / Math.max(1, homePlayers.length);
  const avgAway = awayPlayers.reduce((total, player) => total + player.mmr, 0) / Math.max(1, awayPlayers.length);
  rankedPlayers = rankedPlayers.map((player) => {
    const stat = review.parsedStats.find((row) => row.matchedPlayerName === player.name || row.detectedName === player.name);
    if (!stat) return player;
    const beforeMmr = player.mmr;
    const updated = window.MCPA_MMR.updatePlayerMmr(player, {
      won: player.teamId === winner,
      playerTeamAvgMmr: player.teamId === review.gameScore.home ? avgHome : avgAway,
      opponentTeamAvgMmr: player.teamId === review.gameScore.home ? avgAway : avgHome,
      stats: {
        points: stat.pts,
        rebounds: stat.reb,
        assists: stat.ast,
        steals: stat.stl,
        blocks: stat.blk,
        turnovers: stat.tov,
        fouls: stat.fouls,
        fgm: stat.fgm,
        fga: stat.fga,
        threePm: stat.threePm,
        threePa: stat.threePa,
      },
      behaviorPenalty: 0,
    });
    statReviewStore.mmrHistory.unshift({
      playerId: player.id,
      beforeMmr,
      afterMmr: updated.mmr,
      mmrChange: updated.mmr - beforeMmr,
      reason: "Approved OCR stat review",
      gameId: review.gameId,
      approvedBy: review.reviewedBy,
      approvedAt: review.reviewedAt,
    });
    return updated;
  });
  persistRankedPlayers();
  renderMmrRankings();
}

function updateRecordBookFromApprovedStats(reviewId) {
  const review = statReviewStore.reviews.find((item) => item.id === reviewId);
  if (!review) return;
  review.parsedStats.forEach((stat) => {
    const name = stat.matchedPlayerName || stat.detectedName;
    const recordChecks = [
      ["Single-game points", stat.pts],
      ["Single-game assists", stat.ast],
      ["Single-game rebounds", stat.reb],
      ["Season points", stat.pts],
      ["Season assists", stat.ast],
      ["Season rebounds", stat.reb],
    ];
    recordChecks.forEach(([category, value]) => {
      const book = category.startsWith("Season") ? recordBooks.seasonHighs : recordBooks.leagueRecords;
      const current = book.find((record) => record.category === category);
      if (!current || Number(value) > Number(current.value)) {
        if (current) Object.assign(current, { player: name, value, detail: `Approved ${review.gameId}` });
        else book.unshift({ scope: "League", category, player: name, value, detail: `Approved ${review.gameId}` });
      }
    });
  });
  persistRecordBooks();
  renderHistoryBooks();
}

function approveStatReview(reviewId, adminId) {
  const review = statReviewStore.reviews.find((item) => item.id === reviewId);
  if (!review) return null;
  applyReviewEdits(review);
  review.reviewStatus = "APPROVED";
  review.reviewedBy = adminId;
  review.reviewedAt = new Date().toISOString();
  updateGameResultFromApprovedStats(reviewId);
  updatePlayerStatsFromApprovedStats(reviewId);
  updateMmrFromApprovedStats(reviewId);
  updateRecordBookFromApprovedStats(reviewId);
  review.reviewStatus = "MMR_UPDATED";
  if (review.resultId) {
    const result = statReviewStore.provisionalResults.find((item) => item.id === review.resultId);
    if (result) {
      result.status = "FINAL";
      result.finalizedAt = new Date().toISOString();
    }
  }
  CommissionerEngine.createDecision({
    decisionType: "STAT_REVIEW_APPROVED",
    userId: adminId,
    gameId: review.gameId,
    systemDecision: "AUTO_PROCESSED",
    confidenceScore: review.ocrConfidence,
    reasons: ["Stat review finalized and MMR/standings/history updated."],
    ruleReferences: ["Stat validation", "MMR formula", "Record book update"],
    finalStatus: "FINAL",
  });
  notifications.unshift({
    id: `note-mmr-${Date.now()}`,
    userId: "preview-player",
    type: "mmr-updated",
    title: "MMR updated",
    message: `${review.gameScore.home} vs ${review.gameScore.away} stats were approved and ratings were updated.`,
    read: false,
    createdAt: new Date().toISOString(),
    actionUrl: "rankings",
  });
  writeStore("mcpaNotifications", notifications);
  persistStatReviewStore();
  renderStatReview(reviewId);
  renderAdminDashboard();
  renderNotifications();
  showToast("Approved. Standings, stats, MMR, record book, and awards checks updated.");
  return review;
}

function rejectStatReview(reviewId, adminId, reason) {
  const review = statReviewStore.reviews.find((item) => item.id === reviewId);
  if (!review) return null;
  review.reviewStatus = "REJECTED";
  review.reviewedBy = adminId;
  review.reviewedAt = new Date().toISOString();
  review.rejectionReason = reason || "Rejected by admin.";
  persistStatReviewStore();
  renderStatReview(reviewId);
  renderAdminDashboard();
  return review;
}

function renderStatReview(reviewId = activeStatReviewId) {
  const review = statReviewStore.reviews.find((item) => item.id === reviewId) || currentStatReview();
  const statusText = document.querySelector("#ocrStatusText");
  const confidence = document.querySelector("#ocrConfidenceBadge");
  const summary = document.querySelector("#ocrReviewSummary");
  const warnings = document.querySelector("#ocrValidationWarnings");
  const table = document.querySelector("#ocrReviewTable");
  const raw = document.querySelector("#ocrRawText");
  const pipeline = document.querySelector("#ocrPipeline");
  if (!statusText || !confidence || !summary || !warnings || !table || !raw) return;

  if (!review) {
    statusText.textContent = "Upload a final score screenshot to start stat review.";
    confidence.textContent = "No upload";
    summary.innerHTML = `<article class="empty-state"><strong>No OCR uploads</strong><small>Upload a final score screenshot to start stat review.</small></article>`;
    warnings.innerHTML = "";
    table.innerHTML = "";
    raw.textContent = "No OCR text yet.";
    if (pipeline) {
      pipeline.innerHTML = `
        <article><span></span><div><strong>No screenshot</strong><small>Upload required</small></div></article>
        <article><span></span><div><strong>OCR pending</strong><small>Engine check</small></div></article>
        <article><span></span><div><strong>System decision</strong><small>Auto-finalize or route appeal</small></div></article>
      `;
    }
    return;
  }

  const upload = statReviewStore.uploads.find((item) => item.id === review.uploadId);
  activeStatReviewId = review.id;
  statusText.textContent = upload?.ocrStatus === "OCR_LOW_CONFIDENCE"
    ? "OCR engine not available in this build. Upload preview saved. Manual review required."
    : `${review.reviewStatus}: system validation auto-finalizes clean results and routes disputes to staff.`;
  confidence.textContent = `${review.ocrConfidence}% confidence`;
  summary.innerHTML = `
    <article class="score-summary-card">
      <strong>${escapeHtml(review.gameScore.home)} ${review.gameScore.homeScore} - ${review.gameScore.awayScore} ${escapeHtml(review.gameScore.away)}</strong>
      <small>${escapeHtml(review.gameId)} · ${escapeHtml(review.reviewStatus)} · uploaded by ${escapeHtml(upload?.uploadedBy || currentUserName())}</small>
    </article>
  `;
  warnings.innerHTML = review.validationErrors.length
    ? review.validationErrors.map((error) => `<article class="ocr-warning">${escapeHtml(error)}</article>`).join("")
    : `<article class="ocr-good">No hard validation conflicts. Eligible for automatic result finalization.</article>`;
  table.innerHTML = `
    <div class="ocr-row head"><span>Player</span><span>PTS</span><span>REB</span><span>AST</span><span>Map</span></div>
    ${review.parsedStats
      .map(
        (stat) => `
          <article class="ocr-row ${stat.needsCorrection ? "needs-review" : ""}">
            <span><strong>${escapeHtml(stat.detectedName)}</strong><small>${escapeHtml(stat.teamId)} · ${stat.matchConfidence}% match</small></span>
            <input data-ocr-player="${escapeHtml(stat.detectedName)}" data-ocr-stat="pts" type="number" value="${stat.pts}" />
            <input data-ocr-player="${escapeHtml(stat.detectedName)}" data-ocr-stat="reb" type="number" value="${stat.reb}" />
            <input data-ocr-player="${escapeHtml(stat.detectedName)}" data-ocr-stat="ast" type="number" value="${stat.ast}" />
            <span>${escapeHtml(stat.matchedPlayerName || "Needs map")}</span>
          </article>
        `,
      )
      .join("")}
  `;
  raw.textContent = upload?.ocrRawText || "OCR raw text unavailable.";
  if (pipeline) {
    pipeline.innerHTML = `
      <article class="done"><span></span><div><strong>Screenshot uploaded</strong><small>${escapeHtml(upload?.ocrStatus || "SCREENSHOT_UPLOADED")}</small></div></article>
      <article class="${review.ocrConfidence >= 80 ? "done" : ""}"><span></span><div><strong>OCR parsed</strong><small>${review.ocrConfidence}% confidence</small></div></article>
      <article class="${["MMR_UPDATED", "AUTO_PROCESSED", "FINAL"].includes(review.reviewStatus) ? "done" : ""}"><span></span><div><strong>System decision</strong><small>${escapeHtml(review.reviewStatus)}</small></div></article>
    `;
  }
}

function getRegistration() {
  const statedCity = document.querySelector("#signupCity").value.trim();
  const statedState = normalizeState(document.querySelector("#signupState").value);
  const statedZip = document.querySelector("#signupZip").value.trim();
  const dob = document.querySelector("#signupDob").value;
  registrationLocationVerification = {
    ...registrationLocationVerification,
    statedCity,
    statedState,
    statedZip,
    ipState: registrationLocationVerification.ipState || statedState,
    ipCountry: registrationLocationVerification.ipCountry || "US",
  };
  registrationLocationVerification.locationMismatch = detectLocationMismatch({ locationVerification: registrationLocationVerification });
  return {
    name: document.querySelector("#signupName").value.trim(),
    email: document.querySelector("#signupEmail").value.trim(),
    age: calculateAgeFromDob(dob) || Number(document.querySelector("#signupAge").value),
    dob,
    position: document.querySelector("#signupPosition").value,
    city: statedCity,
    state: statedState,
    zip: statedZip,
    build: document.querySelector("#signupBuild").value.trim(),
    kycStatus: document.querySelector("#signupKyc").value,
    locationVerification: { ...registrationLocationVerification },
  };
}

function isRegistrationComplete() {
  const registration = getRegistration();
  return Boolean(
    registration.name &&
      registration.email.includes("@") &&
      registration.age >= 13 &&
      registration.dob &&
      registration.position &&
      registration.city &&
      registration.state &&
      registration.zip &&
      registration.build,
  );
}

function initialsFromName(name) {
  return getUserInitials(name);
}

function addRegistrationToDraftPool() {
  const registration = getRegistration();
  const prospectId = `dp-${registration.email.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;
  const existing = draftProspects.find((prospect) => prospect.id === prospectId || prospect.email.toLowerCase() === registration.email.toLowerCase());

  accountState.registration = { ...registration, id: prospectId };

  if (existing) {
    Object.assign(existing, {
      ...registration,
      id: existing.id,
      platform: accountState.platform,
      status: existing.drafted ? existing.status : "Draft eligible",
    });
    selectedProspectId = existing.id;
    return existing;
  }

  const prospect = {
    ...registration,
    id: prospectId,
    platform: accountState.platform,
    status: "Draft eligible",
    drafted: false,
  };
  draftProspects.unshift(prospect);
  selectedProspectId = prospect.id;
  return prospect;
}

function teamLogoBadge(teamName, extraClass = "") {
  const logo = teamLogos[teamName] || { text: teamName.slice(0, 2).toUpperCase(), color: "lime", image: "" };
  const imageStyle = logo.image ? ` style="background-image: url('${logo.image}')"` : "";
  const colorClass = logo.image ? "" : logo.color;
  return `<span class="team-mark ${colorClass} ${logo.image ? "image-mark" : ""} ${extraClass}"${imageStyle}>${logo.image ? "" : logo.text}</span>`;
}

function renderTeamDirectory() {
  const target = document.querySelector("#teamDirectory");
  if (!target) return;

  target.innerHTML = officialTeams
    .map(
      (team) => `
        <button class="team-directory-card" type="button" data-team-open="${escapeHtml(team.name)}">
          ${teamLogoBadge(team.name)}
          <strong>${team.name}</strong>
          <small>${team.division} division</small>
        </button>
      `,
    )
    .join("");

  target.querySelectorAll("[data-team-open]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedTeamName = button.dataset.teamOpen;
      renderTeamPage();
      setTab("team");
      showToast(`${selectedTeamName} team page opened.`);
    });
  });
}

function openMenu() {
  sideMenu.classList.add("is-open");
  menuBackdrop.classList.add("is-open");
  menuToggle.setAttribute("aria-expanded", "true");
}

function closeMenu() {
  sideMenu.classList.remove("is-open");
  menuBackdrop.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
}

function setTab(tabName) {
  if (["admin", "movement"].includes(tabName) && !isAdminRole()) {
    showToast("Admin controls are only visible to approved staff roles.");
    tabName = "support";
  }

  appShell.classList.toggle("chat-shell", tabName === "chat");
  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.id === `screen-${tabName}`);
  });

  tabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.tab === tabName);
  });

  closeMenu();
  window.scrollTo({ top: 0, behavior: "smooth" });
  appShell.scrollTo({ top: 0, behavior: "smooth" });
  if (tabName === "chat") {
    renderChatRooms();
    renderMessages();
    window.setTimeout(scrollToBottom, 120);
  }
}

function setLeaguePanel(panelName = "overview") {
  const selected = document.querySelector(`[data-league-panel="${panelName}"]`) ? panelName : "overview";
  document.querySelectorAll("[data-league-panel-target]").forEach((button) => {
    button.classList.toggle("active", button.dataset.leaguePanelTarget === selected);
  });
  document.querySelectorAll("[data-league-panel]").forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.leaguePanel === selected);
  });
  if (selected === "scores") renderScoreResults();
  if (selected === "records") renderLeagueRecordPanel();
}

function connectedCount() {
  return [accountState.platform, accountState.discord, accountState.twitch].filter(Boolean).length;
}

function isAdminRole(role = accountState.role) {
  return ["admin", "staff", "commissioner"].includes(role);
}

function isCaptainRole(role = accountState.role) {
  return ["captain", "team-owner", "admin", "staff", "commissioner"].includes(role);
}

function updateLoginGate() {
  renderRegistrationEligibility();
  document.querySelectorAll("[data-login-platform]").forEach((button) => {
    button.classList.toggle("connected", button.dataset.loginPlatform === accountState.platform);
  });

  document.querySelectorAll("[data-required-connect]").forEach((button) => {
    const connected = Boolean(accountState[button.dataset.requiredConnect]);
    button.classList.toggle("connected", connected);
    button.querySelector("strong").textContent = connected
      ? `${button.dataset.requiredConnect === "discord" ? "Discord" : "Twitch"} connected`
      : `Connect ${button.dataset.requiredConnect === "discord" ? "Discord" : "Twitch"}`;
  });

  document.querySelectorAll("[data-login-role]").forEach((button) => {
    button.classList.toggle("active", button.dataset.loginRole === accountState.role);
  });

  const registrationComplete = isRegistrationComplete();
  const complete = Boolean(accountState.platform && accountState.discord && accountState.twitch && registrationComplete);
  enterAppButton.disabled = !complete;
  if (complete) {
    enterAppButton.textContent = `Enter MCPA as ${isAdminRole() ? "staff" : accountState.role === "captain" ? "captain" : "player"}`;
  } else if (!registrationComplete) {
    enterAppButton.textContent = "Complete registration form";
  } else {
    enterAppButton.textContent = `Connect required accounts (${connectedCount()}/3)`;
  }
}

function updateConnectionCards() {
  const states = [
    ["discord", "#connectDiscord", "#discordStatusText", "Connected · roles synced to team chats"],
    ["twitch", "#connectTwitch", "#twitchStatusText", "Connected · live status is required"],
  ];

  states.forEach(([key, buttonSelector, textSelector, connectedText]) => {
    const card = document.querySelector(`[data-connection-card="${key}"]`);
    const button = document.querySelector(buttonSelector);
    const text = document.querySelector(textSelector);
    if (!card || !button || !text) return;

    card.classList.toggle("connected", accountState[key]);
    button.textContent = accountState[key] ? "Connected" : "Connect";
    button.disabled = accountState[key];
    text.textContent = accountState[key] ? connectedText : "Required before league chat unlocks";
  });
}

function renderRegistrationEligibility() {
  const card = document.querySelector("#registrationEligibilityCard");
  if (!card) return;

  const registration = getRegistration();
  const payout = checkPayoutEligibility(registration, jurisdictionRules);
  const cash = checkCashCompetitionEligibility(registration, jurisdictionRules);
  const finalStatus = payout.eligibilityStatus === "ELIGIBLE" ? cash.eligibilityStatus : payout.eligibilityStatus;
  const finalReason = finalStatus === payout.eligibilityStatus ? payout.eligibilityReason : cash.eligibilityReason;

  registrationLocationVerification = {
    ...registrationLocationVerification,
    eligibilityStatus: finalStatus,
    eligibilityReason: finalReason,
    locationMismatch: Boolean(payout.locationMismatch || cash.locationMismatch || detectLocationMismatch(registration)),
  };
  writeStore("mcpaRegistrationLocation", registrationLocationVerification);

  document.querySelector("#eligibilityStatusText").textContent = finalStatus;
  document.querySelector("#eligibilityMessageText").textContent = getEligibilityMessage(finalStatus);
  document.querySelector("#eligibilityStatedState").textContent = registration.locationVerification.statedState || "Missing";
  document.querySelector("#eligibilityCurrentState").textContent = registration.locationVerification.currentState
    ? `${registration.locationVerification.currentState} verified`
    : "Not verified";
  document.querySelector("#eligibilityKycStatus").textContent = registration.kycStatus === "VERIFIED" ? "Verified" : registration.kycStatus === "UNDER_REVIEW" ? "Under review" : "Pending";
  document.querySelector("#eligibilityMismatch").textContent = registrationLocationVerification.locationMismatch ? "Review" : "None";

  card.dataset.status = finalStatus;
  const warning = document.querySelector("#eligibilityWarning");
  const appeal = document.querySelector("#startAppealButton");
  const showWarning = ["FREE_PLAY_ONLY", "RESTRICTED", "NEEDS_MANUAL_REVIEW", "UNDER_REVIEW", "BLOCKED"].includes(finalStatus) || registrationLocationVerification.locationMismatch;
  warning.hidden = !showWarning;
  warning.textContent = showWarning ? finalReason : "";
  appeal.hidden = !["FREE_PLAY_ONLY", "RESTRICTED", "NEEDS_MANUAL_REVIEW", "UNDER_REVIEW", "BLOCKED"].includes(finalStatus);
}

function unlockApp() {
  if (!isRegistrationComplete()) {
    showToast("Complete name, age, email, city, build, and main position before entering.");
    return;
  }

  if (!(accountState.platform && accountState.discord && accountState.twitch)) {
    showToast("Connect Twitch, Discord, and either Xbox or PlayStation before entering.");
    return;
  }

  const prospect = addRegistrationToDraftPool();
  accountState.signedIn = true;
  document.body.dataset.role = accountState.role;
  loginScreen.classList.add("hidden");
  appShell.classList.remove("is-locked");
  bottomNav.classList.remove("is-locked");
  sideMenu.classList.remove("is-locked");
  menuBackdrop.classList.remove("is-locked");
  refreshIdentityUI();
  renderDraftRoom();
  renderDirectMessages();
  renderVoiceRooms();
  renderVoiceStage();
  setTab("home");
  showToast(`${prospect.name} registered at ${prospect.position} and entered into the draft pool.`);
}

function signOut() {
  [XboxProvider, PlayStationProvider, TwitchProvider, DiscordProvider].forEach((provider) => provider.disconnectAccount());
  accountState.signedIn = false;
  accountState.platform = null;
  accountState.discord = false;
  accountState.twitch = false;
  accountState.role = "player";
  accountState.registration = null;
  document.body.dataset.role = accountState.role;
  profileModal.close();
  closeMenu();
  loginScreen.classList.remove("hidden");
  appShell.classList.add("is-locked");
  bottomNav.classList.add("is-locked");
  sideMenu.classList.add("is-locked");
  menuBackdrop.classList.add("is-locked");
  refreshIdentityUI();
  updateLoginGate();
  updateConnectionCards();
  renderDirectMessages();
  renderVoiceRooms();
  renderVoiceStage();
  showToast("Signed out. Required account connections cleared.");
}

function applyPreviewSessionFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const previewRole = params.has("staff") ? "admin" : params.has("player") ? "player" : "";
  if (!previewRole) return false;

  accountState.platform = "Xbox";
  accountState.discord = true;
  accountState.twitch = true;
  accountState.role = previewRole;
  accountState.signedIn = true;
  accountState.registration = {
    id: previewRole === "admin" ? "preview-staff" : "preview-player",
    name: previewRole === "admin" ? "Travon Admin" : "MCPA Player",
    email: previewRole === "admin" ? "staff@mcpa.local" : "player@mcpa.local",
    age: 24,
    dob: "2002-01-01",
    position: "PG",
    city: "Charlotte",
    state: "NC",
    zip: "28202",
    build: "Two-way shot creator",
    kycStatus: "VERIFIED",
    locationVerification: {
      statedCity: "Charlotte",
      statedState: "NC",
      statedZip: "28202",
      currentState: "NC",
      currentCountry: "US",
      currentLatitude: null,
      currentLongitude: null,
      ipState: "NC",
      ipCountry: "US",
      locationPermissionGranted: true,
      locationVerifiedAt: new Date().toISOString(),
      locationMismatch: false,
      vpnOrProxyDetected: false,
      eligibilityStatus: "ELIGIBLE",
      eligibilityReason: getEligibilityMessage("ELIGIBLE"),
    },
  };

  document.body.dataset.role = accountState.role;
  loginScreen.classList.add("hidden");
  appShell.classList.remove("is-locked");
  bottomNav.classList.remove("is-locked");
  sideMenu.classList.remove("is-locked");
  menuBackdrop.classList.remove("is-locked");
  refreshIdentityUI();
  return true;
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("show");
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function persistVotes() {
  localStorage.setItem("mcpaUserVotes", JSON.stringify(userVotes));
}

function getPollById(pollId) {
  return [...awardPolls, ...allStarPolls].find((poll) => poll.id === pollId);
}

function renderAwardCatalog() {
  const catalog = document.querySelector("#awardCatalog");
  if (!catalog) return;

  catalog.innerHTML = `
    <div class="section-heading compact">
      <h2>Season Awards</h2>
      <span class="sync-badge">${awardCatalog.length} honors</span>
    </div>
    <div class="award-chip-grid">
      ${awardCatalog.map((award) => `<span>${award}</span>`).join("")}
    </div>
  `;
}

function renderPolls(targetId, polls) {
  const target = document.querySelector(targetId);
  if (!target) return;

  target.innerHTML = polls
    .map((poll) => {
      const total = poll.options.reduce((sum, option) => sum + option.votes, 0);
      const votedFor = userVotes[poll.id];

      return `
        <article class="poll-card">
          <div class="poll-top">
            <div>
              <p class="eyebrow">${poll.voters}</p>
              <h2>${poll.title}</h2>
              <small>${poll.close}</small>
            </div>
            <span class="sync-badge">${total} votes</span>
          </div>
          <div class="poll-options">
            ${poll.options
              .map((option) => {
                const percent = total ? Math.round((option.votes / total) * 100) : 0;
                const voted = votedFor === option.name;
                return `
                  <button class="poll-option ${voted ? "selected" : ""}" type="button" data-poll-id="${poll.id}" data-vote-name="${option.name}" ${votedFor ? "disabled" : ""}>
                    <span>
                      <strong>${option.name}</strong>
                      <small>${option.team} · ${option.stat}</small>
                    </span>
                    <b>${percent}%</b>
                    <i style="width: ${percent}%"></i>
                  </button>
                `;
              })
              .join("")}
          </div>
          <small class="poll-note">${votedFor ? `Your vote: ${votedFor}` : "Tap one eligible player. Your account can vote once in this poll."}</small>
        </article>
      `;
    })
    .join("");

  target.querySelectorAll("[data-poll-id]").forEach((button) => {
    button.addEventListener("click", () => voteOnPoll(button.dataset.pollId, button.dataset.voteName));
  });
}

function voteOnPoll(pollId, optionName) {
  if (userVotes[pollId]) {
    showToast("You already voted in this poll.");
    return;
  }

  const poll = getPollById(pollId);
  const option = poll?.options.find((entry) => entry.name === optionName);
  if (!option) return;

  option.votes += 1;
  userVotes[pollId] = optionName;
  persistVotes();
  renderPolls("#awardPolls", awardPolls);
  renderPolls("#allStarPolls", allStarPolls);
  showToast(`Vote recorded for ${optionName}. Live poll stats updated.`);
}

function renderHistory() {
  const historyList = document.querySelector("#historyList");
  if (!historyList) return;

  const filtered = historyFilter === "all" ? historyRecords : historyRecords.filter((record) => record.type === historyFilter);
  historyList.innerHTML = filtered
    .map(
      (record) => `
        <article class="history-card ${record.type}">
          <span>${record.season}</span>
          <div>
            <strong>${record.title}</strong>
            <small>${record.winner} · ${record.detail}</small>
          </div>
          <b>${record.type}</b>
        </article>
      `,
    )
    .join("");
}

function renderNotifications() {
  const target = document.querySelector("#notificationList");
  if (!target) return;
  target.innerHTML = notifications.length
    ? notifications
        .slice(0, 4)
        .map(
          (notification) => `
            <button class="notification-card ${notification.read ? "" : "unread"}" type="button" data-notification-action="${escapeHtml(notification.actionUrl)}">
              <span>${notification.read ? "OK" : "NEW"}</span>
              <div>
                <strong>${escapeHtml(notification.title)}</strong>
                <small>${escapeHtml(notification.message)}</small>
              </div>
            </button>
          `,
        )
        .join("")
    : `<article class="empty-state"><strong>No alerts right now</strong><small>Game check-ins, stat reviews, MMR updates, support replies, and payout holds appear here.</small></article>`;
  target.querySelectorAll("[data-notification-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.notificationAction;
      if (action?.startsWith("league:")) {
        setTab("league");
        window.setTimeout(() => setLeaguePanel(action.split(":")[1]), 80);
      } else if (action) {
        setTab(action);
      }
    });
  });
}

function seedCheckinPlayers(teamName, confirmedCount = 0) {
  const positions = ["PG", "SG", "SF", "PF", "C"];
  const team = officialTeams.find((item) => item.name === teamName);
  const seeded = players
    .filter((player) => player.team === teamName)
    .slice(0, 5)
    .map((player, index) => ({
      name: player.name,
      initials: player.initials,
      position: player.position || positions[index],
      confirmed: index < confirmedCount,
    }));

  while (seeded.length < 5) {
    const position = positions[seeded.length];
    seeded.push({
      name: `${team?.short || teamName.slice(0, 3).toUpperCase()} ${position}`,
      initials: `${(team?.short || teamName).slice(0, 1)}${position.slice(0, 1)}`,
      position,
      confirmed: seeded.length < confirmedCount,
    });
  }

  return seeded;
}

function ensureGameCheckins(game) {
  if (game.checkins) return game.checkins;
  const preset = game.id === "g43" ? 5 : game.id === "g42" ? 3 : game.id === "g45" ? 2 : 1;
  game.checkins = {
    home: seedCheckinPlayers(game.home, preset),
    away: seedCheckinPlayers(game.away, Math.max(0, preset - 1)),
  };
  return game.checkins;
}

function confirmedCount(entries) {
  return entries.filter((entry) => entry.confirmed).length;
}

function updateGameLockStatus(game) {
  const checkins = ensureGameCheckins(game);
  const locked = confirmedCount(checkins.home) === 5 && confirmedCount(checkins.away) === 5;
  game.checkIn = `${confirmedCount(checkins.home) + confirmedCount(checkins.away)}/10 confirmed`;
  if (locked && !["Live stats", "Tournament"].includes(game.status)) {
    game.status = "Scheduled";
  }
  return locked;
}

function renderCheckinRows(entries) {
  return entries
    .map(
      (entry) => `
        <span class="${entry.confirmed ? "confirmed" : "pending"}">
          <b>${escapeHtml(entry.position)}</b>
          ${escapeHtml(entry.name)}
        </span>
      `,
    )
    .join("");
}

function handleGameCheckIn(gameId) {
  const game = scheduledGames.find((item) => item.id === gameId);
  if (!game) return;

  const checkins = ensureGameCheckins(game);
  const position = document.querySelector(`[data-checkin-position="${gameId}"]`)?.value || "PG";
  const userName = currentUserName();
  const side = game.home === selectedTeamName ? "home" : game.away === selectedTeamName ? "away" : "home";
  const entries = checkins[side];
  let entry = entries.find((item) => item.self || item.name === userName) || entries.find((item) => !item.confirmed);

  if (!entry) {
    showToast(`${game[side]} already has five confirmed players.`);
    return;
  }

  entry.name = userName;
  entry.initials = initialsFromName(userName);
  entry.position = position;
  entry.confirmed = true;
  entry.self = true;
  const locked = updateGameLockStatus(game);
  renderScheduledGames();
  renderLeagueLockedGames();
  showToast(locked ? `${game.home} vs ${game.away} is locked as scheduled.` : `${userName} checked in at ${position}.`);
}

function renderScheduledGames() {
  const target = document.querySelector("#scheduledGames");
  if (!target) return;

  const games = scheduledGames.filter((game) => game.tags.includes(scheduleFilter));
  target.innerHTML = games
    .map((game) => {
      const checkins = ensureGameCheckins(game);
      const homeConfirmed = confirmedCount(checkins.home);
      const awayConfirmed = confirmedCount(checkins.away);
      const homePct = (homeConfirmed / 5) * 100;
      const awayPct = (awayConfirmed / 5) * 100;
      updateGameLockStatus(game);

      return `
        <article class="game-card schedule-card">
          <div class="schedule-logos">
            ${teamLogos[game.home] ? teamLogoBadge(game.home) : ""}
            ${teamLogos[game.away] ? teamLogoBadge(game.away) : ""}
          </div>
          <div class="game-main">
            <strong>${game.home} vs ${game.away}</strong>
            <small>${game.time} · ${game.court}</small>
          </div>
          <span class="game-status">${game.status}</span>
          <div class="schedule-meta">
            <div><b>Check-in</b><small>${game.checkIn}</small></div>
            <div><b>Stats due</b><small>${game.statSubmitter}</small></div>
          </div>
          <div class="checkin-progress">
            <div>
              <span><b>${escapeHtml(game.home)}</b><small>${homeConfirmed}/5 confirmed</small></span>
              <em><i style="width:${homePct}%"></i></em>
            </div>
            <div>
              <span><b>${escapeHtml(game.away)}</b><small>${awayConfirmed}/5 confirmed</small></span>
              <em><i style="width:${awayPct}%"></i></em>
            </div>
          </div>
          <div class="checkin-actions">
            <select data-checkin-position="${game.id}" aria-label="Check-in position">
              <option>PG</option>
              <option>SG</option>
              <option>SF</option>
              <option>PF</option>
              <option>C</option>
            </select>
            <button class="solid-button" type="button" data-checkin-game="${game.id}">Check in</button>
          </div>
          <details class="checkin-details">
            <summary>Progress</summary>
            <div class="checkin-rosters">
              <div><strong>${escapeHtml(game.home)}</strong>${renderCheckinRows(checkins.home)}</div>
              <div><strong>${escapeHtml(game.away)}</strong>${renderCheckinRows(checkins.away)}</div>
            </div>
          </details>
          <button class="ghost-button schedule-action admin-only" type="button" data-game-action="${game.id}">Send reminder</button>
        </article>
      `;
    })
    .join("");

  target.querySelectorAll("[data-checkin-game]").forEach((button) => {
    button.addEventListener("click", () => handleGameCheckIn(button.dataset.checkinGame));
  });

  target.querySelectorAll("[data-game-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const game = scheduledGames.find((item) => item.id === button.dataset.gameAction);
      showToast(`Reminder sent for ${game.home} vs ${game.away}.`);
    });
  });
}

function renderEventCalendar() {
  const target = document.querySelector("#eventCalendar");
  if (!target) return;

  target.innerHTML = calendarEvents
    .map(
      (event) => `
        <article class="calendar-card">
          <span>${escapeHtml(event.date)}</span>
          <div>
            <strong>${escapeHtml(event.label)}</strong>
            <small>${escapeHtml(event.detail)}</small>
          </div>
          <b>${escapeHtml(event.type)}</b>
        </article>
      `,
    )
    .join("");
}

function renderLeagueLockedGames() {
  const target = document.querySelector("#leagueLockedGames");
  if (!target) return;

  target.innerHTML = scheduledGames
    .filter((game) => game.status !== "Draft")
    .slice(0, 3)
    .map((game) => {
      updateGameLockStatus(game);
      return `
        <article class="game-card locked-time-card">
          <div class="schedule-logos">
            ${teamLogos[game.home] ? teamLogoBadge(game.home) : ""}
            ${teamLogos[game.away] ? teamLogoBadge(game.away) : ""}
          </div>
          <div class="game-main">
            <strong>${game.home} vs ${game.away}</strong>
            <small>${game.time} · ${game.court}</small>
          </div>
          <span class="game-status">${game.status}</span>
        </article>
      `;
    })
    .join("");
}

function renderScoreResults() {
  const target = document.querySelector("#scoreResults");
  const leagueTarget = document.querySelector("#leagueScoresPanel");
  const markup = gameResults
    .map(
      (result) => `
        <article class="score-result-card">
          <header>
            <div>
              <span>${result.label}</span>
              <strong>${result.game}</strong>
            </div>
            <small>${result.submitted}</small>
          </header>
          <div class="score-result-teams">
            <div class="${result.winner === result.home ? "winner" : ""}">
              ${teamLogos[result.home] ? teamLogoBadge(result.home) : `<span class="team-mark teal">${escapeHtml(result.home.slice(0, 2).toUpperCase())}</span>`}
              <span>${escapeHtml(result.home)}</span>
              <strong>${result.homeScore}</strong>
            </div>
            <div class="${result.winner === result.away ? "winner" : ""}">
              ${teamLogos[result.away] ? teamLogoBadge(result.away) : `<span class="team-mark orange">${escapeHtml(result.away.slice(0, 2).toUpperCase())}</span>`}
              <span>${escapeHtml(result.away)}</span>
              <strong>${result.awayScore}</strong>
            </div>
          </div>
        </article>
      `,
    )
    .join("");
  if (target) target.innerHTML = markup;
  if (leagueTarget) leagueTarget.innerHTML = markup;
}

function renderTeamPage() {
  const roster = document.querySelector("#teamPageRoster");
  const logo = document.querySelector("#teamPageLogo");
  const team = officialTeams.find((item) => item.name === selectedTeamName) || officialTeams[0];
  const standing = teamStandings.find((item) => item.team === team.name) || { w: 0, l: 0, division: team.division, streak: "-", pf: 0, pa: 0 };
  const ranked = sortedStandings().map((item, index) => ({ ...item, seed: index + 1 }));
  const seededTeam = ranked.find((item) => item.team === team.name);
  const nextGame = scheduledGames.find((game) => game.home === team.name || game.away === team.name);

  if (logo) {
    logo.innerHTML = teamLogoBadge(team.name);
  }

  document.querySelector("#team-title").textContent = `${team.name} HQ`;
  document.querySelector("#teamPageName").textContent = team.name;
  document.querySelector("#teamPageMeta").textContent = `${standing.w}-${standing.l} · ${team.division} #${seededTeam?.seed || "-"} · Team Owner: ${team.name === "Shockers" ? "DreLock" : "Captain pending"}`;
  document.querySelector("#teamPageRecord").textContent = `${standing.w}-${standing.l}`;
  document.querySelector("#teamPageSeed").textContent = `${team.division} #${seededTeam?.seed || "-"} · ${standing.streak}`;
  document.querySelector("#teamPagePrize").textContent = `$${Math.max(420, (standing.w * 95 + 100)).toLocaleString()}`;
  document.querySelector("#teamPageNextTime").textContent = nextGame ? nextGame.time.split(" · ").pop() : "TBD";
  document.querySelector("#teamPageNextOpponent").textContent = nextGame ? `${nextGame.home === team.name ? "vs " + nextGame.away : "@ " + nextGame.home} · ${nextGame.court}` : "No locked matchup";
  document.querySelector("#teamPageChatActivity").textContent = `${team.name} private room has ${Math.max(1, Math.min(5, standing.w % 6))} players active.`;

  if (!roster) return;

  const rosterSeed = [
    ...players.filter((player) => player.team === team.name),
    ...(team.name === "Shockers"
      ? [
          { name: "LockTae", initials: "LT", color: "teal", position: "SG", teamRole: "Captain", ppg: 19.8, apg: 6.4, rpg: 3.1, isLive: false },
          { name: "ShotKev", initials: "SK", color: "lime", position: "SF", teamRole: "Player", ppg: 17.2, apg: 3.8, rpg: 5.9, isLive: false },
          { name: "BoardMan", initials: "BM", color: "orange", position: "PF", teamRole: "Player", ppg: 12.6, apg: 2.4, rpg: 9.8, isLive: false },
          { name: "PaintRue", initials: "PR", color: "red", position: "C", teamRole: "Player", ppg: 14.1, apg: 2.1, rpg: 11.2, isLive: false },
          { name: "CornerKai", initials: "CK", color: "teal", position: "SG", teamRole: "Sixth Man", ppg: 10.4, apg: 2.8, rpg: 2.9, isLive: false },
        ]
      : []),
  ].slice(0, 8);
  const positions = ["PG", "SG", "SF", "PF", "C"];
  while (rosterSeed.length < 5) {
    const position = positions[rosterSeed.length % positions.length];
    rosterSeed.push({
      name: `${team.short} ${position}`,
      initials: `${team.short.slice(0, 1)}${position.slice(0, 1)}`,
      color: team.color,
      position,
      teamRole: rosterSeed.length === 0 ? "Captain" : "Player",
      ppg: (10 + rosterSeed.length * 2.3).toFixed(1),
      apg: (2 + rosterSeed.length * 0.7).toFixed(1),
      rpg: (3 + rosterSeed.length * 1.1).toFixed(1),
      isLive: false,
    });
  }

  document.querySelector("#teamPageRosterBadge").textContent = `Roster ${rosterSeed.length}/8`;
  document.querySelector("#teamPageRosterCount").textContent = `${rosterSeed.length}/8`;
  document.querySelector("#teamPageSlots").textContent = `${8 - rosterSeed.length} slot${8 - rosterSeed.length === 1 ? "" : "s"} open`;

  roster.innerHTML = rosterSeed
    .map(
      (player) => `
        <button class="player-card compact-player" type="button" data-team-player="${player.name}">
          <span class="player-avatar ${player.color}">${player.initials}</span>
          <span>
            <strong>${player.name}</strong>
            <small>${player.position} · ${player.teamRole}</small>
            <em>${player.ppg} PPG · ${player.apg} APG · ${player.rpg} RPG</em>
          </span>
          ${player.isLive ? `<span class="live-light on"></span>` : `<span class="live-light"></span>`}
        </button>
      `,
    )
    .join("");

  roster.querySelectorAll("[data-team-player]").forEach((button) => {
    button.addEventListener("click", () => {
      const playerIndex = players.findIndex((player) => player.name === button.dataset.teamPlayer);
      if (playerIndex >= 0) openPlayer(playerIndex);
      else showToast(`${button.dataset.teamPlayer} profile preview is ready for team role assignment.`);
    });
  });
}

function sortedStandings() {
  return [...teamStandings].sort((first, second) => {
    const pctDiff = second.w / (second.w + second.l) - first.w / (first.w + first.l);
    if (pctDiff !== 0) return pctDiff;
    return second.pf - second.pa - (first.pf - first.pa);
  });
}

function renderTeamStandings() {
  const target = document.querySelector("#teamStandings");
  if (!target) return;

  const sorted = sortedStandings();
  const leader = sorted[0];
  const leaderWins = leader.w;
  const leaderLosses = leader.l;
  const ranked = sorted.map((team, index) => ({ ...team, seed: index + 1 }));
  const filtered = ranked.filter((team) => {
    if (standingsFilter === "all") return true;
    if (standingsFilter === "playoff") return team.seed <= 8;
    return team.division === standingsFilter;
  });

  document.querySelector("#topSeedName").textContent = leader.team;
  document.querySelector("#topSeedRecord").textContent = `${leader.w}-${leader.l} · ${standingsPct(leader)}`;
  renderPlayoffPicture(ranked);

  target.innerHTML = filtered
    .map((team) => {
      const diff = (team.pf - team.pa).toFixed(1);
      const gamesBack = ((leaderWins - team.w + team.l - leaderLosses) / 2).toFixed(1);
      const gb = team.seed === 1 ? "-" : gamesBack.replace(".0", "");
      const seedClass = team.seed <= 2 ? "clinched" : team.seed <= 4 ? "round" : team.seed <= 8 ? "bubble" : "outside";

      return `
        <tr class="${seedClass}">
          <td><span class="seed-number">${team.seed}</span></td>
          <td>
            <div class="standings-team">
              ${teamLogoBadge(team.team)}
              <div><strong>${team.team}</strong><small>${team.division}</small></div>
            </div>
          </td>
          <td>${team.w}-${team.l}</td>
          <td>${standingsPct(team)}</td>
          <td>${gb}</td>
          <td>${team.streak}</td>
          <td>${diff > 0 ? `+${diff}` : diff}</td>
        </tr>
      `;
    })
    .join("");
}

function renderPlayoffPicture(ranked = sortedStandings().map((team, index) => ({ ...team, seed: index + 1 }))) {
  const byes = ranked.slice(0, 2);
  const firstRound = ranked.slice(2, 4);
  const playIn = ranked.slice(4, 8);
  const [seed5, seed6, seed7, seed8] = playIn;
  const targets = {
    byes: document.querySelector("#playoffByes"),
    first: document.querySelector("#firstRoundSeeds"),
    playIn: document.querySelector("#playInGames"),
    main: document.querySelector("#mainBracketMatchups"),
  };

  if (!targets.byes || !targets.first || !targets.playIn || !targets.main) return;

  const seedLine = (team) => `
    <div class="playoff-team">
      ${teamLogoBadge(team.team)}
      <strong>#${team.seed} ${team.team}</strong>
      <small>${team.w}-${team.l}</small>
    </div>
  `;

  targets.byes.innerHTML = byes.map(seedLine).join("");
  targets.first.innerHTML = firstRound.map(seedLine).join("");
  targets.playIn.innerHTML = `
    <div><strong>Game 1</strong><small>#5 ${seed5.team} vs #6 ${seed6.team} · winner becomes #5</small></div>
    <div><strong>Game 2</strong><small>#7 ${seed7.team} vs #8 ${seed8.team} · loser eliminated</small></div>
    <div><strong>Game 3</strong><small>Loser of Game 1 vs winner of Game 2 · winner becomes #6</small></div>
  `;
  targets.main.innerHTML = `
    <div><strong>First Round</strong><small>#3 ${firstRound[0].team} vs play-in #6</small></div>
    <div><strong>First Round</strong><small>#4 ${firstRound[1].team} vs play-in #5</small></div>
    <div><strong>Semifinals</strong><small>#1 ${byes[0].team} and #2 ${byes[1].team} enter with byes</small></div>
  `;
}

function standingsPct(team) {
  return (team.w / (team.w + team.l)).toFixed(3).replace("0.", ".");
}

function renderStatLeaders() {
  const target = document.querySelector("#statLeaders");
  if (!target) return;

  const config = leaderStats[activeLeaderStat];
  const eligiblePlayers =
    activeLeaderPosition === "all" ? players : players.filter((player) => player.position === activeLeaderPosition);
  const leaders = [...eligiblePlayers].sort((first, second) => second[activeLeaderStat] - first[activeLeaderStat]).slice(0, 5);

  if (!leaders.length) {
    target.innerHTML = `
      <article class="empty-state">
        <strong>No ${activeLeaderPosition} leaders yet</strong>
        <small>Once a player is assigned to this position, they will show here.</small>
      </article>
    `;
    return;
  }

  target.innerHTML = leaders
    .map((player, index) => {
      const value = Number(player[activeLeaderStat]).toFixed(config.precision);
      return `
        <button class="leader-card" type="button" data-leader-player="${player.name}">
          <span class="leader-rank">${index + 1}</span>
          ${teamLogoBadge(player.team)}
          <span>
            <strong>${player.name}</strong>
            <small>${player.team} · ${player.position} · ${config.label}</small>
          </span>
          <b>${value}${config.suffix.includes("%") ? "%" : ""}<small>${config.suffix.includes("%") ? "" : config.suffix}</small></b>
        </button>
      `;
    })
    .join("");

  target.querySelectorAll("[data-leader-player]").forEach((button) => {
    button.addEventListener("click", () => {
      const playerIndex = players.findIndex((player) => player.name === button.dataset.leaderPlayer);
      openPlayer(playerIndex);
    });
  });
}

function renderLiveStreams() {
  const target = document.querySelector("#liveStreams");
  if (!target) return;

  const sortedPlayers = [...players].sort((first, second) => Number(second.isLive) - Number(first.isLive) || second.viewers - first.viewers);
  target.innerHTML = sortedPlayers
    .map((player) => {
      const liveLabel = player.isLive ? "LIVE" : "OFF";
      const viewers = player.isLive ? `${player.viewers} watching` : "Not streaming";
      return `
        <article class="stream-card ${player.isLive ? "is-live" : "offline"}">
          <div class="stream-avatar ${player.color}">
            <span class="live-light ${player.isLive ? "on" : ""}"></span>
            ${player.initials}
          </div>
          <div>
            <div class="stream-title-row">
              <strong>${player.name}</strong>
              <span>${liveLabel}</span>
            </div>
            <small>${player.streamTitle}</small>
            <em>Discord: ${player.discord} · Twitch: @${player.twitch} · ${viewers}</em>
          </div>
          <button class="ghost-button watch-stream" type="button" data-stream-player="${player.name}">${player.isLive ? "Watch" : "Notify"}</button>
        </article>
      `;
    })
    .join("");

  target.querySelectorAll("[data-stream-player]").forEach((button) => {
    button.addEventListener("click", () => {
      const player = players.find((item) => item.name === button.dataset.streamPlayer);
      showToast(player.isLive ? `Opening ${player.name}'s Twitch stream preview.` : `Live notification set for ${player.name}.`);
    });
  });
}

function renderPlayers(list = players) {
  const playerList = document.querySelector("#playerList");
  playerList.innerHTML = list
    .map(
      (player) => {
        const logo = teamLogos[player.team] || { text: "FA", color: "red", image: "" };
        const logoMarkup = logo.image
          ? `<img src="${logo.image}" alt="${player.team} logo" />`
          : `<span class="team-mark ${logo.color}">${logo.text}</span>`;

        return `
        <button class="player-card" type="button" data-player-index="${players.indexOf(player)}">
          <span class="player-avatar ${player.color}">${player.initials}</span>
          <span>
            <strong>${player.name}</strong>
            <small>
              <span class="team-hover">
                ${player.team}
                <span class="team-logo-pop" role="tooltip">${logoMarkup}<b>${player.team}</b></span>
              </span>
              · ${player.position} · ${player.tag}
            </small>
            <em>${player.teamRole} · ${player.chatAccess}</em>
            <em class="accolade-line">${player.accolades[0]}</em>
            <em class="safety-line"><span class="verification-dot ${player.identityStatus.toLowerCase()}"></span>${player.platform} · ${player.identityStatus} · Trust ${player.trustScore}</em>
            ${player.isLive ? `<em class="stream-line"><span class="live-light on"></span>Live on Twitch · ${player.viewers} watching</em>` : ""}
          </span>
          <span class="stat">
            <strong>${player.ppg}</strong>
            <small>PPG</small>
          </span>
        </button>
      `;
      },
    )
    .join("");

  document.querySelectorAll("[data-player-index]").forEach((card) => {
    card.addEventListener("click", () => openPlayer(Number(card.dataset.playerIndex)));
  });
}

function openPlayer(index) {
  const player = players[index];
  const ranked = rankedPlayers.find((item) => item.name === player.name);
  const playerRecords = [
    ...recordBooks.leagueRecords,
    ...recordBooks.teamRecords,
    ...recordBooks.seasonHighs,
  ].filter((record) => record.player === player.name);
  const modal = document.querySelector("#playerModal");
  const modalContent = document.querySelector("#modalContent");

  modalContent.innerHTML = `
    <div class="modal-hero">
      <span class="player-avatar ${player.color}">${player.initials}</span>
      <div>
        <p class="eyebrow">${player.team}</p>
        <h2>${player.name}</h2>
        <small>${player.position} · ${player.tag} · ${player.build}</small>
      </div>
    </div>
    <div class="profile-stats">
      <article><span>POS</span><strong>${player.position}</strong></article>
      <article><span>Trust</span><strong>${player.trustScore}</strong></article>
      <article><span>MMR</span><strong>${ranked?.mmr || 1000}</strong></article>
      <article><span>Tier</span><strong>${ranked?.tier || "Starter"}</strong></article>
      <article><span>PPG</span><strong>${player.ppg}</strong></article>
      <article><span>APG</span><strong>${player.apg}</strong></article>
      <article><span>RPG</span><strong>${player.rpg}</strong></article>
      <article><span>SPG</span><strong>${player.spg}</strong></article>
      <article><span>BPG</span><strong>${player.bpg}</strong></article>
      <article><span>FG</span><strong>${player.fg}</strong></article>
      <article><span>3PT</span><strong>${player.three}</strong></article>
      <article><span>Record</span><strong>${player.record}</strong></article>
      <article><span>Role</span><strong>${player.teamRole}</strong></article>
    </div>
    <div class="permission-note">
      <strong>Team access</strong>
      <small>${player.chatAccess}. Team owners can approve roster additions, upload logos, and grant private team chat.</small>
    </div>
    <div class="permission-note">
      <strong>Connected accounts</strong>
      <small>Discord: ${player.discord} · Twitch: @${player.twitch}${player.isLive ? ` · Live now with ${player.viewers} viewers` : " · Offline"}</small>
    </div>
    <div class="permission-note">
      <strong>Account verification</strong>
      <small>${player.platform} name sync active · ${player.accountAge} old · ${player.identityStatus}. ${player.identityNote}. Internal console identifiers are never shown.</small>
    </div>
    <div class="accolade-stack">
      <strong>Accolades</strong>
      <div>
        ${player.accolades.map((award) => `<span>${award}</span>`).join("")}
      </div>
    </div>
    <div class="accolade-stack">
      <strong>Record book</strong>
      <div>
        ${playerRecords.length ? playerRecords.map((record) => `<span>${record.category}: ${record.value}</span>`).join("") : "<span>No active records</span>"}
      </div>
    </div>
    <div class="shot-map" aria-label="Recent shot map">
      <span></span><span></span><span></span>
    </div>
  `;

  modal.showModal();
}

function renderBracket() {
  const bracket = document.querySelector("#bracket");
  bracket.innerHTML = bracketSets[bracketIndex]
    .map(
      ([seed, team, matchup]) => `
        <article>
          <span>${seed}</span>
          <strong>${team}</strong>
          <small>${matchup}</small>
        </article>
      `,
    )
    .join("");
}

function renderIdentityQueue() {
  const target = document.querySelector("#identityQueue");
  if (!target) return;

  target.innerHTML = identityReviews
    .map(
      (review) => `
        <article class="identity-card">
          <div>
            <div class="identity-topline">
              <strong>${review.name}</strong>
              <span class="risk-badge ${review.risk.toLowerCase()}">${review.risk}</span>
            </div>
            <small>${review.platform} · trust score ${review.score}</small>
            <p>${review.issue}</p>
            <em>${review.action}</em>
          </div>
          <div class="identity-actions">
            <button class="ghost-button" type="button" data-identity-action="hold" data-identity-name="${review.name}">Hold</button>
            <button class="solid-button" type="button" data-identity-action="clear" data-identity-name="${review.name}">Clear</button>
          </div>
        </article>
      `,
    )
    .join("");

  target.querySelectorAll("[data-identity-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.identityAction === "clear" ? "cleared" : "held for review";
      showToast(`${button.dataset.identityName} ${action}. Staff action was added to the audit log.`);
    });
  });
}

function renderSupportTickets() {
  const userTarget = document.querySelector("#ticketList");
  const adminTarget = document.querySelector("#adminTicketQueue");
  const markup = supportTickets
    .map(
      (ticket) => `
        <article class="ticket-card">
          <header>
            <div>
              <strong>${ticket.id} · ${escapeHtml(ticket.subject)}</strong>
              <small>${escapeHtml(ticket.type)} · ${escapeHtml(ticket.owner)}</small>
            </div>
            <b>${ticket.status}</b>
          </header>
          <em>${escapeHtml(ticket.detail)}</em>
        </article>
      `,
    )
    .join("");

  if (userTarget) {
    userTarget.innerHTML = markup || `<article class="empty-state"><strong>No tickets yet</strong><small>Open a ticket when you need help.</small></article>`;
  }

  if (adminTarget) {
    adminTarget.innerHTML = markup || `<article class="empty-state"><strong>No support queue</strong><small>Submitted tickets will show here for staff.</small></article>`;
  }
}

function movementBadgeClass(status) {
  return String(status || "").toLowerCase().replace(/_/g, "-");
}

function renderMovementCard(item) {
  const reasons = item.systemReasons?.length ? item.systemReasons : ["No system reasons recorded"];
  const hard = item.hardRuleViolations?.length ? item.hardRuleViolations : ["None"];
  const soft = item.softRuleFlags?.length ? item.softRuleFlags : ["None"];
  return `
    <article class="movement-card ${movementBadgeClass(item.status)}">
      <header>
        <div>
          <strong>${escapeHtml(item.title || item.player)}</strong>
          <small>${escapeHtml(item.movementType)} · ${escapeHtml(item.player || "")} ${item.fromTeam ? `from ${escapeHtml(item.fromTeam)}` : ""} ${item.toTeam ? `to ${escapeHtml(item.toTeam)}` : ""}</small>
        </div>
        <b>${escapeHtml(item.status)}</b>
      </header>
      <div class="decision-grid">
        <span>System</span><strong>${escapeHtml(item.systemDecision)}</strong>
        <span>Confidence</span><strong>${item.systemConfidenceScore}/100</strong>
        <span>Hard rules</span><small>${hard.map(escapeHtml).join(", ")}</small>
        <span>Soft flags</span><small>${soft.map(escapeHtml).join(", ")}</small>
        <span>Reasons</span><small>${reasons.map(escapeHtml).join("; ")}</small>
      </div>
      <label class="override-reason">
        Override reason
        <textarea data-movement-reason="${item.id}" placeholder="Required for any admin override">${escapeHtml(item.adminOverrideReason || "")}</textarea>
      </label>
      <div class="movement-actions admin-only">
        <button class="solid-button" type="button" data-movement-action="ADMIN_APPROVED" data-movement-id="${item.id}" data-movement-type="${item.movementType}">Approve</button>
        <button class="ghost-button danger" type="button" data-movement-action="ADMIN_DENIED" data-movement-id="${item.id}" data-movement-type="${item.movementType}">Deny</button>
        <button class="ghost-button" type="button" data-movement-action="ADMIN_OVERRIDDEN" data-movement-id="${item.id}" data-movement-type="${item.movementType}">Override</button>
      </div>
      ${item.status === "ADMIN_OVERRIDDEN" ? `<em class="override-badge">Override saved by ${escapeHtml(item.adminId || "staff")}</em>` : ""}
    </article>
  `;
}

function renderMovementDashboard() {
  const target = document.querySelector("#movementDashboard");
  const summary = document.querySelector("#adminMovementSummary");
  const sections = [
    ["Review Queue", "NEEDS_REVIEW"],
    ["Auto-Approved", "AUTO_APPROVED"],
    ["Auto-Denied", "AUTO_DENIED"],
    ["Emergency Review", "EMERGENCY_REVIEW"],
    ["Overrides", "ADMIN_OVERRIDDEN"],
  ];

  if (summary) {
    summary.innerHTML = sections
      .map(([label, status]) => `<article><span>${label}</span><strong>${movementStore.requests.filter((item) => item.status === status).length}</strong><small>${status}</small></article>`)
      .join("");
  }

  if (!target) return;
  target.innerHTML = `
    <div class="movement-tabs" role="tablist" aria-label="Movement admin sections">
      ${sections.map(([label, status], index) => `<button class="mini-tab ${index === 0 ? "active" : ""}" type="button" data-movement-tab="${status}">${label}</button>`).join("")}
      <button class="mini-tab" type="button" data-movement-tab="HISTORY">History</button>
    </div>
    ${sections
      .map(([label, status], index) => {
      const cards = movementStore.requests.filter((item) => item.status === status).map(renderMovementCard).join("");
      return `<section class="movement-section ${index === 0 ? "active" : ""}" data-movement-panel="${status}"><h3>${label}</h3>${cards || `<article class="empty-state"><strong>No items</strong><small>${status} queue is clear.</small></article>`}</section>`;
    })
      .join("")}
    <section class="movement-section" data-movement-panel="HISTORY"><h3>Movement history</h3>${movementStore.history
      .map((item) => `<article class="history-card"><span>${escapeHtml(item.movementType)}</span><div><strong>${escapeHtml(item.originalDecision)} to ${escapeHtml(item.finalDecision)}</strong><small>${escapeHtml(item.movementId)} · ${item.reasons.map(escapeHtml).join("; ")}</small></div><b>${new Date(item.createdAt).toLocaleDateString()}</b></article>`)
      .join("") || `<article class="empty-state"><strong>No movement history</strong><small>Approvals, denials, and overrides are saved here.</small></article>`}</section>
  `;

  target.querySelectorAll("[data-movement-tab]").forEach((tab) => {
    tab.addEventListener("click", () => {
      target.querySelectorAll("[data-movement-tab]").forEach((item) => item.classList.remove("active"));
      target.querySelectorAll("[data-movement-panel]").forEach((panel) => panel.classList.remove("active"));
      tab.classList.add("active");
      target.querySelector(`[data-movement-panel="${tab.dataset.movementTab}"]`)?.classList.add("active");
    });
  });

  target.querySelectorAll("[data-movement-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const reason = document.querySelector(`[data-movement-reason="${button.dataset.movementId}"]`)?.value || "";
      const saved = adminOverrideMovement(button.dataset.movementId, button.dataset.movementType, button.dataset.movementAction, reason, currentUserName());
      if (saved) {
        renderMovementDashboard();
        renderWaivers();
        showToast(`${saved.title} saved as ${saved.status}.`);
      }
    });
  });
}

function renderJurisdictionRulesPanel() {
  const version = document.querySelector("#jurisdictionVersion");
  const list = document.querySelector("#jurisdictionRulesList");
  const history = document.querySelector("#jurisdictionHistoryList");
  const overrides = document.querySelector("#eligibilityOverrideHistory");
  if (version) version.textContent = jurisdictionRules.version;

  if (list) {
    const states = Object.entries(jurisdictionRules.states).sort(([a], [b]) => a.localeCompare(b));
    list.innerHTML = states.length
      ? states
          .map(
            ([state, rule]) => `
              <article class="jurisdiction-rule-card">
                <div><strong>${state}</strong><small>${escapeHtml(rule.reason)}</small></div>
                <span>${escapeHtml(rule.payoutEligibility)}</span>
                <small>${rule.requiresManualReview ? "Manual review" : rule.freePlayAllowed ? "Free play allowed" : "Blocked"} · updated ${rule.lastUpdatedAt ? new Date(rule.lastUpdatedAt).toLocaleDateString() : "default"}</small>
              </article>
            `,
          )
          .join("")
      : `<article class="empty-state"><strong>No restricted states configured</strong><small>Default rule is ${escapeHtml(jurisdictionRules.defaultRule)}.</small></article>`;
  }

  if (history) {
    history.innerHTML = jurisdictionRuleHistory.length
      ? jurisdictionRuleHistory
          .map(
            (item) => `
              <article class="movement-card">
                <header><div><strong>${escapeHtml(item.state)}</strong><small>${escapeHtml(item.adminId)} · ${new Date(item.timestamp).toLocaleString()}</small></div><b>Rule change</b></header>
                <small>${item.newRule ? escapeHtml(item.newRule.reason || "Rule updated") : "State removed from restricted list"}</small>
              </article>
            `,
          )
          .join("")
      : `<article class="empty-state"><strong>No rule changes yet</strong><small>Compliance changes will be logged here.</small></article>`;
  }

  if (overrides) {
    overrides.innerHTML = eligibilityOverrideHistory.length
      ? eligibilityOverrideHistory
          .map(
            (item) => `
              <article class="movement-card admin-overridden">
                <header><div><strong>${escapeHtml(item.playerId)}</strong><small>${escapeHtml(item.overrideReason)} · ${new Date(item.timestamp).toLocaleString()}</small></div><b>${escapeHtml(item.finalStatus)}</b></header>
                <small>${escapeHtml(item.originalStatus)} to ${escapeHtml(item.finalStatus)} · ${escapeHtml(item.adminId)}</small>
              </article>
            `,
          )
          .join("")
      : `<article class="empty-state"><strong>No eligibility overrides</strong><small>Every override requires a reason and admin ID.</small></article>`;
  }
}

function renderAdminDashboard() {
  const target = document.querySelector("#adminDashboard");
  if (!target) return;
  const pendingReviews = statReviewStore.reviews.filter((review) => ["NEEDS_REVIEW", "OCR_COMPLETE", "OCR_LOW_CONFIDENCE"].includes(review.reviewStatus)).length;
  const movementReview = movementStore.requests.filter((item) => ["NEEDS_REVIEW", "EMERGENCY_REVIEW"].includes(item.status)).length;
  const supportOpen = supportTickets.filter((ticket) => ["Open", "In review", "In Review"].includes(ticket.status)).length;
  const cards = [
    ["Pending score reviews", pendingReviews, "Final screenshots waiting on approval", "scan"],
    ["OCR stat reviews", pendingReviews, "MMR locked until approved", "scan"],
    ["Registration verification", 2, "KYC and location checks", "admin"],
    ["Payment issues", 3, "Registration or payout holds", "payments"],
    ["Movement requests", movementReview, "Trades, waivers, releases", "movement"],
    ["Support tickets", supportOpen, "User issues and bugs", "support"],
    ["Integrity flags", 2, "Burner, conduct, or cheating checks", "admin"],
    ["Payout holds", 1, "Eligibility or compliance hold", "payments"],
  ];
  target.innerHTML = cards
    .map(
      ([title, count, detail, tab]) => `
        <button class="review-card" type="button" data-tab-target="${tab}">
          <span>${count}</span>
          <div><strong>${title}</strong><small>${detail}</small></div>
        </button>
      `,
    )
    .join("");
  target.querySelectorAll("[data-tab-target]").forEach((button) => {
    button.addEventListener("click", () => setTab(button.dataset.tabTarget));
  });
}

function renderFinanceSummary() {
  const summary = calculateLeagueFinanceSummary(96, 0);
  const total = document.querySelector("#financeTotalCollected");
  const prize = document.querySelector("#financePrizePool");
  const deposit = document.querySelector("#financeDepositPool");
  if (total) total.textContent = `$${summary.totalCollected.toLocaleString()}`;
  if (prize) prize.textContent = `$${LeagueFinanceConfig.prizeExample.totalPrizePool.toLocaleString()} prize pool`;
  if (deposit) deposit.textContent = `$${summary.depositPool.toLocaleString()} deposit pool`;
}

function freeAgentEntries() {
  const undrafted = draftProspects.filter((prospect) => !prospect.drafted).map((prospect) => ({ name: prospect.name, position: prospect.position, detail: `${prospect.build} · ${prospect.city}`, source: "Undrafted pool" }));
  const released = players.filter((player) => player.teamRole === "Free Agent").map((player) => ({ name: player.name, position: player.position, detail: `${player.tag} · ${player.ppg} PPG · ${player.identityStatus}`, source: "Released or unsigned" }));
  return [...undrafted, ...released];
}

function renderFreeAgency() {
  const target = document.querySelector("#freeAgentPool");
  const count = document.querySelector("#freeAgentCount");
  if (!target) return;
  const entries = freeAgentEntries();
  if (count) count.textContent = `${entries.length} available`;
  target.innerHTML = entries.map((agent) => `<article class="movement-card"><header><div><strong>${escapeHtml(agent.name)}</strong><small>${escapeHtml(agent.position)} · ${escapeHtml(agent.detail)}</small></div><b>${escapeHtml(agent.source)}</b></header><button class="solid-button" type="button" data-tryout-player="${escapeHtml(agent.name)}">Apply for tryout</button></article>`).join("");
  target.querySelectorAll("[data-tryout-player]").forEach((button) => {
    button.addEventListener("click", () => showToast(`${button.dataset.tryoutPlayer} tryout request sent to team owners.`));
  });
}

function renderWaivers() {
  const target = document.querySelector("#waiverWire");
  if (!target) return;
  const waivers = movementStore.requests.filter((item) => item.movementType === "waiverClaim");
  target.innerHTML = waivers.map(renderMovementCard).join("") || `<article class="empty-state"><strong>No waiver claims</strong><small>Released players will appear here for claim order.</small></article>`;
}

function renderMmrRankings() {
  const target = document.querySelector("#mmrRankings");
  if (!target) return;
  const term = mmrSearch.trim().toLowerCase();
  const currentTeam = selectedTeamName || "Shockers";
  const ranked = [...rankedPlayers]
    .filter((player) => {
      if (mmrFilter === "my-team" && player.teamId !== currentTeam) return false;
      if (["PG", "SG", "SF", "PF", "C"].includes(mmrFilter) && player.position !== mmrFilter) return false;
      if (mmrFilter === "rising" && !String((player.recentForm || []).join("")).includes("W")) return false;
      if (!term) return true;
      return [player.name, player.gamertag, player.position, player.teamId, player.tier].some((value) => String(value).toLowerCase().includes(term));
    })
    .sort((first, second) => {
      if (mmrSort === "reliability") return second.reliability - first.reliability;
      if (mmrSort === "recentForm") return String(second.recentForm || "").localeCompare(String(first.recentForm || ""));
      if (mmrSort === "winPct") {
        const firstPct = first.wins / Math.max(1, first.wins + first.losses);
        const secondPct = second.wins / Math.max(1, second.wins + second.losses);
        return secondPct - firstPct;
      }
      return second.mmr - first.mmr;
    });
  target.innerHTML = `
    <div class="ranking-row head"><span>#</span><span>Player</span><span>MMR</span><span>Trend</span></div>
    ${ranked
      .map(
        (player, index) => `
          <article class="ranking-row">
            <span>${index + 1}</span>
            <div><strong>${escapeHtml(player.name)}</strong><small>${escapeHtml(player.gamertag)} · ${escapeHtml(player.position)} · ${escapeHtml(player.teamId)}</small><em>${escapeHtml(player.tier)} · Draft ${escapeHtml(player.draftGrade)} · ${escapeHtml((player.recentForm || []).join(""))}</em></div>
            <strong>${player.mmr}</strong>
            <small>${player.reliability}/100 · ${player.wins}-${player.losses} · ${player.mmr >= 1200 ? "Up" : "Watch"}</small>
          </article>
        `,
      )
      .join("") || `<article class="empty-state"><strong>No rankings match</strong><small>Try a different position, team, or search term.</small></article>`}
  `;
}

function renderMatchResultForm() {
  const target = document.querySelector("#matchPlayerStatsForm");
  if (!target) return;
  const statKeys = [
    ["points", "PTS", 12],
    ["assists", "AST", 4],
    ["rebounds", "REB", 5],
    ["steals", "STL", 1],
    ["blocks", "BLK", 0],
    ["turnovers", "TO", 2],
    ["fgm", "FGM", 5],
    ["fga", "FGA", 10],
    ["threePm", "3PM", 1],
    ["threePa", "3PA", 3],
    ["fouls", "FLS", 1],
  ];
  target.innerHTML = rankedPlayers
    .slice(0, 10)
    .map((player) => `<article><div><strong>${escapeHtml(player.name)}</strong><small>${escapeHtml(player.position)} · ${escapeHtml(player.teamId)}</small></div>${statKeys.map(([key, label, value]) => `<label><span>${label}</span><input data-stat-player="${player.id}" data-stat-key="${key}" type="number" value="${value}" aria-label="${escapeHtml(player.name)} ${label}" /></label>`).join("")}</article>`)
    .join("");
}

function submitMmrResultFromForm() {
  const teamA = document.querySelector("#mmrTeamA")?.value.trim() || "Shockers";
  const teamB = document.querySelector("#mmrTeamB")?.value.trim() || "Sharks";
  const winner = document.querySelector("#mmrWinner")?.value.trim() || teamA;
  const behaviorPenalty = Number(document.querySelector("#mmrBehaviorPenalty")?.value || 0);
  const teamAPlayers = rankedPlayers.filter((player) => player.teamId === teamA);
  const teamBPlayers = rankedPlayers.filter((player) => player.teamId === teamB);
  const avgA = teamAPlayers.reduce((total, player) => total + player.mmr, 0) / Math.max(1, teamAPlayers.length);
  const avgB = teamBPlayers.reduce((total, player) => total + player.mmr, 0) / Math.max(1, teamBPlayers.length);

  rankedPlayers = rankedPlayers.map((player) => {
    if (![teamA, teamB].includes(player.teamId)) return player;
    const stats = {};
    document.querySelectorAll(`[data-stat-player="${player.id}"]`).forEach((input) => {
      stats[input.dataset.statKey] = Number(input.value || 0);
    });
    return window.MCPA_MMR.updatePlayerMmr(player, { won: player.teamId === winner, playerTeamAvgMmr: player.teamId === teamA ? avgA : avgB, opponentTeamAvgMmr: player.teamId === teamA ? avgB : avgA, stats, behaviorPenalty });
  });
  persistRankedPlayers();
  renderMmrRankings();
  renderMatchResultForm();
  showToast("MMR, tiers, reliability, draft grades, and rating history updated.");
}

function renderLeagueBracketBoard() {
  const target = document.querySelector("#leagueBracketBoard");
  if (!target) return;
  const cupSeeds = seedCupKnockoutTeams();
  target.innerHTML = `
    <section class="movement-section"><h3>Playoff bracket</h3><div class="playoff-picture">${document.querySelector(".playoff-picture")?.innerHTML || ""}</div></section>
    <section class="movement-section"><h3>Midseason Cup bracket</h3><div class="bracket">${cupSeeds.map((team) => `<article><span>${team.knockoutSeed}</span><strong>${escapeHtml(team.teamId)}</strong><small>${escapeHtml(team.cupStatus)}</small></article>`).join("")}</div></section>
  `;
}

function renderCup() {
  updateCupStandings();
  const dashboard = document.querySelector("#cupDashboard");
  const groups = document.querySelector("#cupGroupStandings");
  const schedule = document.querySelector("#cupGroupSchedule");
  const bracket = document.querySelector("#cupKnockoutBracket");
  const finalPanel = document.querySelector("#cupFinalPanel");
  const statsPanel = document.querySelector("#cupStatsPanel");
  const championHistory = document.querySelector("#cupChampionHistory");
  const adminQueue = document.querySelector("#cupAdminReviewQueue");
  const overrideHistory = document.querySelector("#cupOverrideHistory");
  const finalists = cupState.knockoutGames.filter((game) => game.type === "CUP_FINAL");

  if (dashboard) {
    dashboard.innerHTML = `<article><span>Status</span><strong>${cupState.status}</strong><small>NOT_STARTED · GROUP_STAGE · KNOCKOUT · COMPLETED</small></article><article><span>Groups</span><strong>3x4</strong><small>12 teams</small></article><article><span>Knockout</span><strong>${cupState.knockoutTeams.length}/4</strong><small>3 winners + wild card</small></article><article><span>Champion</span><strong>${cupState.championId || "TBD"}</strong><small>Final winner</small></article>`;
  }
  if (groups) {
    groups.innerHTML = cupState.groups
      .map((group) => `<article class="cup-group"><h3>${group.name}</h3>${cupState.standings.filter((team) => team.groupId === group.id).sort(cupSort).map((team) => `<div><strong>${escapeHtml(team.teamId)}</strong><span>${team.wins}-${team.losses}</span><small>PD ${team.pd} · ${team.cupStatus}</small></div>`).join("")}</article>`)
      .join("");
  }
  if (schedule) {
    schedule.innerHTML = cupState.games
      .map((game) => `<article class="game-card locked-time-card"><div class="game-main"><strong>${escapeHtml(game.homeTeamId)} vs ${escapeHtml(game.awayTeamId)}</strong><small>${escapeHtml(game.type)} · MMR ${game.mmrMultiplier}x · counts toward season</small></div><span class="game-status">${game.status}</span><button class="ghost-button admin-only" type="button" data-cup-result="${game.id}">Submit</button></article>`)
      .join("");
    schedule.querySelectorAll("[data-cup-result]").forEach((button) => {
      button.addEventListener("click", () => {
        const game = cupState.games.find((item) => item.id === button.dataset.cupResult);
        submitCupGameResult(game.id, game.homeTeamId, { [game.homeTeamId]: 82, [game.awayTeamId]: 74 });
        renderCup();
        renderLeagueBracketBoard();
        showToast(`${game.homeTeamId} Cup result submitted.`);
      });
    });
  }
  if (bracket) {
    const games = cupState.knockoutGames.length ? cupState.knockoutGames : generateCupKnockoutBracket();
    bracket.innerHTML = games.map((game) => `<article><span>${game.type === "CUP_FINAL" ? "F" : "SF"}</span><strong>${escapeHtml(game.homeTeamId)} vs ${escapeHtml(game.awayTeamId)}</strong><small>${game.status}${game.winningTeamId ? ` · Winner ${escapeHtml(game.winningTeamId)}` : ""}</small></article>`).join("");
  }
  if (finalPanel) finalPanel.innerHTML = finalists.length ? finalists.map((game) => `<article class="movement-card"><header><div><strong>${escapeHtml(game.homeTeamId)} vs ${escapeHtml(game.awayTeamId)}</strong><small>CUP_FINAL · MMR 1.15x</small></div><b>${game.status}</b></header></article>`).join("") : `<article class="empty-state"><strong>Final pending</strong><small>Semifinal winners advance here.</small></article>`;
  if (statsPanel) statsPanel.innerHTML = rankedPlayers.slice(0, 4).map((player) => `<article class="movement-card"><header><div><strong>${escapeHtml(player.name)}</strong><small>${escapeHtml(player.teamId)} · ${player.mmr} MMR · ${escapeHtml(player.tier)}</small></div><b>MVP race</b></header></article>`).join("");
  if (championHistory) championHistory.innerHTML = cupState.history.filter((item) => item.actionType === "CUP_CHAMPION").map((item) => `<article class="history-card champion"><span>${new Date(item.createdAt).getFullYear()}</span><div><strong>${escapeHtml(item.details.teamId)}</strong><small>Midseason Cup Champion</small></div><b>champion</b></article>`).join("") || `<article class="empty-state"><strong>No Cup champion yet</strong><small>Complete the final to archive the winner.</small></article>`;
  if (adminQueue) adminQueue.innerHTML = cupState.adminQueue.map((item) => `<article class="movement-card"><header><div><strong>${escapeHtml(item.teamId)}</strong><small>${escapeHtml(item.reason)}</small></div><b>${escapeHtml(item.decision)}</b></header><small>${item.flags.map(escapeHtml).join(", ") || "No flags"}</small></article>`).join("") || `<article class="empty-state"><strong>No Cup review items</strong><small>Eligibility and emergency requests appear here.</small></article>`;
  if (overrideHistory) overrideHistory.innerHTML = cupState.overrides.map((item) => `<article class="movement-card"><header><div><strong>${escapeHtml(item.finalDecision)}</strong><small>${escapeHtml(item.overrideReason)}</small></div><b>${escapeHtml(item.adminId)}</b></header></article>`).join("") || `<article class="empty-state"><strong>No Cup overrides</strong><small>Every override requires a reason.</small></article>`;
}

function updateRecordBooksFromResult() {
  const samples = [
    { category: "Points", player: "DreLock", value: 31 },
    { category: "Assists", player: "JCity", value: 11 },
    { category: "Rebounds", player: "MaskOn", value: 12 },
  ];
  samples.forEach((sample) => {
    const current = recordBooks.seasonHighs.find((record) => record.category === sample.category);
    if (!current || sample.value >= current.value) {
      recordBooks.seasonHighs = recordBooks.seasonHighs.filter((item) => item.category !== sample.category);
      recordBooks.seasonHighs.unshift({ scope: "Season", category: sample.category, player: sample.player, value: sample.value, detail: "Updated from stat screenshot" });
      const player = players.find((item) => item.name === sample.player);
      if (player && !player.accolades.some((award) => award.includes(`Season high ${sample.category}`))) player.accolades.unshift(`Season high ${sample.category}: ${sample.value}`);
    }
  });
  persistRecordBooks();
}

function renderHistoryBooks() {
  const target = document.querySelector("#historyBooks");
  const draftResults = draftPicks.filter((pick) => pick.prospectId).map((pick) => ({ category: `Round ${pick.round} Pick ${pick.pick}`, player: draftProspects.find((item) => item.id === pick.prospectId)?.name || "Open", value: pick.team, detail: `Overall ${pick.overall}` }));
  const sections = [
    ["Draft results", recordBooks.draftResults.length ? recordBooks.draftResults : draftResults],
    ["League record book", recordBooks.leagueRecords],
    ["Team record book", recordBooks.teamRecords],
    ["Season highs", recordBooks.seasonHighs],
  ];
  const markup = sections
    .map(([title, records]) => `<section class="movement-section"><h3>${title}</h3>${records.map((record) => `<article class="history-card"><span>${escapeHtml(record.scope || record.team || "MCPA")}</span><div><strong>${escapeHtml(record.category)} · ${escapeHtml(record.player)}</strong><small>${escapeHtml(record.detail || record.team || "")}</small></div><b>${escapeHtml(record.value)}</b></article>`).join("") || `<article class="empty-state"><strong>No records yet</strong><small>Records update from draft and stat screenshot submissions.</small></article>`}</section>`)
    .join("");
  if (target) target.innerHTML = markup;
  const leagueTarget = document.querySelector("#leagueRecordsPanel");
  if (leagueTarget) leagueTarget.innerHTML = markup;
}

function renderLeagueRecordPanel() {
  renderHistoryBooks();
}

function renderLeagueRules() {
  const target = document.querySelector("#leagueRules");
  if (!target) return;

  target.innerHTML = leagueRules
    .map(
      (section, index) => `
        <details class="rule-section" ${index < 2 ? "open" : ""}>
          <summary>
            <span>${String(index + 1).padStart(2, "0")}</span>
            <strong>${escapeHtml(section.title)}</strong>
            <small>${section.items.length} rules</small>
          </summary>
          <div>
            ${section.items
              .map((item) => {
                const rule = typeof item === "string" ? { text: item, important: false } : item;
                return `<p class="${rule.important ? "is-important" : ""}">${escapeHtml(rule.text)}</p>`;
              })
              .join("")}
          </div>
        </details>
      `,
    )
    .join("");
}

function currentUserName() {
  return accountState.registration?.name || (accountState.platform ? `${accountState.platform} Player` : "You");
}

function mentionPlayers() {
  const current = currentUserName();
  const currentEntry = current && current !== "You" ? [{ name: current, initials: initialsFromName(current), team: "You" }] : [];
  return [...currentEntry, ...players].map((player) => ({
    name: player.name,
    initials: player.initials || initialsFromName(player.name),
    team: player.team || "MCPA",
  }));
}

function formatMessageText(value) {
  let output = escapeHtml(value);
  mentionPlayers().forEach((player) => {
    const escapedName = escapeHtml(player.name);
    const pattern = new RegExp(`@${escapedName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![\\w-])`, "g");
    output = output.replace(pattern, `<span class="mention">@${escapedName}</span>`);
  });
  return output;
}

function mentionQuery(input) {
  const cursor = input.selectionStart ?? input.value.length;
  const beforeCursor = input.value.slice(0, cursor);
  const match = beforeCursor.match(/@([a-z0-9_-]*)$/i);
  return match ? { query: match[1], start: cursor - match[0].length, end: cursor } : null;
}

function insertMention(input, match, name) {
  const before = input.value.slice(0, match.start);
  const after = input.value.slice(match.end);
  input.value = `${before}@${name} ${after}`;
  const cursor = before.length + name.length + 2;
  input.focus();
  input.setSelectionRange(cursor, cursor);
}

function setupMentionInput(inputSelector, traySelector) {
  const input = document.querySelector(inputSelector);
  const tray = document.querySelector(traySelector);
  if (!input || !tray) return;

  const render = () => {
    const match = mentionQuery(input);
    if (!match) {
      tray.classList.remove("is-open");
      tray.innerHTML = "";
      return;
    }

    const query = match.query.toLowerCase();
    const matches = mentionPlayers()
      .filter((player) => player.name.toLowerCase().includes(query))
      .slice(0, 5);

    if (!matches.length) {
      tray.classList.remove("is-open");
      tray.innerHTML = "";
      return;
    }

    tray.classList.add("is-open");
    tray.innerHTML = matches
      .map(
        (player) => `
          <button type="button" data-mention-name="${escapeHtml(player.name)}">
            <b>${escapeHtml(player.initials)}</b>
            <span>@${escapeHtml(player.name)}<small>${escapeHtml(player.team)}</small></span>
          </button>
        `,
      )
      .join("");

    tray.querySelectorAll("[data-mention-name]").forEach((button) => {
      button.addEventListener("click", () => {
        const currentMatch = mentionQuery(input);
        if (!currentMatch) return;
        insertMention(input, currentMatch, button.dataset.mentionName);
        tray.classList.remove("is-open");
        tray.innerHTML = "";
      });
    });
  };

  input.addEventListener("input", render);
  input.addEventListener("keyup", render);
  input.addEventListener("click", render);
  input.addEventListener("blur", () => window.setTimeout(() => tray.classList.remove("is-open"), 160));
}

function activeCommunityRoom() {
  return rooms.find((room) => room.id === activeCommunityRoomId) || rooms[0];
}

function persistCommunityChat() {
  writeStore("mcpaCommunityMessages", communityMessages);
  writeStore("mcpaActiveCommunityRoom", activeCommunityRoomId);
}

function formatChatTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Now";
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function renderChatRooms() {
  const picker = document.querySelector("#chatRoomPicker");
  const pill = document.querySelector("#voiceRoomCount");
  const current = document.querySelector("#chatCurrentRoom");
  if (!picker || !pill || !current) return;

  pill.textContent = `${rooms.length} rooms`;
  current.textContent = activeCommunityRoom().name;
  picker.innerHTML = rooms
    .map((room) => {
      const roomMessages = communityMessages.filter((message) => message.roomId === room.id).length;
      const unread = room.unreadCount ? `<small>${room.unreadCount} new</small>` : `<small>${roomMessages} msgs</small>`;
      return `
        <button class="${room.id === activeCommunityRoomId ? "active" : ""}" type="button" data-chat-room="${escapeHtml(room.id)}">
          <span>${escapeHtml(room.name)}</span>
          ${unread}
        </button>
      `;
    })
    .join("");

  picker.querySelectorAll("[data-chat-room]").forEach((button) => {
    button.addEventListener("click", () => {
      activeCommunityRoomId = button.dataset.chatRoom;
      picker.hidden = true;
      pill.setAttribute("aria-expanded", "false");
      renderChatRooms();
      renderMessages();
      scrollToBottom();
      showToast(`${activeCommunityRoom().name} chat opened.`);
    });
  });
}

function renderMessages() {
  const target = document.querySelector("#chatWindow");
  if (!target) return;

  const visibleMessages = communityMessages.filter((message) => message.roomId === activeCommunityRoomId);
  target.innerHTML = visibleMessages
    .map((message) => {
      const mine = message.senderId === "me";
      const adminClass = message.isAdmin ? "admin" : "";
      return `
        <article class="chat-message ${mine ? "mine" : ""}">
          <span class="chat-avatar">${escapeHtml(message.avatarInitials || initialsFromName(message.senderName))}</span>
          <div class="chat-bubble">
            <div class="chat-meta">
              <strong class="${adminClass}">${escapeHtml(message.senderName)}</strong>
              <time datetime="${escapeHtml(message.createdAt)}">${escapeHtml(formatChatTime(message.createdAt))}</time>
            </div>
            <p class="chat-text">${formatMessageText(message.text)}</p>
          </div>
        </article>
      `;
    })
    .join("");
}

function scrollToBottom() {
  const target = document.querySelector("#chatWindow");
  if (!target) return;
  window.requestAnimationFrame(() => {
    target.scrollTop = target.scrollHeight;
  });
}

function getTypingText(activeUsers = typingUsers) {
  const now = Date.now();
  const names = activeUsers
    .filter((user) => user.roomId === activeCommunityRoomId && now - user.lastTypingAt < 2500)
    .map((user) => user.name);

  if (!names.length) return "";
  if (names.length === 1) return `${names[0]} is typing`;
  if (names.length === 2) return `${names[0]} and ${names[1]} are typing`;
  return `${names.length} people are typing`;
}

function showTypingIndicator() {
  const indicator = document.querySelector("#typingIndicator");
  const text = document.querySelector("#typingText");
  if (!indicator || !text) return;

  const typingText = getTypingText();
  indicator.hidden = !typingText || chatMode !== "text" || !document.querySelector("#screen-chat")?.classList.contains("active");
  text.textContent = typingText;
}

function hideTypingIndicator() {
  typingUsers = typingUsers.filter((user) => Date.now() - user.lastTypingAt < 2500);
  writeStore("mcpaTypingUsers", typingUsers);
  showTypingIndicator();
}

function handleTyping() {
  const input = document.querySelector("#chatInput");
  if (!input) return;

  window.clearTimeout(typingDebounceTimer);
  typingDebounceTimer = window.setTimeout(() => {
    if (!input.value.trim()) {
      typingUsers = typingUsers.filter((user) => user.id !== "me");
      hideTypingIndicator();
      return;
    }

    // Future backend: typing events should be sent through WebSocket/Supabase Realtime/Firebase so other connected users can see live typing status.
    const selfTyping = {
      id: "me",
      name: currentUserName(),
      roomId: activeCommunityRoomId,
      lastTypingAt: Date.now(),
    };
    typingUsers = [selfTyping, ...typingUsers.filter((user) => user.id !== "me")];
    writeStore("mcpaTypingUsers", typingUsers);
    showTypingIndicator();

    window.clearTimeout(typingClearTimer);
    typingClearTimer = window.setTimeout(() => {
      typingUsers = typingUsers.filter((user) => user.id !== "me");
      hideTypingIndicator();
    }, 2500);
  }, 140);
}

function simulateDemoTyping() {
  if (chatMode !== "text" || activeCommunityRoomId !== "general" || !document.querySelector("#screen-chat")?.classList.contains("active")) return;
  typingUsers = [
    {
      id: "user-1",
      name: "Travon Admin",
      roomId: "general",
      lastTypingAt: Date.now(),
    },
    ...typingUsers.filter((user) => user.id !== "user-1"),
  ];
  writeStore("mcpaTypingUsers", typingUsers);
  showTypingIndicator();
  window.setTimeout(() => {
    typingUsers = typingUsers.filter((user) => user.id !== "user-1");
    hideTypingIndicator();
  }, 2300);
}

function sendMessage(event) {
  event.preventDefault();
  const input = document.querySelector("#chatInput");
  const text = input?.value.trim();
  if (!input || !text) return;

  communityMessages.push({
    id: `msg-${Date.now()}`,
    roomId: activeCommunityRoomId,
    senderId: "me",
    senderName: currentUserName(),
    senderRole: isAdminRole() ? "Staff" : "Player",
    avatarInitials: initialsFromName(currentUserName()),
    text,
    createdAt: new Date().toISOString(),
    isAdmin: isAdminRole(),
  });
  input.value = "";
  window.clearTimeout(typingDebounceTimer);
  typingUsers = typingUsers.filter((user) => user.id !== "me");
  persistCommunityChat();
  hideTypingIndicator();
  renderChatRooms();
  renderMessages();
  scrollToBottom();
}

function activeDmThread() {
  return directThreads.find((thread) => thread.id === activeDmId) || directThreads[0];
}

function threadPlayer(thread) {
  const fallbackName = thread?.player || "Player";
  return players.find((player) => player.name === fallbackName) || {
    name: fallbackName,
    team: "Free Agent",
    position: "FA",
    initials: initialsFromName(fallbackName),
    color: "teal",
    isLive: false,
  };
}

function summarizeDmMessage(message) {
  if (!message) return "No messages yet";
  if (message.type === "gif") return `GIF: ${message.label}`;
  if (message.type === "voice") return `Voice message ${message.duration}`;
  return message.text;
}

function updateDmNotificationBadge() {
  const badge = document.querySelector("#dmNotificationBadge");
  const topDot = document.querySelector("#topDmDot");
  const unread = directThreads.reduce((total, thread) => total + (thread.unread || 0), 0);
  const shouldShow = unread > 0 || dmNotificationPing;
  if (badge) {
    badge.hidden = !shouldShow;
    badge.textContent = unread > 0 ? unread : "•";
  }
  if (topDot) {
    topDot.hidden = !shouldShow;
  }
}

function renderDmRoster() {
  const target = document.querySelector("#dmRoster");
  const count = document.querySelector("#dmThreadCount");
  updateDmNotificationBadge();
  if (!target) return;

  if (count) {
    count.textContent = `${directThreads.length} DMs`;
  }

  target.innerHTML = directThreads
    .map((thread) => {
      const player = threadPlayer(thread);
      const latest = thread.messages[thread.messages.length - 1];
      return `
        <button class="dm-person ${thread.id === activeDmId ? "active" : ""} ${thread.unread ? "unread" : ""}" type="button" data-dm-id="${thread.id}">
          <span class="player-avatar ${player.color}">
            <span class="live-light ${player.isLive ? "on" : ""}"></span>
            ${escapeHtml(player.initials)}
          </span>
          <span>
            <strong>${escapeHtml(player.name)}</strong>
            <small>${escapeHtml(player.team)} · ${escapeHtml(player.position)}</small>
            <em>${escapeHtml(summarizeDmMessage(latest))}</em>
          </span>
          ${thread.unread ? `<b>${thread.unread}</b>` : ""}
        </button>
      `;
    })
    .join("");

  target.querySelectorAll("[data-dm-id]").forEach((button) => {
    button.addEventListener("click", () => {
      activeDmId = button.dataset.dmId;
      const thread = activeDmThread();
      thread.unread = 0;
      dmNotificationPing = directThreads.some((item) => item.unread);
      renderDirectMessages();
      showToast(`${thread.player} direct message opened.`);
    });
  });
}

function dmMessageBody(message) {
  if (message.type === "voice") {
    return `
      <div class="voice-note">
        <button type="button" data-play-voice="${escapeHtml(message.duration)}" aria-label="Play voice message">▶</button>
        <span class="waveform" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></span>
        <em>${escapeHtml(message.duration)}</em>
      </div>
    `;
  }

  if (message.type === "gif") {
    return `
      <div class="dm-gif-card ${escapeHtml(message.tone || "teal")}">
        <b>GIF</b>
        <span>${escapeHtml(message.label)}</span>
      </div>
    `;
  }

  return `<p>${formatMessageText(message.text)}</p>`;
}

function renderDmThread() {
  const thread = activeDmThread();
  const messages = document.querySelector("#dmMessages");
  const name = document.querySelector("#dmThreadName");
  const meta = document.querySelector("#dmThreadMeta");
  const avatar = document.querySelector("#dmThreadAvatar");
  if (!thread || !messages) return;

  const player = threadPlayer(thread);
  if (name) name.textContent = player.name;
  if (meta) meta.textContent = `${player.team} · ${player.teamRole || player.position} · ${player.isLive ? "Live on Twitch" : "Available"}`;
  if (avatar) {
    avatar.textContent = player.initials;
    avatar.className = `dm-avatar ${player.color}`;
  }

  messages.innerHTML = thread.messages
    .map((message) => {
      const fromMe = message.from === "me";
      const author = fromMe ? currentUserName() : player.name;
      const initials = fromMe ? initialsFromName(currentUserName()) : player.initials;
      const avatarClass = fromMe ? "lime" : player.color;

      return `
        <article class="dm-message ${fromMe ? "mine" : ""} ${message.type}">
          <span class="dm-message-avatar ${avatarClass}">${escapeHtml(initials)}</span>
          <div class="dm-bubble">
            <strong>${escapeHtml(author)}<small>${escapeHtml(message.time)}</small></strong>
            ${dmMessageBody(message)}
          </div>
        </article>
      `;
    })
    .join("");

  messages.querySelectorAll("[data-play-voice]").forEach((button) => {
    button.addEventListener("click", () => showToast(`Playing voice message ${button.dataset.playVoice}.`));
  });

  window.requestAnimationFrame(() => {
    messages.scrollTop = messages.scrollHeight;
  });
}

function renderGifPicker() {
  const target = document.querySelector("#gifPicker");
  if (!target) return;

  target.innerHTML = gifOptions
    .map(
      (gif) => `
        <button class="gif-option ${gif.tone}" type="button" data-gif-label="${escapeHtml(gif.label)}" data-gif-tone="${gif.tone}">
          <b>GIF</b>
          <span>${escapeHtml(gif.label)}</span>
        </button>
      `,
    )
    .join("");

  target.querySelectorAll("[data-gif-label]").forEach((button) => {
    button.addEventListener("click", () => sendGifMessage(button.dataset.gifLabel, button.dataset.gifTone));
  });
}

function renderDirectMessages() {
  renderDmRoster();
  renderGifPicker();
  renderDmThread();
}

function pushDirectMessage(message) {
  const thread = activeDmThread();
  if (!thread) return;

  thread.messages.push({
    from: "me",
    time: "Now",
    ...message,
  });
  thread.unread = 0;
  dmNotificationPing = true;
  renderDirectMessages();
}

function sendGifMessage(label, tone) {
  pushDirectMessage({ type: "gif", label, tone });
  document.querySelector("#gifPicker")?.classList.remove("is-open");
  showToast(`${label} GIF sent to ${activeDmThread().player}.`);
}

function sendVoiceMessage() {
  const seconds = 6 + Math.floor(Math.random() * 10);
  pushDirectMessage({ type: "voice", duration: `0:${String(seconds).padStart(2, "0")}` });
  showToast(`Voice message sent to ${activeDmThread().player}.`);
}

function activeVoiceRoom() {
  return voiceRooms.find((room) => room.id === activeVoiceRoomId) || voiceRooms[0];
}

function joinedVoiceRoom() {
  return voiceRooms.find((room) => room.id === joinedVoiceRoomId) || null;
}

function cleanSelfFromOtherRooms(roomId) {
  const userName = currentUserName();
  voiceRooms.forEach((room) => {
    if (room.id !== roomId) {
      room.members = room.members.filter((member) => !(member.self || member.name === userName));
    }
  });
}

function touchVoiceRoom(room) {
  if (room) {
    room.lastActiveAt = Date.now();
  }
}

function cleanupVoiceRooms(announce = false) {
  const now = Date.now();
  let disconnectedRoom = "";

  voiceRooms.forEach((room) => {
    if (!room.lastActiveAt) room.lastActiveAt = now;
    if (room.members.some((member) => member.speaking && !member.muted && !member.deafened)) {
      room.lastActiveAt = now;
    }
    if (room.members.length && now - room.lastActiveAt >= voiceInactiveLimit) {
      if (joinedVoiceRoomId === room.id) {
        disconnectedRoom = room.name;
        joinedVoiceRoomId = null;
      }
      room.members = [];
    }
  });

  for (let index = voiceRooms.length - 1; index >= 0; index -= 1) {
    if (!voiceRooms[index].members.length) {
      if (joinedVoiceRoomId === voiceRooms[index].id) joinedVoiceRoomId = null;
      voiceRooms.splice(index, 1);
    }
  }

  if (!voiceRooms.some((room) => room.id === activeVoiceRoomId)) {
    activeVoiceRoomId = voiceRooms[0]?.id || null;
  }

  if (announce && disconnectedRoom) {
    showToast(`${disconnectedRoom} closed after 30 minutes of no voice activity.`);
  }
}

function refreshVoiceUI() {
  cleanupVoiceRooms();
  renderVoiceRooms();
  renderVoiceStage();
  renderVoiceMiniBar();
}

function setChatMode(mode) {
  chatMode = mode;
  document.querySelectorAll("[data-chat-mode]").forEach((button) => {
    button.classList.toggle("active", button.dataset.chatMode === mode);
  });
  document.querySelectorAll("[data-chat-panel]").forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.chatPanel === mode);
  });
  showTypingIndicator();
  if (mode === "text") {
    window.setTimeout(scrollToBottom, 80);
  } else {
    showToast("Voice rooms are in demo mode until a real-time audio provider is connected.");
  }
}

function renderVoiceRooms() {
  const target = document.querySelector("#voiceRoomList");
  const count = document.querySelector("#voiceRoomCount");
  cleanupVoiceRooms();
  if (!target) return;

  if (count) {
    count.textContent = `${voiceRooms.length} rooms`;
  }

  target.innerHTML = voiceRooms
    .map((room) => {
      const previewMembers = room.members
        .slice(0, 4)
        .map(
          (member) => `
            <span class="room-chip ${member.speaking && !member.muted && !member.deafened ? "speaking" : ""}">
              <b>${escapeHtml(member.initials)}</b>
              ${escapeHtml(member.name)}
            </span>
          `,
        )
        .join("");

      return `
        <button class="room-card ${room.id === activeVoiceRoomId ? "active" : ""} ${room.id === joinedVoiceRoomId ? "joined" : ""} ${room.locked ? "locked" : ""}" type="button" data-voice-room="${room.id}">
          <span class="status-dot voice ${room.locked ? "locked" : ""}"></span>
          <span>
            <strong>${escapeHtml(room.name)}</strong>
            <small>${escapeHtml(room.type)} · ${room.members.length} inside · ${escapeHtml(room.topic)}</small>
            <span class="room-preview">${previewMembers}</span>
          </span>
        </button>
      `;
    })
    .join("");

  target.querySelectorAll("[data-voice-room]").forEach((button) => {
    button.addEventListener("click", () => {
      activeVoiceRoomId = button.dataset.voiceRoom;
      renderVoiceRooms();
      renderVoiceStage();
      renderVoiceMiniBar();
      const room = activeVoiceRoom();
      showToast(room.locked ? `${room.name} preview opened. Joining requires team or staff access.` : `${room.name} selected.`);
    });
  });
}

function renderVoiceStage() {
  const room = activeVoiceRoom();
  const roomName = document.querySelector("#activeVoiceRoomName");
  const roomMeta = document.querySelector("#activeVoiceRoomMeta");
  const joinButton = document.querySelector("#joinVoiceRoom");
  const outputButton = document.querySelector("#toggleVoiceOutput");
  const deafenButton = document.querySelector("#toggleDeafen");
  const micButton = document.querySelector("#toggleMic");
  const leaveButton = document.querySelector("#leaveVoiceRoom");
  const participants = document.querySelector("#voiceParticipants");
  if (!participants) return;

  if (!room) {
    if (roomName) roomName.textContent = "No active rooms";
    if (roomMeta) roomMeta.textContent = "Voice rooms appear when players create or join them.";
    if (joinButton) {
      joinButton.disabled = true;
      joinButton.textContent = "Join";
    }
    [outputButton, deafenButton, micButton, leaveButton].forEach((button) => {
      if (button) button.disabled = true;
    });
    participants.innerHTML = `<article class="empty-state"><strong>No active voice chats</strong><small>Create one when your team needs a room.</small></article>`;
    renderVoiceMiniBar();
    return;
  }

  const joinedThisRoom = joinedVoiceRoomId === room.id;
  const lockedForPlayer = room.locked && !isAdminRole();

  if (roomName) {
    roomName.textContent = room.name;
  }

  if (roomMeta) {
    roomMeta.textContent = joinedThisRoom
      ? `${room.members.length} in room · ${voiceOutput === "speaker" ? "speaker" : "bluetooth"} · ${voiceDeafened ? "deafened" : "listening"} · ${micMuted ? "mic muted" : "mic live"}`
      : `${room.members.length} inside · preview before joining · ${room.topic}`;
  }

  if (joinButton) {
    joinButton.disabled = lockedForPlayer || joinedThisRoom;
    joinButton.textContent = joinedThisRoom ? "Joined" : lockedForPlayer ? "Locked" : "Join";
  }

  if (outputButton) {
    outputButton.disabled = !joinedThisRoom;
    outputButton.textContent = voiceOutput === "speaker" ? "Speaker" : "Bluetooth";
  }

  if (deafenButton) {
    deafenButton.disabled = !joinedThisRoom;
    deafenButton.textContent = voiceDeafened ? "Undeafen" : "Deafen";
  }

  if (micButton) {
    micButton.disabled = !joinedThisRoom;
    micButton.textContent = micMuted ? "Unmute mic" : "Mute mic";
  }

  if (leaveButton) {
    leaveButton.disabled = !joinedThisRoom;
  }

  participants.innerHTML = room.members
    .map((member) => {
      const speaking = member.speaking && !member.muted && !member.deafened;
      const badgeList = [
        speaking ? "Speaking" : null,
        member.muted ? "Muted" : null,
        member.deafened ? "Deafened" : null,
        member.votes ? `${member.votes} vote${member.votes === 1 ? "" : "s"}` : null,
      ]
        .filter(Boolean)
        .map((badge) => `<span>${escapeHtml(badge)}</span>`)
        .join("");
      const memberName = escapeHtml(member.name);

      return `
        <article class="voice-member ${speaking ? "is-speaking" : ""} ${member.muted ? "is-muted" : ""} ${member.deafened ? "is-deafened" : ""} ${member.self ? "is-self" : ""}">
          <span class="voice-avatar">${escapeHtml(member.initials)}</span>
          <div>
            <div class="voice-member-top">
              <strong>${memberName}${member.self ? " · You" : ""}</strong>
              <em>${escapeHtml(member.role)}</em>
            </div>
            <div class="voice-badges">${badgeList || "<span>Listening</span>"}</div>
            <div class="member-actions">
              <button class="ghost-button" type="button" data-voice-vote="${memberName}">Vote out</button>
              <button class="ghost-button" type="button" data-voice-report="${memberName}">Report</button>
              ${
                isAdminRole()
                  ? `
                    <button class="ghost-button admin-action" type="button" data-voice-deafen="${memberName}" ${member.deafened ? "disabled" : ""}>Deafen</button>
                    <button class="ghost-button danger admin-action" type="button" data-voice-kick="${memberName}">Kick</button>
                  `
                  : ""
              }
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  participants.querySelectorAll("[data-voice-vote]").forEach((button) => {
    button.addEventListener("click", () => voteKickMember(button.dataset.voiceVote));
  });

  participants.querySelectorAll("[data-voice-report]").forEach((button) => {
    button.addEventListener("click", () => reportVoiceMember(button.dataset.voiceReport));
  });

  participants.querySelectorAll("[data-voice-deafen]").forEach((button) => {
    button.addEventListener("click", () => adminDeafenMember(button.dataset.voiceDeafen));
  });

  participants.querySelectorAll("[data-voice-kick]").forEach((button) => {
    button.addEventListener("click", () => adminKickMember(button.dataset.voiceKick));
  });

  renderVoiceMiniBar();
}

function renderVoiceMiniBar() {
  const bar = document.querySelector("#voiceMiniBar");
  const room = joinedVoiceRoom();
  if (!bar) return;

  bar.classList.toggle("is-hidden", !room);
  if (!room) return;

  document.querySelector("#miniVoiceRoom").textContent = room.name;
  document.querySelector("#miniVoiceState").textContent = `${micMuted ? "Mic muted" : "Mic live"} · ${voiceDeafened ? "Deafened" : voiceOutput === "speaker" ? "Speaker" : "Bluetooth"} · background voice on`;
  document.querySelector("#miniToggleMic")?.classList.toggle("is-active", micMuted);
  document.querySelector("#miniToggleDeafen")?.classList.toggle("is-active", voiceDeafened);
}

function joinVoiceRoom() {
  const room = activeVoiceRoom();
  if (!room) return;

  if (room.locked && !isAdminRole()) {
    showToast("That room is locked. A team owner or staff member must grant access.");
    return;
  }

  cleanSelfFromOtherRooms(room.id);
  const userName = currentUserName();
  const existingMember = room.members.find((member) => member.self || member.name === userName);
  if (existingMember) {
    existingMember.self = true;
    existingMember.muted = micMuted;
    existingMember.deafened = voiceDeafened;
  } else {
    room.members.push({
      name: userName,
      role: isAdminRole() ? "Staff" : "Player",
      initials: initialsFromName(userName),
      speaking: false,
      muted: micMuted,
      deafened: voiceDeafened,
      votes: 0,
      self: true,
    });
  }

  joinedVoiceRoomId = room.id;
  touchVoiceRoom(room);
  refreshVoiceUI();
  showToast(`Joined ${room.name}. Voice stays connected while you browse other screens.`);
}

function createVoiceRoom(event) {
  event.preventDefault();
  const input = document.querySelector("#voiceRoomName");
  const baseName = input.value.trim() || `${currentUserName()} Voice`;
  const roomName = baseName.slice(0, 36);
  const userName = currentUserName();
  const roomId = `player-${Date.now()}`;

  cleanSelfFromOtherRooms(roomId);
  voiceRooms.unshift({
    id: roomId,
    name: roomName,
    type: "Player-created",
    roomType: "Private voice room",
    createdBy: userName,
    createdAt: new Date().toISOString(),
    isLocked: false,
    maxUsers: 10,
    currentUsers: 1,
    allowedTeamId: null,
    gameId: null,
    micRequired: false,
    status: "DEMO_MODE",
    locked: false,
    topic: `Created by ${userName}. Invite players with @mentions in chat.`,
    lastActiveAt: Date.now(),
    members: [
      {
        name: userName,
        role: isAdminRole() ? "Staff host" : "Room host",
        initials: initialsFromName(userName),
        speaking: false,
        muted: micMuted,
        deafened: voiceDeafened,
        votes: 0,
        self: true,
      },
    ],
  });

  activeVoiceRoomId = roomId;
  joinedVoiceRoomId = roomId;
  input.value = "";
  refreshVoiceUI();
  showToast(`${roomName} voice chat created.`);
}

function muteMic() {
  if (!joinedVoiceRoomId) return false;
  micMuted = true;
  const room = joinedVoiceRoom();
  const self = room?.members.find((member) => member.self || member.name === currentUserName());
  if (self) self.muted = true;
  refreshVoiceUI();
  return true;
}

function unmuteMic() {
  if (!joinedVoiceRoomId) return false;
  micMuted = false;
  const room = joinedVoiceRoom();
  const self = room?.members.find((member) => member.self || member.name === currentUserName());
  if (self) self.muted = false;
  refreshVoiceUI();
  return true;
}

function deafenAudio() {
  if (!joinedVoiceRoomId) return false;
  voiceDeafened = true;
  const room = joinedVoiceRoom();
  const self = room?.members.find((member) => member.self || member.name === currentUserName());
  if (self) self.deafened = true;
  refreshVoiceUI();
  return true;
}

function undeafenAudio() {
  if (!joinedVoiceRoomId) return false;
  voiceDeafened = false;
  const room = joinedVoiceRoom();
  const self = room?.members.find((member) => member.self || member.name === currentUserName());
  if (self) self.deafened = false;
  refreshVoiceUI();
  return true;
}

function listActiveVoiceRooms() {
  cleanupVoiceRooms();
  return voiceRooms.map((room) => ({
    id: room.id,
    name: room.name,
    roomType: room.roomType || room.type,
    status: room.status || (room.members.length ? "ACTIVE" : "EMPTY"),
    currentUsers: room.members.length,
    isLocked: Boolean(room.locked || room.isLocked),
    demoMode: true,
  }));
}

function closeVoiceRoom(roomId = activeVoiceRoomId) {
  const room = voiceRooms.find((item) => item.id === roomId);
  if (!room) return false;
  room.members = [];
  room.status = "CLOSED";
  cleanupVoiceRooms();
  refreshVoiceUI();
  return true;
}

function kickUserFromVoiceRoom(roomId, userName) {
  const room = voiceRooms.find((item) => item.id === roomId);
  if (!room) return false;
  room.members = room.members.filter((member) => member.name !== userName);
  if (joinedVoiceRoomId === roomId && userName === currentUserName()) joinedVoiceRoomId = null;
  refreshVoiceUI();
  return true;
}

function updateVoiceRoomPresence(roomId = activeVoiceRoomId) {
  const room = voiceRooms.find((item) => item.id === roomId);
  if (!room) return null;
  room.currentUsers = room.members.length;
  room.status = room.members.length ? (room.status === "DEMO_MODE" ? "DEMO_MODE" : "ACTIVE") : "EMPTY";
  touchVoiceRoom(room);
  return room;
}

function leaveVoiceRoom() {
  const room = joinedVoiceRoom();
  if (!room) return;

  const userName = currentUserName();
  room.members = room.members.filter((member) => !(member.self || member.name === userName));
  joinedVoiceRoomId = null;
  refreshVoiceUI();
  showToast(`Left ${room.name}.`);
}

function toggleMic() {
  if (!joinedVoiceRoomId) return;
  micMuted = !micMuted;
  const room = joinedVoiceRoom();
  const userName = currentUserName();
  const self = room?.members.find((member) => member.self || member.name === userName);
  if (self) {
    self.muted = micMuted;
    self.speaking = !micMuted;
  }
  touchVoiceRoom(room);
  renderVoiceStage();
  showToast(micMuted ? "Mic muted." : "Mic unmuted.");
}

function toggleVoiceOutput() {
  if (!joinedVoiceRoomId) return;
  voiceOutput = voiceOutput === "speaker" ? "bluetooth" : "speaker";
  renderVoiceStage();
  showToast(voiceOutput === "speaker" ? "Voice output set to speaker." : "Voice output set to Bluetooth.");
}

function toggleDeafen() {
  if (!joinedVoiceRoomId) return;
  voiceDeafened = !voiceDeafened;
  const room = joinedVoiceRoom();
  const userName = currentUserName();
  const self = room?.members.find((member) => member.self || member.name === userName);
  if (self) {
    self.deafened = voiceDeafened;
    if (voiceDeafened) self.speaking = false;
  }
  renderVoiceStage();
  showToast(voiceDeafened ? "Voice chat deafened." : "Voice chat audio restored.");
}

function voteKickMember(memberName) {
  const room = activeVoiceRoom();
  const member = room?.members.find((item) => item.name === memberName);
  if (!room || !member) return;

  member.votes = (member.votes || 0) + 1;
  const needed = Math.floor(room.members.length / 2) + 1;
  if (member.votes >= needed) {
    room.members = room.members.filter((item) => item.name !== memberName);
    if (member.self || member.name === currentUserName()) joinedVoiceRoomId = null;
    showToast(`${memberName} was majority voted out of ${room.name}.`);
  } else {
    showToast(`${memberName} has ${member.votes}/${needed} votes to leave ${room.name}.`);
  }

  refreshVoiceUI();
}

function reportVoiceMember(memberName) {
  const room = activeVoiceRoom();
  const reporter = currentUserName();
  supportTickets.unshift({
    id: `MCPA-${1043 + supportTickets.length}`,
    type: "Voice report",
    subject: `Report against ${memberName}`,
    status: "Open",
    owner: reporter,
    detail: `${reporter} reported ${memberName} in ${room.name} for foul language, slander, or voice chat conduct review.`,
  });
  renderSupportTickets();
  showToast(`Report filed for ${memberName}. Staff can review it in support tickets.`);
}

function adminDeafenMember(memberName) {
  if (!isAdminRole()) {
    showToast("Only staff can deafen members.");
    return;
  }

  const room = activeVoiceRoom();
  const member = room?.members.find((item) => item.name === memberName);
  if (!member) return;

  member.deafened = true;
  member.speaking = false;
  refreshVoiceUI();
  showToast(`${memberName} was deafened by staff.`);
}

function adminKickMember(memberName) {
  if (!isAdminRole()) {
    showToast("Only staff can kick members.");
    return;
  }

  const room = activeVoiceRoom();
  if (!room) return;

  room.members = room.members.filter((member) => member.name !== memberName);
  if (memberName === currentUserName()) joinedVoiceRoomId = null;
  refreshVoiceUI();
  showToast(`${memberName} was kicked from ${room.name}.`);
}

function currentDraftPick() {
  return draftPicks[currentDraftPickIndex];
}

function availableProspects() {
  return draftProspects.filter((prospect) => !prospect.drafted);
}

function bestAvailableProspect(teamName) {
  const available = availableProspects();
  if (!available.length) return null;

  const counts = ["PG", "SG", "SF", "PF", "C"].map((position) => ({
    position,
    count: players.filter((player) => player.team === teamName && player.position === position).length,
  }));
  const positionNeed = counts.sort((first, second) => first.count - second.count)[0]?.position;
  return available.find((prospect) => prospect.position === positionNeed) || available[0];
}

function formatDraftClock(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

function updateDraftHeader() {
  const pick = currentDraftPick();
  const clock = document.querySelector("#draftClock");
  const team = document.querySelector("#draftTeamOnClock");
  const label = document.querySelector("#draftPickLabel");
  if (!clock || !team || !label) return;

  clock.textContent = formatDraftClock(draftClock);
  if (!pick) {
    team.textContent = "Draft complete";
    label.textContent = "All picks recorded";
    return;
  }

  team.textContent = pick.team;
  label.textContent = `Round ${pick.round} · Pick ${pick.pick} · Overall ${pick.overall}`;
}

function renderDraftPool() {
  const target = document.querySelector("#draftPool");
  const count = document.querySelector("#draftPoolCount");
  if (!target || !count) return;

  const prospects = availableProspects();
  count.textContent = `${prospects.length} player${prospects.length === 1 ? "" : "s"}`;

  if (!prospects.length) {
    target.innerHTML = `<article class="empty-state"><strong>No available prospects</strong><small>New registrations will enter the draft pool here.</small></article>`;
    return;
  }

  if (!prospects.some((prospect) => prospect.id === selectedProspectId)) {
    selectedProspectId = prospects[0].id;
  }

  target.innerHTML = prospects
    .map(
      (prospect) => `
        <button class="draft-card ${prospect.id === selectedProspectId ? "selected" : ""}" type="button" data-prospect-id="${prospect.id}">
          <b>${escapeHtml(prospect.position)}</b>
          <span>
            <strong>${escapeHtml(prospect.name)}</strong>
            <small>${escapeHtml(prospect.age)} · ${escapeHtml(prospect.city)} · ${escapeHtml(prospect.build)}</small>
          </span>
          <em>${escapeHtml(prospect.platform || "Pending")}</em>
        </button>
      `,
    )
    .join("");

  target.querySelectorAll("[data-prospect-id]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedProspectId = button.dataset.prospectId;
      renderDraftPool();
      const prospect = draftProspects.find((item) => item.id === selectedProspectId);
      showToast(`${prospect.name} selected for the next pick.`);
    });
  });
}

function renderDraftBoard() {
  const board = document.querySelector("#draftBoard");
  if (!board) return;

  board.innerHTML = draftPicks
    .map((pick, index) => {
      const prospect = pick.prospectId ? draftProspects.find((item) => item.id === pick.prospectId) : null;
      return `
        <article class="draft-pick-card ${index === currentDraftPickIndex ? "on-clock" : ""} ${prospect ? "is-picked" : ""}">
          <strong>${pick.overall}. ${escapeHtml(pick.team)}</strong>
          <small>Round ${pick.round} · Pick ${pick.pick}</small>
          <b>${prospect ? `${escapeHtml(prospect.name)} · ${escapeHtml(prospect.position)}` : "Open"}</b>
        </article>
      `;
    })
    .join("");
}

function renderDraftHistory() {
  const target = document.querySelector("#draftHistory");
  const count = document.querySelector("#draftHistoryCount");
  if (!target || !count) return;

  const picked = draftPicks.filter((pick) => pick.prospectId);
  count.textContent = `${picked.length} pick${picked.length === 1 ? "" : "s"}`;

  target.innerHTML = picked.length
    ? picked
        .map((pick) => {
          const prospect = draftProspects.find((item) => item.id === pick.prospectId);
          return `
            <article class="draft-history-card">
              <span>R${pick.round} P${pick.pick}</span>
              <div>
                <strong>${escapeHtml(prospect.name)} to ${escapeHtml(pick.team)}</strong>
                <small>Overall ${pick.overall} · ${escapeHtml(prospect.position)} · team role assigned: Draft Pick</small>
              </div>
            </article>
          `;
        })
        .join("")
    : `<article class="empty-state"><strong>No picks yet</strong><small>Draft history records every round, pick, player, and team.</small></article>`;
}

function renderDraftRoom() {
  updateDraftHeader();
  renderDraftPool();
  renderDraftBoard();
  renderDraftHistory();
  const resetButton = document.querySelector("#resetDraft");
  const startButton = document.querySelector("#startDraft");
  const pickButton = document.querySelector("#makeDraftPick");
  if (resetButton) resetButton.disabled = draftRunning;
  if (startButton) startButton.disabled = draftRunning || !availableProspects().length;
  if (pickButton) pickButton.disabled = !currentDraftPick() || !availableProspects().length;
}

function assignDraftedPlayer(prospect, teamName) {
  if (players.some((player) => player.draftProspectId === prospect.id)) return;

  players.push({
    name: prospect.name,
    tag: prospect.name.replace(/\s+/g, ""),
    team: teamName,
    position: prospect.position,
    platform: prospect.platform,
    accountAge: "New registration",
    trustScore: 82,
    identityStatus: "Verified",
    identityNote: "Draft registration cleared required Twitch, Discord, and console identity",
    build: prospect.build,
    initials: initialsFromName(prospect.name),
    color: "teal",
    ppg: 0,
    rpg: 0,
    apg: 0,
    spg: 0,
    bpg: 0,
    fg: "0%",
    fgValue: 0,
    three: "0%",
    threeValue: 0,
    record: "0-0",
    teamRole: "Draft Pick",
    chatAccess: `${teamName} team chat pending owner confirmation`,
    accolades: [`${new Date().getFullYear()} MCPA Draft Pick`],
    discord: "Connected",
    twitch: "Connected",
    isLive: false,
    viewers: 0,
    streamTitle: "Offline",
    draftProspectId: prospect.id,
  });
}

function advanceDraftPick() {
  currentDraftPickIndex = draftPicks.findIndex((pick) => !pick.prospectId);
  if (currentDraftPickIndex === -1) {
    currentDraftPickIndex = draftPicks.length;
    draftRunning = false;
    window.clearInterval(draftTimer);
    draftTimer = null;
  }
  draftClock = 60;
}

function makeDraftPick(options = {}) {
  const pick = currentDraftPick();
  const prospect = options.auto
    ? bestAvailableProspect(pick?.team)
    : draftProspects.find((item) => item.id === selectedProspectId && !item.drafted) || bestAvailableProspect(pick?.team);

  if (!pick) {
    showToast("Draft is complete. Every pick has been recorded.");
    return;
  }

  if (!prospect) {
    showToast("No draft-eligible players are available.");
    return;
  }

  if (!options.auto) {
    const confirmed = window.confirm(`Confirm ${pick.team} selects ${prospect.name} (${prospect.position}) at Round ${pick.round}, Pick ${pick.pick}?`);
    if (!confirmed) {
      showToast("Draft pick canceled. No pick was submitted.");
      return;
    }
  }

  pick.prospectId = prospect.id;
  prospect.drafted = true;
  prospect.status = `${pick.team} · Round ${pick.round} Pick ${pick.pick}`;
  assignDraftedPlayer(prospect, pick.team);
  recordBooks.draftResults.unshift({ scope: "Draft", category: `Round ${pick.round} Pick ${pick.pick}`, player: prospect.name, value: pick.team, detail: `Overall ${pick.overall}` });
  persistRecordBooks();
  selectedProspectId = availableProspects()[0]?.id || null;
  document.querySelector("#draftTicker").textContent = `${pick.team} selected ${prospect.name} (${prospect.position}) at Round ${pick.round}, Pick ${pick.pick}.`;
  advanceDraftPick();
  if (!currentDraftPick()) {
    document.querySelector("#draftTicker").textContent = "Draft complete. Final team-role notifications have been sent to every drafted player.";
    showToast("Draft complete. Players were assigned to team roles and notified.");
  }
  renderDraftRoom();
  renderPlayers();
  renderStatLeaders();
  renderLiveStreams();
  renderTeamPage();
  renderFreeAgency();
  renderHistoryBooks();
}

function tickDraftClock() {
  if (!draftRunning) return;
  draftClock -= 1;
  if (draftClock <= 0) {
    makeDraftPick({ auto: true });
    return;
  }
  updateDraftHeader();
}

function startDraft() {
  if (draftRunning) {
    showToast("The draft is already live and cannot be stopped once started.");
    return;
  }

  if (!availableProspects().length) {
    showToast("No registered players are available in the draft pool.");
    return;
  }

  draftRunning = true;
  window.clearInterval(draftTimer);
  draftTimer = window.setInterval(tickDraftClock, 1000);
  document.querySelector("#draftTicker").textContent = "Draft started. Captains and players were notified. Each team has 1 minute to make a pick.";
  renderDraftRoom();
}

function pauseDraft() {
  showToast("Draft cannot be paused once it starts. Missed picks auto-draft best available fit.");
}

function resetDraft() {
  if (draftRunning) {
    showToast("Draft is live. It cannot be reset or stopped once started.");
    return;
  }

  window.clearInterval(draftTimer);
  draftTimer = null;
  draftRunning = false;
  draftPicks = createDraftOrder();
  currentDraftPickIndex = 0;
  draftClock = 60;
  draftProspects.forEach((prospect) => {
    prospect.drafted = false;
    prospect.status = "Draft eligible";
  });
  for (let index = players.length - 1; index >= 0; index -= 1) {
    if (players[index].draftProspectId) players.splice(index, 1);
  }
  selectedProspectId = draftProspects[0]?.id || null;
  document.querySelector("#draftTicker").textContent = "Draft reset. Registered players are back in the pool.";
  renderDraftRoom();
  renderPlayers();
  renderStatLeaders();
  renderLiveStreams();
  renderTeamPage();
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    setTab(tab.dataset.tab);
    if (tab.dataset.leagueJump) {
      window.setTimeout(() => setLeaguePanel(tab.dataset.leagueJump), 80);
    }
  });
});

shortcutButtons.forEach((button) => {
  button.addEventListener("click", () => setTab(button.dataset.tabTarget));
});

document.querySelectorAll("[data-league-panel-target]").forEach((button) => {
  button.addEventListener("click", () => setLeaguePanel(button.dataset.leaguePanelTarget));
});

document.querySelectorAll("[data-login-platform]").forEach((button) => {
  button.addEventListener("click", () => {
    accountState.platform = normalizeConsoleName(button.dataset.loginPlatform);
    const provider = accountState.platform === "PlayStation" ? PlayStationProvider : XboxProvider;
    provider.connectAccount(accountState);
    updateLoginGate();
    refreshIdentityUI();
    showToast(`${accountState.platform} connected. Display names will sync from the console account.`);
  });
});

document.querySelectorAll("[data-required-connect]").forEach((button) => {
  button.addEventListener("click", () => {
    const connection = button.dataset.requiredConnect;
    accountState[connection] = true;
    (connection === "discord" ? DiscordProvider : TwitchProvider).connectAccount(accountState);
    updateLoginGate();
    updateConnectionCards();
    showToast(`${connection === "discord" ? "Discord" : "Twitch"} connected and required for league access.`);
  });
});

document.querySelectorAll("[data-login-role]").forEach((button) => {
  button.addEventListener("click", () => {
    accountState.role = button.dataset.loginRole;
    document.body.dataset.role = accountState.role;
    updateLoginGate();
    renderVoiceStage();
    showToast(isAdminRole() ? "Staff controls will unlock after required connections." : accountState.role === "captain" ? "Captain tools selected. Team management stays limited." : "Player view selected. Admin controls stay hidden.");
  });
});

document.querySelectorAll("#signupName, #signupEmail, #signupAge, #signupDob, #signupPosition, #signupCity, #signupState, #signupZip, #signupBuild, #signupKyc").forEach((input) => {
  input.addEventListener("input", updateLoginGate);
  input.addEventListener("change", updateLoginGate);
});

document.querySelector("#verifyLocationButton")?.addEventListener("click", () => {
  const registration = getRegistration();
  registrationLocationVerification = {
    ...registrationLocationVerification,
    statedCity: registration.city,
    statedState: registration.state,
    statedZip: registration.zip,
    currentState: registration.state,
    currentCountry: "US",
    currentLatitude: 35.2271,
    currentLongitude: -80.8431,
    ipState: registration.state,
    ipCountry: "US",
    locationPermissionGranted: true,
    locationVerifiedAt: new Date().toISOString(),
    locationMismatch: false,
    vpnOrProxyDetected: false,
  };
  writeStore("mcpaRegistrationLocation", registrationLocationVerification);
  renderRegistrationEligibility();
  updateLoginGate();
  showToast("Location verified. Exact coordinates stay hidden from players.");
});

document.querySelector("#startAppealButton")?.addEventListener("click", () => {
  supportTickets.unshift({
    id: `MCPA-${1043 + supportTickets.length}`,
    type: "Eligibility appeal",
    subject: "Payout eligibility appeal",
    status: "Open",
    owner: document.querySelector("#signupName").value.trim() || "Player",
    detail: `${registrationLocationVerification.eligibilityStatus}: ${registrationLocationVerification.eligibilityReason}`,
  });
  renderSupportTickets();
  showToast("Eligibility appeal opened for staff review.");
});

enterAppButton.addEventListener("click", unlockApp);

menuToggle.addEventListener("click", () => {
  if (sideMenu.classList.contains("is-open")) {
    closeMenu();
    return;
  }
  openMenu();
});

menuBackdrop.addEventListener("click", closeMenu);
menuClose.addEventListener("click", closeMenu);

avatarButton.addEventListener("click", () => {
  profileModal.showModal();
});

document.querySelector(".close-modal").addEventListener("click", () => {
  document.querySelector("#playerModal").close();
});

document.querySelector(".close-profile").addEventListener("click", () => {
  profileModal.close();
});

signOutButton.addEventListener("click", signOut);

document.querySelector("#playerSearch").addEventListener("input", (event) => {
  const term = event.target.value.trim().toLowerCase();
  const matches = players.filter((player) =>
    [
      player.name,
      player.tag,
      player.team,
      player.position,
      player.build,
      player.teamRole,
      player.discord,
      player.twitch,
      ...player.accolades,
    ].some((value) => value.toLowerCase().includes(term)),
  );
  renderPlayers(matches);
});

document.querySelectorAll("[data-leader-stat]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-leader-stat]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeLeaderStat = button.dataset.leaderStat;
    renderStatLeaders();
  });
});

document.querySelectorAll("[data-leader-position]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-leader-position]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeLeaderPosition = button.dataset.leaderPosition;
    renderStatLeaders();
  });
});

document.querySelector("#mmrSearch")?.addEventListener("input", (event) => {
  mmrSearch = event.target.value;
  renderMmrRankings();
});

document.querySelectorAll("[data-mmr-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-mmr-filter]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    mmrFilter = button.dataset.mmrFilter;
    renderMmrRankings();
  });
});

document.querySelectorAll("[data-mmr-sort]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-mmr-sort]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    mmrSort = button.dataset.mmrSort;
    renderMmrRankings();
  });
});

document.querySelector("#shuffleSeeds").addEventListener("click", () => {
  bracketIndex = (bracketIndex + 1) % bracketSets.length;
  renderBracket();
  showToast("Bracket auto-seeded from standings and payment status.");
});

document.querySelector("#cupAutoResult")?.addEventListener("click", () => {
  const nextGame = cupState.games.find((game) => game.status !== "FINAL") || cupState.games[0];
  submitCupGameResult(nextGame.id, nextGame.homeTeamId, { [nextGame.homeTeamId]: 84, [nextGame.awayTeamId]: 76 });
  renderCup();
  renderLeagueBracketBoard();
  showToast("League Cup group result submitted and standings updated.");
});

document.querySelector("#generateCupKnockout")?.addEventListener("click", () => {
  generateCupKnockoutBracket();
  renderCup();
  renderLeagueBracketBoard();
  showToast("Midseason Cup knockout bracket generated from group winners and wild card.");
});

document.querySelector("#submitMmrResult")?.addEventListener("click", submitMmrResultFromForm);

document.querySelector("#publishSchedule").addEventListener("click", () => {
  showToast("Scheduled games published to teams, owners, and eligible players.");
});

document.querySelector("#createGameShortcut").addEventListener("click", () => {
  setTab("schedule");
  window.setTimeout(() => {
    document.querySelector(".schedule-form").scrollIntoView({ behavior: "smooth", block: "start" });
    document.querySelector("#scheduleHome").focus();
  }, 180);
  showToast("Schedule form opened. Add the teams, time, and court.");
});

document.querySelector("#addPlayerShortcut").addEventListener("click", () => {
  if (!isCaptainRole()) {
    setTab("support");
    document.querySelector("#ticketType").value = "Roster request";
    document.querySelector("#ticketSubject").value = "Request to add player";
    showToast("Roster additions require a team owner or staff role. A support ticket was started.");
    return;
  }

  setTab("admin");
  window.setTimeout(() => document.querySelector("#newRosterPlayer").focus(), 220);
  showToast("Team owner roster tool opened.");
});

document.querySelectorAll("[data-standings-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-standings-filter]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    standingsFilter = button.dataset.standingsFilter;
    renderTeamStandings();
  });
});

document.querySelectorAll("[data-schedule-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-schedule-filter]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    scheduleFilter = button.dataset.scheduleFilter;
    renderScheduledGames();
  });
});

document.querySelector("#addScheduledGame").addEventListener("click", () => {
  const home = document.querySelector("#scheduleHome").value.trim();
  const away = document.querySelector("#scheduleAway").value.trim();
  const time = document.querySelector("#scheduleTime").value.trim();
  const court = document.querySelector("#scheduleCourt").value.trim();

  if (!home || !away || !time || !court) {
    showToast("Fill in both teams, time, and court before scheduling.");
    return;
  }

  scheduledGames.unshift({
    id: `g${Date.now()}`,
    home,
    away,
    time,
    court,
    status: "Draft",
    checkIn: "Opens 45 min before tip",
    statSubmitter: "Winning captain",
    tags: ["all", "week"],
  });
  scheduleFilter = "all";
  document.querySelectorAll("[data-schedule-filter]").forEach((item) => {
    item.classList.toggle("active", item.dataset.scheduleFilter === "all");
  });
  renderScheduledGames();
  renderLeagueLockedGames();
  showToast(`${home} vs ${away} added to scheduled games.`);
});

document.querySelector("#connectDiscord")?.addEventListener("click", () => {
  accountState.discord = true;
  updateLoginGate();
  updateConnectionCards();
  showToast("Discord connected. Team chats and support tickets can sync roles.");
});

document.querySelector("#connectTwitch")?.addEventListener("click", () => {
  accountState.twitch = true;
  updateLoginGate();
  updateConnectionCards();
  showToast("Twitch connected. Live status is mandatory and will show on player cards.");
});

document.querySelector("#refreshStreams").addEventListener("click", () => {
  renderLiveStreams();
  showToast("Stream list refreshed from connected Twitch accounts.");
});

document.querySelector("#submitTicket").addEventListener("click", () => {
  const type = document.querySelector("#ticketType").value.trim();
  const subject = document.querySelector("#ticketSubject").value.trim();
  const detail = document.querySelector("#ticketDetails").value.trim();

  if (!type || !subject || !detail) {
    showToast("Add the issue type, subject, and details before submitting a support ticket.");
    return;
  }

  supportTickets.unshift({
    id: `MCPA-${1043 + supportTickets.length}`,
    type,
    subject,
    status: "Open",
    owner: accountState.platform ? `${accountState.platform} user` : "Player",
    detail,
  });
  document.querySelector("#ticketSubject").value = "";
  document.querySelector("#ticketDetails").value = "";
  renderSupportTickets();
  showToast("Support ticket submitted. Staff can now review it in the admin queue.");
});

document.querySelector("#refreshTickets").addEventListener("click", () => {
  renderSupportTickets();
  showToast("Support tickets refreshed.");
});

document.querySelector("#startDraft").addEventListener("click", startDraft);
document.querySelector("#makeDraftPick").addEventListener("click", makeDraftPick);
document.querySelector("#resetDraft").addEventListener("click", resetDraft);

document.querySelectorAll("[data-chat-mode]").forEach((button) => {
  button.addEventListener("click", () => setChatMode(button.dataset.chatMode));
});

document.querySelector("#voiceCreateForm").addEventListener("submit", createVoiceRoom);
document.querySelector("#joinVoiceRoom").addEventListener("click", joinVoiceRoom);
document.querySelector("#leaveVoiceRoom").addEventListener("click", leaveVoiceRoom);
document.querySelector("#toggleMic").addEventListener("click", toggleMic);
document.querySelector("#toggleVoiceOutput").addEventListener("click", toggleVoiceOutput);
document.querySelector("#toggleDeafen").addEventListener("click", toggleDeafen);
document.querySelector("#miniToggleMic").addEventListener("click", toggleMic);
document.querySelector("#miniToggleDeafen").addEventListener("click", toggleDeafen);

document.querySelector("#dmComposer").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.querySelector("#dmInput");
  const text = input.value.trim();
  if (!text) return;

  pushDirectMessage({ type: "text", text });
  input.value = "";
  showToast(`Message sent to ${activeDmThread().player}.`);
});

document.querySelector("#recordVoiceMessage").addEventListener("click", sendVoiceMessage);

document.querySelector("#toggleGifPicker").addEventListener("click", () => {
  document.querySelector("#gifPicker").classList.toggle("is-open");
});

document.querySelector("#startDirectVoice").addEventListener("click", () => {
  showToast(`Direct voice call started with ${activeDmThread().player} in demo mode.`);
});

document.querySelector("#statImage").addEventListener("change", (event) => {
  const [file] = event.target.files;
  if (!file) return;

  uploadStatScreenshot("Game #42", file)
    .then((upload) => {
      document.querySelector("#imagePreview").src = upload.imageUrl;
      document.querySelector("#previewCard").classList.remove("hidden");
      showToast("Screenshot saved. OCR review created and MMR is locked until approval.");
    })
    .catch(() => showToast("Screenshot could not be processed. Try another image."));
});

document.querySelector("#approveStatReview")?.addEventListener("click", () => {
  const review = currentStatReview();
  if (!review) {
    showToast("Upload a screenshot before approving stats.");
    return;
  }
  approveStatReview(review.id, currentUserName());
});

document.querySelector("#rejectStatReview")?.addEventListener("click", () => {
  const review = currentStatReview();
  if (!review) return;
  rejectStatReview(review.id, currentUserName(), "Rejected from admin review panel.");
  showToast("Stat review rejected. A new screenshot can be requested.");
});

document.querySelector("#requestNewScreenshot")?.addEventListener("click", () => {
  const review = currentStatReview();
  if (review) review.reviewStatus = "NEEDS_REVIEW";
  persistStatReviewStore();
  renderStatReview(review?.id);
  showToast("New screenshot requested. Review remains pending.");
});

function previewImage(input, callback) {
  const [file] = input.files;
  if (!file) return;

  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(file);
}

document.querySelector("#leagueLogoUpload").addEventListener("change", (event) => {
  previewImage(event.target, (src) => {
    const preview = document.querySelector("#leagueLogoPreview");
    preview.style.backgroundImage = "none";
    preview.innerHTML = `<img src="${src}" alt="Uploaded MCPA logo preview" />`;
    showToast("League logo preview updated for MCPA.");
  });
});

document.querySelector("#teamLogoUpload").addEventListener("change", (event) => {
  previewImage(event.target, (src) => {
    teamLogos.Shockers.image = src;
    const logo = document.querySelector("#primaryTeamLogo");
    logo.style.backgroundImage = `url("${src}")`;
    logo.textContent = "";
    renderTeamDirectory();
    renderTeamStandings();
    renderStatLeaders();
    renderPlayers();
    showToast("Shockers logo updated. Hover player team names to see it.");
  });
});

document.querySelector("#grantStaffRole").addEventListener("click", () => {
  showToast("Staff role granted. Admin access is limited to approved staff accounts.");
});

document.querySelector("#runIdentityScan").addEventListener("click", () => {
  renderIdentityQueue();
  showToast("Xbox and PSN identity scan complete. Risk queue refreshed.");
});

document.querySelector("#saveJurisdictionRule")?.addEventListener("click", () => {
  const state = document.querySelector("#jurisdictionStateInput").value;
  const status = document.querySelector("#jurisdictionRuleInput").value;
  const reason = document.querySelector("#jurisdictionReasonInput").value.trim();
  updateJurisdictionRule(
    state,
    {
      status,
      payoutEligibility: status === "FREE_PLAY_ONLY" ? "RESTRICTED" : status,
      cashCompetitionEligibility: status === "FREE_PLAY_ONLY" ? "RESTRICTED" : status,
      freePlayAllowed: status !== "RESTRICTED",
      reason,
      requiresManualReview: status === "REVIEW_REQUIRED",
    },
    currentUserName(),
  );
  renderJurisdictionRulesPanel();
  renderRegistrationEligibility();
  showToast(`${normalizeState(state)} jurisdiction rule saved.`);
});

document.querySelector("#removeJurisdictionRule")?.addEventListener("click", () => {
  const state = normalizeState(document.querySelector("#jurisdictionStateInput").value);
  updateJurisdictionRule(state, { status: "ELIGIBLE", reason: "Removed from restricted list.", freePlayAllowed: true }, currentUserName());
  renderJurisdictionRulesPanel();
  renderRegistrationEligibility();
  showToast(`${state} removed from the restricted jurisdiction list.`);
});

document.querySelector("#saveEligibilityOverride")?.addEventListener("click", () => {
  const playerId = document.querySelector("#eligibilityOverridePlayer").value.trim();
  const finalStatus = document.querySelector("#eligibilityOverrideStatus").value;
  const reason = document.querySelector("#eligibilityOverrideReason").value.trim();
  const saved = adminOverrideEligibility(playerId, finalStatus, reason, currentUserName());
  if (saved) {
    document.querySelector("#eligibilityOverrideReason").value = "";
    renderJurisdictionRulesPanel();
    showToast(`Eligibility override saved for ${playerId}.`);
  }
});

document.querySelectorAll("[data-pay-choice]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-pay-choice]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    rosterPaymentChoice = button.dataset.payChoice;
  });
});

document.querySelector("#addRosterPlayer").addEventListener("click", () => {
  const input = document.querySelector("#newRosterPlayer");
  const gamertag = input.value.trim();
  if (!gamertag) {
    showToast("Enter a gamertag before adding a roster spot.");
    return;
  }

  if (rosterCount >= 8) {
    showToast("Roster limit reached. Each team can carry 8 players max.");
    return;
  }

  rosterCount += 1;
  const rosterList = document.querySelector("#rosterList");
  const item = document.createElement("article");
  item.innerHTML = `
    <span class="player-avatar lime">${escapeHtml(gamertag.slice(0, 2).toUpperCase())}</span>
    <div><strong>${escapeHtml(gamertag)}</strong><small>Player · team chat granted</small></div>
    <span class="sync-badge">Player</span>
  `;
  rosterList.append(item);
  document.querySelector("#rosterCount").textContent = rosterCount;
  document.querySelector("#rosterMeter").style.width = `${(rosterCount / 8) * 100}%`;
  input.value = "";
  showToast(
    rosterPaymentChoice === "owner"
      ? "Player added. Owner checkout created for the roster addition."
      : "Player added. Payment request sent to the player.",
  );
});

document.querySelectorAll("[data-money-tab]").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll("[data-money-tab]").forEach((item) => item.classList.remove("active"));
    document.querySelectorAll(".money-list").forEach((list) => list.classList.remove("active"));
    tab.classList.add("active");
    document.querySelector(`#${tab.dataset.moneyTab}`).classList.add("active");
  });
});

document.querySelector("#newChargeShortcut").addEventListener("click", () => {
  document.querySelector("#payments-title").scrollIntoView({ behavior: "smooth", block: "start" });
  showToast("New charge tools opened. Choose registration checkout or issue a fine.");
});

document.querySelectorAll("[data-payment-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const messages = {
      stripe: "Demo Stripe flow opened. Live payments need your Stripe keys, backend checkout session, and webhooks.",
      checkout: "Demo checkout drafted. Apple Pay, Google Pay, cards, PayPal, and Venmo need production provider setup.",
      payout: "Demo payout scheduled. Real prize and staff payouts require verified Stripe Connect recipients.",
    };
    showToast(messages[button.dataset.paymentAction]);
  });
});

document.querySelectorAll("[data-prototype-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const messages = {
      "event-checkout": "Demo event checkout created. Live checkout needs payment provider setup.",
      "invite-teams": "Team invite draft created for captains and owners.",
      "generate-registration": "Tournament registration page generated in demo mode.",
      "send-fine": "Fine notice sent in demo mode. Live billing requires Stripe checkout.",
      "join-voice": "Voice join started in demo mode. Production voice rooms need Discord voice integration.",
    };
    showToast(messages[button.dataset.prototypeAction] || "Action completed.");
  });
});

document.querySelectorAll("[data-awards-tab]").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll("[data-awards-tab]").forEach((item) => item.classList.remove("active"));
    document.querySelectorAll(".awards-panel").forEach((panel) => panel.classList.remove("active"));
    tab.classList.add("active");
    document.querySelector(`#${tab.dataset.awardsTab}`).classList.add("active");
  });
});

document.querySelectorAll("[data-history-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-history-filter]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    historyFilter = button.dataset.historyFilter;
    renderHistory();
  });
});

document.querySelector("#composer").addEventListener("submit", sendMessage);
document.querySelector("#chatInput").addEventListener("input", handleTyping);
document.querySelector("#chatInput").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    sendMessage(event);
  }
});
document.querySelector("#chatAttachButton").addEventListener("click", () => {
  showToast("Attachments will connect to screenshot and media uploads in production.");
});
document.querySelector("#voiceRoomCount").addEventListener("click", () => {
  const picker = document.querySelector("#chatRoomPicker");
  const button = document.querySelector("#voiceRoomCount");
  picker.hidden = !picker.hidden;
  button.setAttribute("aria-expanded", String(!picker.hidden));
});

setupMentionInput("#dmInput", "#dmMentionTray");
setupMentionInput("#chatInput", "#leagueMentionTray");

applyPreviewSessionFromUrl();
renderPlayers();
renderStatLeaders();
renderTeamDirectory();
renderTeamPage();
renderBracket();
renderTeamStandings();
renderScheduledGames();
renderLeagueLockedGames();
renderEventCalendar();
renderScoreResults();
renderLeagueRules();
renderLiveStreams();
renderDirectMessages();
renderVoiceRooms();
renderVoiceStage();
renderVoiceMiniBar();
renderIdentityQueue();
renderSupportTickets();
renderDraftRoom();
renderAwardCatalog();
renderPolls("#awardPolls", awardPolls);
renderPolls("#allStarPolls", allStarPolls);
renderHistory();
renderNotifications();
renderMovementDashboard();
renderJurisdictionRulesPanel();
renderAdminDashboard();
renderFinanceSummary();
renderFreeAgency();
renderWaivers();
renderMmrRankings();
renderMatchResultForm();
renderCup();
renderLeagueBracketBoard();
renderHistoryBooks();
renderStatReview();
setLeaguePanel("overview");
renderChatRooms();
renderMessages();
updateLoginGate();
updateConnectionCards();
setChatMode(chatMode);
window.setTimeout(scrollToBottom, 100);

window.setInterval(() => {
  cleanupVoiceRooms(true);
  renderVoiceRooms();
  renderVoiceStage();
  renderVoiceMiniBar();
  hideTypingIndicator();
}, 60000);

demoTypingTimer = window.setInterval(simulateDemoTyping, 14000);

window.MCPA_BETA_API = {
  CommissionerEngine,
  XboxProvider,
  PlayStationProvider,
  TwitchProvider,
  DiscordProvider,
  getUserConsoleLabel,
  getUserInitials,
  getAvatarColor,
  renderUserAvatar,
  uploadStatScreenshot,
  previewUploadedScreenshot,
  runOcrOnScreenshot,
  parseOcrTextToGameResult,
  parseOcrTextToPlayerStats,
  matchPlayerNamesToRoster,
  validateGameScore,
  validatePlayerStats,
  calculateOcrConfidence,
  createProvisionalResult,
  autoFinalizeResultIfEligible,
  reportWrongScreenshot,
  updatePlayerStatsFromApprovedResult,
  updateMmrFromApprovedResult,
  updateCareerHighsFromApprovedResult,
  updateAccoladesFromApprovedResult,
  updateHistoryBooksFromApprovedResult,
  updateStandingsFromApprovedResult,
  createVoiceRoom,
  joinVoiceRoom,
  leaveVoiceRoom,
  muteMic,
  unmuteMic,
  deafenAudio,
  undeafenAudio,
  listActiveVoiceRooms,
  closeVoiceRoom,
  kickUserFromVoiceRoom,
  updateVoiceRoomPresence,
  LeagueFinanceConfig,
  calculateLeagueFinanceSummary,
};

if ("serviceWorker" in navigator && window.location.protocol.startsWith("http")) {
  navigator.serviceWorker.register("./service-worker.js").catch(() => {});
}
