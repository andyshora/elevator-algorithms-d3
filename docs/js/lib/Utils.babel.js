import _ from 'lodash';

class Utils {
  static log(message, ...objs) {
    if (typeof window === 'undefined') {
      return;
    }
    if (window.debug) {
      if (objs.length) {
        console.log(message, objs);
      } else {
        console.log(message);
      }

    }
  }

  static setDebug(val) {
    if (typeof window === 'undefined') {
      return;
    }
    window.debug = val;
  }

  static applyBoxStyle(selector) {
    selector
      .style('stroke', '#ecf469')
      .style('fill', '#000000')
  }

  static applyAltLineStyle(selector) {
    selector
      .style('fill', '#5e612a')
  }

  static applyClearBoxStyle(selector) {
    selector
      .style('fill', '#000000')
  }

  static applyTextStyle(selector) {
    selector
      .style('fill', '#ecf469')
  }

}

export default { Utils };
