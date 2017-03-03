'use strict';

const Model = {};
Model.findAll = function() {
  return new Promise((resolve, reject) => {
    // access database and get all model's id and name
    // resolve with array of this models
    resolve([
      { id: 1, name: 'Model name 1' },
      { id: 2, name: 'Model name 2' }
    ]);
  });
}
Model.findById = function(id) {
  // access database and get model with given id
  return new Promise((resolve, reject) => {
    // stub to get model from hardcoded file
    try {
      const model = require(`./${id}`);
      resolve(model);
    } catch(e) {
      reject(e);
    }
  });
}

module.exports = Model;
