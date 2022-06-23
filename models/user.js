import mongoose from "mongoose";
const { Schema } = mongoose;
import bcrypt from "bcrypt";

const userSchema = new Schema({
    name: { type: String, required: 'Name is required', trim: true },
    email: { type: String, required: 'Email is required', unique: true, trim: true },
    password: { type: String, required: true, minlength: 6, maxlength: 20 },
    stripe_account_id: '',
    stripe_seller: {},
    stripeSessions: {},
},
{timestamps: true});

userSchema.pre('save', function (next) {
    let user = this
    if (!user.isModified('password')) {
        return bcrypt.hash(user.password, 12, (err, hash) => {
            if(err){
                console.log('This is the error', err)
                return next(err)
            }
                user.password = hash
                return next()
    })

    } else{
        return next()
    }
})

export default mongoose.model('User', userSchema);