class Person {
  constructor(options) {

    for (var key in options) {
      this[key] = options[key];
    }
  }


}

export default { Person };
