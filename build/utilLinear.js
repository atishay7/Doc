'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remoteDeleteBeginning = exports.deleteBeginning = exports.remoteDeleteEnd = exports.deleteEnd = exports.remoteDeleteRandom = exports.deleteRandom = exports.remoteInsertBeginning = exports.insertBeginning = exports.remoteInsertEnd = exports.insertEnd = exports.remoteInsertRandom = exports.insertRandom = exports.average = exports.avgIdLength = undefined;

var _char = require('./char');

var _char2 = _interopRequireDefault(_char);

var _crdtLinear = require('./crdtLinear');

var _crdtLinear2 = _interopRequireDefault(_crdtLinear);

var _v = require('uuid/v1');

var _v2 = _interopRequireDefault(_v);

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

function insertRandom(crdt, numberOfOperations) {
  var start = Date.now();
  var index = void 0;

  for (var i = 0; i < numberOfOperations; i++) {
    index = Math.floor(Math.random() * i);
    crdt.handleLocalInsert('a', index);
  }

  var end = Date.now();
  return end - start;
}

function remoteInsertRandom(crdt, numberOfOperations) {
  var chars = generateChars(numberOfOperations);
  var randomChars = shuffle(chars);

  return remoteInsert(crdt, randomChars);
}

function insertBeginning(crdt, numberOfOperations) {
  var start = Date.now();

  for (var i = 0; i < numberOfOperations; i++) {
    crdt.handleLocalInsert('a', 0);
  }

  var end = Date.now();
  return end - start;
}

function insertEnd(crdt, numberOfOperations) {
  var start = Date.now();

  for (var i = 0; i < numberOfOperations; i++) {
    crdt.handleLocalInsert('a', i);
  }

  var end = Date.now();
  return end - start;
}

function remoteInsertBeginning(crdt, numberOfOperations) {
  var chars = generateChars(numberOfOperations);
  var descChars = chars.reverse();

  return remoteInsert(crdt, descChars);
}

function remoteInsertEnd(crdt, numberOfOperations) {
  var ascChars = generateChars(numberOfOperations);

  return remoteInsert(crdt, ascChars);
}

function remoteInsert(crdt, chars) {
  var start = Date.now();

  chars.forEach(function (char) {
    return crdt.handleRemoteInsert(char);
  });

  var end = Date.now();
  return end - start;
}

function deleteRandom(crdt) {
  var start = Date.now();
  var index = void 0;

  for (var i = crdt.struct.length - 1; i >= 0; i--) {
    index = Math.floor(Math.random() * i);
    crdt.handleLocalDelete(index);
  }

  var end = Date.now();
  return end - start;
}

function remoteDeleteRandom(crdt) {
  var toDel = [];
  crdt.struct.forEach(function (char) {
    return toDel.push(char);
  });
  var randomToDel = shuffle(toDel);
  return remoteDelete(crdt, randomToDel);
}

function deleteBeginning(crdt) {
  var start = Date.now();

  for (var i = crdt.struct.length - 1; i >= 0; i--) {
    crdt.handleLocalDelete(0);
  }

  var end = Date.now();
  return end - start;
}

function remoteDeleteBeginning(crdt) {
  var toDel = [];
  crdt.struct.forEach(function (char) {
    return toDel.push(char);
  });
  return remoteDelete(crdt, toDel);
}

function deleteEnd(crdt) {
  var start = Date.now();

  for (var i = crdt.struct.length - 1; i >= 0; i--) {
    crdt.handleLocalDelete(i);
  }

  var end = Date.now();
  return end - start;
}

function remoteDeleteEnd(crdt) {
  var toDel = [];
  crdt.struct.forEach(function (char) {
    return toDel.push(char);
  });
  var reverseToDel = toDel.reverse();
  return remoteDelete(crdt, reverseToDel);
}

function remoteDelete(crdt, chars) {
  var start = Date.now();

  chars.forEach(function (char) {
    return crdt.handleRemoteDelete(char);
  });

  var end = Date.now();
  return end - start;
}

function generateChars(numberOfOperations) {
  var structs = generateRemoteStructs(numberOfOperations);
  var charObjects = [];

  var _loop = function _loop(i) {
    structs.forEach(function (struct) {
      return charObjects.push(struct[i]);
    });
  };

  for (var i = 0; i < structs[0].length; i++) {
    _loop(i);
  }
  return charObjects;
}

function generateRemoteStructs(numberOfOperations) {
  var remoteCRDTs = generateRemoteCRDTs(Math.log10(numberOfOperations));

  var numOfOps = numberOfOperations / remoteCRDTs.length;

  remoteCRDTs.forEach(function (crdt) {
    return insertRandom(crdt, numOfOps);
  });

  return remoteCRDTs.map(function (crdt) {
    return crdt.struct;
  });
}

function generateRemoteCRDTs(num) {
  var CRDTs = [];
  var crdt = void 0;
  for (var i = 0; i < num; i++) {
    crdt = new _crdtLinear2.default(mockController());
    CRDTs.push(crdt);
  }
  return CRDTs;
}

function shuffle(a) {
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var _ref = [a[j], a[i]];
    a[i] = _ref[0];
    a[j] = _ref[1];
  }
  return a;
}

function avgIdLength(crdt) {
  var idArray = crdt.struct.map(function (char) {
    return char.position.map(function (id) {
      return id.digit;
    }).join('');
  });
  var digitLengthSum = idArray.reduce(function (acc, id) {
    return acc + id.length;
  }, 0);

  return Math.floor(digitLengthSum / idArray.length);
}

function avgPosLength(crdt) {
  var posArray = crdt.struct.map(function (char) {
    return char.position.length;
  });
  var posLengthSum = posArray.reduce(function (acc, len) {
    return acc + len;
  }, 0);

  return Math.floor(posLengthSum / posArray.length);
}

function average(time, operations) {
  return time / operations;
}

exports.avgIdLength = avgIdLength;
exports.average = average;
exports.insertRandom = insertRandom;
exports.remoteInsertRandom = remoteInsertRandom;
exports.insertEnd = insertEnd;
exports.remoteInsertEnd = remoteInsertEnd;
exports.insertBeginning = insertBeginning;
exports.remoteInsertBeginning = remoteInsertBeginning;
exports.deleteRandom = deleteRandom;
exports.remoteDeleteRandom = remoteDeleteRandom;
exports.deleteEnd = deleteEnd;
exports.remoteDeleteEnd = remoteDeleteEnd;
exports.deleteBeginning = deleteBeginning;
exports.remoteDeleteBeginning = remoteDeleteBeginning;