import { Request, Response } from "express";
import { User, Thought } from "../models";

export const userController = {
  // GET all users
  getAllUsers(req: Request, res: Response): void {
    User.find({})
      .populate({ path: "thoughts", select: "-__v" })
      .populate({ path: "friends", select: "-__v" })
      .select("-__v")
      .then((dbUserData) => res.json(dbUserData))
      .catch((err: any) => res.status(400).json(err));
  },

  // GET a single user by ID
  getUserById(req: Request, res: Response): void {
    const { params } = req;
    User.findOne({ _id: params.userId })
      .populate({ path: "thoughts", select: "-__v" })
      .populate({ path: "friends", select: "-__v" })
      .select("-__v")
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err: any) => res.status(400).json(err));
  },

  // POST to create a new user
  createUser(req: Request, res: Response): void {
    const { body } = req;
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err: any) => res.status(400).json(err));
  },

  // PUT to update a user by ID
  updateUser(req: Request, res: Response): void {
    const { params, body } = req;
    User.findOneAndUpdate(
      { _id: params.userId },
      {
        username: body.username,
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err: any) => res.status(400).json(err));
  },

  // // DELETE to remove a user by ID (and associated thoughts)
  deleteUser(req: Request, res: Response): void {
    const { params } = req;
    User.findOneAndDelete({ _id: params.userId })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
      })
      .then(() =>
        res.json({ message: "User and associated thoughts deleted!" })
      )
      .catch((err: any) => res.status(400).json(err));
  },

  // POST to add a friend
  addFriend(req: Request, res: Response): void {
    const { params } = req;
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err: any) => res.status(400).json(err));
  },

  // DELETE to remove a friend
  removeFriend(req: Request, res: Response): void {
    const { params } = req;
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err: any) => res.status(400).json(err));
  },
};

export default userController;
