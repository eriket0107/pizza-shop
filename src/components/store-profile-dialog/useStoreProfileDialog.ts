import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
  GetManagedResponse,
  getManagedRestaurant,
} from '@/api/get-managed-restaurant'
import { updateProfile } from '@/api/update-profile'

import {
  StoreProfileDialogSchema,
  storeProfileDialogSchema,
} from './storeProfileDialogSchema'

export const useStoreProfileDialog = () => {
  const queryClient = useQueryClient()
  const { data: managedRestaurant } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
    staleTime: Infinity,
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<StoreProfileDialogSchema>({
    resolver: zodResolver(storeProfileDialogSchema),
    defaultValues: {
      name: managedRestaurant?.name || '',
      description: managedRestaurant?.description || '',
    },
    values: {
      name: managedRestaurant?.name || '',
      description: managedRestaurant?.description || '',
    },
    mode: 'onChange',
  })

  const updateManagedRestaurantCache = ({
    name,
    description,
  }: StoreProfileDialogSchema) => {
    const cached = queryClient.getQueryData<GetManagedResponse>([
      'managed-restaurant',
    ])

    if (cached) {
      queryClient.setQueryData<GetManagedResponse>(['managed-restaurant'], {
        ...cached,
        name,
        description,
      })
    }

    return { cached }
  }

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onMutate: ({ name, description }) => {
      const { cached } = updateManagedRestaurantCache({ name, description })
      return { previousProfile: cached }
    },
    onError: (_, __, context) => {
      if (context?.previousProfile)
        updateManagedRestaurantCache(context.previousProfile)
    },
  })

  const handleUpdateProfile = async ({
    name,
    description,
  }: StoreProfileDialogSchema) => {
    try {
      await updateProfileFn(
        {
          name,
          description,
        },
        {
          onSuccess: () => {
            toast.success('Seu perfil foi atualizado com sucesso!')
          },
        },
      )
    } catch (error) {
      toast.error('Falha ao atualizar perfil. Tente novamente.')
      console.log(error)
    }
  }

  return {
    register,
    managedRestaurant,
    isLoading: isSubmitting,
    handleSubmit: handleSubmit(handleUpdateProfile),
  }
}
