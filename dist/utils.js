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
exports.getLinkedListTracks = function (data, key) {
    var newNodes = {};
    var orderedIds = [];
    for (var i = 0; i < data.length; i++) {
        var node = data[i];
        var nextNode = data[i + 1];
        var prevNode = data[i - 1];
        orderedIds.push(node[key]);
        newNodes[node[key]] = __assign(__assign({}, node), { next: i < data.length - 1 ? nextNode[key] : undefined, prev: i > 0 ? prevNode[key] : undefined });
    }
    return { newNodes: newNodes, orderedIds: orderedIds };
};
