import State from '../../../../src/js/learning/model_components/state';
import { expect } from 'chai';

const stubOne = {
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
}
const stubTwo = {
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
describe('State', function() {
  const stateOne = new State(stubOne);
  const stateTwo = new State(stubTwo);
  describe('#constructor', function() {
    it('should create valid state with events and actions', function() {
      expect(stateOne).to.have.property('id', 1);
      expect(stateOne).to.have.property('name', 'State 1');
      expect(stateOne).to.have.property('img', 'img/state1.png');
      expect(stateOne).to.have.property('params')
        .which.is.deep.equal({ param1: 152, param2: 16, param3: -40 });
      expect(stateOne).to.have.property('last', false);
      expect(stateOne).to.have.property('event')
        .which.is.an('object')
        .with.property('id', 1);
      expect(stateOne).to.have.property('actions')
       .which.is.an('array')
       .with.lengthOf(2);
    });

    it('should create valid last state', function() {
      expect(stateTwo).to.have.property('last', true);
      expect(stateTwo).to.have.property('event', null);
      expect(stateTwo).to.have.property('actions', null);
    });
  });

  describe('#getInactiveTime', function() {
    it('should return max time among all actions', function() {
      expect(stateOne.getInactiveTime()).to.be.equal(10000);
    });

    it('should throw error if no actions exists', function() {
      expect(stateTwo.getInactiveTime).to.throw(Error);
    });
  });

  describe('#getInactiveAction', function() {
    it('should return action for inactive case', function() {
      expect(stateOne.getInactiveAction()).to.be.an('object')
       .which.contain.all.keys(['inactive', 'nextState']);
    });

    it('should throw error if no action with desired property exists', function() {
      expect(stateTwo.getInactiveAction).to.throw(Error);
    });
  });

  describe('#getAllActionTimes', function() {
    it('should return array', function() {
      expect(stateOne.getAllActionTimes()).to.be.an('array');
    });

    it('should return array with integer values', function() {
      const times = stateOne.getAllActionTimes();
      const isAllInteger = times.every( time => typeof time === 'number' && Math.round(time) === time );
      expect(isAllInteger).to.be.true;
    });

    it('should return array with non-negative values', function() {
      const times = stateOne.getAllActionTimes();
      const isAllNonNegative = times.every( time => time >= 0 );
      expect(isAllNonNegative).to.be.true;
    });

    it('should throw Error for last state', function() {
      expect(stateTwo.getAllActionTimes).to.throw(Error);
    });
  });

  describe('#handleInput', function() {
    it('should return next state if user data overlap with some action', function() {
      let toolsData = [{ id: 1, value: 90 }, { id: 2, value: false }];
      let time = 5000;
      expect(stateOne.handleInput(toolsData, time)).to.be.equal(2);

      toolsData = [{ id: 1, value: 100 }, { id: 2, value: false }];
      time = 10000;
      expect(stateOne.handleInput(toolsData, time)).to.be.equal(2);

      toolsData = [{ id: 1, value: 80 }, { id: 2, value: false }];
      time = 0;
      expect(stateOne.handleInput(toolsData, time)).to.be.equal(2);
    });

    it('should return "null" if user data doesn\'t match with any action', function() {
      let toolsData = [{ id: 1, value: 120 }, { id: 2, value: false }];
      let time = 5000;
      expect(stateOne.handleInput(toolsData, time)).to.be.null;

      toolsData = [{ id: 1, value: 90 }, { id: 2, value: true }];
      time = 5000;
      expect(stateOne.handleInput(toolsData, time)).to.be.null;

      toolsData = [{ id: 1, value: 90 }, { id: 2, value: false }];
      time = 11000;
      expect(stateOne.handleInput(toolsData, time)).to.be.null;
    });

    it('should throw error if state has no actions', function() {
      expect(stateTwo.handleInput).to.throw(Error);
    })
  });
});
