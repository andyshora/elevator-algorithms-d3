/**
 * Babel Starter Kit | https://github.com/kriasoft/babel-starter-kit
 * Copyright (c) Konstantin Tarkus <hello@tarkus.me> | The MIT License
 */

import {describe, it} from 'mocha';
import {expect} from 'chai';
import {Building} from '../src/Building';

describe('The Building', () => {

  let building = null;
  let options = {
    name: 'QB',
    numFloors: 4,
    openingTime: 9,
    closingTime: 18,
    numElevators: 2,
    numPeople: 20
  },
  elevatorOptions: {
    maxSpeed: 0.5
  },
  personOptions: {
    startTime: 9,
    finishTime: 18
  };

  beforeEach(() => {

    building = new Building(options);

  });

  it('should be an object', function() {
    expect(typeof building).to.be.equal('object');
  });

  it('should contain ' + options.numPeple + ' people', function() {
    expect(building.people.length).to.be.equal(options.numPeople);
  });

  it('should have ' + options.numElevators + ' elevators', function() {
    expect(building.elevators.length).to.be.equal(options.numElevators);
  });

});

