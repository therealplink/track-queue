import { ITrack } from "./types";

interface TrackQueueData extends ITrack {}

const events = {
  ON_SET_CURRENT_TRACK: "ON_SET_CURRENT_TRACK",
  ON_TRACK_QUEUE_CHANGED: "ON_TRACK_QUEUE_CHANGED"
};

let listeners = {
  [events.ON_SET_CURRENT_TRACK]: [] as any,
  [events.ON_TRACK_QUEUE_CHANGED]: [] as any
};

const addListener = (on: string, callback) => {
  listeners[on].push(callback);
  return () => {
    listeners[on] = listeners[on].filter(c => c !== callback);
  };
};

export interface TrackQueueState {
  tracks: TrackQueueData;
  currentIndex?: number;
}

const initialState: TrackQueueState = {
  tracks: [] as any,
  currentIndex: 0
};

let queueState: TrackQueueState = {
  ...initialState
};

const enqueueTracks = (tracks: ITrack[]) => {
  queueState.tracks = tracks;
  listeners[events.ON_TRACK_QUEUE_CHANGED].forEach(callback =>
    callback(queueState.tracks)
  );
};

const appendTracks = (newTracks: ITrack[]) => {
  queueState.tracks = queueState.tracks.concat(newTracks);
  listeners[events.ON_TRACK_QUEUE_CHANGED].forEach(callback =>
    callback(queueState.tracks)
  );
};

const setCurrentTrack = (id: string | number) => {
  const index = queueState.tracks.findIndex(track => track.id === id);
  if (index === -1) {
    throw new Error("Track is not in the queue");
  }

  queueState.currentIndex = index;
  const track = queueState.tracks[index];
  listeners[events.ON_SET_CURRENT_TRACK].forEach(callback => callback(track));
};

const playNext = () => {
  queueState.currentIndex =
    (queueState.currentIndex + 1) % queueState.tracks.length;
  const track = queueState.tracks[queueState.currentIndex];
  listeners[events.ON_SET_CURRENT_TRACK].forEach(callback => callback(track));
  return track;
};

const playPrev = () => {
  queueState.currentIndex =
    (queueState.currentIndex - 1 + queueState.tracks.length) %
    queueState.tracks.length;
  const track = queueState.tracks[queueState.currentIndex];
  listeners[events.ON_SET_CURRENT_TRACK].forEach(callback => callback(track));
  return track;
};

const resetQueue = () => {
  queueState = { ...initialState };
};

const getTracks = () => queueState.tracks;
const getCurrentIndex = () => queueState.currentIndex;
const isTrackQueueEmpty = () => queueState.tracks.length === 0;

export {
  setCurrentTrack,
  isTrackQueueEmpty,
  getTracks,
  getCurrentIndex,
  resetQueue,
  playPrev,
  playNext,
  appendTracks,
  enqueueTracks,
  addListener,
  events
};
