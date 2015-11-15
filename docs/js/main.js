/**
 * Babel Starter Kit | https://github.com/babel/babel-starter-kit
 * Copyright (c) Konstantin Tarkus <hello@tarkus.me> | The MIT License
 */

import 'babel/polyfill';
import {Simulation} from './lib/Simulation';

let app = angular.module('SimulationApp', ['ngResource']);
// let sim = null;

app.controller('MainCtrl', function ($scope) {
  $scope.onTickButtonClicked = function() {
    sim.tick();
  };
});

const run = async () => {
  try {

    var numFloors = 3;

    window.sim = new Simulation({
      vizOptions: {
        worldSize: 10000,
        numFloors: numFloors,
        selector: '#viz-container'
      },
      simulationOptions: {
        tickTime: 100
      },
      buildingOptions: {
        name: 'QB',
        numFloors: numFloors,
        openingTime: 9,
        closingTime: 18,
        numElevators: 10,
        numPeople: 100,
        onTick: (data) => { sim.onTick(data) }
      },
      elevatorOptions: {
        maxSpeed: 0.5,
        mode: 'normal',
        capacity: 8,
        numFloors: numFloors,
        onStateChange: (data) => { sim.onElevatorStateChanged(data) }
      },
      personOptions: {
        startTime: 9,
        finishTime: 18,
        generateTargetFloor: (n) => { return Math.round(Math.random() * (numFloors - 2)) + 1 }
      }
    });
    console.log('simulation', sim);

    sim.setDebug(true);
    sim.start();
    // sim.runFor(80);


    /*var maxInt = 1000;
    var i = 0;
    var int = setInterval(() => {
      sim.updatePosition(i);

      i++;

      if (i > maxInt) {
        clearInterval(int);
      }
    }, 16);*/


  } catch (err) {
    console.log(err);
  }
};

if (window.addEventListener) {
  window.addEventListener('DOMContentLoaded', run);
} else {
  window.attachEvent('onload', run);
}
