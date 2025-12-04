import { useMutation } from "@tanstack/react-query"
// import { useNavigate } from "react-router"
import { baseAxios } from "../../helpers/axiosInterceptors";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";


interface ILogin {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const useCreateUser = () => {
  const navigate = useNavigate();

  const { mutate, data, isPending, isError, error } = useMutation({
    mutationFn: async ({ name, email, password, confirmPassword }: ILogin) => {
      const result = await baseAxios.post('user', { name, email, password, confirmPassword });
      return result.data;
    },
    onSuccess: () => {
      toast.success('Conta criada com sucesso!');
      navigate('/');
    },
    onError: (err) => {
      console.log('error', err.message);
      toast.error('Algo deu errado!');
    }
  });

  return {
    mutate,
    loginData: data,
    isPending,
    error,
    isError
  }
}
