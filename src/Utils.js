class Utils {
  static log(message, ...objs) {
    if (typeof window === 'undefined') {
      return;
    }
    if (window.debug) {
      console.log(message, objs);

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
