const ACHIEVEMENTS = 'ZOMBRIDGE_ACHIEVEMENTS';

export default function Achievements() {

  function load() {
    const achievements = localStorage.getItem(ACHIEVEMENTS) || '{}';
    return JSON.parse(achievements);
  }

  function save(achievements) {
    const json = JSON.stringify(achievements);
    localStorage.setItem(ACHIEVEMENTS, json);
  }

  const achievements = load();

  return {
    update(statistics) {
      Object.keys(statistics).forEach(statName => {
        if(!(statName in achievements)) {
          achievements[statName] = statistics[statName];
          return;
        }

        const stat = statistics[statName];

        Object.keys(stat).forEach(record => {
          achievements[statName] = (achievements[statName] || 0) + stat[record];
        });
      });
    },
    get() {
      return achievements;
    }
  };
}
