'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    const actions = [
      {
        id: 1,
        nextState: 2,
        minTime: 0,
        maxTime: 10000,
        inactive: false,
        stateId: 1
      },
      {
        id: 2,
        nextState: 3,
        minTime: null,
        maxTime: null,
        inactive: true,
        stateId: 1
      },

      {
        id: 3,
        nextState: 1,
        minTime: 0,
        maxTime: 5000,
        inactive: false,
        stateId: 2
      },
      {
        id: 4,
        nextState: 3,
        minTime: null,
        maxTime: null,
        inactive: true,
        stateId: 2
      },
    ]
    const parameters = [
      {
        name: 'param1',
        value: 152,
        stateId: 1
      },
      {
        name: 'param2',
        value: 42,
        stateId: 1
      },
      {
        name: 'param3',
        value: -16,
        stateId: 1
      },

      {
        name: 'param1',
        value: 125,
        stateId: 2
      },
      {
        name: 'param2',
        value: 56,
        stateId: 2
      },
      {
        name: 'param3',
        value: 15,
        stateId: 2
      },

      {
        name: 'param1',
        value: 56,
        stateId: 3
      },
      {
        name: 'param2',
        value: 66,
        stateId: 3
      },
      {
        name: 'param3',
        value: 25,
        stateId: 3
      },
    ]
    const events = [
      {
        id: 1,
        name: 'Event 1',
        description: 'Event 1 just happened',
        stateId: 1,
      },
      {
        id: 2,
        name: 'Event 2',
        description: 'Event 2 just happened',
        stateId: 2
      }
    ]
    const states = [
      {
        id: 1,
        name: 'State 1',
        img: 'img/state1.png',
        last: false,
        modelId: 1
      },
      {
        id: 2,
        name: 'State 2',
        img: 'img/state2.png',
        last: false,
        modelId: 1
      },
      {
        id: 3,
        name: 'State 3',
        img: 'img/state3.png',
        last: true,
        modelId: 1
      }
    ];
    const tools = [
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
    const actionTools = [
      {
        actionId: 1,
        toolId: 1,
        minValue: 80,
        maxValue: 100,
        boolValue: null
      },
      {
        actionId: 1,
        toolId: 2,
        minValue: null,
        maxValue: null,
        boolValue: false
      },
      {
        actionId: 3,
        toolId: 2,
        minValue: null,
        maxValue: null,
        boolValue: true
      }
    ]
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
    const models = addDate(modelsRaw, now);

    return queryInterface.bulkInsert('Models', models)
      .then(() => queryInterface.bulkInsert('States', states))
      .then(() => queryInterface.bulkInsert('Events', events))
      .then(() => queryInterface.bulkInsert('Parameters', parameters))
      .then(() => queryInterface.bulkInsert('Actions', actions))
      .then(() => queryInterface.bulkInsert('Tools', tools))
      .then(() => queryInterface.bulkInsert('ActionTools', actionTools));
  },

  down: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.bulkDelete('Models', null, {}),
      queryInterface.bulkDelete('States', null, {}),
      queryInterface.bulkDelete('Tools', null, {}),
      queryInterface.bulkDelete('Events', null, {}),
      queryInterface.bulkDelete('Parameters', null, {}),
      queryInterface.bulkDelete('Actions', null, {}),
      queryInterface.bulkDelete('ActionTools', null, {})
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
