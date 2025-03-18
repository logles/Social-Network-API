import { Request, Response } from "express";
import { Thought, User } from "../models";

export const thoughtController = {
  // GET ALL
  getAllThoughts(req: Request, res: Response): void {
    Thought.find({})
      .select("-__v")
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err: any) => res.status(400).json(err));
  },

  // GET
  getThoughtById(req: Request, res: Response): void {
    const { params } = req;
    Thought.findOne({ _id: params.thoughtId })
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err: any) => res.status(400).json(err));
  },

  // POST
  createThought(req: Request, res: Response): void {
    const { body } = req;
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({
            message: "Thought created but no user found with this id!",
          });
          return;
        }
        res.json({ message: "Thought successfully created!" });
      })
      .catch((err: any) => res.status(400).json(err));
  },

  // PUT
  updateThought(req: Request, res: Response): void {
    const { params, body } = req;
    Thought.findOneAndUpdate({ _id: params.thoughtId }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err: any) => res.status(400).json(err));
  },

  // DELETE
  deleteThought(req: Request, res: Response): void {
    const { params } = req;
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        return User.findOneAndUpdate(
          { username: dbThoughtData.username },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        );
      })
      .then(() => res.json({ message: "Thought deleted successfully!" }))
      .catch((err: any) => res.status(400).json(err));
  },

  // POST
  addReaction(req: Request, res: Response): void {
    const { params, body } = req;
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err: any) => res.status(400).json(err));
  },

  // DELETE
  removeReaction(req: Request, res: Response): void {
    const { params } = req;
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err: any) => res.status(400).json(err));
  },
};

export default thoughtController;
