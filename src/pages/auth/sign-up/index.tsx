import { LoaderIcon } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

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

    return 'Acessar painel'
  }

  return (
    <div>
      <Helmet title="Sign In" />

      <div className="p-8">
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar Painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo painel do parceiro
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
            <div className="space-y-2">
              <Label id="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>

            <Button disabled={isLoading} className="w-full" type="submit">
              <ButtonState />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
