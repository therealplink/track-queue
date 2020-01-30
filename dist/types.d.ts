export interface ITrack {
    id?: number | string;
    url?: string;
    title?: string;
    artwork?: string;
    artist?: string;
    album?: string;
    [key: string]: any;
}
