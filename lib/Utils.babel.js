class Utils {
  static log(message, ...objs) {
    if (window && window.debug) {
      console.log(message, objs);

    }
  }

  static setDebug(val) {
    if (!window) {
      return;
    }
    window.debug = val;
  }
}

export default { Utils };
