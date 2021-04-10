'use strict';

var _crdtLinear = require('./crdtLinear');

var _crdtLinear2 = _interopRequireDefault(_crdtLinear);

var _utilLinear = require('./utilLinear');

var Util = _interopRequireWildcard(_utilLinear);

var _v = require('uuid/v1');

var _v2 = _interopRequireDefault(_v);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mockController() {
  return {
    siteId: (0, _v2.default)(),
    broadcastInsertion: function broadcastInsertion() {},
    broadcastDeletion: function broadcastDeletion() {},
    insertIntoEditor: function insertIntoEditor() {},
    deleteFromEditor: function deleteFromEditor() {},
    vector: {
      localVersion: {
        counter: 0
      },
      increment: function increment() {
        this.localVersion.counter++;
      }
    }
  };
}

var multipliers = void 0,
    bases = void 0,
    boundaries = void 0,
    strategies = void 0,
    crdt = void 0,
    xs = void 0,
    ys = void 0,
    data = void 0,
    name = void 0,
    title = void 0;
var ops = [100, 500, 1000, 3000, 5000];
var funcs = [[Util.insertRandom, 'Inserted Randomly'], [Util.insertEnd, 'Inserted at End'], [Util.insertBeginning, 'Inserted at Beginning']];

// comparing multipliers

multipliers = [1, 2, 3];
data = [];

multipliers.forEach(function (mult) {
  funcs.forEach(function (func) {
    xs = [];
    ys = [];
    crdt = new _crdtLinear2.default(mockController(), 32, 10, 'random', mult);
    crdt.insertText = function () {};
    crdt.deleteText = function () {};
    ops.forEach(function (op) {
      func[0](crdt, op);
      xs.push(op);
      ys.push(Util.avgIdLength(crdt));
      crdt.struct = [];
    });
    name = 'multiplier: ' + mult + ', ' + func[1];
    data.push({ x: xs, y: ys, type: 'scatter', name: name });
  });
});

title = 'Different Base Multiplications (base = 32, boundary = 10, strategy = random)';
Plotly.newPlot('g0', data, { title: title, height: 600 });

// comparing base

bases = [32, 1024, 4096];
data = [];

bases.forEach(function (base) {
  funcs.forEach(function (func) {
    xs = [];
    ys = [];
    crdt = new _crdtLinear2.default(mockController(), base, 10, 'random', 2);
    crdt.insertText = function () {};
    crdt.deleteText = function () {};
    ops.forEach(function (op) {
      func[0](crdt, op);
      xs.push(op);
      ys.push(Util.avgIdLength(crdt));
      crdt.struct = [];
    });
    name = 'base: ' + base + ', ' + func[1];
    data.push({ x: xs, y: ys, type: 'scatter', name: name });
  });
});

title = 'Different Starting Bases (mult = 2, boundary = 10, strategy = random)';
Plotly.newPlot('g1', data, { title: title, height: 600 });

// comparing boundary

boundaries = [10, 20, 30];
data = [];

boundaries.forEach(function (boundary) {
  funcs.forEach(function (func) {
    xs = [];
    ys = [];
    crdt = new _crdtLinear2.default(mockController(), 32, boundary, 'random', 2);
    crdt.insertText = function () {};
    crdt.deleteText = function () {};
    ops.forEach(function (op) {
      func[0](crdt, op);
      xs.push(op);
      ys.push(Util.avgIdLength(crdt));
      crdt.struct = [];
    });
    name = 'boundary: ' + boundary + ', ' + func[1];
    data.push({ x: xs, y: ys, type: 'scatter', name: name });
  });
});

title = 'Different Boundaries (mult = 2, base = 32, strategy = random)';
Plotly.newPlot('g2', data, { title: title, height: 600 });

// comparing strategy

strategies = ['every2nd', 'every3rd', 'random'];
data = [];

strategies.forEach(function (strat) {
  funcs.forEach(function (func) {
    xs = [];
    ys = [];
    crdt = new _crdtLinear2.default(mockController(), 32, 10, strat, 2);
    crdt.insertText = function () {};
    crdt.deleteText = function () {};
    ops.forEach(function (op) {
      func[0](crdt, op);
      xs.push(op);
      ys.push(Util.avgIdLength(crdt));
      crdt.struct = [];
    });
    name = 'strategy: ' + strat + ', ' + func[1];
    data.push({ x: xs, y: ys, type: 'scatter', name: name });
  });
});

title = 'Different Strategies (mult = 2, base = 32, boundary = 10)';
Plotly.newPlot('g3', data, { title: title, height: 600 });