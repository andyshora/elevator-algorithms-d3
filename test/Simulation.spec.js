import {describe, it} from 'mocha';
import {expect} from 'chai';
import {Simulation} from '../src/Simulation';
import options from './config';
import _ from 'lodash';

describe('The Simulation', () => {

  let sim = null;

  beforeEach(() => {
    sim = new Simulation(options);
  });

  it('should be an object', function() {
    expect(typeof sim).to.be.equal('object');
  });

  it('should be able to tick', function() {
    expect(sim.currentTime).to.be.equal(0);
    sim.tick();
    expect(sim.currentTime).to.be.equal(1);
  });

  it('should have a building', function() {
    expect(typeof sim.building).to.be.equal('object');
  });

  it('should initially load first elevator to maximum capacity', function() {
    sim.tick();
    expect(sim.building.elevators[0].people.length).to.be.equal(options.elevatorOptions.capacity);
  });

  it('should have remainder of people who didnt fit in the elevator still waiting on  the ground floor', function() {
    sim.tick();
    var losers = _.filter(sim.building.people, { state: 'waiting' });
    expect(losers.length).to.be.equal(options.buildingOptions.numPeople - options.elevatorOptions.capacity);
  });

  it('should have an elevator starting after 1 tick', function() {
    // first tick will load the elevator and start it
    sim.tick();
    expect(sim.building.elevators[0].state).to.be.equal('starting');
  });

  it('should have an elevator with no passengers left after 3 ticks', function() {
    // first tick will load the elevator
    // second tick will be travelling
    sim.tick();
    sim.tick();
    sim.tick();
    expect(sim.building.elevators[0].people.length).to.be.equal(0);
  });

  xit('should have an elevator travelling after 2 ticks', function() {
    // first tick will load the elevator
    // second tick will be travelling
    sim.tick();
    sim.tick();
    expect(sim.building.elevators[0].state).to.be.equal('travelling');
  });

  xit('should have an elevator stopping to unload people at floor 1 after 3 ticks', function() {
    // first tick will load the elevator
    // second tick will be travelling
    sim.tick();
    sim.tick();
    sim.tick();
    expect(sim.building.elevators[0].state).to.be.equal('stopping');
  });

  xit('should have an elevator waiting after 4 ticks', function() {
    // first tick will load the elevator, state is starting
    // second tick will be travelling
    // third will be stopping (assuming some people are targetting floor 1)
    // fourth will be waiting
    sim.tick();
    sim.tick();
    sim.tick();
    sim.tick();
    expect(sim.building.elevators[0].state).to.be.equal('waiting');
  });

});

