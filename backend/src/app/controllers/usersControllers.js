import mongoose, { model } from "mongoose";

const User = model("Users");

const fetchUsers = (req, res, next) => {
  User.find()
    .exec()
    .then(user => {
      return res.status(200).json(user);
    })
    .catch(e => next(e));
};

const createUser = (req, res, next) => {
  const user = new User({
    _id: mongoose.Types.ObjectId(),
    username: req.body.username,
    password: Math.random()
      .toString(36)
      .slice(2)
  });

  user
    .save()
    .then(() => res.status(201).send())
    .catch(e => next(e));
};

const deleteUser = (req, res, next) => {
  const userId = mongoose.Types.ObjectId(req.params.userId);
  User.find({ _id: userId })
    .remove()
    .then(() => res.status(204).send())
    .catch(e => next(e));
};

export { fetchUsers, createUser, deleteUser };
