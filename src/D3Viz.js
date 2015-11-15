import {D3Building} from './D3Building';
import {Utils} from './Utils';

class D3Viz {
  constructor(args) {
    console.log('D3Viz', args);

    this.applyPolyfills();

    this._sideLength = window.innerHeight - 50;
    args.vizOptions.sideLength = args.buildingOptions.sideLength = this._sideLength;

    this._d3Container = d3.select(args.vizOptions.selector);
    this._d3Building = new D3Building(args.buildingOptions);

    this.init();
  }

  applyPolyfills() {
    window.requestAnimFrame = (function(){
      return window.requestAnimationFrame  ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(/* function */ callback, /* DOMElement */ element){
          window.setTimeout(callback, 1000 / 60);
        };
      })();
  }

  init() {

    // base svg element
    this._svgContainer = this._d3Container.append('svg')
      .attr('width', this._sideLength)
      .attr('height', this._sideLength);

    // viz background
    this._svgContainer.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', this._sideLength)
      .attr('height', this._sideLength);

    this._d3Building.init(this._svgContainer);

  }

  render() {}

  animate() {

    requestAnimationFrame(this.animate.bind(this));

    // move stuff

    this.render();

  }

}

export default { D3Viz };
