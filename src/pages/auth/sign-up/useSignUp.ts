import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { SignUpForm, signUpFormSchema } from './signUpSchema'

export const useSignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpFormSchema),
  })

  const handleSignUp = async (data: SignUpForm) => {
    console.log(data)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)).then(() =>
        toast.success('Enviamos um link de autenticação para o seu email.', {
          action: {
            label: 'Reenviar',
            onClick: () => handleSignUp(data),
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
    handleSignUp,
    isLoading,
  }
}
