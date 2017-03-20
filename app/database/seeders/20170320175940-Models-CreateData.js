'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    const statesRaw = [
      {
        id: 1,
        name: 'State 1',
        img: 'img/state1.png',
        modelId: 1
      },
      {
        id: 2,
        name: 'State 2',
        img: 'img/state2.png',
        modelId: 1
      },
      {
        id: 3,
        name: 'State 3',
        img: 'img/state3.png',
        modelId: 1
      }
    ];

    const toolsRaw = [
      {
        id: 1,
        name: 'Tool 1',
        type: 'range',
        min: 0,
        max: 200,
        modelId: 1
      },
      {
        id: 2,
        name: 'Tool 2',
        type: 'switch',
        modelId: 1
      }
    ];

    const modelsRaw = [
      {
        id: 1,
        name: 'Model 1',
        breakTime: 3000,
        steps: 15,
        initialState: 1,
        developerId: 1
      }
    ];

    const now = new Date();
    const tools = addDate(toolsRaw, now);
    const states = addDate(statesRaw, now);
    const models = addDate(modelsRaw, now);

    return queryInterface.bulkInsert('Models', models)
      .then(() => queryInterface.bulkInsert('States', states))
      .then(() => queryInterface.bulkInsert('Tools', tools));
  },

  down: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.bulkDelete('Models', null, {}),
      queryInterface.bulkDelete('States', null, {}),
      queryInterface.bulkDelete('Tools', null, {})
    ]);
  }
};

function addDate(arr, date) {
  return arr.map(el => {
    el.createdAt = date;
    el.updatedAt = date;
    return el;
  });
}
