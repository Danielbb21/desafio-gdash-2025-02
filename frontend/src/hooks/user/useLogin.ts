import { useMutation } from "@tanstack/react-query"
// import { useNavigate } from "react-router"
import { baseAxios } from "../../helpers/axiosInterceptors";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export interface ILoginResponse {
  access_token: string;
}

interface ILogin {
  email: string;
  password: string;
}

export const useLogin = (saveToken: (token: string) => void) => {
  const navigate = useNavigate();
  const { mutate, data, isPending, isError, error } = useMutation({
    mutationFn: async ({ email, password }: ILogin) => {
      const result = await baseAxios.post<ILoginResponse>('auth', { email, password });
      return result.data;
    },
    onSuccess: (data) => {
      toast.success('Login realizado com sucesso!');
      saveToken(data.access_token);
      navigate('/home')
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
