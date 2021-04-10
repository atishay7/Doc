(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
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
},{"./char":1,"./identifier":3}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
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
},{"./crdtLinear":2,"./utilLinear":5,"uuid/v1":8}],5:[function(require,module,exports){
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
},{"./char":1,"./crdtLinear":2,"uuid/v1":8}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
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

},{"./lib/bytesToUuid":6,"./lib/rng":7}]},{},[4]);
