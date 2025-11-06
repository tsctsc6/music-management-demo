import type { ApiResponse } from "../types/apiResponse";
import apiClient from "../web-api/axiosConfig";
import type {
  GetAllMusicInfoRequest,
  MusicInfoItem,
} from "./../types/music/getAllMusicInfo";

export const musicService = {
  getAllMusicInfo: async (
    args: GetAllMusicInfoRequest
  ): Promise<ApiResponse<MusicInfoItem[]>> => {
    const response = await apiClient.get("/music/read-all-music-info", {
      params: { args },
    });
    return response.data;
  },
};
