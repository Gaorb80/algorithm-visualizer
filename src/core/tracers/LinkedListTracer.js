import { Tracer } from 'core/tracers';
import { LinkedListRenderer } from 'core/renderers';

class LinkedListTracer extends Tracer {
  getRendererClass() {
    return LinkedListRenderer;
  }

  init() {
    super.init();
    this.nodes = [];
    this.isDoubly = false;
    this.pointers = {};
    this.bypass = null;
    this.prevBypass = null;
  }

  set(nodes = [], isDoubly = false) {
    this.nodes = nodes.map(n => ({
      id: n.id !== undefined ? n.id : n,
      val: n.val !== undefined ? n.val : n,
      addr: n.addr,
      state: 'normal',
      detached: false,
      fadingOut: false,
    }));
    this.isDoubly = isDoubly;
    this.pointers = {};
    this.bypass = null;
    this.prevBypass = null;
    super.set();
  }

  setPointer(name, nodeId) {
    this.pointers = {
      ...this.pointers,
      [name]: nodeId,
    };
  }

  removePointer(name) {
    const nextPointers = { ...this.pointers };
    delete nextPointers[name];
    this.pointers = nextPointers;
  }

  clearPointers() {
    this.pointers = {};
  }

  focus(nodeId) {
    this.nodes = this.nodes.map(n => n.id === nodeId ? { ...n, state: 'focus' } : n);
  }

  target(nodeId) {
    this.nodes = this.nodes.map(n => n.id === nodeId ? { ...n, state: 'target' } : n);
  }

  unhighlight(nodeId) {
    this.nodes = this.nodes.map(n => n.id === nodeId ? { ...n, state: 'normal' } : n);
  }

  isolate(nodeId) {
    this.nodes = this.nodes.map(n => n.id === nodeId ? { ...n, state: 'isolated', detached: true } : n);
  }

  setBypass(fromId, toId, label = '') {
    this.bypass = { fromId, toId, label };
  }

  setPrevBypass(fromId, toId, label = '') {
    this.prevBypass = { fromId, toId, label };
  }

  clearBypass() {
    this.bypass = null;
    this.prevBypass = null;
  }

  removeNode(nodeId) {
    this.nodes = this.nodes.filter(n => n.id !== nodeId);
    this.clearBypass();
    // remove pointers pointing to this node
    const nextPointers = {};
    Object.keys(this.pointers).forEach(pName => {
      if (this.pointers[pName] !== nodeId) {
        nextPointers[pName] = this.pointers[pName];
      }
    });
    this.pointers = nextPointers;
  }
}

export default LinkedListTracer;
