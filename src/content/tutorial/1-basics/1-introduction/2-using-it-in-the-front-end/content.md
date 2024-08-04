---
type: lesson
title: Welcome to Remult Tutorial
focus: /shared/Task.ts
---

# Welcome to Remult Tutorial

Hey there, and welcome to Remult Tutorial 👋!

Remult, is a full-stack javascript library that greatly simplifies the development of data entry applications including:

- Backend ORM
- Zero-boilerplate CRUD Rest & Realtime API
- Frontend type-safe API client
- Typescript entities as single source of truth(SSO) for:
  - Authorization
  - Validation
  - Entity related business logic

It greatly simplifies the development of CRUD applications, by following the rules of SSO (Single Source of truth)

## The Entity

With remult, the core element is an `entity` - an entity represents a business entity, such as order / customer or in our tutorial todo application - a `Task`

Here's the code for the entity we'll use in this tutorial:

```ts
import { Entity, Fields } from 'remult'

@Entity('tasks', {
  allowApiCrud: true,
})
export class Task {
  @Fields.uuid()
  id = ''

  @Fields.string()
  title = ''

  @Fields.boolean()
  completed = false

  @Fields.createdAt()
  createdAt?: Date
}
```

//briefly explain this code.

This entity will be used to define the database, api, frontend query language, validation, authorization and any other definition that revolves around the `task`

We've placed the entity's source code in the `shared` folder, to indicate that its shared between the frontend and the backend.

## Configuring the server

For this tutorial we'll use express (if you don't like express, don't worry remult works with almost all javascript servers including Express

Fastify

Next.js

Sveltekit

nuxt.js

Hapi

Hono

Nest

Koa)

Checkout the `backend/index.ts`

```ts add={2,3,6-9}
import express from 'express'
import { remultExpress } from 'remult/remult-express'
import { Task } from '../shared/Task'

export const app = express()
export const api = remultExpress({
  entities: [Task],
})
app.use(api)
```

// briefly explain this code

## Getting the tasks on the frontend

Next we'll use the tasks form the frontend,
Headout to the `frontend/Todo.tsx` react component, and add the following code to get the tasks from the backend

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

We've create a few ready made tasks for this tutorial to get it started.
