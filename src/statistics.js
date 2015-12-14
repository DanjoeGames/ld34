export default function Statistic() {
  const stat = {};

  return {
    value: () => stat,
    inc: (key) => {
      const count = stat[key] || 0;
      stat[key] = count + 1;
    },
    record: (key, val) => {
      stat[key] = val;
    }
  };
}

export default function Statistics() {
  return {
    saved: Statistic(),
    died: Statistic(),
    items: Statistic()
  };
}

