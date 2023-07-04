const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First Name is required"],
        minlength: [3, "First name must be at least 3 characters long!"]
    },
    lastName: {
        type: String,
        required: [true, "Last Name is required"],
        minlength: [3, "Last Name must be at least 3 characters long!"]
    },
    emailAddress: {
        type: String,
        required: [true, "Email Address is required"],
        unique: true,
        lowercase: true,
        validate: {
            validator: function (value) {
                return /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(value);
            },
            message: (props) => `${props.value} is not a valid email address.`,
        },
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long!"]
    },
    confirmPassword: {
        type: String,
        required: [true, 'Confirm Password is required'],
        validate: {
            validator: function (val) {
                return val === this.password;
            },
            message: 'Passwords do not match!',
        },
    },
},
    { timestamps: true }
)

UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next()
})

UserSchema.pre('save', function (next) {
    bcrypt
        .hash(this.password, 10)
        .then((hash) => {
            this.password = hash;
            next();
        })
        .catch((err) => {
            next(err);
        })
})

module.exports.User = mongoose.model('User', UserSchema);