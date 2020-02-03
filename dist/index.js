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
var utils_1 = require("./utils");
exports.errors = {
    trackNotInQueue: new Error("Track not in queue")
};
var initialState = {
    first: null,
    last: null,
    current: null,
    tracks: {}
};
var events = {
    ON_SET_CURRENT_TRACK: "ON_SET_CURRENT_TRACK",
    ON_TRACK_QUEUE_CHANGED: "ON_TRACK_QUEUE_CHANGED"
};
var TrackQueue = function () {
    var _a;
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
    var queueState = __assign({}, initialState);
    var enqueueTracks = function (tracks) {
        var newNodes = utils_1.getLinkedListTracks(tracks, "id").newNodes;
        queueState = __assign({}, initialState);
        queueState.first = tracks[0].id;
        queueState.last = tracks[tracks.length - 1].id;
        queueState.tracks = newNodes;
        listeners[events.ON_TRACK_QUEUE_CHANGED].forEach(function (callback) {
            return callback(queueState.tracks);
        });
    };
    var appendTracks = function (newTracks) {
        var newNodes = utils_1.getLinkedListTracks(newTracks, "id").newNodes;
        queueState.tracks[queueState.last].next = newTracks[0].id;
        newNodes[newTracks[0].id].prev = queueState.last;
        var newQueueState = __assign(__assign({}, queueState), { last: newTracks[newTracks.length - 1].id, tracks: __assign(__assign({}, queueState.tracks), newNodes) });
        queueState = newQueueState;
        listeners[events.ON_TRACK_QUEUE_CHANGED].forEach(function (callback) { return callback(); });
    };
    var setCurrentTrack = function (id) {
        if (!queueState.tracks[id]) {
            throw exports.errors.trackNotInQueue;
        }
        queueState.current = id;
        listeners[events.ON_SET_CURRENT_TRACK].forEach(function (callback) { return callback(); });
    };
    var playNext = function () {
        var next = queueState.tracks[queueState.current].next;
        setCurrentTrack(next);
    };
    var playPrev = function () {
        var prev = queueState.tracks[queueState.current].prev;
        setCurrentTrack(prev);
    };
    var resetQueue = function () {
        queueState = __assign({}, initialState);
        listeners[events.ON_TRACK_QUEUE_CHANGED].forEach(function (callback) {
            return callback(queueState.tracks);
        });
    };
    var getTracks = function () { return queueState.tracks; };
    var getCurrentState = function () { return queueState; };
    var isTrackQueueEmpty = function () { return !queueState.first; };
    return {
        setCurrentTrack: setCurrentTrack,
        isTrackQueueEmpty: isTrackQueueEmpty,
        getTracks: getTracks,
        resetQueue: resetQueue,
        playPrev: playPrev,
        playNext: playNext,
        appendTracks: appendTracks,
        enqueueTracks: enqueueTracks,
        addListener: addListener,
        getCurrentState: getCurrentState,
        events: events
    };
};
exports["default"] = TrackQueue;
