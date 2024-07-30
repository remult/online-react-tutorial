import { remultExpress } from 'remult/remult-express'
import { Task } from '../shared/model.js'
import sqlite3 from 'sqlite3'
import { Sqlite3DataProvider } from 'remult/remult-sqlite3'
import { SqlDatabase, repo } from 'remult'
import { faker } from '@faker-js/faker'

export const entities = [Task]

export const api = remultExpress({
  entities,
  admin: true,

  // dataProvider: new SqlDatabase(
  //   // Note that on stackblitz, this database name is only saved per user on their own browser.
  //   // To store the database on stackblitz, change the name not to include a dot on the start.
  //   new Sqlite3DataProvider(new sqlite3.Database('.database.sqlite'))
  // ),

  getUser: (req) => req.session!['user'],

  initApi: async ()=>{
    if(await repo(Task).count() === 0){ 
      await repo(Task).insert(
        Array.from({ length: 10 }).map((_, i) => ({
          title: faker.hacker.phrase(),
          completed: i % 2 === 0,
        }))
      )
    }
  }
})
