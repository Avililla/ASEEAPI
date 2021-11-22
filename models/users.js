var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username:{
        type:String,
        require:true,
        min:6,
        max:255
    },
    password:{
        type:String,
        require:true,
        minlength:8
    },
    email:{
        type:String,
        require:true,
        min:6,
        max:255
    },
});

var User = mongoose.model('User',UserSchema)

module.exports = User