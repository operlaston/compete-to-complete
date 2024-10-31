require('dotenv').config()
const loginRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

loginRouter.post('/', async (request, response) => {
  const {username, password} = request.body
  const user = await User.findOne({username})
  const passwordCorrect = user === null ?
    false :
    await bcrypt.compare(password, user.passwordHash)
  
  if (!passwordCorrect) {
    console.log('incorrect credentials')
    return response.status(401).json({error: 'incorrect credentials'})
  }

  const token = jwt.sign({username: username, id: user._id}, process.env.SECRET)
  response.status(200).json({username, id: user._id, token: token})
})

module.exports = loginRouter