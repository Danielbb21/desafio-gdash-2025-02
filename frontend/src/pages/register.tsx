import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form"
import { Input } from "../components/ui/input"
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useCreateUser } from "../hooks/user/useCreateUser";
import Loading from "../components/loading/Loading";
import logo from '../../assets/Logos.png';

const formSchema = z.object({
  email: z.email({ error: 'Insira um E-mail válido' }).min(2, {
    error: "O usuário é obrigatório"
  }).max(50),
  password: z.string().min(2, {
    error: "A senha é obrigatória"
  }).max(50),
  name: z.string().min(2, {
    error: "O nome é obrigatória"
  }).max(50),
  confirmPassword: z.string().min(2, {
    error: "A confirmação de senha é obrigatória"
  }).max(50)
}).refine((obj) => obj.password === obj.confirmPassword,
  { error: 'As senhas não são iguais', path: ['confirmPassword'] });

export const Register = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const { mutate, isPending } = useCreateUser();

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('values', values);
    mutate(values);
  }
  return (
    <>
      <main className="min-h-screen bg-secundary flex items-center justify-center p-4">
        <div className="
    bg-quaternary 
    w-full max-w-md 
    rounded-md 
    p-6 
    flex flex-col items-center
  ">
          <div className="w-24 mb-4">
            <img src={logo} alt="logo" />
          </div>

          <h1 className="text-xl mb-3">Cadastro</h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-sm space-y-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder='Nome' {...field} className={
                        form.formState.errors?.email ? "border-red-500 ring-red-500" : ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder='E-mail' {...field} className={
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder='Confirmar Senha' {...field} className={
                        form.formState.errors?.password ? "border-red-500 ring-red-500" : ""
                      } />
                    </FormControl>
                    <FormMessage className='mb-0' />
                  </FormItem>
                )}
              />
              <Button type='submit'
                variant={'secondary'}
                disabled={isPending}
                className=' hover:cursor-pointer w-[100%] text-white'>{!isPending ? 'Cadastrar' :
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