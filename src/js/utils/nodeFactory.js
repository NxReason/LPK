const nodeFactory = function(type = 'div', params) {
  const node = document.createElement(type);

  appendClasses(node, params);
  appendAttrs(node, params);
  insertTextContent(node, params);

  return node;
}

function appendClasses(node, { classList }) {
  if (classList && classList.forEach) {
    classList.forEach(className => node.classList.add(className));
  }
}

function appendAttrs(node, { attrs }) {
  if (attrs) {
    const attrNames = Object.keys(attrs);
    attrNames.forEach(attrName => node.setAttribute(attrName, attrs[attrName]));
  }
}

function insertTextContent(node, { textContent = "" }) {
  node.textContent = textContent;
}

export default nodeFactory;
