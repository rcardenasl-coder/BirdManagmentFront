import { useQuery } from "@tanstack/react-query";
import { birdApi } from "../../../api/birdApi";
import { BirdDto } from "../../../models/bird";

export const useBirds = () => {
  return useQuery<BirdDto[], Error>({
    queryKey: ["birds"],
    queryFn: async () => {
      const response = await birdApi.getAllBirds();
      return response.data || [];
    },
  });
};

export const useBirdById = (id: number) => {
  return useQuery<BirdDto, Error>({
    queryKey: ["bird", id],
    queryFn: async () => {
      const response = await birdApi.getBirdById(id);
      return response.data!;
    },
    enabled: !!id,
  });
};
