import axios from "axios";
import { BirdDto, ApiResponse } from "../models/bird";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1/bird",
  headers: { "Content-Type": "application/json" },
});

export const birdApi = {
  createBird: (bird: Omit<BirdDto, "birdCode">) =>
    api.post<ApiResponse<BirdDto>>("/", bird).then((res) => res.data),
  getAllBirds: () =>
    api.get<ApiResponse<BirdDto[]>>("/").then((res) => res.data),
  getBirdById: (id: number) =>
    api.get<ApiResponse<BirdDto>>(`/search/${id}`).then((res) => res.data),
  updateBird: (id: number, bird: BirdDto) =>
    api
      .put<ApiResponse<BirdDto>>(`/${id}/update`, bird)
      .then((res) => res.data),
  deleteBird: (id: number) =>
    api.delete<ApiResponse<null>>(`/${id}/delete`).then((res) => res.data),
};
