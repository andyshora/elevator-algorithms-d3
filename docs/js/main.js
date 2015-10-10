/**
 * Babel Starter Kit | https://github.com/babel/babel-starter-kit
 * Copyright (c) Konstantin Tarkus <hello@tarkus.me> | The MIT License
 */

import 'babel/polyfill';
import onStats from './onStats';
import {Simulation} from '../../lib/Simulation';

// console.log('Simulation', Simulation);

let sim = new Simulation({
  simulationOptions: {
    tickFrequency: 1000
  },
  buildingOptions: {
    name: 'QB',
    numFloors: 4,
    openingTime: 9,
    closingTime: 18,
    numElevators: 1,
    numPeople: 20
  },
  elevatorOptions: {
    maxSpeed: 0.5,
    mode: 'normal'
  },
  personOptions: {
    startTime: 9,
    finishTime: 18
  }
});

console.log('sim x', sim);


const run = async () => {
  try {
    console.log('Welcome to Babel Starter Kit!'); // eslint-disable-line no-console
    if (document.querySelector('.stats')) {
      onStats(stats => {
        document.querySelector('.stats-forks span').innerText = stats.forks;
        document.querySelector('.stats-stars span').innerText = stats.watchers;
        document.querySelector('.stats-subscribers span').innerText = stats.subscribers;
        document.querySelector('.stats-open-issues span').innerText = stats.openIssues;
      });
    }
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
  }
};

if (window.addEventListener) {
  window.addEventListener('DOMContentLoaded', run);
} else {
  window.attachEvent('onload', run);
}
