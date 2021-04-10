'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimestamp = exports.remoteDeleteBeginning = exports.deleteBeginning = exports.remoteDeleteEnd = exports.deleteEnd = exports.remoteDeleteRandom = exports.deleteRandom = exports.remoteInsertBeginning = exports.insertBeginning = exports.remoteInsertEnd = exports.insertEnd = exports.remoteInsertRandom = exports.insertRandom = exports.addRowWithId = exports.addRow = undefined;
exports.mockController = mockController;

var _char = require('./char');

var _char2 = _interopRequireDefault(_char);

var _crdt = require('./crdt');

var _crdt2 = _interopRequireDefault(_crdt);

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

function insertRandom(crdt, numberOfOperations) {
  var counter = 0;
  var line = 0;
  var ch = void 0,
      pos = void 0;
  var start = Date.now();

  for (var i = 0; i < numberOfOperations; i++) {
    if (counter === 100) {
      pos = { line: line, ch: counter };
      crdt.handleLocalInsert('\n', pos);

      line++;
      counter = 0;
    } else {
      ch = Math.floor(Math.random() * counter);
      pos = { line: line, ch: ch };
      crdt.handleLocalInsert('a', pos);
      '';
      counter++;
    }
  }

  var end = Date.now();
  return end - start;
}

function remoteInsertRandom(crdt, numberOfOperations) {
  var chars = shuffle(generateChars(numberOfOperations));
  return remoteInsert(crdt, chars);
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
  var totalChars = crdt.totalChars();
  var start = Date.now();
  var line = void 0,
      ch = void 0,
      startPos = void 0,
      endPos = void 0;

  for (var i = totalChars; i > 0; i--) {
    line = Math.floor(Math.random() * crdt.struct.length);
    ch = Math.floor(Math.random() * crdt.struct[line].length);
    startPos = { line: line, ch: ch };
    endPos = { line: line, ch: ch + 1 };
    crdt.handleLocalDelete(startPos, endPos);
  }

  var end = Date.now();
  return end - start;
}

function remoteDeleteRandom(crdt) {
  var charsToDelete = [].concat.apply([], crdt.struct);

  return remoteDelete(crdt, shuffle(charsToDelete));
}

function remoteDelete(crdt, chars) {
  var start = Date.now();

  chars.forEach(function (char) {
    return crdt.handleRemoteDelete(char);
  });

  var end = Date.now();
  return end - start;
}

function insertBeginning(crdt, numberOfOperations) {
  var counter = 0;
  var line = 0;
  var ch = void 0,
      pos = void 0;
  var start = Date.now();

  for (var i = 0; i < numberOfOperations; i++) {
    if (counter === 100) {
      pos = { line: line, ch: counter };
      crdt.handleLocalInsert('\n', pos);

      line++;
      counter = 0;
    } else {
      pos = { line: line, ch: 0 };
      crdt.handleLocalInsert('a', pos);

      counter++;
    }
  }

  var end = Date.now();
  return end - start;
}

function deleteBeginning(crdt) {
  var totalChars = crdt.totalChars();
  var start = Date.now();

  for (var i = totalChars; i > 0; i--) {
    var startPos = { line: 0, ch: 0 };
    var endPos = { line: 0, ch: 1 };

    crdt.handleLocalDelete(startPos, endPos);
  }

  var end = Date.now();
  return end - start;
}

function remoteInsertBeginning(crdt, numberOfOperations) {
  var chars = generateChars(numberOfOperations);
  var descChars = chars.reverse();

  return remoteInsert(crdt, descChars);
}

function remoteDeleteBeginning(crdt) {
  var charsToDelete = [].concat.apply([], crdt.struct);
  return remoteDelete(crdt, charsToDelete);
}

function insertEnd(crdt, numberOfOperations) {
  var counter = 0;
  var line = 0;
  var ch = void 0,
      pos = void 0;
  var start = Date.now();

  for (var i = 0; i < numberOfOperations; i++) {
    pos = { line: line, ch: counter };

    if (counter === 100) {
      crdt.handleLocalInsert('\n', pos);

      line++;
      counter = 0;
    } else {
      crdt.handleLocalInsert('a', pos);

      counter++;
    }
  }

  var end = Date.now();
  return end - start;
}

