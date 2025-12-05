import { useQuery } from "@tanstack/react-query"
import { authenticathedInterceptor } from "../../helpers/axiosInterceptors";

interface IWeather {
  lat: string;
  lng: string;
  hora: string;
  dia: string;
  prob: number;
  condicao: string;
  temp: string;
  umid: number;
  vento: string;
}

interface IWeatherDashBoard {
  latest: IWeather;
  temperatures: { hora: string; temp: string }[];
  rainProbability: { hora: string; prob: number }[];
}

export const useDashboard = () => {
  const { data, isLoading, isPending } = useQuery<IWeatherDashBoard>({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const result = await authenticathedInterceptor.get('weather/dashboard');
      return result.data;
    }
  });

  return {
    weatherData: data,
    isLoading,
    isPending
  }
}
