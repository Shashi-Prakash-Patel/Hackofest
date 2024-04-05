import {model, Schema} from 'mongoose';

const UserSchema = new Schema({});

const UserModel = model("user", UserSchema);

export default UserModel;