var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Casachema = new Schema({
    name:String,
    description:String,
    userid:{
        type:String,
        require:true,
    }
});

var Casa = mongoose.model('Casa',Casachema)

module.exports = Casa