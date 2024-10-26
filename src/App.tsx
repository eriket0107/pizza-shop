import { QueryClientProvider } from '@tanstack/react-query'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { queryClient } from './lib/react-query'
import { ThemeProvider } from './providers/theme-provider'
import { router } from './routes/router'

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider storageKey="pizzashop-theme" defaultTheme="dark">
        <Helmet titleTemplate="%s | pizza.shop" />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
        <Toaster richColors />
      </ThemeProvider>
    </HelmetProvider>
  )
}
