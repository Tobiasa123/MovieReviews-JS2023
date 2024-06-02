const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return value === 'user' || value === 'admin';
            },
            message: props => `${props.value} is not a valid role. Choose between user and admin`
        }
    }
})

const User = mongoose.model('User', userSchema)


module.exports = User;