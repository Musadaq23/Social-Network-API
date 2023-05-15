// models/Thought.js
const mongoose = require('mongoose');
const { format } = require('date-fns');
const { Schema, model } = require('mongoose');

const ReactionSchema = new Schema({
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp)
  }
});

const thoughtSchema = new Schema({
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => format(timestamp, 'MM/dd/yyyy hh:mm:ss a')
    },
  username: {
    type: String,
    required: true
  },
  reactions: [ReactionSchema]
},
{
  toJSON: {
    virtuals: true,
    getters: true
  },
  id: false
});

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
