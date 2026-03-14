import { Suspense } from 'react'
import { BrowserRouter, useRoutes } from 'react-router'
import { routes } from 'virtual:upcoming'

function AppRoutes() {
  const element = useRoutes(routes)
  return element
}

export function UpcomingRouter({ loading = <div>Loading...</div> }) {
  return (
    <BrowserRouter>
      <Suspense fallback={loading}>
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
  )
}