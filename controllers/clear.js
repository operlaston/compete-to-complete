const clearRouter = require('express').Router()
const User = require('../models/user')
const Task = require('../models/task')
const Group = require('../models/group')

clearRouter.delete('/', async (request, response) => {
  try {
    await User.deleteMany({})
    await Task.deleteMany({})
    await Group.deleteMany({})
    response.status(204).end()
  } catch(error) {
    response.status(400).json({error: 'failed to delete everything'})
  }
})

clearRouter.delete('/users', async (request, response) => {
  try {
    await User.deleteMany({})
    response.status(204).end()
  } catch(error) {
    response.status(400).json({error: 'failed to delete all users'})
  }
})

clearRouter.delete('/tasks', async (request, response) => {
  try {
    await Task.deleteMany({})
    response.status(204).end()
  } catch(error) {
    response.status(400).json({error: 'failed to delete all tasks'})
  }
})

clearRouter.delete('/groups', async (request, response) => {
  try {
    await Group.deleteMany({})
    response.status(204).end()
  } catch(error) {
    response.status(400).json({error: 'failed to delete all groups'})
  }
})

module.exports = clearRouter