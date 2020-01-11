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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var utils_1 = require("./utils");
var initialState = {
    tracks: {},
    orderedIds: []
};
var queueState = __assign({}, initialState);
var enqueueTracks = function (tracks) {
    var _a = utils_1.getLinkedListTracks(tracks, "id"), newNodes = _a.newNodes, orderedIds = _a.orderedIds;
    queueState.tracks = newNodes;
    queueState.orderedIds = orderedIds;
};
exports.enqueueTracks = enqueueTracks;
var appendTracks = function (newTracks) {
    var _a = utils_1.getLinkedListTracks(newTracks, "id"), newNodes = _a.newNodes, orderedIds = _a.orderedIds;
    var ids = initialState.orderedIds;
    var lastTrackId = ids[ids.length - 1];
    var prevTracks = initialState.tracks;
    var newOrderId = orderedIds[0];
    prevTracks[lastTrackId].next = newNodes[newOrderId]["id"];
    newNodes[newOrderId].prev = prevTracks[lastTrackId]["id"];
    var updatedQueueObj = {
        linkedListTracks: __assign(__assign({}, prevTracks), newNodes),
        orderedIds: __spreadArrays(ids, orderedIds)
    };
    queueState.tracks = updatedQueueObj.linkedListTracks;
    queueState.orderedIds = updatedQueueObj.orderedIds;
};
exports.appendTracks = appendTracks;
var getNext = function (trackId) {
    queueState.tracks[trackId].next;
};
exports.getNext = getNext;
var getPrev = function (trackId) {
    queueState.tracks[trackId].prev;
};
exports.getPrev = getPrev;
var resetQueue = function () {
    queueState = __assign({}, initialState);
};
exports.resetQueue = resetQueue;
var getOrderedIds = function () { return queueState.orderedIds; };
exports.getOrderedIds = getOrderedIds;
var getTracks = function () { return getOrderedIds().map(function (id) { return queueState.tracks[id]; }); };
exports.getTracks = getTracks;
var isTrackQueueEmpty = function () { return queueState.orderedIds.length === 0; };
exports.isTrackQueueEmpty = isTrackQueueEmpty;
var getTrackQueueState = function () { return queueState; };
exports.getTrackQueueState = getTrackQueueState;
