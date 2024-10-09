import { LoaderIcon } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { useSignUp } from './useSignUp'

export function SignUp() {
  const { handleSignUp, handleSubmit, register, isLoading } = useSignUp()

  const ButtonState = () => {
    if (isLoading)
      return (
        <div className="flex items-center space-x-2">
          <p>Carregando...</p>
          <LoaderIcon className="h-4 w-4 animate-spin" />
        </div>
      )

    return 'Finalizar cadastro'
  }

  return (
    <div>
      <Helmet title="Cadastro" />

      <Button
        asChild
        className="absolute right-8 top-8 text-foreground hover:underline"
        variant="link"
      >
        <Link to="/sign-in">Fazer login</Link>
      </Button>

      <div className="p-8">
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comece suas vendas!
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
            <div className="space-y-2">
              <Label id="restaurantName">Nome do estabelecimento</Label>
              <Input
                id="restaurantName"
                type="text"
                {...register('restaurantName')}
              />
            </div>
            <div className="space-y-2">
              <Label id="managerName">Seu nome</Label>
              <Input
                id="managerName"
                type="text"
                {...register('managerName')}
              />
            </div>
            <div className="space-y-2">
              <Label id="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>
            <div className="space-y-2">
              <Label id="phone">Seu celular</Label>
              <Input id="phone" {...register('phone')} />
            </div>

            <Button disabled={isLoading} className="w-full" type="submit">
              <ButtonState />
            </Button>

            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar, você concorda com nossos{' '}
              <a href="" className="underline underline-offset-4">
                termos de serviço
              </a>{' '}
              e{' '}
              <a href="" className="underline underline-offset-4">
                políticas de privacidade
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
