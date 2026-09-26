import uuid from 'uuid';

export const runClientTracerCode = (code) => {
  const commands = [];
  let tracerCount = 0;

  class BaseTracerMock {
    constructor(className, title) {
      this.key = `tracer_${++tracerCount}_${uuid()}`;
      commands.push({
        key: this.key,
        method: className,
        args: [title],
      });

      return new Proxy(this, {
        get: (target, prop) => {
          if (prop in target) return target[prop];
          return (...args) => {
            // Map tracer objects passed in args to their keys
            const mappedArgs = args.map(arg => (arg && arg.key ? arg.key : arg));
            commands.push({
              key: target.key,
              method: prop,
              args: mappedArgs,
            });
            return target;
          };
        },
      });
    }
  }

  class Array1DTracer extends BaseTracerMock {
    constructor(title = 'Array1DTracer') {
      super('Array1DTracer', title);
    }
  }

  class Array2DTracer extends BaseTracerMock {
    constructor(title = 'Array2DTracer') {
      super('Array2DTracer', title);
    }
  }

  class ChartTracer extends BaseTracerMock {
    constructor(title = 'ChartTracer') {
      super('ChartTracer', title);
    }
  }

  class GraphTracer extends BaseTracerMock {
    constructor(title = 'GraphTracer') {
      super('GraphTracer', title);
    }
  }

  class LogTracer extends BaseTracerMock {
    constructor(title = 'LogTracer') {
      super('LogTracer', title);
    }
  }

  class MarkdownTracer extends BaseTracerMock {
    constructor(title = 'MarkdownTracer') {
      super('MarkdownTracer', title);
    }
  }

  class ScatterTracer extends BaseTracerMock {
    constructor(title = 'ScatterTracer') {
      super('ScatterTracer', title);
    }
  }

  class Layout {
    constructor(children = []) {
      this.key = `layout_${++tracerCount}_${uuid()}`;
      const childKeys = children.map(c => (c && c.key ? c.key : c));
      commands.push({
        key: this.key,
        method: 'VerticalLayout',
        args: [childKeys],
      });
    }

    static setRoot(root) {
      const rootKey = root && root.key ? root.key : root;
      commands.push({
        key: null,
        method: 'setRoot',
        args: [rootKey],
      });
    }
  }

  class VerticalLayout extends Layout {
    constructor(children = []) {
      super(children);
    }
  }

  class HorizontalLayout {
    constructor(children = []) {
      this.key = `layout_${++tracerCount}_${uuid()}`;
      const childKeys = children.map(c => (c && c.key ? c.key : c));
      commands.push({
        key: this.key,
        method: 'HorizontalLayout',
        args: [childKeys],
      });
    }
  }

  const Tracer = {
    delay: (lineNumber) => {
      commands.push({
        key: null,
        method: 'delay',
        args: [lineNumber],
      });
    },
  };

  const sandboxContext = {
    Array1DTracer,
    Array2DTracer,
    ChartTracer,
    GraphTracer,
    LogTracer,
    MarkdownTracer,
    ScatterTracer,
    Layout,
    VerticalLayout,
    HorizontalLayout,
    Tracer,
  };

  // Strip ES module import lines if present
  const cleanedCode = code
    .replace(/import\s+[\s\S]*?from\s+['"][^'"]+['"];?/g, '')
    .replace(/export\s+default\s+[\s\S]*?;?/g, '');

  const runnerFn = new Function(
    ...Object.keys(sandboxContext),
    `"use strict";\n${cleanedCode}`
  );

  runnerFn(...Object.values(sandboxContext));

  return commands;
};
