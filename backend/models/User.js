

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema(


   {
    name: {   type: String, required:true},
    country: {   type: String, required:true},
   },
 
    {
        timestamps:true
    }
);

const User = mongoose.model('User', userSchema)

model.exports = User