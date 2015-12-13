export default function Element(name, attrs={}, children=[]) {
  const element = document.createElement(name);

  const keys = Object.keys(attrs);

  keys.forEach(key => {
    const attr = attrs[keys];
    element.setAttribute(key, attr);
  });

  children.forEach(child => {
    if(!(child instanceof HTMLElement)) {
      child = document.createTextNode(child);
    }

    element.appendChild(child);
  });

  // convenience method for adding events
  element.on = (name, callback) => {
    element.addEventListener(name, callback);
  };

  return element;
}

// Partial application shortcut
Element.partial = function partial(...args) {
  return function(...rest) {
    return Element(...args, ...rest);
  };
};

