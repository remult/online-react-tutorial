---
type: lesson
title: Welcome to Remult Tutorial
focus: /src/App.tsx
---

# Welcome to Remult Tutorial

Hey there, and welcome to Remult Tutorial 👋!

With the basic demo, we have a simple list of todos, some tasks are done, some are not!
Let's tweak the app a bit to display only the todos that are not done.

For this, you can add a `where` directly to the `find` method of the `taskRepo`:

```ts add={5}
taskRepo
  .find({
    limit: 20,
    orderBy: { createdAt: "asc" },
    where: { completed: true },
  })
  .then(setTasks);
```

_// Happy coding!_
