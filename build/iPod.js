"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("babel-polyfill");

var Bluebird = _interopRequireWildcard(require("bluebird"));

var _backendHelper = _interopRequireDefault(require("./backendHelper"));

var _encodeHelper = _interopRequireDefault(require("./encodeHelper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

$(document).ready( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
  var v, up, down, i, menu, number, backlit, songurl, songtitle, songartist, songalbum, songtrackno, audioPlayer, shuffle, getArrowSpan, loadPlayer, count, timeout, nextSong, incr, decr, startup, press, path, getArtists, _getArtists, getAlbums, _getAlbums, getSongs, _getSongs, getAlbumsForArtist, _getAlbumsForArtist, getSongsForArtist, _getSongsForArtist, getSongsForAlbum, _getSongsForAlbum, loadSongsMenu, _loadSongsMenu, loadAlbumsMenu, _loadAlbumsMenu, loadArtistsMenu, _loadArtistsMenu;

  return regeneratorRuntime.wrap(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _loadArtistsMenu = function _loadArtistsMenu3() {
            _loadArtistsMenu = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
              var Artists, promises, albumsByArtistLink, songsByAlbumByArtistList;
              return regeneratorRuntime.wrap(function _callee11$(_context11) {
                while (1) {
                  switch (_context11.prev = _context11.next) {
                    case 0:
                      _context11.next = 2;
                      return getArtists();

                    case 2:
                      Artists = _context11.sent;
                      promises = [];
                      Artists.forEach(function (artist) {
                        promises.push(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
                          var artistLink, artistLi, albums, albumsTile, titleDiv, titleSpan, albumsList, allLink, allTitle, songsTile, songList, songs;
                          return regeneratorRuntime.wrap(function _callee10$(_context10) {
                            while (1) {
                              switch (_context10.prev = _context10.next) {
                                case 0:
                                  artistLink = document.createElement('a');
                                  artistLink.id = "".concat(_encodeHelper["default"].htmlString(artist), "-link");
                                  artistLink.href = "#".concat(_encodeHelper["default"].htmlString(artist));
                                  artistLi = document.createElement('li');
                                  artistLi.innerText = artist;
                                  artistLink.appendChild(artistLi);
                                  artistLink.appendChild(getArrowSpan());
                                  document.getElementById('artists-list').appendChild(artistLink);
                                  _context10.next = 10;
                                  return getAlbumsForArtist(artist);

                                case 10:
                                  albums = _context10.sent;
                                  albumsTile = document.createElement('div');
                                  albumsTile.id = _encodeHelper["default"].htmlString(artist);
                                  albumsTile.style.display = 'none';
                                  albumsTile.classList.add('tile');
                                  titleDiv = document.createElement('div');
                                  titleDiv.classList.add('title');
                                  titleSpan = document.createElement('span');
                                  titleSpan.innerText = artist;
                                  titleDiv.appendChild(titleSpan);
                                  albumsList = document.createElement('ul');
                                  albumsList.id = "".concat(_encodeHelper["default"].htmlString(artist), "-list");
                                  allLink = document.createElement('a');
                                  allLink.id = "".concat(artist, "-all-songs-link");
                                  allLink.href = "#".concat(_encodeHelper["default"].htmlString(artist), "-all-songs");
                                  allTitle = document.createElement('li');
                                  allTitle.innerText = 'All';
                                  allLink.appendChild(allTitle);
                                  allLink.appendChild(getArrowSpan());
                                  albumsList.appendChild(allLink);
                                  albums.forEach(function (album) {
                                    var albumLink = document.createElement('a');
                                    albumLink.id = "".concat(artist, "-").concat(album, "-link");
                                    albumLink.href = "#".concat(_encodeHelper["default"].htmlString(album), "-").concat(_encodeHelper["default"].htmlString(artist));
                                    var albumName = document.createElement('li');
                                    albumName.innerText = album;
                                    albumLink.appendChild(albumName);
                                    albumLink.appendChild(getArrowSpan());
                                    albumsList.appendChild(albumLink);
                                  });
                                  albumsTile.appendChild(titleDiv);
                                  albumsTile.appendChild(albumsList);
                                  document.getElementById('screen').appendChild(albumsTile);
                                  songsTile = document.createElement('div');
                                  songsTile.id = "".concat(_encodeHelper["default"].htmlString(artist), "-all-songs");
                                  songsTile.style.display = 'none';
                                  songsTile.classList.add('tile');
                                  songsTile.classList.add('play');
                                  titleDiv = document.createElement('div');
                                  titleDiv.classList.add('title');
                                  titleSpan = document.createElement('span');
                                  titleSpan.innerText = 'All Songs';
                                  titleDiv.appendChild(titleSpan);
                                  songsTile.appendChild(titleDiv);
                                  songList = document.createElement('ul');
                                  songList.id = "".concat(_encodeHelper["default"].htmlString(artist), "-all-songs-list");
                                  _context10.next = 49;
                                  return getSongsForArtist(artist);

                                case 49:
                                  songs = _context10.sent;
                                  songs.forEach(function (song) {
                                    var songLink = document.createElement('a');
                                    songLink.id = "".concat(_encodeHelper["default"].htmlString(song.album.name), "-").concat(_encodeHelper["default"].htmlString(song.id), "-link");
                                    songLink.href = '#audioplayer';
                                    var songLi = document.createElement('li');
                                    songLi.innerText = song.title;
                                    songLink.setAttribute('artist', song.artist);
                                    songLink.setAttribute('album', song.album.name);
                                    songLink.setAttribute('songID', song.id);
                                    songLink.appendChild(songLi);
                                    songList.appendChild(songLink);
                                  });
                                  songsTile.appendChild(songList);
                                  document.getElementById('screen').appendChild(songsTile);

                                case 53:
                                case "end":
                                  return _context10.stop();
                              }
                            }
                          }, _callee10);
                        }))());
                      });
                      _context11.next = 7;
                      return Bluebird.all(promises);

                    case 7:
                      albumsByArtistLink = document.getElementById('albums-by-artist-list');
                      songsByAlbumByArtistList = document.getElementById('songs-by-album-by-artist-list');
                      Artists.forEach(function (artist) {
                        var albums = document.getElementById("".concat(_encodeHelper["default"].htmlString(artist), "-list")).getElementsByTagName('a');
                        Array.from(albums).filter(function (album) {
                          return !album.id.includes('-all-songs-link');
                        }).forEach(function (album) {
                          albumsByArtistLink.appendChild(album.cloneNode(true));
                          Array.from(document.getElementById(album.getAttribute('href').slice(1)).getElementsByTagName('a')).forEach(function (songLink) {
                            songsByAlbumByArtistList.appendChild(songLink.cloneNode(true));
                          });
                        });
                      });

                    case 10:
                    case "end":
                      return _context11.stop();
                  }
                }
              }, _callee11);
            }));
            return _loadArtistsMenu.apply(this, arguments);
          };

          loadArtistsMenu = function _loadArtistsMenu2() {
            return _loadArtistsMenu.apply(this, arguments);
          };

          _loadAlbumsMenu = function _loadAlbumsMenu3() {
            _loadAlbumsMenu = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
              var Albums, promises, songsByAlbumList;
              return regeneratorRuntime.wrap(function _callee9$(_context9) {
                while (1) {
                  switch (_context9.prev = _context9.next) {
                    case 0:
                      _context9.next = 2;
                      return getAlbums();

                    case 2:
                      Albums = _context9.sent;
                      promises = [];
                      Albums.forEach(function (album) {
                        promises.push(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
                          var albumLink, albumLi, albumData, songTile, titleDiv, titleSpan, songList;
                          return regeneratorRuntime.wrap(function _callee8$(_context8) {
                            while (1) {
                              switch (_context8.prev = _context8.next) {
                                case 0:
                                  albumLink = document.createElement('a');
                                  albumLink.id = "".concat(_encodeHelper["default"].htmlString(album.name), "-").concat(_encodeHelper["default"].htmlString(album.artist), "-link");
                                  albumLink.href = "#".concat(_encodeHelper["default"].htmlString(album.name), "-").concat(_encodeHelper["default"].htmlString(album.artist));
                                  albumLi = document.createElement('li');
                                  albumLi.innerText = album.name;
                                  albumLink.appendChild(albumLi);
                                  albumLink.appendChild(getArrowSpan());
                                  document.getElementById('albums-list').appendChild(albumLink);
                                  _context8.next = 10;
                                  return getSongsForAlbum(album);

                                case 10:
                                  albumData = _context8.sent;
                                  songTile = document.createElement('div');
                                  songTile.id = "".concat(_encodeHelper["default"].htmlString(album.name), "-").concat(_encodeHelper["default"].htmlString(album.artist));
                                  songTile.style.display = 'none';
                                  songTile.classList.add('tile');
                                  songTile.classList.add('play');
                                  titleDiv = document.createElement('div');
                                  titleDiv.classList.add('title');
                                  titleSpan = document.createElement('span');
                                  titleSpan.innerText = album.name;
                                  titleDiv.appendChild(titleSpan);
                                  songList = document.createElement('ul');
                                  songList.id = "".concat(_encodeHelper["default"].htmlString(album.name), "-").concat(_encodeHelper["default"].htmlString(album.artist), "-list");
                                  albumData.tracks.forEach(function (song) {
                                    var songLink = document.createElement('a');
                                    songLink.id = "".concat(_encodeHelper["default"].htmlString(album.name), "-").concat(_encodeHelper["default"].htmlString(song.id), "-link");
                                    songLink.href = '#audioplayer';
                                    var songName = document.createElement('li');
                                    songName.innerText = song.name;
                                    songLink.setAttribute('artist', song.artist ? song.artist : albumData.albumArtist);
                                    songLink.setAttribute('album', album.name);
                                    songLink.setAttribute('songID', song.id);
                                    songLink.appendChild(songName);
                                    songList.appendChild(songLink);
                                  });
                                  songTile.appendChild(titleDiv);
                                  songTile.appendChild(songList);
                                  document.getElementById('screen').appendChild(songTile);

                                case 27:
                                case "end":
                                  return _context8.stop();
                              }
                            }
                          }, _callee8);
                        }))());
                      });
                      _context9.next = 7;
                      return Bluebird.all(promises);

                    case 7:
                      songsByAlbumList = document.getElementById('songs-by-album-list');
                      Albums.forEach(function (album) {
                        var tracks = document.getElementById("".concat(_encodeHelper["default"].htmlString(album.name), "-").concat(_encodeHelper["default"].htmlString(album.artist), "-list")).getElementsByTagName('a');
                        Array.from(tracks).forEach(function (track) {
                          songsByAlbumList.appendChild(track.cloneNode(true));
                        });
                      });

                    case 9:
                    case "end":
                      return _context9.stop();
                  }
                }
              }, _callee9);
            }));
            return _loadAlbumsMenu.apply(this, arguments);
          };

          loadAlbumsMenu = function _loadAlbumsMenu2() {
            return _loadAlbumsMenu.apply(this, arguments);
          };

          _loadSongsMenu = function _loadSongsMenu3() {
            _loadSongsMenu = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
              var Songs;
              return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                  switch (_context7.prev = _context7.next) {
                    case 0:
                      _context7.next = 2;
                      return getSongs();

                    case 2:
                      Songs = _context7.sent;
                      Songs.forEach(function (song) {
                        var songLink = document.createElement('a');
                        songLink.id = "".concat(_encodeHelper["default"].htmlString(song.album.name), "-").concat(_encodeHelper["default"].htmlString(song.id), "-link");
                        songLink.href = '#audioplayer';
                        var songLi = document.createElement('li');
                        songLi.innerText = song.title;
                        songLink.setAttribute('artist', song.artist);
                        songLink.setAttribute('album', song.album.name);
                        songLink.setAttribute('songID', song.id);
                        songLink.appendChild(songLi);
                        document.getElementById('songs-list').appendChild(songLink);
                      });

                    case 4:
                    case "end":
                      return _context7.stop();
                  }
                }
              }, _callee7);
            }));
            return _loadSongsMenu.apply(this, arguments);
          };

          loadSongsMenu = function _loadSongsMenu2() {
            return _loadSongsMenu.apply(this, arguments);
          };

          _getSongsForAlbum = function _getSongsForAlbum3() {
            _getSongsForAlbum = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(album) {
              return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                  switch (_context6.prev = _context6.next) {
                    case 0:
                      return _context6.abrupt("return", new Promise(function (resolve, reject) {
                        var request = new XMLHttpRequest();
                        var url = "".concat(backendURL, "/meta/music/artist/").concat(album.artist, "/").concat(album.name);
                        request.open('GET', url);
                        request.setRequestHeader('Content-Type', 'application/json');

                        _backendHelper["default"].setHandlersForPromise(request, resolve, reject);

                        request.send();
                      }));

                    case 1:
                    case "end":
                      return _context6.stop();
                  }
                }
              }, _callee6);
            }));
            return _getSongsForAlbum.apply(this, arguments);
          };

          getSongsForAlbum = function _getSongsForAlbum2(_x3) {
            return _getSongsForAlbum.apply(this, arguments);
          };

          _getSongsForArtist = function _getSongsForArtist3() {
            _getSongsForArtist = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(artistID) {
              return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      return _context5.abrupt("return", new Promise(function (resolve, reject) {
                        var request = new XMLHttpRequest();
                        var url = "".concat(backendURL, "/meta/music/artist/").concat(artistID, "/songs");
                        request.open('GET', url);
                        request.setRequestHeader('Content-Type', 'application/json');

                        _backendHelper["default"].setHandlersForPromise(request, resolve, reject);

                        request.send();
                      }));

                    case 1:
                    case "end":
                      return _context5.stop();
                  }
                }
              }, _callee5);
            }));
            return _getSongsForArtist.apply(this, arguments);
          };

          getSongsForArtist = function _getSongsForArtist2(_x2) {
            return _getSongsForArtist.apply(this, arguments);
          };

          _getAlbumsForArtist = function _getAlbumsForArtist3() {
            _getAlbumsForArtist = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(artistID) {
              return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      return _context4.abrupt("return", new Promise(function (resolve, reject) {
                        var request = new XMLHttpRequest();
                        var url = "".concat(backendURL, "/meta/music/artist/").concat(artistID, "/albums");
                        request.open('GET', url);
                        request.setRequestHeader('Content-Type', 'application/json');

                        _backendHelper["default"].setHandlersForPromise(request, resolve, reject);

                        request.send();
                      }));

                    case 1:
                    case "end":
                      return _context4.stop();
                  }
                }
              }, _callee4);
            }));
            return _getAlbumsForArtist.apply(this, arguments);
          };

          getAlbumsForArtist = function _getAlbumsForArtist2(_x) {
            return _getAlbumsForArtist.apply(this, arguments);
          };

          _getSongs = function _getSongs3() {
            _getSongs = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
              return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      return _context3.abrupt("return", new Promise(function (resolve, reject) {
                        var request = new XMLHttpRequest();
                        var url = "".concat(backendURL, "/meta/music/songs");
                        request.open('GET', url);
                        request.setRequestHeader('Content-Type', 'application/json');

                        _backendHelper["default"].setHandlersForPromise(request, resolve, reject);

                        request.send();
                      }));

                    case 1:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3);
            }));
            return _getSongs.apply(this, arguments);
          };

          getSongs = function _getSongs2() {
            return _getSongs.apply(this, arguments);
          };

          _getAlbums = function _getAlbums3() {
            _getAlbums = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      return _context2.abrupt("return", new Promise(function (resolve, reject) {
                        var request = new XMLHttpRequest();
                        var url = "".concat(backendURL, "/meta/music/albums");
                        request.open('GET', url);
                        request.setRequestHeader('Content-Type', 'application/json');

                        _backendHelper["default"].setHandlersForPromise(request, resolve, reject);

                        request.send();
                      }));

                    case 1:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2);
            }));
            return _getAlbums.apply(this, arguments);
          };

          getAlbums = function _getAlbums2() {
            return _getAlbums.apply(this, arguments);
          };

          _getArtists = function _getArtists3() {
            _getArtists = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      return _context.abrupt("return", new Promise(function (resolve, reject) {
                        var request = new XMLHttpRequest();
                        var url = "".concat(backendURL, "/meta/music/artists");
                        request.open('GET', url);
                        request.setRequestHeader('Content-Type', 'application/json');

                        _backendHelper["default"].setHandlersForPromise(request, resolve, reject);

                        request.send();
                      }));

                    case 1:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            }));
            return _getArtists.apply(this, arguments);
          };

          getArtists = function _getArtists2() {
            return _getArtists.apply(this, arguments);
          };

          press = function _press() {
            var dir = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'fwd';
            $('.tile').hide();

            if (!startup) {
              $('.on').show('slide', {
                direction: dir === 'fwd' ? 'right' : 'left'
              }, 210);
            } else {
              $('.on').show();
            } // select the first child of the menu


            if (startup || dir === 'fwd') {
              $('.select').removeClass();
              $('.on ul a:first-child').addClass('select');
            }

            if (startup) {
              startup = false;
            }
          };

          nextSong = function _nextSong() {
            number++;

            if (number == songurl.length) {
              //number--; 
              number = 0;
            }

            loadPlayer();
          };

          getArrowSpan = function _getArrowSpan() {
            var arrowSpan = document.createElement('span');
            arrowSpan.classList.add('arrow');
            arrowSpan.innerText = '>';
            return arrowSpan;
          };

          shuffle = function _shuffle(array) {
            var currentIndex = array.length,
                temporaryValue,
                randomIndex; // While there remain elements to shuffle...

            while (0 !== currentIndex) {
              // Pick a remaining element...
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex -= 1; // And swap it with the current element.

              temporaryValue = array[currentIndex];
              array[currentIndex] = array[randomIndex];
              array[randomIndex] = temporaryValue;
            }

            return array;
          };

          up = 0;
          down = 0;
          i = 0;
          menu = 0;
          number = 0;
          backlit = false;
          songurl = [];
          songtitle = [];
          songartist = [];
          songalbum = [];
          songtrackno = [];

          loadPlayer = function loadPlayer() {
            audioPlayer.src = songurl[number];
            audioPlayer.currentTime = 0; //controls the time and timebar

            $("#player audio").bind('timeupdate', function () {
              var currentTime = audioPlayer.currentTime;
              var rem = audioPlayer.duration - currentTime;

              if (rem < 0.1) {
                nextSong();
                return;
              } //var rem = parseInt(audioPlayer.currentTime, 10),


              var pos = currentTime / audioPlayer.duration * 100;
              var minsTot = Math.floor(audioPlayer.duration / 60, 10);
              var secsTot = Math.floor(audioPlayer.duration - minsTot * 60);
              var mins = Math.floor(rem / 60, 10);
              var secs = Math.floor(rem - mins * 60);
              var minsElapsed = Math.floor((audioPlayer.duration - rem) / 60);
              var secsElapsed = secsTot - secs < 0 ? secsTot - secs + 60 : secsTot - secs;
              var newLeftText = minsElapsed + ':' + (secsElapsed > 9 ? secsElapsed : '0' + secsElapsed);
              var newRightText = "-" + mins + ':' + (secs > 9 ? secs : '0' + secs);
              $(".time-left").text(newLeftText);
              $(".time-right").text(newRightText);
              $(".trackbartime").css("width", pos + "%");
              $(".scrolltimelevel").css("width", pos + "%");
            }); //displays the play pause notification

            $("#pauseindicator").hide();
            $("#playindicator").show();
            var volume = audioPlayer.volume * 100;
            $(".volumelevel").css("width", volume + "%");
            $(".tracknumber").text(songtrackno[number]);
            $(".songtitle").text(songtitle[number]);
            $(".songartist").text(songartist[number]);
            $(".albumtitle").text(songalbum[number]);
            audioPlayer.play();
          }; //this button play/pauses the song and changes the indicator.


          $("#playpausebutton").click(function (e) {
            e.preventDefault();

            if (audioPlayer.paused) {
              audioPlayer.play();
              $("#pauseindicator").hide();
              $("#playindicator").show();
            } else {
              audioPlayer.pause();
              $("#pauseindicator").show();
              $("#playindicator").hide();
            }
          }); //end click playpause
          //click the fast forward button

          count = 0; // this variable helps seperate single click and long presses

          timeout = 0;
          $("#fastforwardbutton").click(function (e) {
            e.preventDefault();

            if (count < 1) {
              number++;

              if (number == songurl.length) {
                number--;
              }

              loadPlayer();
            }

            count = 0;
          });
          $("#fastforwardbutton").mousedown(function () {
            timeout = setInterval(function () {
              if ($("#audioplayer").is(":visible") == true) {
                audioPlayer.currentTime += 10;
                count++;
              } //end if

            }, 500);
            return false;
          }); //this function clears the timeout variable

          $("#fastforwardbutton").mouseup(function () {
            clearInterval(timeout);
            return false;
          }); //end ffw
          //click the rewind button

          $("#rewindbutton").click(function (e) {
            e.preventDefault();

            if (count < 1) {
              if (audioPlayer.currentTime > 4) {
                audioPlayer.currentTime = 0;
              } else {
                number--;

                if (number < 0) {
                  number++;
                }

                loadPlayer();
              }
            }

            count = 0;
          });
          $("#rewindbutton").mousedown(function () {
            timeout = setInterval(function () {
              if ($("#audioplayer").is(":visible") == true) {
                audioPlayer.currentTime -= 10;
                count++;
              } //end if

            }, 500);
            return false;
          });
          $("#rewindbutton").mouseup(function () {
            clearInterval(timeout);
            return false;
          }); //end rwd
          //this function plays the net song in the song list when a song ends

          //end nextSong
          incr = function incr() {
            i++; //start sound

            if ($("#audioplayer").is(":visible") == true) {
              if ($(".timeline").is(":visible") == true) {
                $(".timeline").hide();
                $(".volume").show();
                return;
              } //end inner if
              else if ($(".scrolltime").is(":visible") == true) {
                  audioPlayer.currentTime += 5;
                  return;
                } else {
                  var volume = audioPlayer.volume;
                  volume = volume + 0.1;
                  if (volume > 1) volume = 1;
                  audioPlayer.volume = volume;
                  volume = audioPlayer.volume * 100;
                  $(".volumelevel").css("width", volume + "%");
                  return;
                }
            } //end sound
            // code for scroll


            var current = $('.select');

            if ($(current).is(':last-child') == false) {
              $(current).removeClass('select');
              var next = $(current).next();
              $(next).addClass('select');
            }

            menu++; // count for current menu item

            if ($('.on ul a').length < menu + 1) {
              menu = $('.on ul a').length - 1;
            }

            if (menu > 5) {
              var rem = menu - 5;
              $(".on ul a:nth-child(".concat(rem, ")")).hide();
              $(".on ul a:nth-child(".concat(menu + 1, ")")).show();
            } // end if
            // end scroll

          };

          decr = function decr() {
            i--; //start sound

            if ($("#audioplayer").is(":visible") == true) {
              if ($(".timeline").is(":visible") == true) {
                $(".timeline").hide();
                $(".volume").show();
                return;
              } //end inner if
              else if ($(".scrolltime").is(":visible") == true) {
                  audioPlayer.currentTime -= 5;
                  return;
                } else {
                  var volume = audioPlayer.volume;
                  volume = volume - 0.1;
                  if (volume < 0) volume = 0;
                  audioPlayer.volume = volume;
                  volume = audioPlayer.volume * 100;
                  $(".volumelevel").css("width", volume + "%");
                  return;
                }
            } //end sound


            $(".on ul a:nth-child(".concat(menu, ")")).show(); // start scroll

            menu--; // count for current menu item

            if (menu < 0) {
              menu = 0;
            } // alert("unhide");


            var current = $('.select');

            if ($(current).is(':first-child') == false) {
              // alert("last");
              $(current).removeClass('select');
              var prev = $(current).prev();
              $(prev).addClass('select');
            }

            if (menu > 5) {
              var rem = menu - 5; // alert(rem);

              $(".on ul a:nth-child(".concat(rem, ")")).hide();
            } // end if
            // end scroll

          };

          $('.dial').knob({
            min: 0,
            max: 20,
            stopper: false,
            change: function change() {
              if (v > this.cv) {
                if (up) {
                  decr();
                  up = 0;
                } else {
                  up = 1;
                  down = 0;
                }
              } else if (v < this.cv) {
                if (down) {
                  incr();
                  down = 0;
                } else {
                  down = 1;
                  up = 0;
                }
              }

              v = this.cv;
            },
            release: function release(v) {
              /* make something */
              // alert(v);
            }
          });
          $('#homemenu').addClass('on');
          startup = true;
          press();
          // end press
          path = []; // used to store history

          $('#select').click(function (e) {
            e.preventDefault(); //this if is used to allow ffw and rwd using scroll button 

            if ($("#audioplayer").is(":visible") == true) {
              if ($(".timeline").is(":visible") == true) {
                //alert("asdas");
                $(".timeline").hide();
                $(".scrolltime").show();
                return;
              } //inner if
              else if ($(".scrolltime").is(":visible") == true) {
                  $(".scrolltime").hide();
                  $(".timeline").show();
                  return;
                } //else if
                else if ($(".volume").is(":visible") == true) {
                    $(".volume").hide();
                    $(".timeline").show();
                    return;
                  } //else if

            } //outer if


            if ($('.select').attr('id') === 'backlight-link') {
              var backgroundGrad = backlit ? 'linear-gradient(45deg,  rgba(170,167,160,1) 0%,rgba(193,190,185,1) 49%,rgba(191,190,185,1) 51%,rgba(203,202,197,1) 100%)' : 'linear-gradient(45deg, rgb(162, 175, 219) 0%, rgb(186, 194, 223) 49%, rgb(184, 192, 219) 51%, rgb(171, 182, 218) 100%)';
              document.getElementById('screen').style.background = backgroundGrad;
              backlit = !backlit;
              return;
            }

            if ($('.select').attr('id') === 'shuffle-setting-link') {
              e.preventDefault();
              var settings = ['Off', 'Albums', 'Songs'];
              var newIndex = settings.findIndex(function (setting) {
                return setting == $('#shuffle-setting').text();
              }) + 1;

              if (newIndex === settings.length) {
                newIndex = 0;
              }

              $('#shuffle-setting').text(settings[newIndex]);
              return;
            }

            number = 0;
            var clickedOnSong = $(".play").is(":visible") == true;
            var clickedShuffleAll = $('.select').attr('id') === 'shuffle-all-link';

            if (clickedOnSong || clickedShuffleAll) {
              songurl = [];
              songtitle = [];
              songartist = [];
              songalbum = [];
              songtrackno = [];
              var i = 0;
              var tracksInList;

              if (clickedOnSong) {
                var shuffleSetting = $('#shuffle-setting').text();
                tracksInList = $('.on a');

                if (shuffleSetting === 'Songs') {
                  var selectedSong = $('.select').get()[0];
                  tracksInList = [selectedSong].concat(Array.from(shuffle(tracksInList.filter(function (track) {
                    return tracksInList[track] !== selectedSong;
                  }))));
                } else if (shuffleSetting === 'Albums') {
                  var firstAlbum = $('.select').attr('album');
                  var uniqueAlbums = shuffle(_toConsumableArray(new Set($.map(tracksInList, function (track) {
                    return track.getAttribute('album');
                  })))).filter(function (album) {
                    return album !== firstAlbum;
                  });
                  uniqueAlbums.unshift(firstAlbum);
                  tracksInList = [];
                  uniqueAlbums.forEach(function (album) {
                    tracksInList = tracksInList.concat(Array.from($(".on a[album=\"".concat(album, "\"]"))).sort(function (a, b) {
                      return a.getAttribute('songID').toLowerCase().localeCompare(b.getAttribute('songID').toLowerCase());
                    }));
                  });
                }
              } else {
                tracksInList = $('#songs-list a');
                tracksInList = shuffle(tracksInList);
              }

              $(tracksInList).each(function () {
                //var song = $(".on ul a.select li"); 
                var song = $(this);
                var songHref = song.attr("songID");
                var url = "".concat(backendURL, "/audio/").concat(songHref, "/").concat(song.attr('album'));
                var title = song.text();
                var artist = song.attr('artist');
                var album = song.attr("album"); // set track number based on number of elements?

                var trackno = "".concat(i + 1, " of ").concat(tracksInList.length);
                songurl.push(url);
                songtitle.push(title);
                songartist.push(artist);
                songalbum.push(album);
                songtrackno.push(trackno);

                if ($(this).hasClass("select")) {
                  number = i;
                }

                i++;
              }); //alert(songtitle);
            } //end if


            var newon = $('.on');
            var back = $(newon).attr('id');

            if ($('.select').attr('href') == "#audioplayer") {
              if (clickedOnSong || clickedShuffleAll) {
                if (typeof audioPlayer === "undefined") {
                  audioPlayer = new Audio();
                }

                audioPlayer.oncanplaythrough = "isAppLoaded";
                audioPlayer.autoplay = true;
                audioPlayer.controls = "controls";
                audioPlayer.onended = nextSong;
                var nowPlayingLink = document.createElement('a');
                nowPlayingLink.id = 'nowplaying-link';
                nowPlayingLink.href = '#audioplayer';
                var nowPlayingText = document.createElement('li');
                nowPlayingText.textContent = 'Now Playing';
                nowPlayingLink.appendChild(nowPlayingText);
                nowPlayingLink.appendChild(getArrowSpan());
                document.getElementById("player").appendChild(audioPlayer);
                document.getElementById('homemenu-list').appendChild(nowPlayingLink);
                loadPlayer();
              } else {
                if (typeof audioPlayer === 'undefined') {
                  return;
                }
              }
            }

            path.push([back, $('.select').attr('id').split('-link')[0], menu]);
            newon.removeClass('on');
            newon = $('.select').attr('href');
            $("'[id=\"".concat(newon.slice(1, newon.length), "\"]'")).addClass('on');

            if (menu !== 0) {
              menu = 0;
            }

            for (var index = 0; index < 7; index++) {
              $(".on ul a:nth-child(".concat(index, ")")).show();
            }

            for (var _index = $('.on ul a').length; _index > 6; _index--) {
              $(".on ul a:nth-child(".concat(_index, ")")).hide();
            }

            press();
          }); // end select click
          // clicking the back button

          $('#back').click(function (e) {
            e.preventDefault(); // go back to song when sound is shown

            if ($('#audioplayer').is(':visible') == true) {
              if ($('.volume').is(':visible') == true) {
                $('.volume').hide();
                $('.timeline').show();
                return; // end sound
              } // inner if


              if ($('.scrolltime').is(':visible') == true) {
                $('.scrolltime').hide();
                $('.timeline').show();
                return;
              } // else if

            } // outer if
            // alert("lol");


            if (path.length != 0) {
              var back = path.pop();
              menu = back[2]; // alert(back);

              var newon = $('.on');
              newon.removeClass('on');
              $("'[id=\"".concat(back[0], "\"]'")).addClass('on');
              $('.select').removeClass('select');
              $("'[id=\"".concat(back[1], "-link\"]'")).addClass('select');
              up = 0;
              down = 0;
              v = undefined;
              press('back');
            } // end if
            else {
                menu = 0;
              }
          }); // end back button

          _context12.next = 54;
          return loadAlbumsMenu();

        case 54:
          _context12.next = 56;
          return loadArtistsMenu();

        case 56:
          _context12.next = 58;
          return loadSongsMenu();

        case 58:
        case "end":
          return _context12.stop();
      }
    }
  }, _callee12);
})));