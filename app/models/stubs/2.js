module.exports = {
  id: 2,
  name: 'Model 2',
  breakTime: 3000,
  steps: 100,
  initialState: 1,
  states: [
    // State 1
    {
      id: 1,
      name: 'State 1',
      img: 'img/s1.png',
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
            }
          ],
          nextState: 6,
          minTime: 0,
          maxTime: 20000
        },
        {
          inactive: true,
          nextState: 2
        }
      ]
    },
    // State 2
    {
      id: 2,
      name: 'State 2',
      img: 'img/s2.png',
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
          nextState: 7,
          minTime: 0,
          maxTime: 10000
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
      img: 'img/s3.png',
      params: {
        param1: 250,
        param2: 40,
        param3: -35
      },
      event: {
        id: 3,
        name: 'Event 3',
        description: 'Event 3 just happened'
      },
      actions: [
        {
          tools: [
            {
              id: 3,
              value: [50, 60]
            }
          ],
          nextState: 8,
          minTime: 0,
          maxTime: 10000
        },
        {
          inactive: true,
          nextState: 4
        }
      ]
    },
    // State 4
    {
      id: 4,
      name: 'State 4',
      img: 'img/s4.png',
      params: {
        param1: 100,
        param2: 32,
        param3: -30
      },
      event: {
        id: 4,
        name: 'Event 4',
        description: 'Event 4 just happened'
      },
      actions: [
        {
          tools: [
            {
              id: 4,
              value: true
            }
          ],
          nextState: 10,
          minTime: 0,
          maxTime: 5000
        },
        {
          inactive: true,
          nextState: 5
        }
      ],
    },
    // State 5
    {
      id: 5,
      name: 'State 5',
      img: 'img/s5.png',
      params: {
        param1: 100,
        param2: 32,
        param3: -30
      },
      last: true
    },
    // State 6
    {
      id: 6,
      name: 'State 6',
      img: 'img/s6.png',
      params: {
        param1: 100,
        param2: 32,
        param3: -30
      },
      event: {
        id: 6,
        name: 'Event 6',
        description: 'Event 6 just happened'
      },
      actions: [
        {
          tools: [
            {
              id: 5,
              value: [120, 140],
            }
          ],
          nextState: 1,
          minTime: 0,
          maxTime: 15000
        },
        {
          tools: [
            {
              id: 6,
              value: true
            }
          ],
          nextState: 7,
          minTime: 15001,
          maxTime: 25000
        },
        {
          inactive: true,
          nextState: 2
        }
      ]
    },
    // State 7
    {
      id: 7,
      name: 'State 7',
      img: 'img/s7.png',
      params: {
        param1: 100,
        param2: 32,
        param3: -30
      },
      event: {
        id: 7,
        name: 'Event 7',
        description: 'Event 7 just happened'
      },
      actions: [
        {
          tools: [
            {
              id: 7,
              value: [100, 150]
            }
          ],
          nextState: 1,
          minTime: 0,
          maxTime: 10000
        },
        {
          tools: [
            {
              id: 8,
              value: true
            }
          ],
          nextState: 6,
          minTime: 10001,
          maxTime: 15000
        },
        {
          tools: [
            {
              id: 9,
              value: [50, 100]
            }
          ],
          nextState: 9,
          minTime: 15001,
          maxTime: 25000
        },
        {
          tools: [
            {
              id: 10,
              value: true
            }
          ],
          nextState: 8,
          minTime: 250001,
          maxTime: 30000
        },
        {
          inactive: true,
          nextState: 3
        }
      ],
    },
    // State 8
    {
      id: 8,
      name: 'State 8',
      img: 'img/s8.png',
      params: {
        param1: 100,
        param2: 32,
        param3: -30
      },
      event: {
        id: 8,
        name: 'Event 8',
        description: 'Event 8 just happened'
      },
      actions: [
        {
          tools: [
            {
              id: 11,
              value: [20, 30]
            }
          ],
          nextState: 10,
          minTime: 0,
          maxTime: 10000
        },
        {
          inactive: true,
          nextState: 4
        }
      ],
    },
    // State 9
    {
      id: 9,
      name: 'State 9',
      img: 'img/s9.png',
      params: {
        param1: 100,
        param2: 32,
        param3: -30
      },
      event: {
        id: 9,
        name: 'Event 9',
        description: 'Event 9 just happened'
      },
      actions: [
        {
          tools: [
            {
              id: 12,
              value: [50, 80]
            }
          ],
          nextState: 6,
          minTime: 0,
          maxTime: 10000
        },
        {
          inactive: true,
          nextState: 8
        }
      ],
    },
    // State 10
    {
      id: 10,
      name: 'State 10',
      img: 'img/s10.png',
      params: {
        param1: 100,
        param2: 32,
        param3: -30
      },
      event: {
        id: 10,
        name: 'Event 10',
        description: 'Event 10 just happened'
      },
      actions: [
        {
          tools: [
            {
              id: 13,
              value: true
            }
          ],
          nextState: 9,
          minTime: 0,
          maxTime: 5000
        },
        {
          inactive: true,
          nextState: 5
        }
      ],
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
    },
    // Tool 3
    {
      id: 3,
      name: 'Tool 3',
      type: 'range',
      min: 0,
      max: 200,
    },
    // Tool 4
    {
      id: 4,
      name: 'Tool 4',
      type: 'switch'
    },
    // Tool 5
    {
      id: 5,
      name: 'Tool 5',
      type: 'range',
      min: 0,
      max: 200,
    },
    // Tool 6
    {
      id: 6,
      name: 'Tool 6',
      type: 'switch'
    },
    // Tool 7
    {
      id: 7,
      name: 'Tool 7',
      type: 'range',
      min: 0,
      max: 200,
    },
    // Tool 8
    {
      id: 8,
      name: 'Tool 8',
      type: 'switch'
    },
    // Tool 9
    {
      id: 9,
      name: 'Tool 9',
      type: 'range',
      min: 0,
      max: 200,
    },
    // Tool 10
    {
      id: 10,
      name: 'Tool 10',
      type: 'switch'
    },
    // Tool 11
    {
      id: 11,
      name: 'Tool 11',
      type: 'range',
      min: 0,
      max: 200,
    },
    // Tool 12
    {
      id: 12,
      name: 'Tool 12',
      type: 'range',
      min: 0,
      max: 200,
    },
    // Tool 13
    {
      id: 13,
      name: 'Tool 13',
      type: 'switch'
    }
  ]
};
