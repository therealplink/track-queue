import { ITrack } from "./types";
import { getLinkedListTracks } from "./utils";

interface TrackQueueData extends ITrack {
  next: string;
  prev: string;
}

export interface TrackQueueState {
  tracks: TrackQueueData;
  orderedIds: any[];
}

interface Action {
  type: string;
  payload: any;
}

const initialState: TrackQueueState = {
  tracks: {} as any,
  orderedIds: []
};

let queueState: TrackQueueState = {
  ...initialState
};

const enqueueTracks = (tracks: ITrack[]) => {
  const { newNodes, orderedIds } = getLinkedListTracks(tracks, "id");
  queueState.tracks = newNodes;
  queueState.orderedIds = orderedIds;
};

const appendTracks = (newTracks: ITrack[]) => {
  const { newNodes, orderedIds } = getLinkedListTracks(newTracks, "id");

  const ids = initialState.orderedIds;
  const lastTrackId = ids[ids.length - 1];
  const prevTracks: TrackQueueData = initialState.tracks;
  const newOrderId = orderedIds[0];
  prevTracks[lastTrackId].next = newNodes[newOrderId]["id"];
  newNodes[newOrderId].prev = prevTracks[lastTrackId]["id"];
  const updatedQueueObj = {
    linkedListTracks: { ...prevTracks, ...newNodes },
    orderedIds: [...ids, ...orderedIds]
  };

  queueState.tracks = updatedQueueObj.linkedListTracks;
  queueState.orderedIds = updatedQueueObj.orderedIds;
};

const getNext = (trackId: any) => {
  queueState.tracks[trackId].next;
};

const getPrev = (trackId: any) => {
  queueState.tracks[trackId].prev;
};

const resetQueue = () => {
  queueState = { ...initialState };
};

const getOrderedIds = () => queueState.orderedIds;
const getTracks = () => getOrderedIds().map(id => queueState.tracks[id]);
const isTrackQueueEmpty = () => queueState.orderedIds.length === 0;
const getTrackQueueState = () => queueState;

export {
  getTrackQueueState,
  isTrackQueueEmpty,
  getTracks,
  getOrderedIds,
  resetQueue,
  getPrev,
  getNext,
  appendTracks,
  enqueueTracks
};
