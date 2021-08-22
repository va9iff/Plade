// Vome's instances will have custom loop and process callbacks.

// Vome class doesn't have any visuals, physics, or specifics.
// it is the base class for having some relation in between its objects,
// such as calling their process function every tick. checking other instances
// of different version of this class in specific way.
// it is very useful for gamedev tho. so it has game specific sublclasses too.
class Vome {
  // [py] self.__class__ = [js] this.constructor
  constructor() {
    this.constructor.all.push(this);
  }

  static tickId = null;

  // the array that will hold all the instances (enabled instances)
  // classes can have saperate, or 1 in parent for more child class (it is
  // needed to have saperate if the class uses different tick)
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

  // starts the calling of processAll in every tick
  static start() {
    // "this" is the class here
    // console.log(this, "got started");
    this.tickId = setInterval(() => {
      this.processAll();
    }, this.tick);
  }

  // stops the calling of processAll in every tick
  static stop() {
    // "this" is the class here
    clearInterval(this.tickId);
  }
}

// export { Vome };