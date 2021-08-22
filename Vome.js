// Vome's instances will have custom loop and process callbacks.

// Vome class doesn't have any visuals, physics, or specifics.
// it is the base class for having some relation in between its objects,
// such as calling their process function every tick. checking other instances
// of different version of this class in specific way.
// it is very useful for gamedev tho. so it has game specific sublclasses too.
class Vome {
  // [py] self.__class__ = [js] this.constructor
  constructor() {
    if (!this.constructor.hasChild) {
      this.define();
    }
    this.init();
  }

  init() {
    this.enable();
  }

  // the firs instantiated object will determine to new all[] or parents' all
  static hasChild = false;
  // after, the determining phase, it wont be called. but it is always chcked in
  // constructor if it has determined. so, we need a fix here. but works fine.
  define() {
    console.log("define");
    if (this.constructor.tick != Object.getPrototypeOf(this.constructor).tick) {
      // if the tick of this class is different than its parent, it will hold
      // its instances in other array than parents. if they are same, many
      // childs can be stopped from their parent

      // !!problem!! it makes all empty after every childl instantiated
      this.constructor.all = [];
    }
    this.constructor.hasChild = true;
  }

  static tickId = null;

  // the array that will hold all the instances (enabled instances)
  // different ticked child classes has own "all". (see .start())
  static all = [];

  // time interval for every tick in ms.
  static tick = 50;

  // enables to process its process method in every tick (in procesAll)
  enable() {
    if (!this.constructor.all.includes(this)) {
      this.constructor.all.push(this);
    }
  }

  // remove from class's all list. so its process wont be called in processAll
  disable() {
    this.constructor.all = this.constructor.all.filter((el) => el !== this);
  }

  // a function that is being called every tick
  process() {}

  // the function to wrap process with other functions.
  // So we don't need to call super.process() or smthng.
  wrapperProcess() {
    this.process();
  }

  // the function that calls every instance's (enabled) process function
  static processAll() {
    // console.log(this.all);
    this.all.forEach((currentProcessingObj) => {
      currentProcessingObj.wrapperProcess();
      // console.log(currentProcessingObj);
    });
  }

  // the first time when you start the class, it will be called
  static initialStart() {
    // nothing much. just sits here, we'll use it when it is needed
    this.normalStart();
    this.start = this.normalStart;
  }

  // normally starts stopped class
  static normalStart() {
    this.tickId = setInterval(() => {
      this.processAll();
    }, this.tick);
  }

  // starts the calling of processAll in every tick
  static start() {
    this.initialStart();
    // after first call, it is equal to normalStart()
    // initialStart() also calls normalStart()
  }

  // stops the calling of processAll in every tick
  static stop() {
    // "this" is the class here
    clearInterval(this.tickId);
  }
}

// export { Vome };
