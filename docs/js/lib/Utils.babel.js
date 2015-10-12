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
}

export default { Utils };
