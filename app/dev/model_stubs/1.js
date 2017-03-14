module.exports = {
  id: 1,
  name: 'Model 1',
  breakTime: 3000,
  steps: 15,
  initialState: 1,
  states: [
    // State 1
    {
      id: 1,
      name: 'State 1',
      img: 'img/state1.png',
      params: {
        param1: 152,
        param2: 16,
        param3: -40
      },
      event: {
        id: 1,
        name: 'Event 1',
        description: 'Event 1 just happened'
      },
      actions: [
        {
          tools: [
            {
              id: 1,
              value: [80, 100]
            },
            {
              id: 2,
              value: false
            }
          ],
          nextState: 2,
          minTime: 0,
          maxTime: 10000
        },
        {
          inactive: true,
          nextState: 3
        }
      ]
    },
    // State 2
    {
      id: 2,
      name: 'State 2',
      img: 'img/state2.png',
      params: {
        param1: 100,
        param2: 32,
        param3: -30
      },
      event: {
        id: 2,
        name: 'Event 2',
        description: 'Event 2 just happened'
      },
      actions: [
        {
          tools: [
            {
              id: 2,
              value: true
            }
          ],
          nextState: 1,
          minTime: 0,
          maxTime: 5000
        },
        {
          inactive: true,
          nextState: 3
        }
      ]
    },
    // State 3
    {
      id: 3,
      name: 'State 3',
      img: 'img/state3.png',
      params: {
        param1: 250,
        param2: 40,
        param3: -35
      },
      last: true
    }
  ],

  tools: [
    // Tool 1
    {
      id: 1,
      name: 'Tool 1',
      type: 'range',
      min: 0,
      max: 200,
    },

    // Tool 2
    {
      id: 2,
      name: 'Tool 2',
      type: 'switch'
    }
  ]
};
