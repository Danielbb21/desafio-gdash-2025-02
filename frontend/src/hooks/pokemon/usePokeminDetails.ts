import { useQuery } from "@tanstack/react-query";
import { authenticathedInterceptor } from "../../helpers/axiosInterceptors";

export interface IPokemonDetails {
  id: number;
  name: string;
  sprite: string;
  height: number;
  weight: number;
  types: string[];
  abilities: string[];
  stats: { name: string; value: number }[];
}

export const usePokemonDetails = (id?: number) => {
  return useQuery({
    queryKey: ["pokemon-details", id],
    queryFn: async () => {
      const res = await authenticathedInterceptor.get<IPokemonDetails>(`/pokemon/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};
