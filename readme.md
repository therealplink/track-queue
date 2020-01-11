## Track queue for efficient next and previous track retrieval

### Types

```
interface ITrack {
  id: number | string;
  [key: string]: any;
}

```

### Usage

#### Enqueue

```
    enqueueTracks(tracks: ITrack)
```

#### Get Next and previous tracks

```
    getNext(id: any)
    getPrev(id: any)
```

#### Get order of Queue

```
    getOrderedIds()

    //or

    getTracks()
```
