const tabs = document.querySelectorAll("[data-tab]");
const screens = document.querySelectorAll(".screen");
const shortcutButtons = document.querySelectorAll("[data-tab-target]");
const toast = document.querySelector("#toast");
const teamLogos = {
  "North City Elite": { text: "NC", color: "lime", image: "" },
  "Hillwood Hoopers": { text: "HW", color: "teal", image: "" },
  "Rim Breakers": { text: "RB", color: "orange", image: "" },
  "Southside Splash": { text: "SS", color: "red", image: "" },
  "West End Warriors": { text: "WE", color: "lime", image: "" },
  "Park Kings": { text: "PK", color: "teal", image: "" },
  Midtown: { text: "MT", color: "orange", image: "" },
  "Court Vision": { text: "CV", color: "red", image: "" },
  "Downtown Dynasty": { text: "DD", color: "lime", image: "" },
  "Uptown United": { text: "UU", color: "teal", image: "" },
};

const players = [
  {
    name: "DreLock",
    tag: "DreLock#204",
    team: "North City Elite",
    position: "PG",
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
    streamTitle: "MCPA Week 4 - North City ranked run",
  },
  {
    name: "JCity",
    tag: "JCityLive",
    team: "Hillwood Hoopers",
    position: "SG",
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
    streamTitle: "Hillwood Hoopers pregame lobby",
  },
  {
    name: "MaskOn",
    tag: "MaskOnPF",
    team: "Rim Breakers",
    position: "C",
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
    team: "Southside Splash",
    position: "SF",
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
    streamTitle: "Clutch guard lab - Southside scrims",
  },
  {
    name: "KashFive",
    tag: "KashFive",
    team: "West End Warriors",
    position: "PF",
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
      { name: "DreLock", team: "North City Elite", stat: "28.4 PPG · 9.1 APG", votes: 42 },
      { name: "JCity", team: "Hillwood Hoopers", stat: "23.7 PPG · 11.4 APG", votes: 31 },
      { name: "MaskOn", team: "Rim Breakers", stat: "13.2 RPG · 67 FG%", votes: 18 },
    ],
  },
  {
    id: "dpoy",
    title: "Defensive Player of the Year",
    close: "Poll closes Week 8, Sunday 9:00 PM",
    voters: "Players and approved staff",
    options: [
      { name: "MaskOn", team: "Rim Breakers", stat: "2.8 STL · 2.1 BLK", votes: 39 },
      { name: "SplashMia", team: "Southside Splash", stat: "Perimeter lock · 5.2 RPG", votes: 28 },
      { name: "DreLock", team: "North City Elite", stat: "1.9 STL · +142 diff", votes: 17 },
    ],
  },
  {
    id: "mip",
    title: "Most Improved Player",
    close: "Poll closes Week 8, Sunday 9:00 PM",
    voters: "Players, owners, and approved staff",
    options: [
      { name: "KashFive", team: "West End Warriors", stat: "+8.2 PPG from last season", votes: 35 },
      { name: "SplashMia", team: "Southside Splash", stat: "+4.4 PPG · better splits", votes: 26 },
      { name: "JCity", team: "Hillwood Hoopers", stat: "+3.1 APG", votes: 19 },
    ],
  },
  {
    id: "clutch",
    title: "Clutch Player of the Year",
    close: "Poll closes Week 8, Sunday 9:00 PM",
    voters: "Players and approved staff",
    options: [
      { name: "SplashMia", team: "Southside Splash", stat: "4 game-winners", votes: 33 },
      { name: "DreLock", team: "North City Elite", stat: "61% clutch FG", votes: 29 },
      { name: "JCity", team: "Hillwood Hoopers", stat: "11 late assists", votes: 21 },
    ],
  },
  {
    id: "teammate",
    title: "Teammate of the Year",
    close: "Poll closes Week 8, Sunday 9:00 PM",
    voters: "Players only",
    options: [
      { name: "JCity", team: "Hillwood Hoopers", stat: "Captain · lineup organizer", votes: 38 },
      { name: "MaskOn", team: "Rim Breakers", stat: "Role-first big", votes: 24 },
      { name: "KashFive", team: "West End Warriors", stat: "Free agent mentor", votes: 16 },
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
      { name: "DreLock", team: "North City Elite", stat: "28.4 PPG", votes: 58 },
      { name: "JCity", team: "Hillwood Hoopers", stat: "11.4 APG", votes: 45 },
      { name: "SplashMia", team: "Southside Splash", stat: "52 FG%", votes: 26 },
    ],
  },
  {
    id: "allstar-frontcourt",
    title: "All-Star Frontcourt",
    close: "All-Star voting closes Friday 8:00 PM",
    voters: "One frontcourt vote per user",
    options: [
      { name: "MaskOn", team: "Rim Breakers", stat: "18.9 PPG · 13.2 RPG", votes: 53 },
      { name: "KashFive", team: "West End Warriors", stat: "21.5 PPG", votes: 34 },
      { name: "DreLock", team: "North City Elite", stat: "Guard/wing eligible", votes: 22 },
    ],
  },
  {
    id: "allstar-captain",
    title: "All-Star Captain",
    close: "All-Star voting closes Friday 8:00 PM",
    voters: "Top overall vote-getter becomes captain",
    options: [
      { name: "DreLock", team: "North City Elite", stat: "League-best record", votes: 61 },
      { name: "MaskOn", team: "Rim Breakers", stat: "Defensive anchor", votes: 37 },
      { name: "JCity", team: "Hillwood Hoopers", stat: "Floor general", votes: 32 },
    ],
  },
];

