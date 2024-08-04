import { useState } from 'react'
import type { Task } from '../shared/Task'

export function Todo() {
  const [tasks, setTasks] = useState<Task[]>([])
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
