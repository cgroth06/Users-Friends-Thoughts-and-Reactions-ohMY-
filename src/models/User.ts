import { Schema, model, type Document } from 'mongoose';


interface IUser extends Document {
    
    username: string,
    email: string,
    thoughts: [],
    friends: [],
    
}

const userSchema = new Schema<IUser>(
    {
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
    },
    {
        timestamps: true,
        
    }
);

const User = model('User', userSchema);

export default User;
