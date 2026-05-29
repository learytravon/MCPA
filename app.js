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

try {
  userVotes = JSON.parse(localStorage.getItem("mcpaUserVotes") || "{}");
} catch {
  userVotes = {};
}

document.body.dataset.role = accountState.role;

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => {
    const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
    return entities[char];
  });
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

  const complete = Boolean(accountState.platform && accountState.discord && accountState.twitch);
  enterAppButton.disabled = !complete;
  enterAppButton.textContent = complete
    ? `Enter MCPA as ${accountState.role === "admin" ? "staff" : "player"}`
    : `Connect required accounts (${connectedCount()}/3)`;
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
  if (!(accountState.platform && accountState.discord && accountState.twitch)) {
    showToast("Connect Twitch, Discord, and either Xbox or PlayStation before entering.");
    return;
  }

  accountState.signedIn = true;
  document.body.dataset.role = accountState.role;
  loginScreen.classList.add("hidden");
  appShell.classList.remove("is-locked");
  bottomNav.classList.remove("is-locked");
  sideMenu.classList.remove("is-locked");
  menuBackdrop.classList.remove("is-locked");
  avatarButton.textContent = accountState.platform === "Xbox" ? "XB" : "PS";
  avatarButton.setAttribute("aria-label", `${accountState.platform} verified profile`);
  setTab("home");
  showToast(`${accountState.platform}, Discord, and Twitch verified. ${accountState.role === "admin" ? "Staff controls unlocked." : "Player view unlocked."}`);
}

function signOut() {
  accountState.signedIn = false;
  accountState.platform = null;
  accountState.discord = false;
  accountState.twitch = false;
  accountState.role = "player";
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
    showToast(accountState.role === "admin" ? "Staff demo selected. Admin controls will unlock after required connections." : "Player view selected. Admin controls stay hidden.");
  });
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
  document.querySelector(".schedule-form").scrollIntoView({ behavior: "smooth", block: "start" });
  document.querySelector("#scheduleHome").focus();
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
  showToast(`${home} vs ${away} added to scheduled games.`);
});

document.querySelector("#connectDiscord").addEventListener("click", () => {
  accountState.discord = true;
  updateLoginGate();
  updateConnectionCards();
  showToast("Discord connected. Team chats and support tickets can sync roles.");
});

document.querySelector("#connectTwitch").addEventListener("click", () => {
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

document.querySelector("#startRoomShortcut").addEventListener("click", () => {
  showToast("Voice room started in demo mode. Production voice requires Discord voice integration.");
});

document.querySelectorAll(".room-card").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("locked")) {
      showToast("That team room is locked. Team owner approval is required.");
      return;
    }

    document.querySelectorAll(".room-card").forEach((room) => room.classList.remove("active"));
    button.classList.add("active");
    const roomName = button.querySelector("strong")?.textContent || "room";
    showToast(`${roomName} selected.`);
  });
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
  bubble.innerHTML = `<span>Commissioner</span><p>${message}</p>`;
  chatWindow.append(bubble);
  input.value = "";
  chatWindow.scrollTop = chatWindow.scrollHeight;
});

renderPlayers();
renderStatLeaders();
renderTeamDirectory();
renderBracket();
renderTeamStandings();
renderScheduledGames();
renderLiveStreams();
renderIdentityQueue();
renderSupportTickets();
renderAwardCatalog();
renderPolls("#awardPolls", awardPolls);
renderPolls("#allStarPolls", allStarPolls);
renderHistory();
updateLoginGate();
updateConnectionCards();

if ("serviceWorker" in navigator && window.location.protocol.startsWith("http")) {
  navigator.serviceWorker.register("./service-worker.js").catch(() => {});
}