function deleteEnd(crdt) {
  var totalChars = crdt.totalChars();
  var start = Date.now();
  var line = void 0;
  var ch = void 0;
  var lineNum = void 0;

  for (var i = totalChars; i > 0; i--) {
    lineNum = crdt.struct.length - 1;
    line = crdt.struct[lineNum];
    ch = line[line.length - 1];
    var startPos = { line: lineNum, ch: ch };
    var endPos = { line: lineNum, ch: ch + 1 };

    crdt.handleLocalDelete(startPos, endPos);
  }

  var end = Date.now();
  return end - start;
}

function remoteInsertEnd(crdt, numberOfOperations) {
  var ascChars = generateChars(numberOfOperations);

  return remoteInsert(crdt, ascChars);
}

function remoteDeleteEnd(crdt) {
  var charsToDelete = [].concat.apply([], crdt.struct);
  var reverseToDel = charsToDelete.reverse();
  return remoteDelete(crdt, reverseToDel);
}

function generateChars(numOps) {
  var crdts = [];
  var crdt = void 0;

  // Create crdts based on number of operations requested
  for (var i = 0; i < Math.log10(numOps); i++) {
    crdt = new _crdt2.default(mockController());
    crdts.push(crdt);
  }

  // Insert characters randomly in each crdt
  var numOpsPerCRDT = numOps / crdts.length;
  crdts.forEach(function (crdt) {
    return insertRandom(crdt, numOpsPerCRDT);
  });

  var chars = [];
  var structsWithLines = crdts.map(function (crdt) {
    return crdt.struct;
  });
  var structs = structsWithLines.map(function (struct) {
    return [].concat.apply([], struct);
  });

  var _loop = function _loop(_i) {
    structs.forEach(function (struct) {
      return chars.push(struct[_i]);
    });
  };

  for (var _i = 0; _i < structs[0].length; _i++) {
    _loop(_i);
  }

  return chars;
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
  var numChars = 0;

  var idArray = crdt.struct.map(function (line) {
    return line.map(function (char) {
      return char.position.map(function (id) {
        return id.digit;
      }).join('');
    });
  });
  var digitLengthSum = idArray.reduce(function (acc, line) {
    return acc + line.reduce(function (acc, id) {
      numChars++;
      return acc + id.length;
    }, 0);
  }, 0);

  return Math.floor(digitLengthSum / numChars);
}

function avgPosLength(crdt) {
  var numChars = 0;

  var posArray = crdt.struct.map(function (line) {
    return line.map(function (char) {
      return char.position.length;
    });
  });
  var posLengthSum = posArray.reduce(function (acc, line) {
    return acc + line.reduce(function (acc, len) {
      numChars++;
      return acc + len;
    }, 0);
  }, 0);

  return Math.floor(posLengthSum / numChars);
}

function average(time, operations) {
  return time / operations;
}

function addPadding(value, cellSize) {
  value = String(value);

  if (value.length > cellSize) {
    value = value.slice(0, cellSize);
  }

  var padding = (cellSize - value.length) / 2;
  return ' '.repeat(Math.floor(padding)) + value + ' '.repeat(Math.ceil(padding));
}

function addRowWithId(operations, crdt, func) {
  var totalTime = func(crdt, operations);
  var cell1 = addPadding(operations, CELL_1_SIZE);
  var cell2 = addPadding(totalTime, CELL_2_SIZE);
  var cell3 = addPadding(average(totalTime, operations), CELL_3_SIZE);
  var cell4 = addPadding(avgIdLength(crdt), CELL_4_SIZE);
  var cell5 = addPadding(avgPosLength(crdt), CELL_5_SIZE);

  return '|' + cell1 + '|' + cell2 + '|' + cell3 + '|' + cell4 + '|' + cell5 + '|\n' + '-'.repeat(95);
}

function addRow(operations, crdt, func) {
  var totalTime = func(crdt, operations);
  var cell1 = addPadding(operations, CELL_1_SIZE);
  var cell2 = addPadding(totalTime, CELL_2_SIZE);
  var cell3 = addPadding(average(totalTime, operations), CELL_3_SIZE);

  return '|' + cell1 + '|' + cell2 + '|' + cell3 + '|\n' + '-'.repeat(62);
}

function getTimestamp() {
  var now = new Date();
  var year = now.getUTCFullYear();
  var month = now.getUTCMonth() + 1;
  var date = now.getUTCDate();
  var hours = now.getUTCHours();
  var minutes = now.getUTCMinutes();
  var seconds = now.getUTCSeconds();

  return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds;
}

exports.addRow = addRow;
exports.addRowWithId = addRowWithId;
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
exports.getTimestamp = getTimestamp;