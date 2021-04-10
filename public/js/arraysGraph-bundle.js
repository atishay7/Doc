(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{"./crdt":3,"./crdtLinear":4,"./util":6,"./utilLinear":7,"uuid/v1":10}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Char = function () {
  function Char(value, counter, siteId, identifiers) {
    _classCallCheck(this, Char);

    this.position = identifiers;
    this.counter = counter;
    this.siteId = siteId;
    this.value = value;
  }

  _createClass(Char, [{
    key: "compareTo",
    value: function compareTo(otherChar) {
      var comp = void 0,
          id1 = void 0,
          id2 = void 0;
      var pos1 = this.position;
      var pos2 = otherChar.position;

      for (var i = 0; i < Math.min(pos1.length, pos2.length); i++) {
        id1 = pos1[i];
        id2 = pos2[i];
        comp = id1.compareTo(id2);

        if (comp !== 0) {
          return comp;
        }
      }

      if (pos1.length < pos2.length) {
        return -1;
      } else if (pos1.length > pos2.length) {
        return 1;
      } else {
        return 0;
      }
    }
  }]);

  return Char;
}();

exports.default = Char;
},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _identifier = require('./identifier');

var _identifier2 = _interopRequireDefault(_identifier);

var _char = require('./char');

var _char2 = _interopRequireDefault(_char);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CRDT = function () {
  function CRDT(controller) {
    var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 32;
    var boundary = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
    var strategy = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'random';

    _classCallCheck(this, CRDT);

    this.controller = controller;
    this.vector = controller.vector;
    this.struct = [[]];
    this.siteId = controller.siteId;
    this.base = base;
    this.boundary = boundary;
    this.strategy = strategy;
    this.strategyCache = [];
  }

  _createClass(CRDT, [{
    key: 'handleLocalInsert',
    value: function handleLocalInsert(value, pos) {
      this.vector.increment();
      var char = this.generateChar(value, pos);
      this.insertChar(char, pos);
      this.controller.broadcastInsertion(char);
    }
  }, {
    key: 'handleRemoteInsert',
    value: function handleRemoteInsert(char) {
      var pos = this.findInsertPosition(char);
      this.insertChar(char, pos);
      this.controller.insertIntoEditor(char.value, pos, char.siteId);
    }
  }, {
    key: 'insertChar',
    value: function insertChar(char, pos) {
      if (pos.line === this.struct.length) {
        this.struct.push([]);
      }

      // if inserting a newline, split line into two lines
      if (char.value === "\n") {
        var lineAfter = this.struct[pos.line].splice(pos.ch);

        if (lineAfter.length === 0) {
          this.struct[pos.line].splice(pos.ch, 0, char);
        } else {
          var lineBefore = this.struct[pos.line].concat(char);
          this.struct.splice(pos.line, 1, lineBefore, lineAfter);
        }
      } else {
        this.struct[pos.line].splice(pos.ch, 0, char);
      }
    }
  }, {
    key: 'handleLocalDelete',
    value: function handleLocalDelete(startPos, endPos) {
      var chars = void 0;
      var newlineRemoved = false;

      // for multi-line deletes
      if (startPos.line !== endPos.line) {
        // delete chars on first line from startPos.ch to end of line
        newlineRemoved = true;
        chars = this.deleteMultipleLines(startPos, endPos);

        // single-line deletes
      } else {
        chars = this.deleteSingleLine(startPos, endPos);

        if (chars.find(function (char) {
          return char.value === '\n';
        })) newlineRemoved = true;
      }

      this.broadcast(chars);
      this.removeEmptyLines();

      if (newlineRemoved && this.struct[startPos.line + 1]) {
        this.mergeLines(startPos.line);
      }
    }
  }, {
    key: 'broadcast',
    value: function broadcast(chars) {
      var _this = this;

      chars.forEach(function (char) {
        _this.vector.increment();
        _this.controller.broadcastDeletion(char, _this.vector.getLocalVersion());
      });
    }
  }, {
    key: 'deleteMultipleLines',
    value: function deleteMultipleLines(startPos, endPos) {
      var chars = this.struct[startPos.line].splice(startPos.ch);
      var line = void 0;

      for (line = startPos.line + 1; line < endPos.line; line++) {
        chars = chars.concat(this.struct[line].splice(0));
      }

      // todo for loop inside crdt
      if (this.struct[endPos.line]) {
        chars = chars.concat(this.struct[endPos.line].splice(0, endPos.ch));
      }

      return chars;
    }
  }, {
    key: 'deleteSingleLine',
    value: function deleteSingleLine(startPos, endPos) {
      var charNum = endPos.ch - startPos.ch;
      var chars = this.struct[startPos.line].splice(startPos.ch, charNum);

      return chars;
    }

    // when deleting newline, concat line with next line

  }, {
    key: 'mergeLines',
    value: function mergeLines(line) {
      var mergedLine = this.struct[line].concat(this.struct[line + 1]);
      this.struct.splice(line, 2, mergedLine);
    }
  }, {
    key: 'removeEmptyLines',
    value: function removeEmptyLines() {
      for (var line = 0; line < this.struct.length; line++) {
        if (this.struct[line].length === 0) {
          this.struct.splice(line, 1);
          line--;
        }
      }

      if (this.struct.length === 0) {
        this.struct.push([]);
      }
    }
  }, {
    key: 'handleRemoteDelete',
    value: function handleRemoteDelete(char, siteId) {
      var pos = this.findPosition(char);

      if (!pos) return;

      this.struct[pos.line].splice(pos.ch, 1);

      if (char.value === "\n" && this.struct[pos.line + 1]) {
        this.mergeLines(pos.line);
      }

      this.removeEmptyLines();
      this.controller.deleteFromEditor(char.value, pos, siteId);
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      return this.struct.length === 1 && this.struct[0].length === 0;
    }
  }, {
    key: 'findPosition',
    value: function findPosition(char) {
      var minLine = 0;
      var totalLines = this.struct.length;
      var maxLine = totalLines - 1;
      var lastLine = this.struct[maxLine];
      var currentLine = void 0,
          midLine = void 0,
          charIdx = void 0,
          minCurrentLine = void 0,
          lastChar = void 0,
          maxCurrentLine = void 0,
          minLastChar = void 0,
          maxLastChar = void 0;

      // check if struct is empty or char is less than first char
      if (this.isEmpty() || char.compareTo(this.struct[0][0]) < 0) {
        return false;
      }

      lastChar = lastLine[lastLine.length - 1];

      // char is greater than all existing chars (insert at end)
      if (char.compareTo(lastChar) > 0) {
        return false;
      }

      // binary search
      while (minLine + 1 < maxLine) {
        midLine = Math.floor(minLine + (maxLine - minLine) / 2);
        currentLine = this.struct[midLine];
        lastChar = currentLine[currentLine.length - 1];

        if (char.compareTo(lastChar) === 0) {
          return { line: midLine, ch: currentLine.length - 1 };
        } else if (char.compareTo(lastChar) < 0) {
          maxLine = midLine;
        } else {
          minLine = midLine;
        }
      }

      // Check between min and max line.
      minCurrentLine = this.struct[minLine];
      minLastChar = minCurrentLine[minCurrentLine.length - 1];
      maxCurrentLine = this.struct[maxLine];
      maxLastChar = maxCurrentLine[maxCurrentLine.length - 1];

      if (char.compareTo(minLastChar) <= 0) {
        charIdx = this.findIndexInLine(char, minCurrentLine);
        return { line: minLine, ch: charIdx };
      } else {
        charIdx = this.findIndexInLine(char, maxCurrentLine);
        return { line: maxLine, ch: charIdx };
      }
    }
  }, {
    key: 'findIndexInLine',
    value: function findIndexInLine(char, line) {
      var left = 0;
      var right = line.length - 1;
      var mid = void 0,
          compareNum = void 0;

      if (line.length === 0 || char.compareTo(line[left]) < 0) {
        return left;
      } else if (char.compareTo(line[right]) > 0) {
        return this.struct.length;
      }

      while (left + 1 < right) {
        mid = Math.floor(left + (right - left) / 2);
        compareNum = char.compareTo(line[mid]);

        if (compareNum === 0) {
          return mid;
        } else if (compareNum > 0) {
          left = mid;
        } else {
          right = mid;
        }
      }

      if (char.compareTo(line[left]) === 0) {
        return left;
      } else if (char.compareTo(line[right]) === 0) {
        return right;
      } else {
        return false;
      }
    }

    // could be refactored to look prettier

  }, {
    key: 'findInsertPosition',
    value: function findInsertPosition(char) {
      var minLine = 0;
      var totalLines = this.struct.length;
      var maxLine = totalLines - 1;
      var lastLine = this.struct[maxLine];
      var currentLine = void 0,
          midLine = void 0,
          charIdx = void 0,
          minCurrentLine = void 0,
          lastChar = void 0,
          maxCurrentLine = void 0,
          minLastChar = void 0,
          maxLastChar = void 0;

      // check if struct is empty or char is less than first char
      if (this.isEmpty() || char.compareTo(this.struct[0][0]) <= 0) {
        return { line: 0, ch: 0 };
      }

      lastChar = lastLine[lastLine.length - 1];

      // char is greater than all existing chars (insert at end)
      if (char.compareTo(lastChar) > 0) {
        return this.findEndPosition(lastChar, lastLine, totalLines);
      }

      // binary search
      while (minLine + 1 < maxLine) {
        midLine = Math.floor(minLine + (maxLine - minLine) / 2);
        currentLine = this.struct[midLine];
        lastChar = currentLine[currentLine.length - 1];

        if (char.compareTo(lastChar) === 0) {
          return { line: midLine, ch: currentLine.length - 1 };
        } else if (char.compareTo(lastChar) < 0) {
          maxLine = midLine;
        } else {
          minLine = midLine;
        }
      }

      // Check between min and max line.
      minCurrentLine = this.struct[minLine];
      minLastChar = minCurrentLine[minCurrentLine.length - 1];
      maxCurrentLine = this.struct[maxLine];
      maxLastChar = maxCurrentLine[maxCurrentLine.length - 1];

      if (char.compareTo(minLastChar) <= 0) {
        charIdx = this.findInsertIndexInLine(char, minCurrentLine);
        return { line: minLine, ch: charIdx };
      } else {
        charIdx = this.findInsertIndexInLine(char, maxCurrentLine);
        return { line: maxLine, ch: charIdx };
      }
    }
  }, {
    key: 'findEndPosition',
    value: function findEndPosition(lastChar, lastLine, totalLines) {
      if (lastChar.value === "\n") {
        return { line: totalLines, ch: 0 };
      } else {
        return { line: totalLines - 1, ch: lastLine.length };
      }
    }

    // binary search to find char in a line

  }, {
    key: 'findInsertIndexInLine',
    value: function findInsertIndexInLine(char, line) {
      var left = 0;
      var right = line.length - 1;
      var mid = void 0,
          compareNum = void 0;

      if (line.length === 0 || char.compareTo(line[left]) < 0) {
        return left;
      } else if (char.compareTo(line[right]) > 0) {
        return this.struct.length;
      }

      while (left + 1 < right) {
        mid = Math.floor(left + (right - left) / 2);
        compareNum = char.compareTo(line[mid]);

        if (compareNum === 0) {
          return mid;
        } else if (compareNum > 0) {
          left = mid;
        } else {
          right = mid;
        }
      }

      if (char.compareTo(line[left]) === 0) {
        return left;
      } else {
        return right;
      }
    }
  }, {
    key: 'findPosBefore',
    value: function findPosBefore(pos) {
      var ch = pos.ch;
      var line = pos.line;

      if (ch === 0 && line === 0) {
        return [];
      } else if (ch === 0 && line !== 0) {
        line = line - 1;
        ch = this.struct[line].length;
      }

      return this.struct[line][ch - 1].position;
    }
  }, {
    key: 'findPosAfter',
    value: function findPosAfter(pos) {
      var ch = pos.ch;
      var line = pos.line;

      var numLines = this.struct.length;
      var numChars = this.struct[line] && this.struct[line].length || 0;

      if (line === numLines - 1 && ch === numChars) {
        return [];
      } else if (line < numLines - 1 && ch === numChars) {
        line = line + 1;
        ch = 0;
      } else if (line > numLines - 1 && ch === 0) {
        return [];
      }

      return this.struct[line][ch].position;
    }
  }, {
    key: 'generateChar',
    value: function generateChar(val, pos) {
      var posBefore = this.findPosBefore(pos);
      var posAfter = this.findPosAfter(pos);
      var newPos = this.generatePosBetween(posBefore, posAfter);

      return new _char2.default(val, this.vector.localVersion.counter, this.siteId, newPos);
    }
  }, {
    key: 'retrieveStrategy',
    value: function retrieveStrategy(level) {
      if (this.strategyCache[level]) return this.strategyCache[level];
      var strategy = void 0;

      switch (this.strategy) {
        case 'plus':
          strategy = '+';
        case 'minus':
          strategy = '-';
        case 'random':
          strategy = Math.round(Math.random()) === 0 ? '+' : '-';
        default:
          strategy = level % 2 === 0 ? '+' : '-';
      }

      this.strategyCache[level] = strategy;
      return strategy;
    }
  }, {
    key: 'generatePosBetween',
    value: function generatePosBetween(pos1, pos2) {
      var newPos = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var level = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

      // change 2 to any other number to change base multiplication
      var base = Math.pow(2, level) * this.base;
      var boundaryStrategy = this.retrieveStrategy(level);

      var id1 = pos1[0] || new _identifier2.default(0, this.siteId);
      var id2 = pos2[0] || new _identifier2.default(base, this.siteId);

      if (id2.digit - id1.digit > 1) {

        var newDigit = this.generateIdBetween(id1.digit, id2.digit, boundaryStrategy);
        newPos.push(new _identifier2.default(newDigit, this.siteId));
        return newPos;
      } else if (id2.digit - id1.digit === 1) {

        newPos.push(id1);
        return this.generatePosBetween(pos1.slice(1), [], newPos, level + 1);
      } else if (id1.digit === id2.digit) {
        if (id1.siteId < id2.siteId) {
          newPos.push(id1);
          return this.generatePosBetween(pos1.slice(1), [], newPos, level + 1);
        } else if (id1.siteId === id2.siteId) {
          newPos.push(id1);
          return this.generatePosBetween(pos1.slice(1), pos2.slice(1), newPos, level + 1);
        } else {
          throw new Error("Fix Position Sorting");
        }
      }
    }
    /*
    Math.random gives you a range that is inclusive of the min and exclusive of the max
    so have to add and subtract ones to get them all into that format
    
    if max - min <= boundary, the boundary doesn't matter
        newDigit > min, newDigit < max
        ie (min+1...max)
        so, min = min + 1
    if max - min > boundary and the boundary is negative
        min = max - boundary
        newDigit >= min, newDigit < max
        ie (min...max)
    if max - min > boundary and the boundary is positive
        max = min + boundary
        newDigit > min, newDigit <= max
        ie (min+1...max+1)
        so, min = min + 1 and max = max + 1
    
    now all are (min...max)
    */

  }, {
    key: 'generateIdBetween',
    value: function generateIdBetween(min, max, boundaryStrategy) {
      if (max - min < this.boundary) {
        min = min + 1;
      } else {
        if (boundaryStrategy === '-') {
          min = max - this.boundary;
        } else {
          min = min + 1;
          max = min + this.boundary;
        }
      }
      return Math.floor(Math.random() * (max - min)) + min;
    }
  }, {
    key: 'totalChars',
    value: function totalChars() {
      return this.struct.map(function (line) {
        return line.length;
      }).reduce(function (acc, val) {
        return acc + val;
      });
    }
  }, {
    key: 'toText',
    value: function toText() {
      return this.struct.map(function (line) {
        return line.map(function (char) {
          return char.value;
        }).join('');
      }).join('');
    }
  }]);

  return CRDT;
}();

