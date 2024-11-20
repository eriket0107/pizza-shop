import { QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { queryClient } from '@/lib/react-query'

import { SignIn } from '.'

describe('it should set default email input value if is present on search params', () => {
  it('should highlight nav link when is the current route', async () => {
    const wrapper = render(<SignIn />, {
      wrapper: ({ children }) => (
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <MemoryRouter
              initialEntries={['/sign-in?email=johhndoe@example.com']}
            >
              {children}
            </MemoryRouter>
          </QueryClientProvider>
        </HelmetProvider>
      ),
    })

    const emailInput = wrapper.getByLabelText('Seu e-mail') as HTMLInputElement

    expect(emailInput.value).toEqual('johhndoe@example.com')
  })
})
