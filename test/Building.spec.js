import {describe, it} from 'mocha';
import {expect} from 'chai';
import {Building} from '../src/Building';
import options from './config';

describe('The Building', () => {

  let building = null;

  beforeEach(() => {
    building = new Building(options.buildingOptions);
  });

  it('should be an object', function() {
    expect(typeof building).to.be.equal('object');
  });

  it('should contain ' + options.numPeple + ' people', function() {
    expect(building.people.length).to.be.equal(options.buildingOptions.numPeople);
  });

  it('should have ' + options.numElevators + ' elevators', function() {
    expect(building.elevators.length).to.be.equal(options.buildingOptions.numElevators);
  });

});

