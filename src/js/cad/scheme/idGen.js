function generateId(initialValue = 1) {
  let id = initialValue;

  return function generate() {
    return id++;
  };
}

export default generateId;
