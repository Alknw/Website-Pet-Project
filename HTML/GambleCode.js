const artifactSet = {
  CrimsonWitch: {
    setName: "Crimson Witch of Flames",
    setIcon: "Images/Artifact-Icons/CW set icon.webp",
  },
  Lavawalker: {
    setName: "Lavawalker",
    setIcon: "Images/Artifact-Icons/lavawalker icon.webp",
  },
};

function weightedRandomPick(options) {
  const totalWeight = options.reduce((sum, o) => sum + o.weight, 0);
  const rand = Math.random() * totalWeight;
  let runningSum = 0;
  for (const option of options) {
    runningSum += option.weight;
    if (rand < runningSum) {
      return option;
    }
  }
}

const minoraffixes = {
  "Flat HP": [209.13, 239.0, 268.88, 298.75],
  "Flat ATK": [13.62, 15.56, 17.51, 19.45],
  "Flat DEF": [16.2, 18.52, 20.83, 23.15],
  "HP%": [4.08, 4.66, 5.25, 5.83],
  "ATK%": [4.08, 4.66, 5.25, 5.83],
  "DEF%": [5.1, 5.83, 6.56, 7.29],
  "Energy Recharge%": [4.53, 5.18, 5.83, 6.48],
  "Elemental Mastery": [16.32, 18.65, 20.98, 23.31],
  "CRIT RATE%": [2.72, 3.11, 3.5, 3.89],
  "CRIT DMG%": [5.44, 6.22, 6.99, 7.77],
};

const weightedSubStats = [
  { stat: "Flat HP", weight: 6 },
  { stat: "Flat ATK", weight: 6 },
  { stat: "Flat DEF", weight: 6 },
  { stat: "HP%", weight: 4 },
  { stat: "ATK%", weight: 4 },
  { stat: "DEF%", weight: 4 },
  { stat: "Energy Recharge%", weight: 4 },
  { stat: "Elemental Mastery", weight: 4 },
  { stat: "CRIT RATE%", weight: 3 },
  { stat: "CRIT DMG%", weight: 3 },
];

const artifactTypes = {
  Flower: [{ mainStat: "Flat HP", weight: 1, value: 4780 }],
  Plume: [{ mainStat: "Flat ATK", weight: 1, value: 311 }],
  Sands: [
    { mainStat: "ATK%", weight: 0.2666, value: 46.6 },
    { mainStat: "DEF%", weight: 0.2666, value: 58.3 },
    { mainStat: "HP%", weight: 0.2668, value: 46.6 },
    { mainStat: "Energy Recharge%", weight: 0.1, value: 51.8 },
    { mainStat: "Elemental Mastery", weight: 0.1, value: 186.5 },
  ],
  Goblet: [
    { mainStat: "ATK%", weight: 0.1925, value: 46.6 },
    { mainStat: "DEF%", weight: 0.19, value: 58.3 },
    { mainStat: "HP%", weight: 0.1925, value: 46.6 },
    { mainStat: "Pyro DMG Bonus%", weight: 0.05, value: 46.6 },
    { mainStat: "Electro DMG Bonus%", weight: 0.05, value: 46.6 },
    { mainStat: "Cryo DMG Bonus%", weight: 0.05, value: 46.6 },
    { mainStat: "Hydro DMG Bonus%", weight: 0.05, value: 46.6 },
    { mainStat: "Dendro DMG Bonus%", weight: 0.05, value: 46.6 },
    { mainStat: "Anemo DMG Bonus%", weight: 0.05, value: 46.6 },
    { mainStat: "Geo DMG Bonus%", weight: 0.05, value: 46.6 },
    { mainStat: "Physical DMG Bonus%", weight: 0.05, value: 58.3 },
    { mainStat: "Elemental Mastery", weight: 0.025, value: 186.5 },
  ],
  Circlet: [
    { mainStat: "ATK%", weight: 0.22, value: 46.6 },
    { mainStat: "DEF%", weight: 0.22, value: 58.3 },
    { mainStat: "HP%", weight: 0.22, value: 46.6 },
    { mainStat: "CRIT RATE%", weight: 0.1, value: 31.1 },
    { mainStat: "CRIT DMG%", weight: 0.1, value: 62.2 },
    { mainStat: "Healing Bonus%", weight: 0.1, value: 35.9 },
    { mainStat: "Elemental Mastery", weight: 0.04, value: 186.5 },
  ],
};

function rollArtifact() {
  const setKeys = Object.keys(artifactSet);
  const randomKey = setKeys[Math.floor(Math.random() * setKeys.length)];
  const setPick = artifactSet[randomKey];

  const types = Object.keys(artifactTypes);
  const pickedType = types[Math.floor(Math.random() * types.length)];
  const mainStat = weightedRandomPick(artifactTypes[pickedType]);

  const nameMap = {
    Flower: {
      name: "Flower of Life",
      image: "Images/Artifact-Icons/Icon_Flower_of_Life.webp",
    },
    Plume: {
      name: "Plume of Death",
      image: "Images/Artifact-Icons/Icon_Plume_of_Death.webp",
    },
    Sands: {
      name: "Sands of Eon",
      image: "Images/Artifact-Icons/Icon_Sands_of_Eon.webp",
    },
    Goblet: {
      name: "Goblet of Eonothem",
      image: "Images/Artifact-Icons/Icon_Goblet_of_Eonothem.webp",
    },
    Circlet: {
      name: "Circlet of Logos",
      image: "Images/Artifact-Icons/Icon_Circlet_of_Logos.webp",
    },
  };

  const pool = weightedSubStats.filter((s) => s.stat !== mainStat.mainStat);
  const selectedMinorStats = [];

  while (selectedMinorStats.length < 4) {
    const pick = weightedRandomPick(pool);
    if (!selectedMinorStats.some((s) => s.stat === pick.stat)) {
      const roll = minoraffixes[pick.stat];
      selectedMinorStats.push({
        stat: pick.stat,
        value: roll[Math.floor(Math.random() * 4)],
      });
    }
  }

  const enhancementRolls = Math.random() <= 0.2 ? 5 : 4;
  for (let i = 0; i < enhancementRolls; i++) {
    const index = Math.floor(Math.random() * selectedMinorStats.length);
    const stat = selectedMinorStats[index].stat;
    const extra = minoraffixes[stat][Math.floor(Math.random() * 4)];
    selectedMinorStats[index].value += extra;
  }

  const formattedSubstats = selectedMinorStats.map((s) => ({
    stat: s.stat,
    value: Math.round(s.value * 100) / 100,
  }));

  const substatsHTML = formattedSubstats
    .map((s) => `${s.stat}: ${s.value}`)
    .join("<br>");

  document.getElementById("setName").textContent = setPick.setName;
  document.getElementById("setIcon").src = setPick.setIcon;
  document.getElementById(
    "mainStat"
  ).textContent = `${mainStat.mainStat}: ${mainStat.value}`;
  document.getElementById("artifactType").textContent =
    nameMap[pickedType].name;
  document.getElementById("typeIcon").src = nameMap[pickedType].image;

  const minorAffixesElement = document.getElementById("minorAffixes");
  minorAffixesElement.innerHTML = "";
  formattedSubstats.forEach((affix) => {
    const li = document.createElement("li");
    li.textContent = `${affix.stat}: ${affix.value}`;
    minorAffixesElement.appendChild(li);
  });
}
