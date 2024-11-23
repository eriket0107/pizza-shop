import { http, HttpResponse } from 'msw'

import { GetProfileResponse } from '../get-profile'

export const getProfileMock = http.get<never, never, GetProfileResponse>(
  '/me',
  async () => {
    return HttpResponse.json({
      id: 'custom-id',
      phone: '999999999',
      name: 'John Doe',
      email: 'johndoe@example.com',
      role: 'manager',
      createdAt: new Date(),
      updatedAt: null,
    })
  },
)
