const mongoose = require('mongoose')

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  tasks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task'}],
})

groupSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString(),
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Group', groupSchema)