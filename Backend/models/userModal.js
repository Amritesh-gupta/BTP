import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        username: String,
        password: String,
        isAdmin: Number,
        tokens: [{
            token: {
                type: String,
            }
        }]
    }
);

userSchema.methods.generateToken = async function () {
    const token = jwt.sign({ _id: this._id.toString() }, "btpProject", { expiresIn: "1 days" });
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
}

userSchema.methods.hashPassword = async function (){
    this.password = await bcrypt.hashSync(this.password, 8);
}


export const User = new mongoose.model("user", userSchema);