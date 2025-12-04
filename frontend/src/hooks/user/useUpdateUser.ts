import { useMutation } from "@tanstack/react-query";
import { authenticathedInterceptor } from "../../helpers/axiosInterceptors";
import { toast } from "react-toastify";
import type { IUser } from "./useGetOne";

interface IUpdate {
  name: string;
  email: string;
  password?: string;
  confirmPassword?: string;
}


export const useUpdateUser = (
  setEdting: (isEditing: boolean) => void,
  resetForm: (values?: IUser) => void,
  originalData: IUser
) => {

  const { mutate, data, isPending, isError, error } = useMutation({
    mutationFn: async ({ name, email, password, confirmPassword }: IUpdate) => {
      const result = await authenticathedInterceptor.put('user', { name, email, password, confirmPassword });
      return result.data;
    },
    onSuccess: () => {
      toast.success('informações atualizadas com sucesso');
      setEdting(false);
    },
    onError: (err) => {
      console.log('error', err.message);
      toast.error('Algo deu errado!');
      resetForm({
        name: originalData.name,
        email: originalData.email
      });
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
