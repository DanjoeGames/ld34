export default function Statistic() {
  const stat = new Map();

  return {
    value: () => stat,
    inc: (key) => {
      const count = stat.get(key) || 0;
      stat.set(key, count + 1);
    },
    record: (key, val) => {
      stat.set(key, val);
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

