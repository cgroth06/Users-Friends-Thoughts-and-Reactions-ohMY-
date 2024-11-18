import { Schema, model } from 'mongoose';
import Reaction from './Reaction.js';
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [Reaction]
}, {
    toJSON: {
        virtuals: true,
    },
    timestamps: true
});
const Thought = model('thought', thoughtSchema);
export default Thought;
