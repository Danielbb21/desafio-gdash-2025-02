import { useMutation } from "@tanstack/react-query"
import { authenticathedInterceptor } from "../../helpers/axiosInterceptors"
import { toast } from "react-toastify";
import { useAuthContext } from "../../providers/authProvider";
import { useNavigate } from "react-router";


export const useDeleteUser = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const result = await authenticathedInterceptor.delete('user');
      return result.data;
    },
    onSuccess: () => {
      logout();
      navigate('/');
      toast.success('conta deletada com sucesso!');
    },
    onError: (err) => {
      console.log(err.message);
      toast.error('algo deu errado');
    }
  });
  return {
    mutate,
    isPending
  };
}
