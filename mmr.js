(() => {
  const tierBands = [
    { name: "Prospect", min: 0, max: 799 },
    { name: "Role Player", min: 800, max: 949 },
    { name: "Rotation Player", min: 950, max: 1099 },
    { name: "Starter", min: 1100, max: 1249 },
    { name: "All-Star", min: 1250, max: 1399 },
    { name: "Superstar", min: 1400, max: 1599 },
    { name: "Franchise Player", min: 1600, max: 1799 },
    { name: "Legend", min: 1800, max: Infinity },
  ];

  const roleWeights = {
    PG: [
      ["teamOffEff", 0.3],
      ["scoringEff", 0.2],
      ["assistTurnover", 0.2],
      ["pointsCreated", 0.1],
      ["decisionMaking", 0.1],
      ["defenseVsMatchup", 0.1],
    ],
    SG: [
      ["scoringEff", 0.3],
      ["secondaryScoring", 0.15],
      ["lowTurnovers", 0.15],
      ["defenseVsMatchup", 0.2],
      ["forcedTurnovers", 0.1],
      ["teamOffEff", 0.1],
    ],
    SF: [
      ["opposingPgSuppression", 0.35],
      ["disruptPgCenter", 0.2],
      ["forcedTurnovers", 0.15],
      ["offensiveContribution", 0.15],
      ["lowMistakes", 0.1],
      ["teamDefResult", 0.05],
    ],
    PF: [
      ["opposingCenterSuppression", 0.35],
      ["helpDefenseVsPg", 0.2],
      ["defensiveStops", 0.15],
      ["rebounding", 0.1],
      ["offensiveContribution", 0.1],
      ["lowMistakes", 0.1],
    ],
    C: [
      ["teamOffEff", 0.2],
      ["scoringEff", 0.15],
      ["rebounding", 0.2],
      ["assistTurnover", 0.15],
      ["screenImpact", 0.1],
      ["defensiveStops", 0.1],
      ["defenseVsMatchup", 0.1],
    ],
  };

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function getTier(mmr = 1000) {
    return tierBands.find((band) => mmr >= band.min && mmr <= band.max)?.name || "Prospect";
  }

  function getKFactor(player) {
    if ((player.mmr || 1000) >= 1600) return 12;
    if ((player.gamesPlayed || 0) < 10) return 40;
    if ((player.gamesPlayed || 0) < 50) return 25;
    return 15;
  }

  function getRoleGradeBonus(grade = 70) {
    if (grade >= 90) return 8;
    if (grade >= 80) return 6;
    if (grade >= 70) return 4;
    if (grade >= 60) return 2;
    if (grade >= 50) return 0;
    if (grade >= 40) return -2;
    if (grade >= 30) return -4;
    if (grade >= 20) return -6;
    return -8;
  }

  function pct(made = 0, attempted = 0) {
    return attempted > 0 ? clamp((made / attempted) * 100, 0, 100) : 50;
  }

  function statScore(playerStats = {}) {
    const scoringEff = pct(playerStats.fgm, playerStats.fga) * 0.7 + pct(playerStats.threePm, playerStats.threePa) * 0.3;
    const assistTurnover = clamp(((playerStats.assists || 0) / Math.max(1, playerStats.turnovers || 0)) * 18, 0, 100);
    const lowTurnovers = clamp(100 - (playerStats.turnovers || 0) * 14, 0, 100);
    const lowMistakes = clamp(100 - ((playerStats.turnovers || 0) * 10 + (playerStats.fouls || 0) * 7), 0, 100);
    const forcedTurnovers = clamp(((playerStats.steals || 0) * 18 + (playerStats.blocks || 0) * 10), 0, 100);
    const offensiveContribution = clamp((playerStats.points || 0) * 2 + (playerStats.assists || 0) * 5, 0, 100);
    const defensiveStops = clamp((playerStats.steals || 0) * 16 + (playerStats.blocks || 0) * 14 + (playerStats.rebounds || 0) * 2, 0, 100);

    return {
      teamOffEff: playerStats.teamOffEff ?? 70,
      scoringEff,
      assistTurnover,
      pointsCreated: clamp((playerStats.points || 0) + (playerStats.assists || 0) * 2.5, 0, 100),
      decisionMaking: lowMistakes,
      defenseVsMatchup: playerStats.defenseVsMatchup ?? defensiveStops,
      secondaryScoring: clamp((playerStats.points || 0) * 2.2, 0, 100),
      lowTurnovers,
      forcedTurnovers,
      opposingPgSuppression: playerStats.opposingPgSuppression ?? defensiveStops,
      disruptPgCenter: playerStats.disruptPgCenter ?? defensiveStops,
      offensiveContribution,
      lowMistakes,
      teamDefResult: playerStats.teamDefResult ?? 70,
      opposingCenterSuppression: playerStats.opposingCenterSuppression ?? defensiveStops,
      helpDefenseVsPg: playerStats.helpDefenseVsPg ?? defensiveStops,
      defensiveStops,
      rebounding: clamp((playerStats.rebounds || 0) * 8, 0, 100),
      screenImpact: playerStats.screenImpact ?? 70,
    };
  }

  function calculatePositionGrade(position, playerStats = {}) {
    const weights = roleWeights[position] || roleWeights.SG;
    const scores = statScore(playerStats);
    return Math.round(weights.reduce((total, [key, weight]) => total + (scores[key] || 0) * weight, 0));
  }

  function calculateDraftGrade(player) {
    const mmrScore = clamp(((player.mmr || 1000) / 1800) * 100, 0, 100);
    const roleGradeAverage = player.roleGradeAverage ?? 70;
    const reliability = player.reliability ?? 100;
    const recentForm = player.recentFormScore ?? 70;
    const score = mmrScore * 0.5 + roleGradeAverage * 0.2 + reliability * 0.2 + recentForm * 0.1;
    if (score >= 92) return "A+";
    if (score >= 86) return "A";
    if (score >= 80) return "A-";
    if (score >= 74) return "B+";
    if (score >= 68) return "B";
    if (score >= 62) return "B-";
    if (score >= 52) return "C";
    return "D";
  }

  function applyReliability(player, event = "on-time", severity = 0) {
    if (event === "cheating") {
      player.reliability = 0;
      player.banned = true;
      return player;
    }

    const deltas = {
      "on-time": 1,
      late: -2,
      "no-show": -8,
      quit: -12,
      toxic: -clamp(severity || 10, 5, 25),
    };
    player.reliability = clamp((player.reliability ?? 100) + (deltas[event] ?? 0), 0, 100);
    return player;
  }

  function updatePlayerMmr(player, context) {
    const playerTeamAvgMmr = context.playerTeamAvgMmr || 1000;
    const opponentTeamAvgMmr = context.opponentTeamAvgMmr || 1000;
    // Expected-win Elo style formula. This block can move to the backend unchanged.
    const expectedWin = 1 / (1 + 10 ** ((opponentTeamAvgMmr - playerTeamAvgMmr) / 400));
    const actualResult = context.won ? 1 : 0;
    const teamResultChange = Math.round(getKFactor(player) * (actualResult - expectedWin));
    const roleGrade = context.roleGrade ?? calculatePositionGrade(player.position, context.stats);
    const roleGradeBonus = getRoleGradeBonus(roleGrade);
    const behaviorPenalty = context.behaviorPenalty || 0;
    const finalMmrChange = clamp(teamResultChange + roleGradeBonus - behaviorPenalty, -50, 50);

    player.mmr = Math.max(0, (player.mmr || 1000) + finalMmrChange);
    player.tier = getTier(player.mmr);
    player.gamesPlayed = (player.gamesPlayed || 0) + 1;
    player.wins = (player.wins || 0) + (context.won ? 1 : 0);
    player.losses = (player.losses || 0) + (context.won ? 0 : 1);
    player.roleGradeAverage = Math.round((((player.roleGradeAverage || roleGrade) * Math.max(0, player.gamesPlayed - 1)) + roleGrade) / player.gamesPlayed);
    player.recentForm = [context.won ? "W" : "L", ...(player.recentForm || []).slice(0, 4)];
    player.recentFormScore = clamp(60 + player.recentForm.filter((item) => item === "W").length * 8 - player.recentForm.filter((item) => item === "L").length * 5, 0, 100);
    player.draftGrade = calculateDraftGrade(player);
    player.ratingHistory = [
      ...(player.ratingHistory || []),
      {
        at: new Date().toISOString(),
        change: finalMmrChange,
        mmr: player.mmr,
        roleGrade,
        expectedWin: Number(expectedWin.toFixed(3)),
      },
    ].slice(-20);
    return player;
  }

  function createDemoRankedPlayers(sourcePlayers = [], teams = []) {
    const teamIds = teams.map((team) => team.name);
    const seed = sourcePlayers.length ? sourcePlayers : [];
    const demoNames = [
      ["LockTae", "LT", "SG", "Shockers"],
      ["ShotKev", "SK", "SF", "Shockers"],
      ["BoardMan", "BM", "PF", "Shockers"],
      ["PaintRue", "PR", "C", "Shockers"],
      ["Nova Miles", "NM", "SG", "Sharks"],
      ["Ace Bishop", "AB", "PG", "Rage"],
      ["Reef Carter", "RC", "C", "Wave"],
      ["Saint Cole", "SC", "PF", "Kings"],
    ];
    const merged = [
      ...seed.map((player, index) => ({
        id: player.id || `player-${index}-${player.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
        name: player.name,
        gamertag: player.tag || player.twitch || player.name,
        position: player.position || "SG",
        teamId: player.team || teamIds[index % teamIds.length] || "Free Agent",
        mmr: 1000 + Math.round((player.ppg || 12) * 14 + (player.apg || 3) * 6 + (player.rpg || 4) * 3),
        gamesPlayed: 8 + index * 3,
        wins: Number((player.record || "0-0").split("-")[0]) || Math.max(1, 5 - index),
        losses: Number((player.record || "0-0").split("-")[1]) || Math.max(1, index),
        reliability: player.trustScore || 100,
        recentForm: index % 2 ? ["W", "L", "W", "W", "L"] : ["W", "W", "W", "L", "W"],
        ratingHistory: [],
      })),
      ...demoNames.map(([name, tag, position, team], index) => ({
        id: `demo-${name.toLowerCase()}`,
        name,
        gamertag: tag,
        position,
        teamId: team,
        mmr: 960 + index * 42,
        gamesPlayed: 6 + index,
        wins: 4 + (index % 4),
        losses: 2 + (index % 3),
        reliability: 88 + (index % 10),
        recentForm: ["W", "L", "W", "W", "L"],
        ratingHistory: [],
      })),
    ];

    return merged.map((player) => ({
      ...player,
      tier: getTier(player.mmr),
      draftGrade: calculateDraftGrade(player),
      recentFormScore: player.recentFormScore || 74,
    }));
  }

  window.MCPA_MMR = {
    tierBands,
    getTier,
    getKFactor,
    getRoleGradeBonus,
    calculatePositionGrade,
    calculateDraftGrade,
    applyReliability,
    updatePlayerMmr,
    createDemoRankedPlayers,
    clamp,
  };
})();
