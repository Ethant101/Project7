const mongoose = require('mongoose');
const { Schema } = mongoose;

//define schema for user items
const userSchema = new Schema({
    first: {
        type: String,
    },
    last: {
        type:String,
    },
    email: {
        type:String,
    },
    age: {
        type: Number,
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});
const collectionName = 'userbencollect';
const User = mongoose.model('BobBuddy', userSchema, collectionName); //BobBuddy or User
module.exports = User;