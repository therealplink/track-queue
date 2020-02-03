export interface ITrack {
  id: Iid;
  url?: string;
  title?: string;
  artwork?: string;
  artist?: string;
  album?: string;
  [key: string]: any;
}

export type Iid = string | number;
