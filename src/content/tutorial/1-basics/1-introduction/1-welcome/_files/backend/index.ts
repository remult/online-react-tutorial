import express from 'express'
import { remultExpress } from 'remult/remult-express'
import { Task } from '../shared/Task'
import { repo } from 'remult'

export const app = express()
export const api = remultExpress({
  entities: [Task],
  initApi: async () => {
    const taskRepo = repo(Task)
    if ((await taskRepo.count()) == 0) {
      await taskRepo.insert([
        { title: 'Clean car' },
        { title: 'Read a book' },
        { title: 'Buy groceries' },
        { title: 'Do laundry' },
        { title: 'Cook dinner' },
        { title: 'Walk the dog' },
      ])
    }
  },
})

app.use(api)
