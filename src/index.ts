import { ITrack } from "./types";

interface TrackQueueData extends ITrack {}

export interface TrackQueueState {
  tracks: TrackQueueData;
  currentIndex?: number;
}

const events = {
  ON_SET_CURRENT_TRACK: "ON_SET_CURRENT_TRACK",
  ON_TRACK_QUEUE_CHANGED: "ON_TRACK_QUEUE_CHANGED",
  ON_TRACK_STATE_CHANGE: "ON_TRACK_STATE_CHANGE"
};

const TrackQueue = () => {
  let listeners = {
    [events.ON_SET_CURRENT_TRACK]: [] as any,
    [events.ON_TRACK_QUEUE_CHANGED]: [] as any,
    [events.ON_TRACK_STATE_CHANGE]: [] as any
  };

  const addListener = (on: string, callback) => {
    listeners[on].push(callback);
    return () => {
      listeners[on] = listeners[on].filter(c => c !== callback);
    };
  };

  const initialState: TrackQueueState = {
    tracks: [] as any,
    currentIndex: null
  };

  let queueState: TrackQueueState = {
    ...initialState
  };

  const enqueueTracks = (tracks: ITrack[]) => {
    queueState.tracks = tracks;
    listeners[events.ON_TRACK_QUEUE_CHANGED].forEach(callback =>
      callback(queueState.tracks)
    );
    listeners[events.ON_TRACK_STATE_CHANGE].forEach(callback => callback());
  };

  const appendTracks = (newTracks: ITrack[]) => {
    queueState.tracks = queueState.tracks.concat(newTracks);
    listeners[events.ON_TRACK_QUEUE_CHANGED].forEach(callback =>
      callback(queueState.tracks)
    );
    listeners[events.ON_TRACK_STATE_CHANGE].forEach(callback => callback());
  };

  const setCurrentTrack = (id: string | number) => {
    const index = queueState.tracks.findIndex(track => track.id === id);
    if (index === -1) {
      throw new Error("Track is not in the queue");
    }

    queueState.currentIndex = index;
    const track = queueState.tracks[index];
    listeners[events.ON_SET_CURRENT_TRACK].forEach(callback => callback(track));
    listeners[events.ON_TRACK_STATE_CHANGE].forEach(callback => callback());
  };

  const setCurrentIndex = (index: number) => {
    const track = queueState.tracks[index];
    if (!track) {
      throw new Error("Track is not in the queue");
    }
    queueState.currentIndex = index;
    listeners[events.ON_SET_CURRENT_TRACK].forEach(callback => callback(track));
    listeners[events.ON_TRACK_STATE_CHANGE].forEach(callback => callback());
  };

  const playNext = () => {
    queueState.currentIndex =
      (queueState.currentIndex + 1) % queueState.tracks.length;
    const track = queueState.tracks[queueState.currentIndex];
    listeners[events.ON_SET_CURRENT_TRACK].forEach(callback => callback(track));
    listeners[events.ON_TRACK_STATE_CHANGE].forEach(callback => callback());
    return track;
  };

  const playPrev = () => {
    queueState.currentIndex =
      (queueState.currentIndex - 1 + queueState.tracks.length) %
      queueState.tracks.length;
    const track = queueState.tracks[queueState.currentIndex];
    listeners[events.ON_SET_CURRENT_TRACK].forEach(callback => callback(track));
    listeners[events.ON_TRACK_STATE_CHANGE].forEach(callback => callback());
    return track;
  };

  const resetQueue = () => {
    queueState = { ...initialState };
    listeners[events.ON_TRACK_QUEUE_CHANGED].forEach(callback =>
      callback(queueState.tracks)
    );
    listeners[events.ON_TRACK_STATE_CHANGE].forEach(callback => callback());
  };

  const getTracks = () => queueState.tracks;
  const getCurrentIndex = () => queueState.currentIndex;
  const getCurrentState = () => queueState;
  const isTrackQueueEmpty = () => queueState.tracks.length === 0;

  return {
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
    setCurrentIndex,
    getCurrentState,
    events
  };
};

export default TrackQueue;
