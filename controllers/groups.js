const groupRouter = require('express').Router()
const Group = require('../models/group')

groupRouter.get('/', async (request, response) => {
  try {
    const groups = await Group.find({})
    response.json(groups)
  } catch(error) {
    console.error('error during get for group', error)
    response.status(400).json({error: 'an error occurred while getting groups'})
  }
})

groupRouter.get('/:id', async (request, response) => {
  try {
    const group = await Group.findById(request.params.id).populate('members').populate('tasks')
      .populate({path: 'members', populate: {path: 'tasksCompleted'}})
    if (group === null) {
      return response.status(404).json({error: "id doesn't exist"})
    }
    response.json(group)
  } catch (error) {
    console.error('error occurred while trying to get group from id', error)
    response.status(400).json({error:  'error occurred while trying to get group from id'})
  }
})

groupRouter.post('/', async (request, response) => {
  try {
    const group = new Group(request.body)
    const returnedGroup = await group.save()
    response.status(201).json(returnedGroup)
  } catch(error) {
    console.error('error occurred while trying to create group')
    response.status(400).json({error: 'an error occurred while trying to create group'})
  }
})

groupRouter.put('/:id', async (request, response) => {
  try {
    const group = request.body
    const newGroup = await Group.findByIdAndUpdate(request.params.id, {...group}, {new: true})
    if (newGroup === null) {
      return response.status(404).json({error: 'id does not exist'})
    }
    response.json(newGroup)
  } catch(error) {
    console.error('an error occurred while changing group', error)
    response.status(400).json('an error occurred while changing group')
  }
})

groupRouter.delete('/:id', async(request, response) => {
  try {
    if ((await Group.findById(request.params.id)) === null) {
      return response.status(404).json({error: 'not found'})
    }
    await Group.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch(error) {
    response.status(404).json({error: 'group doesnt exist'})
  }
})

module.exports = groupRouter