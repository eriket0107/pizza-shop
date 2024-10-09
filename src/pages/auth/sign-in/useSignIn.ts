import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { SignInForm, signInFormSchema } from './signInSchema'

export const useSignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInFormSchema),
  })

  const handleSignIn = async (data: SignInForm) => {
    console.log(data)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)).then(() =>
        toast.success('Enviamos um link de autenticação para o seu email.', {
          action: {
            label: 'Reenviar',
            onClick: () => handleSignIn(data),
          },
          actionButtonStyle: {
            border: '1px solid green',
            background: 'transparent',
            color: 'green',
          },
        }),
      )
    } catch (error) {
      toast.error('Email inválido.')
    }
  }

  const isLoading = isSubmitting
  return {
    register,
    handleSubmit,
    handleSignIn,
    isLoading,
  }
}
