"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("babel-polyfill");

var _realtimeBpmAnalyzer = _interopRequireDefault(require("realtime-bpm-analyzer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function indexOfMax(arr) {
  if (arr.length === 0) {
    return -1;
  }

  var max = arr[0];
  var maxIndex = 0;

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      maxIndex = i;
      max = arr[i];
    }
  }

  return maxIndex;
}

var BeatAnalyzer = /*#__PURE__*/function () {
  function BeatAnalyzer() {
    _classCallCheck(this, BeatAnalyzer);
  }

  _createClass(BeatAnalyzer, null, [{
    key: "findBeat",
    value: function findBeat(audioElement, bpmCommon) {
      var audioContext = new AudioContext();
      var source = audioContext.createMediaElementSource(audioElement);
      var scriptProcessorNode = audioContext.createScriptProcessor(4096, 1, 1);
      scriptProcessorNode.connect(audioContext.destination);
      source.connect(scriptProcessorNode);
      source.connect(audioContext.destination);
      var onAudioProcess = new _realtimeBpmAnalyzer["default"]({
        scriptNode: {
          bufferSize: 4096,
          numberOfInputChannels: 1,
          numberOfOutputChannels: 1
        },
        pushTime: 2000,
        pushCallback: function pushCallback(err, bpm) {
          if (bpm === undefined) {
            return;
          }

          if (bpmCommon.result === undefined) {
            bpmCommon.result = bpm[indexOfMax(bpm.map(function (res) {
              return res.count;
            }))].tempo;
          } else {
            bpmCommon.result = 0.5 * (bpmCommon.result + bpm[indexOfMax(bpm.map(function (res) {
              return res.count;
            }))].tempo);
          }
        }
      }); // Attach realTime function to audioprocess event.inputBuffer (AudioBuffer)

      scriptProcessorNode.onaudioprocess = function (e) {
        onAudioProcess.analyze(e);
      };
    }
  }, {
    key: "markBeat",
    value: function markBeat(bpm, beatMarkTracker) {
      document.getElementById('beat-marker').innerText = '🥁';
      setTimeout(function () {
        document.getElementById('beat-marker').innerText = '';
      }, 300);
      var newBeatTime = Date.now();
      beatMarkTracker.lastBeat = newBeatTime;
    }
  }]);

  return BeatAnalyzer;
}();

$(document).ready( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
  var audioPlayer, audioCtx, analyser, source, bufferLength, dataArray, bpmCommon, beatMarkTracker, offsetModulo, printBeatIndicator, timeOffset;
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          audioPlayer = document.getElementById('audio-player');
          audioCtx = new (window.AudioContext || window.webkitAudioContext)();
          analyser = audioCtx.createAnalyser();
          source = audioCtx.createMediaElementSource(audioPlayer);
          source.connect(analyser);
          analyser.fftSize = 2048;
          bufferLength = analyser.frequencyBinCount;
          dataArray = new Uint8Array(bufferLength);
          setInterval(function () {
            analyser.getByteTimeDomainData(dataArray);
          }, 17);
          bpmCommon = {
            'result': undefined
          };
          beatMarkTracker = {
            'lastBeat': undefined
          };
          timeOffset = 0;
          audioPlayer.crossOrigin = 'anonymous';
          BeatAnalyzer.findBeat(audioPlayer, bpmCommon);
          setInterval( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var calcStart, sampleFreq, sampleDuration, myTotals, _index, startTime, myTot, index, newTimeOffset, newModulo;

            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (!(bpmCommon === undefined || bpmCommon.result === undefined)) {
                      _context.next = 2;
                      break;
                    }

                    return _context.abrupt("return");

                  case 2:
                    calcStart = Date.now();
                    sampleFreq = 100;
                    sampleDuration = 3000;
                    myTotals = [];
                    _index = 0;

                  case 7:
                    if (!(_index < sampleDuration / sampleFreq)) {
                      _context.next = 17;
                      break;
                    }

                    startTime = Date.now();
                    myTot = 0.0;
                    dataArray.forEach(function (piece) {
                      myTot += Math.abs(piece);
                    });
                    myTotals.push(myTot);
                    _context.next = 14;
                    return new Promise(function (r) {
                      return setTimeout(r, sampleFreq - (Date.now() - startTime));
                    });

                  case 14:
                    _index++;
                    _context.next = 7;
                    break;

                  case 17:
                    index = indexOfMax(myTotals);
                    newTimeOffset = sampleFreq * index;
                    newModulo = newTimeOffset / 1000 % (60 / bpmCommon.result);

                    if (offsetModulo === undefined || newModulo < offsetModulo) {
                      offsetModulo = newModulo;
                      timeOffset = newTimeOffset;
                      setTimeout(function () {
                        setTimeout(function () {
                          BeatAnalyzer.markBeat(bpmCommon.result, beatMarkTracker);

                          if (printBeatIndicator !== undefined) {
                            clearInterval(printBeatIndicator);
                          }

                          printBeatIndicator = setInterval(function () {
                            BeatAnalyzer.markBeat(bpmCommon.result, beatMarkTracker);
                          }, 1000 * 60 / bpmCommon.result);
                        }, timeOffset);
                      }, 4000 - (Date.now() - calcStart));
                    }

                  case 21:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          })), 12000);

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
})));
var _default = BeatAnalyzer;
exports["default"] = _default;