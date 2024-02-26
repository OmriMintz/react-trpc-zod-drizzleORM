import { appItemSchema } from 'schema'
import { appRouter } from 'server'
import { z } from 'zod'

export type ITodo = z.infer<typeof appItemSchema>
export type AppRouter = typeof appRouter
