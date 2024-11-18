
import { Thought, User } from '../models/index.js';
import { Request, Response } from 'express';



export const getAllThought = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();

        res.json(thoughts);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}


export const getThoughtById = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;
    try {
        const thought = await Thought.findById(thoughtId);
        if (thought) {
            res.json(thought);
        } else {
            res.status(404).json({
                message: 'Thought not found'
            });
        }
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};


export const createThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: thought._id } },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({
                message: 'User does not exist on that ID'
            })
        }
        res.json({thought, message: 'Thought created'});
        return;
    } catch (err) {
        res.status(500).json(err);
        return;
    }
}


export const deleteThought = async (req: Request, res: Response) => {
    try {
        
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
        );

        if (!thought) {
            return res.status(404).json({ message: 'No such thought exists' });
        }

        return res.json({ message: 'Thought successfully deleted' });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

export const updateThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        );

        if (!thought) {
            res.status(404).json({ message: 'No thought with this id!' });
        }

        res.json({thought, message: 'Thought updated'});
    } catch (error: any) {
        res.status(400).json({
            message: error.message
        });
    }
};


export const postReaction = async (req: Request, res: Response) => {
    console.log('You are adding a Reaction');
    console.log(req.body);
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        );

        if (!thought) {
            return res
                .status(404)
                .json({ message: 'No thought found with that ID :(' });
        }

        return res.json({thought, message: 'Reaction added'});
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const deleteReaction = async (req: Request, res: Response) => {
    try {
        console.log(req.params);
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        );

        if (!thought) {
            return res
                .status(404)
                .json({ message: 'No thought found with that ID :(' });
        }

        return res.json({thought, message: 'Reaction deleted'});
    } catch (err) {
        return res.status(500).json(err);
    }
}
