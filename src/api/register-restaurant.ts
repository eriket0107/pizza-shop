import { api } from '@/lib/axios'

export type RegisterRestaurantBody = {
  restaurantName: string
  managerName: string
  phone: string
  email: string
}

export const registerRestaurant = async ({
  email,
  managerName,
  phone,
  restaurantName,
}: RegisterRestaurantBody) => {
  await api.post('/restaurants', {
    email,
    managerName,
    phone,
    restaurantName,
  })
}
