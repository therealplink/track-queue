import {
  setCurrentTrack,
  enqueueTracks,
  getCurrentIndex,
  events,
  playNext,
  getTracks,
  appendTracks,
  isTrackQueueEmpty,
  resetQueue,
  playPrev,
  addListener
} from "../index";

const tracks = [
  { id: "djj", title: "Imagine Dragons - Monster" },
  { id: 312, title: "Imagine Dragons - Dream " },
  { id: 413, title: "Imagine Dragons - Radioactive" },
  { id: 414, title: "Imagine Dragons - Demons" },
  { id: 455, title: "Imagine Dragons - Believer" }
];

let mockCallback;

beforeEach(() => {
  resetQueue();
  mockCallback = jest.fn(track => {});
});

it("should set track and retrieve correct index", () => {
  const testIndex = 0;
  const id = tracks[testIndex].id;
  enqueueTracks(tracks);
  setCurrentTrack(id);
  expect(getCurrentIndex()).toBe(testIndex);
});

it("should set track and retrieve correct index", () => {
  const testIndex = 3;
  const id = tracks[testIndex].id;
  enqueueTracks(tracks);
  setCurrentTrack(id);
  expect(getCurrentIndex()).toBe(testIndex);
});

it("should set track and retrieve correct index", () => {
  const testIndex = 4;
  const id = tracks[testIndex].id;
  enqueueTracks(tracks);
  setCurrentTrack(id);
  expect(getCurrentIndex()).toBe(testIndex);
});

it("should call listener with correct track", () => {
  const testIndex = 4;
  const id = tracks[testIndex].id;
  addListener(events.ON_SET_CURRENT_TRACK, mockCallback);
  enqueueTracks(tracks);
  setCurrentTrack(id);
  expect(mockCallback).toBeCalledWith(tracks[getCurrentIndex()]);
  expect(getCurrentIndex()).toBe(testIndex);
});

it("should call listener with correct track on next when any track is being played", () => {
  const mockIndex = 2;
  const id = tracks[mockIndex].id;
  addListener(events.ON_SET_CURRENT_TRACK, mockCallback);
  enqueueTracks(tracks);
  setCurrentTrack(id as any);
  expect(mockCallback).toHaveBeenLastCalledWith(tracks[2]);
  expect(getCurrentIndex()).toBe(2);
  playNext();
  expect(mockCallback).toHaveBeenLastCalledWith(tracks[3]);
  expect(getCurrentIndex()).toBe(3);
  playNext();
  expect(mockCallback).toHaveBeenLastCalledWith(tracks[4]);
  expect(getCurrentIndex()).toBe(4);
  playNext();
  expect(mockCallback).toHaveBeenLastCalledWith(tracks[0]);
  expect(getCurrentIndex()).toBe(0);
});

it("should call listener with correct track on prev when any track is being played", () => {
  const mockIndex = 2;
  const id = tracks[mockIndex].id;
  addListener(events.ON_SET_CURRENT_TRACK, mockCallback);
  enqueueTracks(tracks);
  setCurrentTrack(id as any);
  expect(mockCallback).toHaveBeenLastCalledWith(tracks[2]);
  expect(getCurrentIndex()).toBe(2);
  playPrev();
  expect(mockCallback).toHaveBeenLastCalledWith(tracks[1]);
  expect(getCurrentIndex()).toBe(1);
  playPrev();
  expect(mockCallback).toHaveBeenLastCalledWith(tracks[0]);
  expect(getCurrentIndex()).toBe(0);
  playPrev();
  expect(mockCallback).toHaveBeenLastCalledWith(tracks[tracks.length - 1]);
  expect(getCurrentIndex()).toBe(tracks.length - 1);
});

it("should enqueue tracks in queue", () => {
  enqueueTracks(tracks);
  expect(getTracks()).toBe(tracks);
});

it("should append tracks in queue", () => {
  enqueueTracks(tracks);
  appendTracks(tracks);
  expect(getTracks()).toEqual(tracks.concat(tracks));
});

it("is Trackqueue empty", () => {
  expect(isTrackQueueEmpty()).toEqual(true);
  enqueueTracks(tracks);
  expect(isTrackQueueEmpty()).toEqual(false);
});

it("should remove the listener", () => {
  const listener = addListener(events.ON_SET_CURRENT_TRACK, mockCallback);
  const mockIndex = 2;
  const id = tracks[mockIndex].id;
  listener();
  enqueueTracks(tracks);
  setCurrentTrack(id as any);

  expect(mockCallback).toBeCalledTimes(0);
});

it("should verify the ON_TRACK_QUEUE_CHANGED listener", () => {
  addListener(events.ON_TRACK_QUEUE_CHANGED, mockCallback);
  const newTrack = { id: "2773", title: "Imagine Dragons - ID" };
  const mockIndex = 2;
  const id = tracks[mockIndex].id;
  enqueueTracks(tracks);
  appendTracks([newTrack]);
  setCurrentTrack(id as any);
  expect(mockCallback).toBeCalledTimes(2);
  expect(mockCallback).toHaveBeenLastCalledWith([...tracks, newTrack]);
});

it("should throw an error if setCurrentTrack is called with an id which is not in queue", () => {
  try {
    setCurrentTrack("random_string");
  } catch (error) {
    expect(error).toEqual(new Error("Track is not in the queue"));
  }
});
