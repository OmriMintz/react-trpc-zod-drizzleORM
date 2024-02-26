import { MySql2Database, drizzle } from 'drizzle-orm/mysql2'
import { migrate } from 'drizzle-orm/mysql2/migrator'
import mysql from 'mysql2/promise'

import { ItemsListTable, transformitemAppToDb } from './schema'

const mockTodos = [
   {
      id: 1,
      name: '🏪 To buy products ',
      isCompleted: false,
      is: new Date(),
   },
   {
      id: 2,
      name: '🧽 To clean the house',
      isCompleted: false,
      expiredDate: new Date(),
   },
   {
      id: 3,
      name: '🌼 To water flowers',
      isCompleted: true,
      expiredDate: new Date(Date.now() + 86400000), // tomorrow
   },
   {
      id: 4,
      name: '🐕 To feed the dog',
      isCompleted: true,
      expiredDate: new Date(Date.now() + 86400000), // tomorrow
   },
   {
      id: 5,
      name: '⚛️ To code a react app',
      isCompleted: false,
      expiredDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // next week
   },
]

let db: MySql2Database | undefined

export const getDBConnection = async (): Promise<MySql2Database> => {
   if (db) return db

   const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'mysql',
      password: 'OmriDev123123',
   })
   db = drizzle(connection!)

   await runMigrationAndSeedData(db)

   return db
}

const runMigrationAndSeedData = async (db: MySql2Database) => {
   await migrate(db, { migrationsFolder: './drizzle' })

   await db.delete(ItemsListTable)
   await db.insert(ItemsListTable).values(mockTodos.map(item => transformitemAppToDb.parse(item)))
}
