export interface GetAllMusicInfoRequest {
  pageSize?: number;
  referenceId?: string;
  asc?: boolean;
  searchTerm?: string;
}

export interface MusicInfoItem {
  id: string;
  title: string;
  artist: string;
  album: string;
}