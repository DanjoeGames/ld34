export default {
  or(alternative) {
    return () => {
      Math.random() > .5 ? this : alternative;
    };
  },
  oneOf(...types) {
    return function() {
      const type = types[Math.floor(Math.random() * types.length)];
      return type.apply(null, arguments);
    };
  }
}

