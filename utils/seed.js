const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { userData, thoughtData } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('Connected to database.');

  try {
    await Thought.deleteMany({});
    await User.deleteMany({});

    const thoughts = await Thought.insertMany(thoughtData);
    const users = await User.insertMany(userData);

    for (const thought of thoughts) {
      const user = users.find(user => user.username === thought.username);
      user.thoughts.push(thought);
      await user.save();
    }

    console.table(users);
    console.table(thoughts);
    console.log('Seed data has been inserted!');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  process.exit(0);
});