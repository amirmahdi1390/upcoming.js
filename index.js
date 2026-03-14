import path from 'path'
import { scanRoutes } from './scanner.js'
import { generateRoutesModule } from './generator.js'

const VIRTUAL_MODULE_ID = 'virtual:upcoming'
const RESOLVED_ID = '\0virtual:upcoming'

export default function upcoming(options = {}) {

  const routesDir = options.routesDir
    ? path.resolve(process.cwd(), options.routesDir)
    : path.resolve(process.cwd(), 'src')

  let generatedModule = ''

  return {
    name: 'upcoming.js',

    buildStart() {
      const routes = scanRoutes(routesDir)
      generatedModule = generateRoutesModule(routes)
    },

    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID) {
        return RESOLVED_ID
      }
    },

    load(id) {
      if (id === RESOLVED_ID) {
        return generatedModule
      }
    },

   
    configureServer(server) {
      const reload = (filePath) => {
        const isPageFile = /page\.(jsx?|tsx?)$/.test(filePath)
        const isNotFoundFile = /notfound\.(jsx?|tsx?)$/.test(filePath)

        if (isPageFile || isNotFoundFile) {
          const routes = scanRoutes(routesDir)
          generatedModule = generateRoutesModule(routes)

          const virtualModule = server.moduleGraph.getModuleById(RESOLVED_ID)
          if (virtualModule) {
            server.moduleGraph.invalidateModule(virtualModule)
          }

          server.ws.send({ type: 'full-reload' })
        }
      }

     
      server.watcher.on('add', reload)

    
      server.watcher.on('unlink', reload)
    },

    handleHotUpdate({ file, server }) {
      const isInRoutesDir = file.startsWith(routesDir)
      const isPageFile = /page\.(jsx?|tsx?)$/.test(file)
      const isNotFoundFile = /notfound\.(jsx?|tsx?)$/.test(file)

      if (isInRoutesDir && (isPageFile || isNotFoundFile)) {
        const routes = scanRoutes(routesDir)
        generatedModule = generateRoutesModule(routes)

        const virtualModule = server.moduleGraph.getModuleById(RESOLVED_ID)
        if (virtualModule) {
          server.moduleGraph.invalidateModule(virtualModule)
        }

        server.ws.send({ type: 'full-reload' })
      }
    }
  }
}