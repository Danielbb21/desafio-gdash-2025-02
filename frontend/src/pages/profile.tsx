import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useGetOne } from "../hooks/user/useGetOne";
import { useUpdateUser } from "../hooks/user/useUpdateUser";
import Loading from "../components/loading/Loading";

const profileSchema = z.object({
  name: z.string().min(2, "Nome obrigatório"),
  email: z.email("E-mail inválido"),
  password: z.string().optional(),
  confirmPassword: z.string().optional()
}).refine((obj) => obj.password === obj.confirmPassword,
  { error: 'As senhas não são iguais', path: ['confirmPassword'] });

type ProfileFormData = z.infer<typeof profileSchema>;

export const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { data } = useGetOne();
  console.log(data?.name, data?.email);
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  useEffect(() => {
    if (data) {
      form.setValue('name', data.name);
      form.setValue('email', data.email);
    }
  }, [data, form]);

  const { mutate, isPending } = useUpdateUser(
    (isEditing) => setIsEditing(isEditing),
    form.reset,
    data!
  );


  function onSubmit(values: ProfileFormData) {
    mutate(values);
    setIsEditing(false);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-secundary p-4">
      <Card className="w-full max-w-xl bg-quaternary">
        <CardHeader>
          <CardTitle className="text-2xl">Meu Perfil</CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

              {/* Nome */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>

                    {!isEditing ? (
                      <p className="text-lg">{field.value}</p>
                    ) : (
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    )}

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>

                    {!isEditing ? (
                      <p className="text-lg">{field.value}</p>
                    ) : (
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    )}

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* BOTÕES */}
              {!isEditing ? (
                <>
                  <Button onClick={() => setIsEditing(true)} variant="secondary"
                    className="text-white cursor-pointer">
                    Atualizar informações
                  </Button>
                </>
              ) : (
                <>
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
                          <Input type="password" placeholder='Senha' {...field} className={
                            form.formState.errors?.password ? "border-red-500 ring-red-500" : ""
                          } />
                        </FormControl>
                        <FormMessage className='mb-0' />
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-3">
                    <Button type='submit'
                      variant={'secondary'}
                      disabled={isPending}
                      className=' hover:cursor-pointer  text-white'>{!isPending ? 'Salvar' :
                        <div className='w-[50%]'>
                          <Loading />
                        </div>
                      }</Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        form.reset({
                          name: data?.name,
                          email: data?.email,
                        });
                        setIsEditing(false);
                      }}
                      className="cursor-pointer"
                    >
                      Cancelar
                    </Button>
                  </div>
                </>
              )}

            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
};
