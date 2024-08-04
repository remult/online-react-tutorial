---
type: lesson
title: Display the Task List
focus: /frontend/Todo.tsx
---

## Display the Task List

Next we'll use the tasks form the frontend,
We've prepared a `Todo` react component that displays an array of `Task` - note that we're using the same "shared" `Task` type that we previously used in the backend.

Let's add the following code to display the tasks

```ts add={3,5,9-11}
import { useEffect, useState } from 'react'
import { Task } from '../shared/Task'
import { repo } from 'remult'

const taskRepo = repo(Task)

export function Todo() {
  const [tasks, setTasks] = useState<Task[]>([])
  useEffect(() => {
    taskRepo.find({}).then(setTasks)
  }, [])
  return (
    <div>
      <h1>Todos</h1>
      <main>
        {tasks.map((task) => {
          return (
            <div key={task.id}>
              <input type="checkbox" checked={task.completed} />
              {task.title}
            </div>
          )
        })}
      </main>
    </div>
  )
}

```

- We ask remult for a `Repository` of type `Task` and store it in the `taskRepo` - the repository is used to perform all CRUD operations for our task
- We'll use the `find` method of the repository in the `useEffect` hook, to get the tasks from the backend

This code will make a Rest API call to the backend to the /api/tasks url to get the tasks and display them

See the tasks in the `preview` window below
