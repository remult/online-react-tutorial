import { useState } from 'react'
import type { Task } from '../shared/Task'

export function Todo() {
  const [tasks, setTasks] = useState<Task[]>([])
  return (
    <div>
      <h1>Todos</h1>
      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <input type="checkbox" checked={task.completed} />
              <span>{task.title}</span>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
