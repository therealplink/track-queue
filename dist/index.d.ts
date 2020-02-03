import { ITrack, Iid } from "./types";
export declare const errors: {
    trackNotInQueue: Error;
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
declare const TrackQueue: () => {
    setCurrentTrack: (id: string | number) => void;
    isTrackQueueEmpty: () => boolean;
    getTracks: () => {
        [id: string]: ITrackData;
    };
    resetQueue: () => void;
    playPrev: () => void;
    playNext: () => void;
    appendTracks: (newTracks: ITrack[]) => void;
    enqueueTracks: (tracks: ITrack[]) => void;
    addListener: (on: string, callback: any) => () => void;
    getCurrentState: () => ITrackQueueState;
    events: {
        ON_SET_CURRENT_TRACK: string;
        ON_TRACK_QUEUE_CHANGED: string;
    };
};
export default TrackQueue;
