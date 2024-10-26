import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

import { signIn } from '@/api/sign-in'

import { SignInForm, signInFormSchema } from './signInSchema'

export const useSignIn = () => {
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email')

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: { email: email || '' },
  })

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  })

  const handleSignIn = async (data: SignInForm) => {
    try {
      await authenticate(
        { email: data.email },
        {
          onSuccess: () => {
            toast.success('Enviamos um link de autenticação para o seu email.')
          },
        },
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
