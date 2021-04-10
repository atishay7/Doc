'use strict';

var _crdtLinear = require('./crdtLinear');

var _crdtLinear2 = _interopRequireDefault(_crdtLinear);

var _utilLinear = require('./utilLinear');

var UtilLinear = _interopRequireWildcard(_utilLinear);

var _crdt = require('./crdt');

var _crdt2 = _interopRequireDefault(_crdt);

var _util = require('./util');

var Util = _interopRequireWildcard(_util);

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
      getLocalVersion: function getLocalVersion() {},
      localVersion: {
        counter: 0
      },
      increment: function increment() {
        this.localVersion.counter++;
      }
    }
  };
}

var func = void 0,
    base = void 0,
    boundary = void 0,
    mult = void 0,
    boundaryStrategy = void 0,
    crdt = void 0,
    xs = void 0,
    ys = void 0,
    data = void 0,
    name = void 0,
    title = void 0;
var ops = [1000, 10000, 20000, 40000, 60000, 80000, 100000];
base = 32;
boundary = 10;
mult = 2;
boundaryStrategy = 'random';

// Local Insertions
title = 'Local Insertions';
data = [];

// LINEAR
func = UtilLinear.insertBeginning;
xs = [];
ys = [];

crdt = new _crdtLinear2.default(mockController(), base, boundary, boundaryStrategy, mult);
crdt.insertText = function () {};
crdt.deleteText = function () {};
ops.forEach(function (op) {
  xs.push(op);
  ys.push(func(crdt, op));
  crdt.struct = [];
});

name = 'Linear';
data.push({ x: xs, y: ys, type: 'scatter', name: name });

// array-of-arrays
func = Util.insertBeginning;
xs = [];
ys = [];

crdt = new _crdt2.default(mockController(), base, boundary, boundaryStrategy, mult);
ops.forEach(function (op) {
  xs.push(op);
  ys.push(func(crdt, op));
  crdt.struct = [];
});

name = 'Array-of-Arrays';
data.push({ x: xs, y: ys, type: 'scatter', name: name });

Plotly.newPlot('g0', data, { title: title, height: 600 });

// Local Deletions
title = 'Local Deletions';
data = [];

// linear
func = UtilLinear.deleteBeginning;
xs = [];
ys = [];

crdt = new _crdtLinear2.default(mockController(), base, boundary, boundaryStrategy, mult);
crdt.insertText = function () {};
crdt.deleteText = function () {};
ops.forEach(function (op) {
  xs.push(op);
  UtilLinear.insertEnd(crdt, op);
  ys.push(func(crdt, op));
  crdt.struct = [];
});

name = 'Linear';
data.push({ x: xs, y: ys, type: 'scatter', name: name });

// array-of-arrays
func = Util.deleteBeginning;
xs = [];
ys = [];

crdt = new _crdt2.default(mockController(), base, boundary, boundaryStrategy, mult);
ops.forEach(function (op) {
  xs.push(op);
  Util.insertRandom(crdt, op);
  ys.push(func(crdt, op));
  crdt.struct = [];
});

name = 'Array-of-Arrays';
data.push({ x: xs, y: ys, type: 'scatter', name: name });

Plotly.newPlot('g1', data, { title: title, height: 600 });

// Remote Insertions
title = "Remote Insertions";
data = [];

// linear
func = UtilLinear.remoteInsertBeginning;
xs = [];
ys = [];
crdt = new _crdtLinear2.default(mockController(), base, boundary, boundaryStrategy, mult);
crdt.insertText = function () {};
crdt.deleteText = function () {};
ops.forEach(function (op) {
  xs.push(op);
  ys.push(func(crdt, op));
  crdt.struct = [];
});

name = 'Linear';
data.push({ x: xs, y: ys, type: 'scatter', name: name });

// array-of-arrays
func = Util.insertBeginning;
xs = [];
ys = [];

crdt = new _crdt2.default(mockController(), base, boundary, boundaryStrategy, mult);
ops.forEach(function (op) {
  xs.push(op);
  ys.push(func(crdt, op));
  crdt.struct = [];
});

name = 'Array-of-Arrays';
data.push({ x: xs, y: ys, type: 'scatter', name: name });

Plotly.newPlot('g2', data, { title: title, height: 600 });

// Remote Deletions
title = 'Remote Deletions';
data = [];

// linear
func = UtilLinear.remoteDeleteBeginning;
xs = [];
ys = [];
crdt = new _crdtLinear2.default(mockController(), base, boundary, boundaryStrategy, mult);
crdt.insertText = function () {};
crdt.deleteText = function () {};
ops.forEach(function (op) {
  xs.push(op);
  UtilLinear.remoteInsertEnd(crdt, op);
  ys.push(func(crdt, op));
  crdt.struct = [];
});

name = 'Linear';
data.push({ x: xs, y: ys, type: 'scatter', name: name });

// array-of-arrays
func = Util.deleteBeginning;
xs = [];
ys = [];

crdt = new _crdt2.default(mockController(), base, boundary, boundaryStrategy, mult);
ops.forEach(function (op) {
  xs.push(op);
  Util.insertRandom(crdt, op);
  ys.push(func(crdt, op));
  crdt.struct = [];
});

name = 'Array-of-Arrays';
data.push({ x: xs, y: ys, type: 'scatter', name: name });

Plotly.newPlot('g3', data, { title: title, height: 600 });