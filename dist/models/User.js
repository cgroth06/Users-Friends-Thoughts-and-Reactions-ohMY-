import { Schema, model } from 'mongoose';
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        //unique: true,
        //trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        //validate: [validateEmail, 'Please fill a valid email address'],
    },
    thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'thought',
        }],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
    ],
}, {
    timestamps: true,
});
const User = model('User', userSchema);
export default User;
