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
let speakerOn = true;
let activeDmId = directThreads[0]?.id || null;
let dmNotificationPing = directThreads.some((thread) => thread.unread);

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

function getRegistration() {
  return {
    name: document.querySelector("#signupName").value.trim(),
    email: document.querySelector("#signupEmail").value.trim(),
    age: Number(document.querySelector("#signupAge").value),
    position: document.querySelector("#signupPosition").value,
    city: document.querySelector("#signupCity").value.trim(),
    build: document.querySelector("#signupBuild").value.trim(),
  };
}

function isRegistrationComplete() {
  const registration = getRegistration();
  return Boolean(
    registration.name &&
      registration.email.includes("@") &&
      registration.age >= 13 &&
      registration.position &&
      registration.city &&
      registration.build,
  );
}

function initialsFromName(name) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return (parts.length > 1 ? `${parts[0][0]}${parts[1][0]}` : name.slice(0, 2)).toUpperCase();
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
        <article>
          ${teamLogoBadge(team.name)}
          <strong>${team.name}</strong>
          <small>${team.division} division</small>
        </article>
      `,
    )
    .join("");
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
  if (tabName === "admin" && accountState.role !== "admin") {
    showToast("Admin controls are only visible to approved staff roles.");
    tabName = "support";
  }

  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.id === `screen-${tabName}`);
  });

  tabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.tab === tabName);
  });

  closeMenu();
  window.scrollTo({ top: 0, behavior: "smooth" });
  appShell.scrollTo({ top: 0, behavior: "smooth" });
}

function connectedCount() {
  return [accountState.platform, accountState.discord, accountState.twitch].filter(Boolean).length;
}

function updateLoginGate() {
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
    enterAppButton.textContent = `Enter MCPA as ${accountState.role === "admin" ? "staff" : "player"}`;
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
  avatarButton.textContent = accountState.platform === "Xbox" ? "XB" : "PS";
  avatarButton.setAttribute("aria-label", `${accountState.platform} verified profile`);
  renderDraftRoom();
  renderDirectMessages();
  renderVoiceRooms();
  renderVoiceStage();
  setTab("home");
  showToast(`${prospect.name} registered at ${prospect.position} and entered into the draft pool.`);
}

function signOut() {
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
  avatarButton.textContent = "TL";
  avatarButton.setAttribute("aria-label", "Commissioner profile");
  updateLoginGate();
  updateConnectionCards();
  renderDirectMessages();
  renderVoiceRooms();
  renderVoiceStage();
  showToast("Signed out. Required account connections cleared.");
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

function renderScheduledGames() {
  const target = document.querySelector("#scheduledGames");
  if (!target) return;

  const games = scheduledGames.filter((game) => game.tags.includes(scheduleFilter));
  target.innerHTML = games
    .map(
      (game) => `
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
          <button class="ghost-button schedule-action" type="button" data-game-action="${game.id}">Send reminder</button>
        </article>
      `,
    )
    .join("");

  target.querySelectorAll("[data-game-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const game = scheduledGames.find((item) => item.id === button.dataset.gameAction);
      showToast(`Reminder sent for ${game.home} vs ${game.away}.`);
    });
  });
}

function renderLeagueLockedGames() {
  const target = document.querySelector("#leagueLockedGames");
  if (!target) return;

  target.innerHTML = scheduledGames
    .filter((game) => game.status !== "Draft")
    .slice(0, 3)
    .map(
      (game) => `
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
      `,
    )
    .join("");
}

function renderScoreResults() {
  const target = document.querySelector("#scoreResults");
  if (!target) return;

  target.innerHTML = gameResults
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
}

function renderTeamPage() {
  const roster = document.querySelector("#teamPageRoster");
  const logo = document.querySelector("#teamPageLogo");
  if (logo) {
    logo.innerHTML = teamLogoBadge("Shockers");
  }
  if (!roster) return;

  const shockers = [
    ...players.filter((player) => player.team === "Shockers"),
    { name: "LockTae", initials: "LT", color: "teal", position: "SG", teamRole: "Captain", ppg: 19.8, apg: 6.4, rpg: 3.1, isLive: false },
    { name: "ShotKev", initials: "SK", color: "lime", position: "SF", teamRole: "Player", ppg: 17.2, apg: 3.8, rpg: 5.9, isLive: false },
    { name: "BoardMan", initials: "BM", color: "orange", position: "PF", teamRole: "Player", ppg: 12.6, apg: 2.4, rpg: 9.8, isLive: false },
    { name: "PaintRue", initials: "PR", color: "red", position: "C", teamRole: "Player", ppg: 14.1, apg: 2.1, rpg: 11.2, isLive: false },
    { name: "CornerKai", initials: "CK", color: "teal", position: "SG", teamRole: "Sixth Man", ppg: 10.4, apg: 2.8, rpg: 2.9, isLive: false },
  ].slice(0, 8);
  roster.innerHTML = shockers
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
          <td>${team.w}</td>
          <td>${team.l}</td>
          <td>${standingsPct(team)}</td>
          <td>${gb}</td>
          <td>${team.home}</td>
          <td>${team.away}</td>
          <td>${team.last10}</td>
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

function renderVoiceRooms() {
  const target = document.querySelector("#voiceRoomList");
  const count = document.querySelector("#voiceRoomCount");
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
  const speakerButton = document.querySelector("#toggleSpeaker");
  const micButton = document.querySelector("#toggleMic");
  const leaveButton = document.querySelector("#leaveVoiceRoom");
  const participants = document.querySelector("#voiceParticipants");
  if (!room || !participants) return;

  const joinedThisRoom = joinedVoiceRoomId === room.id;
  const lockedForPlayer = room.locked && accountState.role !== "admin";

  if (roomName) {
    roomName.textContent = room.name;
  }

  if (roomMeta) {
    roomMeta.textContent = joinedThisRoom
      ? `${room.members.length} in room · ${speakerOn ? "speaker on" : "speaker off"} · ${micMuted ? "mic muted" : "mic live"}`
      : `${room.members.length} inside · preview before joining · ${room.topic}`;
  }

  if (joinButton) {
    joinButton.disabled = lockedForPlayer || joinedThisRoom;
    joinButton.textContent = joinedThisRoom ? "Joined" : lockedForPlayer ? "Locked" : "Join";
  }

  if (speakerButton) {
    speakerButton.disabled = !joinedThisRoom;
    speakerButton.textContent = speakerOn ? "Speaker on" : "Speaker off";
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
                accountState.role === "admin"
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
}

function joinVoiceRoom() {
  const room = activeVoiceRoom();
  if (!room) return;

  if (room.locked && accountState.role !== "admin") {
    showToast("That room is locked. A team owner or staff member must grant access.");
    return;
  }

  cleanSelfFromOtherRooms(room.id);
  const userName = currentUserName();
  const existingMember = room.members.find((member) => member.self || member.name === userName);
  if (existingMember) {
    existingMember.self = true;
    existingMember.muted = micMuted;
    existingMember.deafened = false;
  } else {
    room.members.push({
      name: userName,
      role: accountState.role === "admin" ? "Staff" : "Player",
      initials: initialsFromName(userName),
      speaking: false,
      muted: micMuted,
      deafened: false,
      votes: 0,
      self: true,
    });
  }

  joinedVoiceRoomId = room.id;
  renderVoiceRooms();
  renderVoiceStage();
  showToast(`Joined ${room.name}. Mic and speaker controls are active.`);
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
    locked: false,
    topic: `Created by ${userName}. Invite players with @mentions in chat.`,
    members: [
      {
        name: userName,
        role: accountState.role === "admin" ? "Staff host" : "Room host",
        initials: initialsFromName(userName),
        speaking: false,
        muted: micMuted,
        deafened: false,
        votes: 0,
        self: true,
      },
    ],
  });

  activeVoiceRoomId = roomId;
  joinedVoiceRoomId = roomId;
  input.value = "";
  renderVoiceRooms();
  renderVoiceStage();
  showToast(`${roomName} voice chat created.`);
}

function leaveVoiceRoom() {
  const room = joinedVoiceRoom();
  if (!room) return;

  const userName = currentUserName();
  room.members = room.members.filter((member) => !(member.self || member.name === userName));
  joinedVoiceRoomId = null;
  renderVoiceRooms();
  renderVoiceStage();
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
    self.speaking = !micMuted && self.speaking;
  }
  renderVoiceStage();
  showToast(micMuted ? "Mic muted." : "Mic unmuted.");
}

function toggleSpeaker() {
  if (!joinedVoiceRoomId) return;
  speakerOn = !speakerOn;
  renderVoiceStage();
  showToast(speakerOn ? "Speaker output is on." : "Speaker output is off.");
}

function voteKickMember(memberName) {
  const room = activeVoiceRoom();
  const member = room?.members.find((item) => item.name === memberName);
  if (!room || !member) return;

  member.votes = (member.votes || 0) + 1;
  const needed = Math.floor(room.members.length / 2) + 1;
  if (member.votes >= needed) {
    room.members = room.members.filter((item) => item.name !== memberName);
    showToast(`${memberName} was majority voted out of ${room.name}.`);
  } else {
    showToast(`${memberName} has ${member.votes}/${needed} votes to leave ${room.name}.`);
  }

  renderVoiceRooms();
  renderVoiceStage();
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
  if (accountState.role !== "admin") {
    showToast("Only staff can deafen members.");
    return;
  }

  const room = activeVoiceRoom();
  const member = room?.members.find((item) => item.name === memberName);
  if (!member) return;

  member.deafened = true;
  member.speaking = false;
  renderVoiceRooms();
  renderVoiceStage();
  showToast(`${memberName} was deafened by staff.`);
}

function adminKickMember(memberName) {
  if (accountState.role !== "admin") {
    showToast("Only staff can kick members.");
    return;
  }

  const room = activeVoiceRoom();
  if (!room) return;

  room.members = room.members.filter((member) => member.name !== memberName);
  renderVoiceRooms();
  renderVoiceStage();
  showToast(`${memberName} was kicked from ${room.name}.`);
}

function currentDraftPick() {
  return draftPicks[currentDraftPickIndex];
}

function availableProspects() {
  return draftProspects.filter((prospect) => !prospect.drafted);
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
  const prospect = draftProspects.find((item) => item.id === selectedProspectId && !item.drafted) || availableProspects()[0];

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
  selectedProspectId = availableProspects()[0]?.id || null;
  document.querySelector("#draftTicker").textContent = `${pick.team} selected ${prospect.name} (${prospect.position}) at Round ${pick.round}, Pick ${pick.pick}.`;
  advanceDraftPick();
  renderDraftRoom();
  renderPlayers();
  renderStatLeaders();
  renderLiveStreams();
  renderTeamPage();
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
  if (!availableProspects().length) {
    showToast("No registered players are available in the draft pool.");
    return;
  }

  draftRunning = true;
  window.clearInterval(draftTimer);
  draftTimer = window.setInterval(tickDraftClock, 1000);
  document.querySelector("#draftTicker").textContent = "Draft started. Each team has 1 minute to make a pick.";
  renderDraftRoom();
}

function pauseDraft() {
  draftRunning = false;
  window.clearInterval(draftTimer);
  draftTimer = null;
  document.querySelector("#draftTicker").textContent = "Draft paused. Pick history is saved.";
  renderDraftRoom();
}

function resetDraft() {
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
  tab.addEventListener("click", () => setTab(tab.dataset.tab));
});

shortcutButtons.forEach((button) => {
  button.addEventListener("click", () => setTab(button.dataset.tabTarget));
});

document.querySelectorAll("[data-login-platform]").forEach((button) => {
  button.addEventListener("click", () => {
    accountState.platform = button.dataset.loginPlatform;
    updateLoginGate();
    showToast(`${accountState.platform} connected. Display names will sync from the console account.`);
  });
});

document.querySelectorAll("[data-required-connect]").forEach((button) => {
  button.addEventListener("click", () => {
    const connection = button.dataset.requiredConnect;
    accountState[connection] = true;
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
    showToast(accountState.role === "admin" ? "Staff demo selected. Admin controls will unlock after required connections." : "Player view selected. Admin controls stay hidden.");
  });
});

document.querySelectorAll("#signupName, #signupEmail, #signupAge, #signupPosition, #signupCity, #signupBuild").forEach((input) => {
  input.addEventListener("input", updateLoginGate);
  input.addEventListener("change", updateLoginGate);
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

document.querySelector("#shuffleSeeds").addEventListener("click", () => {
  bracketIndex = (bracketIndex + 1) % bracketSets.length;
  renderBracket();
  showToast("Bracket auto-seeded from standings and payment status.");
});

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
  if (accountState.role !== "admin") {
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
document.querySelector("#pauseDraft").addEventListener("click", pauseDraft);
document.querySelector("#resetDraft").addEventListener("click", resetDraft);

document.querySelector("#startRoomShortcut").addEventListener("click", () => {
  document.querySelector("#voiceCreateForm").scrollIntoView({ behavior: "smooth", block: "center" });
  window.setTimeout(() => document.querySelector("#voiceRoomName").focus(), 220);
  showToast("Name a voice chat and create it for players to join.");
});

document.querySelector("#voiceCreateForm").addEventListener("submit", createVoiceRoom);
document.querySelector("#joinVoiceRoom").addEventListener("click", joinVoiceRoom);
document.querySelector("#leaveVoiceRoom").addEventListener("click", leaveVoiceRoom);
document.querySelector("#toggleMic").addEventListener("click", toggleMic);
document.querySelector("#toggleSpeaker").addEventListener("click", toggleSpeaker);

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

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    document.querySelector("#imagePreview").src = reader.result;
    document.querySelector("#previewCard").classList.remove("hidden");
    showToast("Screenshot loaded. Sample stat extraction is ready for review.");
  });
  reader.readAsDataURL(file);
});

document.querySelector("#applyStats").addEventListener("click", () => {
  showToast("Stats applied. Player averages and team records were updated.");
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

document.querySelector("#composer").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.querySelector("#chatInput");
  const message = input.value.trim();
  if (!message) return;

  const chatWindow = document.querySelector("#chatWindow");
  const bubble = document.createElement("article");
  bubble.className = "message mine";
  bubble.innerHTML = `<span>${escapeHtml(currentUserName())}</span><p>${formatMessageText(message)}</p>`;
  chatWindow.append(bubble);
  input.value = "";
  chatWindow.scrollTop = chatWindow.scrollHeight;
});

setupMentionInput("#dmInput", "#dmMentionTray");
setupMentionInput("#chatInput", "#leagueMentionTray");

renderPlayers();
renderStatLeaders();
renderTeamDirectory();
renderTeamPage();
renderBracket();
renderTeamStandings();
renderScheduledGames();
renderLeagueLockedGames();
renderScoreResults();
renderLeagueRules();
renderLiveStreams();
renderDirectMessages();
renderVoiceRooms();
renderVoiceStage();
renderIdentityQueue();
renderSupportTickets();
renderDraftRoom();
renderAwardCatalog();
renderPolls("#awardPolls", awardPolls);
renderPolls("#allStarPolls", allStarPolls);
renderHistory();
updateLoginGate();
updateConnectionCards();

if ("serviceWorker" in navigator && window.location.protocol.startsWith("http")) {
  navigator.serviceWorker.register("./service-worker.js").catch(() => {});
}
