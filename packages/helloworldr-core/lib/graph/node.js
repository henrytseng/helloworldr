'use strict';

class Node {

  constructor() {
    this.dependencies = new Map();
  }

  add(name) {
    let node = new Node();
    this.dependencies.set(name, node);
    return node;
  }

  remove(name) {
    this.dependencies.delete(name);
  }

  get(name) {
    this.dependencies.get(name);
  }

  has(name) {
    this.dependencies.has(name);
  }

}

module.exports = Node;
