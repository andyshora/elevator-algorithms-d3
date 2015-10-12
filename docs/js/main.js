/**
 * Babel Starter Kit | https://github.com/babel/babel-starter-kit
 * Copyright (c) Konstantin Tarkus <hello@tarkus.me> | The MIT License
 */

import 'babel/polyfill';
import {Simulation} from './lib/Simulation';

let app = null;

const run = async () => {
  try {

    // app = angular.module('SimulationApp', ['ngResource']);

    let sim = new Simulation({
      simulationOptions: {
        tickTime: 1000
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
        mode: 'normal',
        capacity: 8,
        numFloors: 4
      },
      personOptions: {
        startTime: 9,
        finishTime: 18,
        generateTargetFloor: (n) => { return Math.round(Math.random() * 1) + 1 }
      }
    });
    console.log('simulation', sim);

    sim.setDebug(true);
    sim.start();
    sim.runFor(5);

  } catch (err) {
    console.log(err);
  }
};

if (window.addEventListener) {
  window.addEventListener('DOMContentLoaded', run);
} else {
  window.attachEvent('onload', run);
}
