import { initTRPC } from '@trpc/server'
import { eq, sql } from 'drizzle-orm'
import { z } from 'zod'

import { OpenApiMeta } from 'trpc-openapi'

import { getDBConnection } from './db'
import {
   ItemsListTable,
   inputAPIAddItem,
   inputAPIRemove,
   inputAPIUpdateStatus,
   outputAPIGetItem,
   transformItemDbToApp,
} from './schema'

export const trpc = initTRPC.meta<OpenApiMeta>().create()
export const trpcAPI = trpc.procedure

export const getItems = trpcAPI
   .meta({ openapi: { method: 'GET', path: '/trpc/getItems' } })
   .input(z.void())
   .output(z.array(outputAPIGetItem))
   .query(async () => {
      const db = await getDBConnection()
      const res = await db.select().from(ItemsListTable)
      const items = res.map(item => {
         return transformItemDbToApp.parse(item)
      })

      return items
   })

export const addItem = trpcAPI
   .meta({ openapi: { method: 'POST', path: '/trpc/addItem' } })
   .input(inputAPIAddItem)
   .output(outputAPIGetItem)
   .mutation(async ({ input }) => {
      const { name } = input
      const db = await getDBConnection()
      const [result] = await db.insert(ItemsListTable).values({ name, is_completed: false })
      const [newItem] = await db
         .select()
         .from(ItemsListTable)
         .where(sql`${ItemsListTable.id} = ${result.insertId}`)

      const addedItem = transformItemDbToApp.parse(newItem)
      return addedItem
   })

export const updateItem = trpcAPI
   .meta({ openapi: { method: 'POST', path: '/trpc/updateItem' } })
   .input(inputAPIUpdateStatus)
   .output(z.boolean())
   .mutation(async ({ input }) => {
      try {
         const { id, isCompleted } = input
         const db = await getDBConnection()
         await db
            .update(ItemsListTable)
            .set({ is_completed: isCompleted })
            .where(sql`${ItemsListTable.id} = ${id}`)

         return true
      } catch (err) {
         console.log('OMG !!', err)

         return false
      }
   })

export const removeItem = trpcAPI
   .meta({ openapi: { method: 'POST', path: '/trpc/removeItem' } })
   .input(inputAPIRemove)
   .output(z.void())
   .mutation(async ({ input }) => {
      const db = await getDBConnection()
      await db.delete(ItemsListTable).where(eq(ItemsListTable.id, input.id))
   })
