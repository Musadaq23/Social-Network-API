const { Thought, User } = require('../models');

module.exports = {
  getThoughts(req, res) {
      Thought.find()
          .then((thoughts) => res.status(200).json(thoughts))
          .catch((err) => {
              console.error({ message: err})
              return res.status(500).json(err)
          })
  },

  getSingleThought(req, res) {
      Thought.find({_id: req.params.thoughtId})
      .then((thought) => {
          !thought
              ? res.status(404).json({ message: 'No thought with that ID'})
              : res.status(200).json(thought)
      })
      .catch((err) => res.status(500).json(err))
  },

  // POST a new thought
  createThought(req, res) {
    Thought.create(req.body)
    .then((thought) => {
        User.findOneAndUpdate(
            { username : req.body.username },
            { $addToSet: { thoughts: thought._id } },
            { new: true }
          ).then((user) =>
          !user
          ? res.status(404).json({ message: 'No user with that id'})
          : res.status(200).json(thought)
      )
    })
    .catch((err) => res.status(500).json(err));
},


  // PUT to update a thought by its _id
  updateThought(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId},
        { $set: req.body },
        { new: true}
        ).then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.status(200).json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
},
  
// DELETE to remove a thought by its _id
deleteThought(req, res) {
  User.updateOne(
      { thoughts: req.params.thoughtId },
      { $pull: { thoughts:  req.params.thoughtId } },
      )
      .then((user) => {
          Thought.findOneAndRemove({ _id: req.params.thoughtId })
              .then((thought) =>
              !thought
              ? res.status(404).json({
                  message: 'No thought with this id',
                  })
              : res.status(200).json(thought)
              )
      })
      .catch((err) => res.status(500).json(err));
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
