import {describe, it} from 'mocha';
import {expect} from 'chai';
import {Simulation} from '../src/Simulation';
import options from './config';

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

});

