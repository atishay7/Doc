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

var funcs = void 0,
    crdt = void 0,
    xs = void 0,
    ys = void 0,
    data = void 0,
    name = void 0,
    title = void 0;
var bases = [32, 2064];
var boundaries = [10, 100];
var ops = [1000, 5000, 10000, 20000];

// local insertions

funcs = [[Util.insertRandom, 'random'], [Util.insertEnd, 'at end'], [Util.insertBeginning, 'at beginning']];
data = [];

funcs.forEach(function (func) {
  bases.forEach(function (base) {
    boundaries.forEach(function (boundary) {
      xs = [];
      ys = [];
      crdt = new _crdtLinear2.default(mockController(), base, boundary, 'random', 2);
      crdt.insertText = function () {};
      crdt.deleteText = function () {};
      ops.forEach(function (op) {
        xs.push(op);
        ys.push(func[0](crdt, op));
        crdt.struct = [];
      });
      name = 'base: ' + base + ', boundary: ' + boundary + ', ' + func[1];
      data.push({ x: xs, y: ys, type: 'scatter', name: name });
    });
  });
});

title = 'Local Insertions, Different Bases and Boundaries (mult = 2, strategy = random)';
Plotly.newPlot('g0', data, { title: title, height: 600 });

// local deletions

funcs = [[Util.deleteRandom, 'random'], [Util.deleteEnd, 'at end'], [Util.deleteEnd, 'at beginning']];
data = [];

funcs.forEach(function (func) {
  bases.forEach(function (base) {
    boundaries.forEach(function (boundary) {
      xs = [];
      ys = [];
      crdt = new _crdtLinear2.default(mockController(), base, boundary, 'random', 2);
      crdt.insertText = function () {};
      crdt.deleteText = function () {};
      ops.forEach(function (op) {
        xs.push(op);
        Util.insertRandom(crdt, op);
        ys.push(func[0](crdt, op));
        crdt.struct = [];
      });
      name = 'base: ' + base + ', boundary: ' + boundary + ', ' + func[1];
      data.push({ x: xs, y: ys, type: 'scatter', name: name });
    });
  });
});

title = 'Local Deletions, Different Bases and Boundaries (mult = 2, strategy = random)';
Plotly.newPlot('g1', data, { title: title, height: 600 });

// remote insertions

funcs = [[Util.remoteInsertRandom, 'random'], [Util.remoteInsertEnd, 'at end'], [Util.remoteInsertBeginning, 'at beginning']];
data = [];

funcs.forEach(function (func) {
  bases.forEach(function (base) {
    boundaries.forEach(function (boundary) {
      xs = [];
      ys = [];
      crdt = new _crdtLinear2.default(mockController(), base, boundary, 'random', 2);
      crdt.insertText = function () {};
      crdt.deleteText = function () {};
      ops.forEach(function (op) {
        xs.push(op);
        ys.push(func[0](crdt, op));
        crdt.struct = [];
      });
      name = 'base: ' + base + ', boundary: ' + boundary + ', ' + func[1];
      data.push({ x: xs, y: ys, type: 'scatter', name: name });
    });
  });
});

title = 'Remote Insertions, Different Bases and Boundaries (mult = 2, strategy = random)';
Plotly.newPlot('g2', data, { title: title, height: 600 });

// remote deletions

funcs = [[Util.remoteDeleteRandom, 'random'], [Util.remoteDeleteEnd, 'at end'], [Util.remoteDeleteBeginning, 'at beginning']];
data = [];

funcs.forEach(function (func) {
  bases.forEach(function (base) {
    boundaries.forEach(function (boundary) {
      xs = [];
      ys = [];
      ops.forEach(function (op) {
        crdt = new _crdtLinear2.default(mockController(), base, boundary, 'random', 2);
        crdt.insertText = function () {};
        crdt.deleteText = function () {};
        Util.remoteInsertRandom(crdt, op);
        xs.push(op);
        ys.push(func[0](crdt, op));
      });
      name = 'base: ' + base + ', boundary: ' + boundary + ', ' + func[1];
      data.push({ x: xs, y: ys, type: 'scatter', name: name });
    });
  });
});

title = 'Remote Deletions, Different Bases and Boundaries (mult = 2, strategy = random)';
Plotly.newPlot('g3', data, { title: title, height: 600 });