import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { registerRestaurant } from '@/api/register-restaurant'

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

  const { mutateAsync: signUp } = useMutation({
    mutationFn: registerRestaurant,
  })
  const handleSignUp = async (data: SignUpForm) => {
    try {
      await signUp(
        {
          email: data.email,
          managerName: data.managerName,
          phone: data.phone,
          restaurantName: data.restaurantName,
        },
        {
          onSuccess: () => {
            toast.success('Restaurante cadastrado com sucesso!')
            navigate(`/sign-in?email=${data.email}`)
          },
        },
      )
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
