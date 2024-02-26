import { CreateExpressContextOptions, createExpressMiddleware } from '@trpc/server/adapters/express'
import express from 'express'
import swaggerUi from 'swagger-ui-express'

import { generateOpenApiDocument } from 'trpc-openapi'

import { addItem, getItems, removeItem, trpc, updateItem } from './controller'

const createContext = ({ req, res }: CreateExpressContextOptions) => ({ req, res })
const app = express()

export const appRouter = trpc.router({
   getItems,
   addItem,
   updateItem,
   removeItem,
})

app.use(
   '/trpc',
   createExpressMiddleware({
      router: appRouter,
      createContext,
   })
)

// #region - API documentation with openAPI and swagger UI

const openApiDocument = generateOpenApiDocument(appRouter, {
   title: 'tRPC OpenAPI',
   version: '1.0.0',
   baseUrl: 'http://localhost:3001',
})

// Serve Swagger UI with OpenAPI document
app.use('/api-docs', swaggerUi.serve)
app.get('/api-docs', swaggerUi.setup(openApiDocument))

// #endregion

const main = async () => {
   app.listen(3001, () => {
      console.log('Server is up !')
   })
}

main()
