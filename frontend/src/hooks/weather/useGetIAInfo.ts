import { useQuery } from "@tanstack/react-query"
import { authenticathedInterceptor } from "../../helpers/axiosInterceptors"

interface RecommendationItem {
    activity: string;
    reason: string;
}

interface AiRecommendation {
    summary: string;
    recommendations: RecommendationItem[];
}

export const useGetIAInfo = () => {
  const {data, isLoading, isPending} = useQuery<AiRecommendation>({
    queryKey: ['IA/info'],
    staleTime: 60 * 60 * 1000, 
    refetchOnWindowFocus: false,
    queryFn: async() => {
      const result = await authenticathedInterceptor.get('weather/recommendation');
      return result.data;
    }
  });

  return {
    iaData: data,
    isIALoading: isLoading || isPending
  };
}