const historyRecords = [
  { type: "champion", season: "2025 Summer", title: "League Champion", winner: "North City Elite", detail: "Finals MVP: DreLock" },
  { type: "award", season: "2025 Summer", title: "Most Valuable Player", winner: "DreLock", detail: "28.4 PPG, 9.1 APG" },
  { type: "award", season: "2025 Summer", title: "Defensive Player of the Year", winner: "MaskOn", detail: "2.8 STL, 2.1 BLK" },
  { type: "award", season: "2025 Summer", title: "Clutch Player of the Year", winner: "SplashMia", detail: "4 game-winners" },
  { type: "award", season: "2025 Summer", title: "Teammate of the Year", winner: "JCity", detail: "Captain vote winner" },
  { type: "tournament", season: "2025 Summer", title: "Midnight Madness Champion", winner: "Rim Breakers", detail: "Tournament MVP: MaskOn" },
  { type: "tournament", season: "2025 Spring", title: "Weekend Rec Classic Champion", winner: "Hillwood Hoopers", detail: "Tournament MVP: JCity" },
  { type: "champion", season: "2024 Winter", title: "League Champion", winner: "Southside Splash", detail: "Finals MVP: SplashMia" },
  { type: "award", season: "2024 Winter", title: "Most Improved Player", winner: "KashFive", detail: "+7.8 PPG" },
];

