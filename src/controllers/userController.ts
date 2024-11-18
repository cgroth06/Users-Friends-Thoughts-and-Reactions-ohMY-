import { Request, Response } from 'express';
import { User } from '../models/index.js';


export const getAllUsers = async(_req: Request, res: Response) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error:any) {
      res.status(500).json({
        message: error.message
      });
    }
  };

export const getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
      const user = await User.findById(userId);
      if(user) {
        res.json(user);
      } else {
        res.status(404).json({
          message: 'User not found'
        });
      }
    } catch (error: any) {
      res.status(500).json({
        message: error.message
      });
    }
  };

export const createUser = async (req: Request, res: Response) => {
    const { username, email } = req.body;
    try {
      const newUser = await User.create(
        {username, email}
      );
      res.status(201).json({newUser, message: "User created"});
    } catch (error: any) {
      res.status(400).json({
        message: error.message
      });
    }
  };

export const updateUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: 'No user with this id!' });
      }

      res.json({ user, message: "user updated" });
    } catch (error: any) {
      res.status(400).json({
        message: error.message
      });
    }
  };

export const deleteUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId});
      
      if(!user) {
        res.status(404).json({
          message: 'No User with that ID'
        });
      } else {
        res.json({ message: 'User has been deleted!' });
      }
      
    } catch (error: any) {
      res.status(500).json({
        message: error.message
      });
    }
  };

  export const newFriend = async (req: Request, res: Response) => {
    try {
       await User.findOneAndUpdate(
        {_id: req.params.userId},
        {$push: {friends: req.params.friendId}},
        {new: true}
      )
      return res.json({ message: 'Friend added' });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message
      });
    }
  };

  export const removeFriend = async (req: Request, res: Response) => {
    try {
      const user = await User.findOneAndUpdate(
        {_id: req.params.userId},
        {$pull: {friends: req.params.friendId}},
        {new: true}
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      return res.json({ message: 'Friend removed' });
      
    } catch (error: any) {
      return res.status(500).json({
        message: error.message
      });
    }
  };
