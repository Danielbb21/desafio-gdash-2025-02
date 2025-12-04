import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form"
import { Input } from "../components/ui/input"
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useLogin } from "../hooks/user/useLogin";
import Loading from "../components/loading/Loading";

const formSchema = z.object({
  email: z.email({ error: 'Insira um E-mail válido' }).min(2, {
    error: "O usuário é obrigatório"
  }).max(50),
  password: z.string().min(2, {
    error: "A senha é obrigatória"
  }).max(50)
});

export const Login = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const {mutate, isPending} = useLogin();


  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('values', values);
    const {email, password} = values;
    mutate({email, password});
  }
  return (
    <>
      <main className="h-screen bg-secundary flex items-center justify-center">
        <div className="bg-quaternary h-[50%] w-[80%] rounded-b-sm md:h-[60%] md:w-[40%] rounded-md  flex flex-col justify-center items-center">
          <div className='w-[40%]'>
            {/* <img src={trocoLogo} alt="logo" /> */}
          </div>
          <h1 className="text-xl mb-3">Login</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-[60%] space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder='Usuário' {...field} className={
                        form.formState.errors?.email ? "border-red-500 ring-red-500" : ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder='Senha' {...field} className={
                        form.formState.errors?.password ? "border-red-500 ring-red-500" : ""
                      } />
                    </FormControl>
                    <FormMessage className='mb-0' />
                  </FormItem>
                )}
              />
              <p className="text-center">Não tem uma conta <a href="registrer" className="text-tertiary cursor-pointer">Cadastre-se</a></p>
              <Button type='submit'
                variant={'secondary'}
                disabled={isPending}
                className=' hover:cursor-pointer w-[100%] text-white'>{!isPending ? 'Entrar' :
                  <div className='w-[50%]'>
                    <Loading />
                  </div>
                }</Button>
            </form>
          </Form>

        </div>
      </main>
    </>
  )
}