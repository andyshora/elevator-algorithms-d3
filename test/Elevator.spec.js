import {describe, it} from 'mocha';
import {expect} from 'chai';
import {Elevator} from '../src/Elevator';
import options from './config';

describe('The Elevator', () => {

  let elevator = null;

  beforeEach(() => {
    elevator = new Elevator(options.elevatorOptions);
  });

  it('should be an object', function() {
    expect(typeof elevator).to.be.equal('object');
  });

  it('should be resting initially', function() {
    expect(elevator.state).to.be.equal('resting');
  });

  it('should have a finish time', function() {
    expect(elevator.currentFloor).to.be.equal(0);
  });

});

