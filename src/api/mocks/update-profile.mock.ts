import { http, HttpResponse } from 'msw'

import { UpdateProfileBody } from '../update-profile'

export const updateProfileMock = http.put<never, UpdateProfileBody>(
  '/profile',
  async ({ request }) => {
    const { name } = await request.json()

    if (name === 'Erik Pizza') {
      return new HttpResponse('created', {
        status: 201,
      })
    }
    return new HttpResponse('not created', {
      status: 400,
    })
  },
)