const scheduledGames = [
  {
    id: "g42",
    home: "North City Elite",
    away: "Rim Breakers",
    time: "Tonight · 8:30 PM",
    court: "Pro-Am Court 2",
    status: "Published",
    checkIn: "Open at 7:45 PM",
    statSubmitter: "Winning captain",
    tags: ["all", "today", "week"],
  },
  {
    id: "g43",
    home: "Hillwood Hoopers",
    away: "Southside Splash",
    time: "Tonight · 9:15 PM",
    court: "Rec Center A",
    status: "Live stats",
    checkIn: "Open now",
    statSubmitter: "Both captains",
    tags: ["all", "today", "week"],
  },
  {
    id: "g44",
    home: "West End Warriors",
    away: "Park Kings",
    time: "Tomorrow · 7:00 PM",
    court: "Rec Center B",
    status: "Court pending",
    checkIn: "Opens 45 min before tip",
    statSubmitter: "Assigned staff",
    tags: ["all", "week"],
  },
  {
    id: "g45",
    home: "North City Elite",
    away: "Hillwood Hoopers",
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
  { team: "North City Elite", division: "metro", w: 8, l: 1, home: "4-0", away: "4-1", last10: "8-1", streak: "W4", pf: 84.8, pa: 69.0 },
  { team: "Hillwood Hoopers", division: "metro", w: 7, l: 2, home: "4-1", away: "3-1", last10: "7-2", streak: "W4", pf: 81.2, pa: 72.4 },
  { team: "Rim Breakers", division: "coastal", w: 6, l: 3, home: "3-1", away: "3-2", last10: "6-3", streak: "W1", pf: 88.2, pa: 80.1 },
  { team: "Southside Splash", division: "coastal", w: 5, l: 4, home: "3-2", away: "2-2", last10: "5-4", streak: "L1", pf: 79.5, pa: 77.7 },
  { team: "West End Warriors", division: "metro", w: 4, l: 5, home: "3-2", away: "1-3", last10: "4-5", streak: "W1", pf: 76.8, pa: 78.9 },
  { team: "Park Kings", division: "coastal", w: 4, l: 5, home: "2-2", away: "2-3", last10: "4-5", streak: "L2", pf: 74.4, pa: 76.2 },
  { team: "Midtown", division: "metro", w: 3, l: 6, home: "2-3", away: "1-3", last10: "3-6", streak: "L1", pf: 72.1, pa: 79.6 },
  { team: "Court Vision", division: "coastal", w: 3, l: 6, home: "1-3", away: "2-3", last10: "3-6", streak: "W1", pf: 70.8, pa: 78.0 },
  { team: "Downtown Dynasty", division: "metro", w: 2, l: 7, home: "1-4", away: "1-3", last10: "2-7", streak: "L3", pf: 68.2, pa: 81.3 },
  { team: "Uptown United", division: "coastal", w: 1, l: 8, home: "1-4", away: "0-4", last10: "1-8", streak: "L5", pf: 66.7, pa: 83.9 },
];

const bracketSets = [
  [
    ["1", "North City Elite", "Bye"],
    ["8", "Southside Splash", "vs West End"],
    ["4", "Rim Breakers", "vs Park Kings"],
    ["5", "Hillwood Hoopers", "vs Midtown"],
  ],
  [
    ["1", "Hillwood Hoopers", "Bye"],
    ["8", "Midtown", "vs Park Kings"],
    ["4", "North City Elite", "vs Southside"],
    ["5", "Rim Breakers", "vs West End"],
  ],
  [
    ["1", "Rim Breakers", "Bye"],
    ["8", "North City Elite", "vs Midtown"],
    ["4", "Southside Splash", "vs Park Kings"],
    ["5", "Hillwood Hoopers", "vs West End"],
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

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => {
    const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
    return entities[char];
  });
}

function setTab(tabName) {
  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.id === `screen-${tabName}`);
  });

  tabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.tab === tabName);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
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

  target.innerHTML = filtered
    .map((team) => {
      const logo = teamLogos[team.team] || { text: team.team.slice(0, 2).toUpperCase(), color: "lime" };
      const diff = (team.pf - team.pa).toFixed(1);
      const gamesBack = ((leaderWins - team.w + team.l - leaderLosses) / 2).toFixed(1);
      const gb = team.seed === 1 ? "-" : gamesBack.replace(".0", "");
      const seedClass = team.seed <= 6 ? "clinched" : team.seed <= 8 ? "bubble" : "outside";

      return `
        <tr class="${seedClass}">
          <td><span class="seed-number">${team.seed}</span></td>
          <td>
            <div class="standings-team">
              <span class="team-mark ${logo.color}">${logo.text}</span>
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
      const logo = teamLogos[player.team] || { text: player.team.slice(0, 2).toUpperCase(), color: player.color };
      const value = Number(player[activeLeaderStat]).toFixed(config.precision);
      return `
        <button class="leader-card" type="button" data-leader-player="${player.name}">
          <span class="leader-rank">${index + 1}</span>
          <span class="team-mark ${logo.color}">${logo.text}</span>
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

tabs.forEach((tab) => {
  tab.addEventListener("click", () => setTab(tab.dataset.tab));
});

shortcutButtons.forEach((button) => {
  button.addEventListener("click", () => setTab(button.dataset.tabTarget));
});

document.querySelector(".close-modal").addEventListener("click", () => {
  document.querySelector("#playerModal").close();
});

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
  showToast("Discord connection ready. Roles can sync to team chats and voice rooms.");
});

document.querySelector("#connectTwitch").addEventListener("click", () => {
  showToast("Twitch connection ready. Live stream status can show on player cards.");
});

document.querySelector("#refreshStreams").addEventListener("click", () => {
  renderLiveStreams();
  showToast("Stream list refreshed from connected Twitch accounts.");
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
    teamLogos["North City Elite"].image = src;
    const logo = document.querySelector("#northCityLogo");
    logo.style.backgroundImage = `url("${src}")`;
    logo.textContent = "";
    renderPlayers();
    showToast("North City logo updated. Hover player team names to see it.");
  });
});

document.querySelector("#grantStaffRole").addEventListener("click", () => {
  showToast("Staff role granted. Admin access is limited to approved staff accounts.");
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
renderBracket();
renderTeamStandings();
renderScheduledGames();
renderLiveStreams();
renderAwardCatalog();
renderPolls("#awardPolls", awardPolls);
renderPolls("#allStarPolls", allStarPolls);
renderHistory();

if ("serviceWorker" in navigator && window.location.protocol.startsWith("http")) {
  navigator.serviceWorker.register("./service-worker.js").catch(() => {});
}
