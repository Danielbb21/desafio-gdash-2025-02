import { useQuery } from "@tanstack/react-query";
import { authenticathedInterceptor } from "../../helpers/axiosInterceptors";

interface PokemonResult {
  id: number;
  name: string;
  sprite: string;
  types: string[];
}

interface Pagination {
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

interface ListResponse {
  data: PokemonResult[];
  pagination: Pagination;
}

export const useListPokemon = (search: string, page: number) => {
  const query = useQuery({
    queryKey: ["pokemon", page, search],
    queryFn: async () => {
      const res = await authenticathedInterceptor.get<ListResponse>(
        `/pokemon?page=${page}&limit=20&name=${search}`
      );

      return {
        data: res.data.data,
        pagination: res.data.pagination,
      };
    },
  });

  return {
    data: query.data?.data ?? [],
    pagination: query.data?.pagination,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
  };
};
