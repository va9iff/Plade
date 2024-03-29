// import { Ticker } from "./Ticker.js";

// basic class for visualizing physics and using Vector
class Dynamic extends Ticker {
  static tick = 20;

  // static all = []

  // the element to add its visual element to
  static node = document.querySelector("body");

  init(node) {
    this.pos = V();
    this.vel = V();
    this.vis = this.visual();

    if (node) {
      node.appendChild(this.vis);
    } else {
      this.constructor.node.appendChild(this.vis);
    }

    this.enable()
  }

  // defines how to look. it takes the node that which to add itself as argument
  visual() {
    let vis = document.createElement("div");
    vis.style.transitionDuration = this.constructor.tick + "ms";
    vis.style.position= "absolute";
    vis.className = "Dynamic";


    return vis;
  }

  remove(){
    this.vis.remove()
  }

  // just add its velocity to position. the most basic physics simulation
  processDynamic() {
    this.pos = this.pos["+"](this.vel);
    // this.lookAt(this.vel)
    this.posfix();
  }

  lookAt(vec){
    this.vis.style.transform = "rotate("+(vec.angle())+"rad)"
  }

  // Dynamic's special and normal process
  wrapperProcess() {
    this.processDynamic();
    this.process();
  }

  // it is just a custom method for fixing its visual to real position
  posfix() {
    this.vis.style.left = this.pos.x + "px";
    this.vis.style.top = this.pos.y + "px";
  }

  // do whatever you want here without calling super.process()
  process() {}
}

// export { Dynamic };