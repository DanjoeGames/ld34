const MAX_MULTIPLIER = 16;

export default function Multiplier() {
  let multiplier = 1;

  return {
    multiplier: () => multiplier,
    apply: function(factor, time) {
      if(multiplier < MAX_MULTIPLIER) {
        multiplier *= factor;
        setTimeout(() => multiplier /= factor, time);
      }
    }
  }
}

