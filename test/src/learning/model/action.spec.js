import Action from '../../../../src/js/learning/model/action';
import { expect } from 'chai';

const stubOne = {
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
}
const stubTwo = {
  tools: [
    {
      id: 2,
      value: true
    }
  ],
  nextState: 1,
  minTime: 0,
  maxTime: 5000
}
const stubThree = {
  inactive: true,
  nextState: 3
}

describe('Action', function() {

  describe('constructor', function() {

    it('usual action should be properly created', function() {
      const action = new Action(stubOne);
      expect(action).to.have.property('nextState', 2);
      expect(action).to.have.property('minTime', 0);
      expect(action).to.have.property('maxTime', 10000);
      expect(action).to.have.property('inactive', false);
      expect(action).to.have.property('tools')
        .that.is.an('array')
        .with.deep.property('[1]')
          .that.deep.equals({ id: 2, value: false });
    });

    it('inactive action should be properly created', function() {
      const action = new Action(stubThree);
      expect(action).to.have.property('nextState', 3);
      expect(action).to.have.property('minTime', undefined);
      expect(action).to.have.property('maxTime', undefined);
      expect(action).to.have.property('inactive', true);
      expect(action).to.have.property('tools')
        .that.is.an('array')
        .with.lengthOf(0);
    })

  });

  describe('isSuitable', function() {

    const actionOne = new Action(stubOne);
    const actionTwo = new Action(stubTwo);

    const dataOne = [{ id: 1, value: 80 }, { id: 2, value: false }];
    const dataTwo = [{ id: 1, value: 75 }, { id: 2, value: true }];

    it('should return true if get correct data', function() {
      expect(actionOne.isSuitable(dataOne, 5000)).to.be.true;
      expect(actionTwo.isSuitable(dataTwo, 4999)).to.be.true;
    });

    it('should return false if input data doesn\'t match', function() {
      expect(actionOne.isSuitable(dataTwo, 9999)).to.be.false;
      expect(actionTwo.isSuitable(dataOne, 0)).to.be.false;
      expect(actionOne.isSuitable(dataOne, 10001)).to.be.false;
      expect(actionTwo.isSuitable(dataTwo, 5001)).to.be.false;
    });

  });

  describe('rightTime', function() {

    const action = new Action(stubOne);

    it('should return true if time in time gap', function() {
      expect(action.rightTime(0)).to.be.true;
      expect(action.rightTime(10000)).to.be.true;
      expect(action.rightTime(5000)).to.be.true;
    });

    it('should return false if time doesn\'t match', function() {
      expect(action.rightTime(-1)).to.be.false;
      expect(action.rightTime(10001)).to.be.false;
    });

    it('should throw TypeError if time not an integer', function() {
      expect(action.rightTime.bind(action)).to.throw(TypeError);
      expect(action.rightTime.bind(action, null)).to.throw(TypeError);
      expect(action.rightTime.bind(action, {})).to.throw(TypeError);
    });

  });

  describe('includesValue', function() {
    const action = new Action(stubOne);

    it('should return true if value is within borders', function() {
      expect(action.includesValue(10, [10, 20])).to.be.true;
      expect(action.includesValue(15, [10, 20])).to.be.true;
      expect(action.includesValue(20, [10, 20])).to.be.true;
    });

    it(`should return false if value doesn't match`, function() {
      expect(action.includesValue(9, [10, 20])).to.be.false;
      expect(action.includesValue(21, [10, 20])).to.be.false;
    });

    it(`should throw TypeError if value is not an integer`, function() {
      expect(action.includesValue.bind(action, '', [10, 20])).to.throw(TypeError);
      expect(action.includesValue.bind(action, undefined, [10, 20])).to.throw(TypeError);
    });

  });

  describe('rightData', function() {

    const actionOne = new Action(stubOne);
    const actionTwo = new Action(stubTwo);

    const dataOne = [{ id: 1, value: 80 }, { id: 2, value: false }];
    const dataTwo = [{ id: 1, value: 75 }, { id: 2, value: true }];

    it(`should return true if all tools data correct`, function() {
      expect(actionOne.rightData(dataOne)).to.be.true;
      expect(actionTwo.rightData(dataTwo)).to.be.true;
    });

    it(`should return false if data doesn't match`, function() {
      expect(actionOne.rightData(dataTwo)).to.be.false;
      expect(actionTwo.rightData(dataOne)).to.be.false;
      expect(actionOne.rightData()).to.be.false;
    });

    it(`should throw TypeError with invalid data types`, function() {
      expect(actionOne.rightData.bind(actionOne, 'string')).to.throw(TypeError);
      expect(actionOne.rightData.bind(actionOne, 42)).to.throw(TypeError);
    })

  })

});
