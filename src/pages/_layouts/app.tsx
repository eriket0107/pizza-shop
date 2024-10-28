import { isAxiosError } from 'axios'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { Header } from '@/components/header'
import { api } from '@/lib/axios'

export function AppLayout() {
  const navigate = useNavigate()

  useEffect(() => {
    const inteceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isAxiosError(error)) {
          const status = error.response?.status
          const code = error.response?.data?.code
          console.log({ status, code })
          if (status === 401 && code === 'UNAUTHORIZED') {
            return navigate('/sign-in', { replace: true })
          }
        }
      },
    )

    return () => api.interceptors.response.eject(inteceptorId)
  }, [navigate])

  return (
    <main className="flex min-h-screen flex-col antialiased">
      <Header />

      <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
        <Outlet />
      </div>
    </main>
  )
}
