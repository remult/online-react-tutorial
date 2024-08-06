import { useEffect, useState, type FormEvent } from 'react'
import { Task } from '../shared/Task.js'
import { repo } from 'remult'
import { TasksController } from '../shared/TasksController.js'

const taskRepo = repo(Task)

export function Todo() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState('')

  async function addTask(e: FormEvent) {
    e.preventDefault()
    try {
      const newTask = await taskRepo.insert({ title: newTaskTitle })
      setTasks([...tasks, newTask])
      setNewTaskTitle('')
    } catch (error: any) {
      alert((error as { message: string }).message)
    }
  }

  async function setCompleted(task: Task, completed: boolean) {
    const updatedTask = await taskRepo.update(task, { completed })
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)))
  }

  async function deleteTask(task: Task) {
    try {
      await taskRepo.delete(task)
      setTasks(tasks.filter((t) => t.id !== task.id))
    } catch (error: any) {
      alert((error as { message: string }).message)
    }
  }

  async function setAllCompleted(completed: boolean) {
    for (const task of await taskRepo.find()) {
      await taskRepo.update(task, { completed })
    }
    await taskRepo.find().then(setTasks)
  }

  useEffect(() => {
    taskRepo.find().then(setTasks)
  }, [])

  return (
    <div>
      <h1>Todos</h1>
      <main>
        <form onSubmit={addTask}>
          <input
            value={newTaskTitle}
            placeholder="What needs to be done?"
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <button>Add</button>
        </form>
        {tasks.map((task) => {
          return (
            <div key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={(e) => setCompleted(task, e.target.checked)}
              />
              {task.title}
              <button
                onClick={() => deleteTask(task)}
                style={{ marginLeft: 'auto' }}
              >
                Delete
              </button>
            </div>
          )
        })}
        <div>
          <button onClick={() => setAllCompleted(true)}>
            Set All Completed
          </button>
          <button onClick={() => setAllCompleted(false)}>
            Set All Uncompleted
          </button>
        </div>
      </main>
    </div>
  )
}
