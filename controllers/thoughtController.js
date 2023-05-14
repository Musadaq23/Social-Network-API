const { Thought, User } = require('../models');

const thoughtController = {
  // GET all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .sort({ createdAt: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // GET a single thought by its _id
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(dbThoughtData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // POST a new thought
  addThought(req, res) {
    Thought.create(req.body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: req.params.userId },
          { $push: { thoughts: _id } },
          { new: true, runValidators: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // PUT to update a thought by its _id
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(dbThoughtData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }, 
  
// DELETE to remove a thought by its _id
deleteThought(req, res) {
    Thought.findByIdAndDelete(req.params.thoughtId)
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought found with this id!' });
        }
        // Bonus: remove thought from user's thoughts array
        return User.findOneAndUpdate(
          { _id: dbThoughtData.username },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
      })
      .then(thought => {
        if (!thought) {
          return res.json({ message: 'Thought deleted, but associated user data not found.' });
        }
        res.json({ message: 'Thought and associated user data deleted!' });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

    //create reaction
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { new: true }
          ).then((thought) => {
            !thought
                ? res.status(404).json({ message: 'No thought with that ID'})
                : res.status(200).json(thought)
        })
        .catch((err) => res.status(500).json(err))
    },

    //delete reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id : req.params.thoughtId },
            { $pull: { reactions: { _id: req.body.reactionId } } },
            { new: true }
          ).then((thought) => {
            !thought
                ? res.status(404).json({ message: 'No thought with that ID'})
                : res.status(200).json(thought)
        })
        .catch((err) => res.status(500).json(err))
    },
}
