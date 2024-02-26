import { sql } from 'drizzle-orm'
import { createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { boolean, mysqlTable, serial, text, timestamp } from 'drizzle-orm/mysql-core'

import { isItemExpired } from './utils'

//#region - Database relations schemas

export const ItemsListTable = mysqlTable('todo_list_items_db', {
   id: serial('id').primaryKey().notNull(),
   name: text('name').notNull(),
   is_completed: boolean('is_completed').notNull(),
   creation_date: timestamp('creation')
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
      text: text("text")
})

//#endregion

//#region - Using zod for create application schema validation

export const dbItemSchema = createSelectSchema(ItemsListTable)
export const appItemSchema = dbItemSchema
   .omit({ is_completed: true, creation_date: true })
   .extend({ isCompleted: z.boolean(), isExpired: z.boolean() })

//#endregion

//#region - Transformers between db object to application object

export const transformItemDbToApp = dbItemSchema.transform(dbItems => {
   const { is_completed, creation_date, ...item } = dbItems

   const creationDate = new Date(creation_date)

   return { ...item, isCompleted: is_completed, isExpired: isItemExpired(creationDate) }
})
export const transformitemAppToDb = appItemSchema.transform(modelItem => {
   const { isCompleted, id, name } = modelItem

   // remove isExpired, should be calaculate automatic
   return { id, name, is_completed: isCompleted }
})

//#endregion

//#region - API schemas

export const outputAPIGetItem = appItemSchema
export const inputAPIRemove = appItemSchema.pick({ id: true })
export const inputAPIUpdateStatus = appItemSchema.omit({ name: true, isExpired: true })
export const inputAPIAddItem = appItemSchema.pick({ name: true })

//#endregion
