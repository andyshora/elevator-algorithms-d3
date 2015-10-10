import {describe, it} from 'mocha';
import {expect} from 'chai';
import {Person} from '../src/Person';
import options from './config';

describe('The Person', () => {

  let person = null;

  beforeEach(() => {
    person = new Person(options.personOptions);
  });

  it('should be an object', function() {
    expect(typeof person).to.be.equal('object');
  });

  it('should have a start time', function() {
    expect(person.startTime).to.be.equal(options.personOptions.startTime);
  });

  it('should have a finish time', function() {
    expect(person.finishTime).to.be.equal(options.personOptions.finishTime);
  });

});

