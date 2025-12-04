import { useMutation } from "@tanstack/react-query"
// import { useNavigate } from "react-router"
import { baseAxios } from "../../helpers/axiosInterceptors";
import { toast } from "react-toastify";


interface ILogin {
  email: string;
  password: string;
}

export const useLogin = () => {
  const { mutate, data, isPending, isError, error } = useMutation({
    mutationFn: async ({ email, password }: ILogin) => {
      const result = await baseAxios.post('auth', { email, password });
      return result.data;
    },
    onSuccess: (data) => {
      console.log('success', data)
      toast.success('Login realizado com sucesso!');
    },
    onError: (err) => {
      console.log('error', err.message);
      toast.error('Algo deu errado, verifique seu E-mail e Senha');
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
