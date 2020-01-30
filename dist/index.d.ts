import { ITrack } from "./types";
interface TrackQueueData extends ITrack {
}
export interface TrackQueueState {
    tracks: TrackQueueData;
    currentIndex?: number;
}
declare const TrackQueue: () => {
    setCurrentTrack: (id: string | number) => void;
    isTrackQueueEmpty: () => boolean;
    getTracks: () => TrackQueueData;
    getCurrentIndex: () => number;
    resetQueue: () => void;
    playPrev: () => any;
    playNext: () => any;
    appendTracks: (newTracks: ITrack[]) => void;
    enqueueTracks: (tracks: ITrack[]) => void;
    addListener: (on: string, callback: any) => () => void;
    setCurrentIndex: (index: number) => void;
    getCurrentState: () => TrackQueueState;
    events: {
        ON_SET_CURRENT_TRACK: string;
        ON_TRACK_QUEUE_CHANGED: string;
        ON_TRACK_STATE_CHANGE: string;
    };
};
export default TrackQueue;