exports.default = CRDT;
},{"./char":2,"./identifier":5}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _identifier = require('./identifier');

var _identifier2 = _interopRequireDefault(_identifier);

var _char = require('./char');

var _char2 = _interopRequireDefault(_char);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CRDT = function () {
  function CRDT(controller) {
    var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 32;
    var boundary = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
    var strategy = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'random';
    var mult = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 2;

    _classCallCheck(this, CRDT);

    this.controller = controller;
    this.vector = controller.vector;
    this.struct = [];
    this.siteId = controller.siteId;
    this.text = "";
    this.base = base;
    this.boundary = boundary;
    this.strategy = strategy;
    this.strategyCache = [];
    this.mult = mult;
  }

  _createClass(CRDT, [{
    key: 'handleLocalInsert',
    value: function handleLocalInsert(val, index) {
      this.vector.increment();

      var char = this.generateChar(val, index);
      this.insertChar(index, char);
      this.insertText(char.value, index);

      this.controller.broadcastInsertion(char);
    }
  }, {
    key: 'handleRemoteInsert',
    value: function handleRemoteInsert(char) {
      var index = this.findInsertIndex(char);

      this.insertChar(index, char);
      this.insertText(char.value, index);

      this.controller.insertIntoEditor(char.value, index, char.siteId);
    }
  }, {
    key: 'insertChar',
    value: function insertChar(index, char) {
      this.struct.splice(index, 0, char);
    }
  }, {
    key: 'handleLocalDelete',
    value: function handleLocalDelete(idx) {
      this.vector.increment();

      var char = this.struct.splice(idx, 1)[0];
      this.deleteText(idx);

      this.controller.broadcastDeletion(char);
    }
  }, {
    key: 'handleRemoteDelete',
    value: function handleRemoteDelete(char, siteId) {
      var index = this.findIndexByPosition(char);
      this.struct.splice(index, 1);

      this.controller.deleteFromEditor(char.value, index, siteId);
      this.deleteText(index);
    }
  }, {
    key: 'findInsertIndex',
    value: function findInsertIndex(char) {
      var left = 0;
      var right = this.struct.length - 1;
      var mid = void 0,
          compareNum = void 0;

      if (this.struct.length === 0 || char.compareTo(this.struct[left]) < 0) {
        return left;
      } else if (char.compareTo(this.struct[right]) > 0) {
        return this.struct.length;
      }

      while (left + 1 < right) {
        mid = Math.floor(left + (right - left) / 2);
        compareNum = char.compareTo(this.struct[mid]);

        if (compareNum === 0) {
          return mid;
        } else if (compareNum > 0) {
          left = mid;
        } else {
          right = mid;
        }
      }

      return char.compareTo(this.struct[left]) === 0 ? left : right;
    }
  }, {
    key: 'findIndexByPosition',
    value: function findIndexByPosition(char) {
      var left = 0;
      var right = this.struct.length - 1;
      var mid = void 0,
          compareNum = void 0;

      if (this.struct.length === 0) {
        throw new Error("Character does not exist in CRDT.");
      }

      while (left + 1 < right) {
        mid = Math.floor(left + (right - left) / 2);
        compareNum = char.compareTo(this.struct[mid]);

        if (compareNum === 0) {
          return mid;
        } else if (compareNum > 0) {
          left = mid;
        } else {
          right = mid;
        }
      }

      if (char.compareTo(this.struct[left]) === 0) {
        return left;
      } else if (char.compareTo(this.struct[right]) === 0) {
        return right;
      } else {
        throw new Error("Character does not exist in CRDT.");
      }
    }
  }, {
    key: 'generateChar',
    value: function generateChar(val, index) {
      var posBefore = this.struct[index - 1] && this.struct[index - 1].position || [];
      var posAfter = this.struct[index] && this.struct[index].position || [];
      var newPos = this.generatePosBetween(posBefore, posAfter);
      var localCounter = this.vector.localVersion.counter;

      return new _char2.default(val, localCounter, this.siteId, newPos);
    }
  }, {
    key: 'retrieveStrategy',
    value: function retrieveStrategy(level) {
      if (this.strategyCache[level]) return this.strategyCache[level];
      var strategy = void 0;

      switch (this.strategy) {
        case 'plus':
          strategy = '+';
          break;
        case 'minus':
          strategy = '-';
          break;
        case 'random':
          strategy = Math.round(Math.random()) === 0 ? '+' : '-';
          break;
        case 'every2nd':
          strategy = (level + 1) % 2 === 0 ? '-' : '+';
          break;
        case 'every3rd':
          strategy = (level + 1) % 3 === 0 ? '-' : '+';
          break;
        default:
          strategy = (level + 1) % 2 === 0 ? '-' : '+';
          break;
      }

      this.strategyCache[level] = strategy;
      return strategy;
    }
  }, {
    key: 'generatePosBetween',
    value: function generatePosBetween(pos1, pos2) {
      var newPos = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var level = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

      var base = Math.pow(this.mult, level) * this.base;
      var boundaryStrategy = this.retrieveStrategy(level);

      var id1 = pos1[0] || new _identifier2.default(0, this.siteId);
      var id2 = pos2[0] || new _identifier2.default(base, this.siteId);

      if (id2.digit - id1.digit > 1) {

        var newDigit = this.generateIdBetween(id1.digit, id2.digit, boundaryStrategy);
        newPos.push(new _identifier2.default(newDigit, this.siteId));
        return newPos;
      } else if (id2.digit - id1.digit === 1) {

        newPos.push(id1);
        return this.generatePosBetween(pos1.slice(1), [], newPos, level + 1);
      } else if (id1.digit === id2.digit) {
        if (id1.siteId < id2.siteId) {
          newPos.push(id1);
          return this.generatePosBetween(pos1.slice(1), [], newPos, level + 1);
        } else if (id1.siteId === id2.siteId) {
          newPos.push(id1);
          return this.generatePosBetween(pos1.slice(1), pos2.slice(1), newPos, level + 1);
        } else {
          throw new Error("Fix Position Sorting");
        }
      }
    }
    /*
    Math.random gives you a range that is inclusive of the min and exclusive of the max
    so have to add and subtract ones to get them all into that format
    
    if max - min <= boundary, the boundary doesn't matter
        newDigit > min, newDigit < max
        ie (min+1...max)
        so, min = min + 1
    if max - min > boundary and the boundary is negative
        min = max - boundary
        newDigit >= min, newDigit < max
        ie (min...max)
    if max - min > boundary and the boundary is positive
        max = min + boundary
        newDigit > min, newDigit <= max
        ie (min+1...max+1)
        so, min = min + 1 and max = max + 1
    
    now all are (min...max)
    */

  }, {
    key: 'generateIdBetween',
    value: function generateIdBetween(min, max, boundaryStrategy) {
      if (max - min < this.boundary) {
        min = min + 1;
      } else {
        if (boundaryStrategy === '-') {
          min = max - this.boundary;
        } else {
          min = min + 1;
          max = min + this.boundary;
        }
      }
      return Math.floor(Math.random() * (max - min)) + min;
    }
  }, {
    key: 'insertText',
    value: function insertText(val, index) {
      this.text = this.text.slice(0, index) + val + this.text.slice(index);
    }
  }, {
    key: 'deleteText',
    value: function deleteText(index) {
      this.text = this.text.slice(0, index) + this.text.slice(index + 1);
    }
  }, {
    key: 'populateText',
    value: function populateText() {
      this.text = this.struct.map(function (char) {
        return char.value;
      }).join('');
    }
  }]);

  return CRDT;
}();

