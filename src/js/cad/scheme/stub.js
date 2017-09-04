const stub = {
  name: 'stub model name',
  initialState: 'cfce3eb6-d06a-429f-b6a0-0f3b045c01a2',
  breakTime: 5,
  steps: 10,
  actions: {
    '586b80a9-f080-4ef5-a72f-d3922f076f72': {
      id: '586b80a9-f080-4ef5-a72f-d3922f076f72',
      nextState: '68319a78-f2a8-4ad7-ac37-f988fbefd2c5',
      time: { min: 0, max: 10 },
      tools: {
        '4ffbe19d-0db0-499f-bd5a-3b6ab0ad6e99': {
          id: '4ffbe19d-0db0-499f-bd5a-3b6ab0ad6e99',
          value: [ 80, 100 ],
        },
        'c00f291e-8ddd-40fe-839e-b6f608428fff': {
          id: 'c00f291e-8ddd-40fe-839e-b6f608428fff',
          value: false,
        },
      },
    },
    '703ed125-126f-4af2-be6b-1ff9cb19a3a3': {
      id: '703ed125-126f-4af2-be6b-1ff9cb19a3a3',
      inactive: true,
      nextState: '1fff4248-59a6-4cf9-93d4-58f962dc88c6',
    },
    '948d6207-c721-4479-99b1-dc406599b159': {
      id: '948d6207-c721-4479-99b1-dc406599b159',
      nextState: 'cfce3eb6-d06a-429f-b6a0-0f3b045c01a2',
      time: { min: 0, max: 15 },
      tools: {
        'c00f291e-8ddd-40fe-839e-b6f608428fff': {
          id: 'c00f291e-8ddd-40fe-839e-b6f608428fff',
          value: true,
        },
      },
    },
    'd7d519a0-c6b5-4b3e-aeab-7a2822e32998': {
      id: 'd7d519a0-c6b5-4b3e-aeab-7a2822e32998',
      inactive: true,
      nextState: '1fff4248-59a6-4cf9-93d4-58f962dc88c6',
    },
  },
  parameters: {
    '9cb532d2-5901-4019-b757-7e67ee5093dc': {
      id: '9cb532d2-5901-4019-b757-7e67ee5093dc',
      name: 'p23',
      value: 78,
    },
    '77a176bc-3e5c-4e35-9c79-0d5b447394e7': {
      id: '77a176bc-3e5c-4e35-9c79-0d5b447394e7',
      name: 'p21',
      value: 35,
    },
    '07007f13-572c-46d4-b554-4b294bab0f30': {
      id: '07007f13-572c-46d4-b554-4b294bab0f30',
      name: 'p31',
      value: 345,
    },
    '39984103-ba31-4c5d-9d12-2106fb195199': {
      id: '39984103-ba31-4c5d-9d12-2106fb195199',
      name: 'p11',
      value: 42,
    },
    '70151770-3224-4f33-9426-2237c1bdd0c7': {
      id: '70151770-3224-4f33-9426-2237c1bdd0c7',
      name: 'p22',
      value: 546,
    },
    'c7d5089e-14e2-4c78-9418-3cf73b576681': {
      id: 'c7d5089e-14e2-4c78-9418-3cf73b576681',
      name: 'p12',
      value: 536,
    },
    'd1ecab74-9cb2-4f3d-986f-ff87db48de9b': {
      id: 'd1ecab74-9cb2-4f3d-986f-ff87db48de9b',
      name: 'p32',
      value: 546,
    },
  },
  states: {
    '1fff4248-59a6-4cf9-93d4-58f962dc88c6': {
      uuid: '1fff4248-59a6-4cf9-93d4-58f962dc88c6',
      name: 's3',
      actions: [],
      event: { name: 'event 3', desc: 'event 3 desc' },
      img: '59a6c134b56ba20e0c7553f5',
      parameters: [ '07007f13-572c-46d4-b554-4b294bab0f30', 'd1ecab74-9cb2-4f3d-986f-ff87db48de9b' ],
    },
    '68319a78-f2a8-4ad7-ac37-f988fbefd2c5': {
      uuid: '68319a78-f2a8-4ad7-ac37-f988fbefd2c5',
      name: 's2',
      actions: [ '948d6207-c721-4479-99b1-dc406599b159', '703ed125-126f-4af2-be6b-1ff9cb19a3a3' ],
      event: { name: 'event 2', desc: 'event 2 desc' },
      img: '59a6c045b56ba20e0c7553f4',
      parameters: [ '77a176bc-3e5c-4e35-9c79-0d5b447394e7', '70151770-3224-4f33-9426-2237c1bdd0c7', '9cb532d2-5901-4019-b757-7e67ee5093dc' ],
    },
    'cfce3eb6-d06a-429f-b6a0-0f3b045c01a2': {
      uuid: 'cfce3eb6-d06a-429f-b6a0-0f3b045c01a2',
      name: 's1',
      actions: [ '586b80a9-f080-4ef5-a72f-d3922f076f72', 'd7d519a0-c6b5-4b3e-aeab-7a2822e32998' ],
      event: { name: 'event 1', desc: 'event 1 desc' },
      img: '59a6bfd49bdf6c29d0ce82d0',
      parameters: [ '39984103-ba31-4c5d-9d12-2106fb195199', 'c7d5089e-14e2-4c78-9418-3cf73b576681' ],
    },
  },
  tools: {
    '4ffbe19d-0db0-499f-bd5a-3b6ab0ad6e99': {
      uuid: '4ffbe19d-0db0-499f-bd5a-3b6ab0ad6e99',
      name: 'tool 1',
      rangeValues: { min: 0, max: 200 },
      type: 'range',
    },
    'c00f291e-8ddd-40fe-839e-b6f608428fff': {
      uuid: 'c00f291e-8ddd-40fe-839e-b6f608428fff',
      name: 'tool 2',
      rangeValues: {},
      type: 'switch',
    },
  },
};

export default stub;
