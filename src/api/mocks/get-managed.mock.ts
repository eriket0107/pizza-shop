import { http, HttpResponse } from 'msw'

import { GetManagedResponse } from '../get-managed-restaurant'

export const getManagedRestaurantMock = http.get<
  never,
  never,
  GetManagedResponse
>('/managed-restaurant', async () => {
  return HttpResponse.json({
    id: 'custom-restaurant-id',
    managerId: 'custom-manager-id',
    name: 'Pizza Shop',
    description: 'lorem ipsum',
    createdAt: new Date(),
    updatedAt: null,
  })
})
