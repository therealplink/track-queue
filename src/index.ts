import { ITrack, Iid } from "./types";
import { getLinkedListTracks } from "./utils";

export const errors = {
  trackNotInQueue: new Error("Track not in queue")
};
interface ITrackData extends ITrack {
  next: Iid;
  prev: Iid;
}
export interface ITrackQueueState {
  first: Iid;
  last: Iid;
  current: Iid;
  tracks: {
    [id: string]: ITrackData;
  };
}

const initialState: ITrackQueueState = {
  first: null,
  last: null,
  current: null,
  tracks: {}
};

const events = {
  ON_SET_CURRENT_TRACK: "ON_SET_CURRENT_TRACK",
  ON_TRACK_QUEUE_CHANGED: "ON_TRACK_QUEUE_CHANGED"
};

const TrackQueue = () => {
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

  let queueState: ITrackQueueState = {
    ...initialState
  };

  const enqueueTracks = (tracks: ITrack[]) => {
    const { newNodes } = getLinkedListTracks(tracks, "id");
    queueState = { ...initialState };

    queueState.first = tracks[0].id;
    queueState.last = tracks[tracks.length - 1].id;
    queueState.tracks = newNodes;

    listeners[events.ON_TRACK_QUEUE_CHANGED].forEach(callback =>
      callback(queueState.tracks)
    );
  };

  const appendTracks = (newTracks: ITrack[]) => {
    const { newNodes } = getLinkedListTracks(newTracks, "id");

    queueState.tracks[queueState.last].next = newTracks[0].id;
    newNodes[newTracks[0].id].prev = queueState.last;

    const newQueueState = {
      ...queueState,
      last: newTracks[newTracks.length - 1].id,
      tracks: {
        ...queueState.tracks,
        ...newNodes
      }
    };

    queueState = newQueueState;

    listeners[events.ON_TRACK_QUEUE_CHANGED].forEach(callback => callback());
  };

  const setCurrentTrack = (id: Iid) => {
    if (!queueState.tracks[id]) {
      throw errors.trackNotInQueue;
    }

    queueState.current = id;

    listeners[events.ON_SET_CURRENT_TRACK].forEach(callback => callback());
  };

  const playNext = () => {
    const next = queueState.tracks[queueState.current].next;
    setCurrentTrack(next);
  };

  const playPrev = () => {
    const prev = queueState.tracks[queueState.current].prev;
    setCurrentTrack(prev);
  };

  const resetQueue = () => {
    queueState = { ...initialState };
    listeners[events.ON_TRACK_QUEUE_CHANGED].forEach(callback =>
      callback(queueState.tracks)
    );
  };

  const getTracks = () => queueState.tracks;
  const getCurrentState = () => queueState;
  const isTrackQueueEmpty = () => !queueState.first;

  return {
    setCurrentTrack,
    isTrackQueueEmpty,
    getTracks,
    resetQueue,
    playPrev,
    playNext,
    appendTracks,
    enqueueTracks,
    addListener,
    getCurrentState,
    events
  };
};

export default TrackQueue;
