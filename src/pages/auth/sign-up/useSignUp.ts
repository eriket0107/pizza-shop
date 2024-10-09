import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
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

  const navigate = useNavigate()

  const handleSignUp = async (data: SignUpForm) => {
    console.log(data)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
        toast.success('Cadastrado com sucesso!')
        navigate('/sign-in')
      })
    } catch (error) {
      toast.error('Erro ao cadastrar restaurante.')
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
