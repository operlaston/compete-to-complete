const taskRouter = require('express').Router()
const Task = require('../models/task')

taskRouter.get('/', async (request, response) => {
  try {
    const tasks = await Task.find({})
    response.json(tasks)
  } catch(error) {
    console.error('failed to get all tasks', error)
    response.status(400).end()
  }
})

taskRouter.get('/:id', async (request, response) => {
  try {
    const task = await Task.findById(request.params.id)
    if (task === null) {
      return response.status(404).json({error: 'id doesnt exist'})
    }
    response.json(task)
  } catch(error) {
    console.error('failed to get task')
    response.status(400).end()
  }
})

taskRouter.post('/', async (request, response) => {
  const task = new Task(request.body)
  try {
    const returnedTask = await task.save()
    response.status(201).json(returnedTask)
  } catch(error) {
    console.error('an error occured while trying to post', error)
    response.status(400).end()
  }
})

taskRouter.put('/:id', async (request, response) => {
  try {
    const task = request.body
    const newTask = await Task.findByIdAndUpdate(request.params.id, {...task}, {new: true})
    if (newTask === null) {
      return response.status(404).json({error: 'id doesnt exist'})
    }
    response.json(newTask)
  } catch(error) {
    console.error('could not update task', error)
    response.status(400).json({error: 'an error occurred while updating task'})
  }
})

taskRouter.delete('/:id', async(request, response) => {
  try {
    if ((await Task.findById(request.params.id)) === null) {
      return response.status(404).json({error: 'not found'})
    }
    await Task.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch(error) {
    response.status(404).json({error: 'task doesnt exist'})
  }
})

module.exports = taskRouter