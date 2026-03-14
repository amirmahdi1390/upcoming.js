export function generateRoutesModule(routes) {
    const imports = routes.map((route, index) => {
      return `const Page${index} = lazy(() => import('${route.file}'))`
    }).join('\n')
  
   
    const routeItems = routes.map((route, index) => {
      return `  { path: '${route.path}', element: <Page${index} /> }`
    }).join(',\n')
  
    return `
  import { lazy } from 'react'
  
  ${imports}
  
  export const routes = [
  ${routeItems}
  ]
    `.trim()
  }