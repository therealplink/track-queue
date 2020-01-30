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
exports.__esModule = true;
var events = {
    ON_SET_CURRENT_TRACK: "ON_SET_CURRENT_TRACK",
    ON_TRACK_QUEUE_CHANGED: "ON_TRACK_QUEUE_CHANGED",
    ON_TRACK_STATE_CHANGE: "ON_TRACK_STATE_CHANGE"
};
var TrackQueue = function () {
    var _a;
    var listeners = (_a = {},
        _a[events.ON_SET_CURRENT_TRACK] = [],
        _a[events.ON_TRACK_QUEUE_CHANGED] = [],
        _a[events.ON_TRACK_STATE_CHANGE] = [],
        _a);
    var addListener = function (on, callback) {
        listeners[on].push(callback);
        return function () {
            listeners[on] = listeners[on].filter(function (c) { return c !== callback; });
        };
    };
    var initialState = {
        tracks: [],
        currentIndex: null
    };
    var queueState = __assign({}, initialState);
    var enqueueTracks = function (tracks) {
        queueState.tracks = tracks;
        listeners[events.ON_TRACK_QUEUE_CHANGED].forEach(function (callback) {
            return callback(queueState.tracks);
        });
        listeners[events.ON_TRACK_STATE_CHANGE].forEach(function (callback) { return callback(); });
    };
    var appendTracks = function (newTracks) {
        queueState.tracks = queueState.tracks.concat(newTracks);
        listeners[events.ON_TRACK_QUEUE_CHANGED].forEach(function (callback) {
            return callback(queueState.tracks);
        });
        listeners[events.ON_TRACK_STATE_CHANGE].forEach(function (callback) { return callback(); });
    };
    var setCurrentTrack = function (id) {
        var index = queueState.tracks.findIndex(function (track) { return track.id === id; });
        if (index === -1) {
            throw new Error("Track is not in the queue");
        }
        queueState.currentIndex = index;
        var track = queueState.tracks[index];
        listeners[events.ON_SET_CURRENT_TRACK].forEach(function (callback) { return callback(track); });
        listeners[events.ON_TRACK_STATE_CHANGE].forEach(function (callback) { return callback(); });
    };
    var setCurrentIndex = function (index) {
        var track = queueState.tracks[index];
        if (!track) {
            throw new Error("Track is not in the queue");
        }
        queueState.currentIndex = index;
        listeners[events.ON_SET_CURRENT_TRACK].forEach(function (callback) { return callback(track); });
        listeners[events.ON_TRACK_STATE_CHANGE].forEach(function (callback) { return callback(); });
    };
    var playNext = function () {
        queueState.currentIndex =
            (queueState.currentIndex + 1) % queueState.tracks.length;
        var track = queueState.tracks[queueState.currentIndex];
        listeners[events.ON_SET_CURRENT_TRACK].forEach(function (callback) { return callback(track); });
        listeners[events.ON_TRACK_STATE_CHANGE].forEach(function (callback) { return callback(); });
        return track;
    };
    var playPrev = function () {
        queueState.currentIndex =
            (queueState.currentIndex - 1 + queueState.tracks.length) %
                queueState.tracks.length;
        var track = queueState.tracks[queueState.currentIndex];
        listeners[events.ON_SET_CURRENT_TRACK].forEach(function (callback) { return callback(track); });
        listeners[events.ON_TRACK_STATE_CHANGE].forEach(function (callback) { return callback(); });
        return track;
    };
    var resetQueue = function () {
        queueState = __assign({}, initialState);
        listeners[events.ON_TRACK_QUEUE_CHANGED].forEach(function (callback) {
            return callback(queueState.tracks);
        });
        listeners[events.ON_TRACK_STATE_CHANGE].forEach(function (callback) { return callback(); });
    };
    var getTracks = function () { return queueState.tracks; };
    var getCurrentIndex = function () { return queueState.currentIndex; };
    var getCurrentState = function () { return queueState; };
    var isTrackQueueEmpty = function () { return queueState.tracks.length === 0; };
    return {
        setCurrentTrack: setCurrentTrack,
        isTrackQueueEmpty: isTrackQueueEmpty,
        getTracks: getTracks,
        getCurrentIndex: getCurrentIndex,
        resetQueue: resetQueue,
        playPrev: playPrev,
        playNext: playNext,
        appendTracks: appendTracks,
        enqueueTracks: enqueueTracks,
        addListener: addListener,
        setCurrentIndex: setCurrentIndex,
        getCurrentState: getCurrentState,
        events: events
    };
};
exports["default"] = TrackQueue;
