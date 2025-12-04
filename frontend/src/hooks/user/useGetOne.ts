import { useQuery } from "@tanstack/react-query"
import { useAuthContext } from "../../providers/authProvider";
import { authenticathedInterceptor } from "../../helpers/axiosInterceptors";

export interface IUser {
  name: string;
  email: string;
}

export const useGetOne = () => {
  const { user } = useAuthContext();
  const { data, isPending, isLoading } = useQuery({
    queryKey: ['profile', { user: user }],
    queryFn: async () => {
      const result = await authenticathedInterceptor.get<IUser>('user');
      return result.data;
    }
  });

  return {
    data,
    isLoadingData: isPending || isLoading
  };
}
