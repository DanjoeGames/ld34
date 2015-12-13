// All entities should inherit from this object
export default {
  // this should be moved to a separate util function.
  oneOf(...types) {
    return function() {
      const type = types[Math.floor(Math.random() * types.length)];
      return type.apply(null, arguments);
    };
  }
}

