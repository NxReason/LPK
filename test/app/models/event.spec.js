import { sequelize as db, Event, State } from '../../../app/models';
import { expect } from 'chai';

describe('Event', () => {

  before(() => {
    return db.sync({ force: true, match: /_test$/ })
  })

  describe('CRUD', () => {

    beforeEach(() => {
      return Event.destroy({ where: {} });
    })

    it('should be created correctly without foreign state key', () => {
      return Event.create({ name: 'evt', description: 'info' })
        .then(event => {
          const { id, name, description, state_id } = event;
          expect( id ).to.be.a( 'number' );
          expect( name ).to.be.equal( 'evt' );
          expect( description ).to.be.equal( 'info' );
          expect( state_id ).to.be.null;
        });
    });

    it('should created correcty with given foreign key', () => {
      let state_id$ = null;
      return State.create({ name: 'state', img: 'img' })
        .then(state => {
          state_id$ = state.id;
          return Event.create({ name: 'evt', description: 'info', state_id: state_id$ })
        })
        .then(event => {
          const { id, state_id } = event;
          expect( id ).to.be.a( 'number' );
          expect( state_id$ ).to.be.equal( state_id );
        });
    });

    it('should be updated correctly with #save', () => {
      return Event.create({ name: 'old', description: 'foo' })
        .then(event => {
          event.name = 'new';
          event.description = 'bar';
          return event.save();
        })
        .then(event => {
          expect( event.name ).to.be.equal( 'new' );
          expect( event.description ).to.be.equal( 'bar' );
        });
    });

    it('should be updated correctly with #update', () => {
      return Event.create({ name: 'old', description: 'foo' })
        .then(event => {
          return event.update({
            name: 'awesome',
            description: 'baz'
          });
        })
        .then(event => {
          expect( event.name ).to.be.equal( 'awesome' );
          expect( event.description ).to.be.equal( 'baz' );
        });
    });

    it('should be removed correctly', () => {
      return Event.create({ name: 'old', description: 'foo' })
        .then(event => {
          return event.destroy();
        })
        .then(() => Event.findAll())
        .then(events => {
          expect( events ).to.be.an( 'array' )
            .with.lengthOf( 0 );
        });
    });

    it('should be retrieved correctly', () => {
      return Event.bulkCreate([
        { name: 'evt0', description: 'info' },
        { name: 'evt1', description: 'foo' },
        { name: 'evt2', description: 'bar' }
      ])
      .then(() => Event.findAll())
      .then(events => {
        expect( events ).to.be.an( 'array' )
          .with.lengthOf( 3 );

        const evt0 = events[0];
        expect( evt0.id ).to.be.a( 'number' );
        expect( evt0.name ).to.be.equal( 'evt0' );
      });
    });

  });

});
