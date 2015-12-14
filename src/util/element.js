export default function Element(name, attrs={}, children=[]) {
  const element = document.createElement(name);

  const keys = Object.keys(attrs);

  keys.forEach(key => {
    const attr = attrs[keys];
    element.setAttribute(key, attr);
  });

  if(!(children instanceof Array)) {
    children = [children];
  }

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

Element.createStyles = function createStyles(styles) {
  const ruleNames = Object.keys(styles);

  return function(element) {
    ruleNames.forEach(name => {
      element.style[name] = styles[name];
    });
  };
};

