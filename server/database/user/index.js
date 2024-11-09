import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { response } from 'express';

const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    cart: [{
        cartItemObjectId: { type: String, required: true },
        itemTotal: { type: Number, required: true },
    }],
    address: [{type:String}],
    phoneNumber: [{ type: Number }],
    orders: [
        {
            order: [{ 
                ObjectId:{ type:String} ,
                itemTotal:{type:String},
                totalPrice:{type:String},
            }],
            deliveryAddress: { type: String },
            status: { type: String } // Corrected field name
        }
    ]    
},
    {
        timestamps: true
    });

UserSchema.methods.generateJwtToken = function () {
    return jwt.sign({ user: this._id.toString() }, "ZomatoApp");

}

UserSchema.statics.findEmailAndPhone = async ({ email, phoneNumber }) => {
    //check whether the email exists
    const checkUserByEmail = await UserModel.findOne({ email });
    //check whether the phoneNumber Exists
    const checkUserByPhone = await UserModel.findOne({ phoneNumber });
    if (checkUserByEmail || checkUserByPhone) {
        throw new Error("User already exist");
    }
    return false;
};

//signin
UserSchema.statics.findEmailAndPassword = async ({ email, password }) => {
    const user = await UserModel.findOne({ email });
    if (!user) {
        throw new Error("email not found");
    }
    const doesPasswordsMatch = await bcrypt.compare(password, user.password);
    if (!doesPasswordsMatch) {
        throw new Error("Password does not match");
    }
    return user;
}

UserSchema.pre("save", function (next) {
    const user = this;
    if (user.isModified("password")) {
        // Hash the password and continue
        bcrypt.genSalt(8, (error, salt) => {
            if (error) return next(error);

            bcrypt.hash(user.password, salt, (error, hash) => {
                if (error) return next(error);

                user.password = hash; // Update the password
                return next();
            });
        });
    } else {
        // Continue without modifying the password
        return next();
    }

})

export const UserModel = mongoose.model("users", UserSchema);