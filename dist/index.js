"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a;
exports.__esModule = true;
var events = {
    ON_SET_CURRENT_TRACK: "ON_SET_CURRENT_TRACK",
    ON_TRACK_QUEUE_CHANGED: "ON_TRACK_QUEUE_CHANGED"
};
exports.events = events;
var listeners = (_a = {},
    _a[events.ON_SET_CURRENT_TRACK] = [],
    _a[events.ON_TRACK_QUEUE_CHANGED] = [],
    _a);
var addListener = function (on, callback) {
    listeners[on].push(callback);
    return function () {
        listeners[on] = listeners[on].filter(function (c) { return c !== callback; });
    };
};
exports.addListener = addListener;
var initialState = {
    tracks: [],
    currentIndex: 0
};
var queueState = __assign({}, initialState);
var enqueueTracks = function (tracks) {
    queueState.tracks = tracks;
    listeners[events.ON_TRACK_QUEUE_CHANGED].forEach(function (callback) {
        return callback(queueState.tracks);
    });
};
exports.enqueueTracks = enqueueTracks;
var appendTracks = function (newTracks) {
    queueState.tracks = queueState.tracks.concat(newTracks);
    listeners[events.ON_TRACK_QUEUE_CHANGED].forEach(function (callback) {
        return callback(queueState.tracks);
    });
};
exports.appendTracks = appendTracks;
var setCurrentTrack = function (id) {
    var index = queueState.tracks.findIndex(function (track) { return track.id === id; });
    if (index === -1) {
        throw new Error("Track is not in the queue");
    }
    queueState.currentIndex = index;
    var track = queueState.tracks[index];
    listeners[events.ON_SET_CURRENT_TRACK].forEach(function (callback) { return callback(track); });
};
exports.setCurrentTrack = setCurrentTrack;
var playNext = function () {
    queueState.currentIndex =
        (queueState.currentIndex + 1) % queueState.tracks.length;
    var track = queueState.tracks[queueState.currentIndex];
    listeners[events.ON_SET_CURRENT_TRACK].forEach(function (callback) { return callback(track); });
    return track;
};
exports.playNext = playNext;
var playPrev = function () {
    queueState.currentIndex =
        (queueState.currentIndex - 1 + queueState.tracks.length) %
            queueState.tracks.length;
    var track = queueState.tracks[queueState.currentIndex];
    listeners[events.ON_SET_CURRENT_TRACK].forEach(function (callback) { return callback(track); });
    return track;
};
exports.playPrev = playPrev;
var resetQueue = function () {
    queueState = __assign({}, initialState);
};
exports.resetQueue = resetQueue;
var getTracks = function () { return queueState.tracks; };
exports.getTracks = getTracks;
var getCurrentIndex = function () { return queueState.currentIndex; };
exports.getCurrentIndex = getCurrentIndex;
var isTrackQueueEmpty = function () { return queueState.tracks.length === 0; };
exports.isTrackQueueEmpty = isTrackQueueEmpty;
