import TrackQueue, { errors } from "../index";

const queue = TrackQueue();

const data = [
  { id: "44566", title: "Imagine Dragons - Monster" },
  { id: 312, title: "Imagine Dragons - Dream " },
  { id: 413, title: "Imagine Dragons - Radioactive" },
  { id: 414, title: "Imagine Dragons - Demons" },
  { id: 455, title: "Imagine Dragons - Believer" }
];

let mockCallback;

beforeEach(() => {
  queue.resetQueue();
  mockCallback = jest.fn(track => {});
});

it("should verify enqueueTracks function", () => {
  queue.enqueueTracks(data);
  const newState = queue.getCurrentState();
  expect(newState.first).toBe(data[0].id);
  expect(newState.last).toBe(data[data.length - 1].id);
  expect(newState.current).toBe(null);
});

it("should verify appendTracks function", () => {
  const newData = [
    { id: "18883", title: "Imagine Dragons - Time" },
    { id: "2828282", title: "Imagine Dragons - West Coast " }
  ];

  queue.enqueueTracks(data);
  queue.appendTracks(newData);
  const newState = queue.getCurrentState();
  expect(newState.first).toBe(data[0].id);
  expect(newState.last).toBe(newData[newData.length - 1].id);
  expect(newState.current).toBe(null);
});

it("should verify setCurrentTrack function", () => {
  const newData = [
    { id: "18883", title: "Imagine Dragons - Time" },
    { id: "2828282", title: "Imagine Dragons - West Coast " }
  ];

  queue.enqueueTracks(data);
  queue.appendTracks(newData);
  queue.setCurrentTrack(newData[0].id);
  const newState = queue.getCurrentState();
  expect(newState.current).toBe(newData[0].id);
});

it("should throw error on setCurrentTrack if track is not in queue", () => {
  const newData = [
    { id: "18883", title: "Imagine Dragons - Time" },
    { id: "2828282", title: "Imagine Dragons - West Coast " }
  ];

  queue.enqueueTracks(data);
  queue.appendTracks(newData);
  try {
    queue.setCurrentTrack("random id");
  } catch (error) {
    expect(error).toEqual(errors.trackNotInQueue);
  }
});

it("should verify playNext function", () => {
  queue.enqueueTracks(data);
  queue.setCurrentTrack(data[0].id);
  queue.playNext();
  expect(queue.getCurrentState().current).toBe(data[1].id);
  queue.playNext();
  expect(queue.getCurrentState().current).toBe(data[2].id);
});

it("should verify playPrev function", () => {
  queue.enqueueTracks(data);
  queue.setCurrentTrack(data[data.length - 1].id);
  queue.playPrev();
  expect(queue.getCurrentState().current).toBe(data[data.length - 2].id);
  queue.playPrev();
  expect(queue.getCurrentState().current).toBe(data[data.length - 3].id);
});
