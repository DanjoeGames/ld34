export default function Container(specFn) {
  const container = {};

  const spec = specFn();

  container.create = spec.create;

  container.update = function(state) {
    spec.update(state);
  };

  return container;
}

