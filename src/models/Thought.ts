import { Schema, model, type Document } from 'mongoose';
import Reaction from './Reaction.js';

interface IThought extends Document {
    thoughtId: Schema.Types.ObjectId;
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: [];
}

const thoughtSchema = new Schema<IThought>(
    {
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
        username: { // the user that created the thought
            type: String,
            required: true,
        },
        reactions: [ Reaction ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        timestamps: true
    },
);

const Thought = model<IThought>('thought', thoughtSchema);

export default Thought;