exports.default = CRDT;
},{"./char":2,"./identifier":5}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Identifier = function () {
  function Identifier(digit, siteId) {
    _classCallCheck(this, Identifier);

    this.digit = digit;
    this.siteId = siteId;
  }

  // Compare identifiers using their digit value with siteID as the tiebreaker
  // If identifers are equal, return 0


  _createClass(Identifier, [{
    key: "compareTo",
    value: function compareTo(otherId) {
      if (this.digit < otherId.digit) {
        return -1;
      } else if (this.digit > otherId.digit) {
        return 1;
      } else {
        if (this.siteId < otherId.siteId) {
          return -1;
        } else if (this.siteId > otherId.siteId) {
          return 1;
        } else {
          return 0;
        }
      }
    }
  }]);

  return Identifier;
}();

exports.default = Identifier;
},{}],6:[function(require,module,exports){
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
},{"./char":2,"./crdt":3,"uuid/v1":10}],7:[function(require,module,exports){
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
},{"./char":2,"./crdtLinear":4,"uuid/v1":10}],8:[function(require,module,exports){
/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  return bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]];
}

module.exports = bytesToUuid;

},{}],9:[function(require,module,exports){
(function (global){
// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection
var rng;

var crypto = global.crypto || global.msCrypto; // for IE 11
if (crypto && crypto.getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef
  rng = function whatwgRNG() {
    crypto.getRandomValues(rnds8);
    return rnds8;
  };
}

if (!rng) {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);
  rng = function() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}

module.exports = rng;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],10:[function(require,module,exports){
var rng = require('./lib/rng');
var bytesToUuid = require('./lib/bytesToUuid');

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

// random #'s we need to init node and clockseq
var _seedBytes = rng();

// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
var _nodeId = [
  _seedBytes[0] | 0x01,
  _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
];

// Per 4.2.2, randomize (14 bit) clockseq
var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

// Previous uuid creation time
var _lastMSecs = 0, _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};

  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  var node = options.node || _nodeId;
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;

},{"./lib/bytesToUuid":8,"./lib/rng":9}]},{},[1]);
