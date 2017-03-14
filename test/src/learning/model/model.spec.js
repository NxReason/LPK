import { expect } from 'chai';

import modelStub from '../../stubs/modelStub';
import Model from '../../../../src/js/learning/model';

describe('Model', function() {
  const model = new Model(modelStub);
  describe('#constructor', function() {
    it('should construct model with correct properties', function() {
      expect(model).to.have.property('id', 1);
      expect(model).to.have.property('name', 'Model 1');
      expect(model).to.have.property('breakTime', 3000);
      expect(model).to.have.property('steps', 5);

      expect(model).to.have.property('currentState')
        .which.is.an('object')
        .with.property('id', 1);
      expect(model).to.have.property('states')
        .which.is.an('array')
        .with.lengthOf(3);

      expect(model).to.have.property('timeout', null);
      expect(model).to.have.property('subInput', null);
      expect(model).to.have.property('subStop', null);
    });
  });

  describe('#getState', function() {
    it('should return state with given id', function() {
      expect(model.getState(1)).to.be.an('object')
        .with.property('id', 1);
      expect(model.getState(2)).to.be.an('object')
        .with.property('id', 2);
      expect(model.getState(3)).to.be.an('object')
        .which.contain.all.keys(['id', 'name', 'img', 'last']);
    });

    it('should return undefined if no state with given id exists', function() {
      expect(model.getState(4)).to.be.undefined;
      expect(model.getState('str')).to.be.undefined;
    });
  });

  describe('#start', function() {
    const tempModel = new Model(modelStub);

    it('should create promise chain', function() {
      expect(tempModel.start()).to.be.a('promise');
    });
  });

  describe('#makeBreak', function() {
    it('should return promise', function() {
      expect(model.makeBreak()).to.be.a('promise');
    });
  });

  describe('#handleEvent', function() {
    it('should return promise', function() {
      expect(model.handleEvent()).to.be.a('promise');
    });
  });

  describe('#handleNewState', function() {
    it('should set correct new state', function() {
      const tempModel = new Model(modelStub);
      tempModel.timeout = 5;
      tempModel.handleNewState(tempModel.states[1]);
      expect(tempModel).to.have.property('currentState')
        .which.is.an('object')
        .with.property('id', 2);
    });
  });
});
