var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Casachema = new Schema({
    name:String,
    description:String,
    userid:{
        type:String,
        require:true,
    },
    nucleof:Array[String]
});

var Casa = mongoose.model('Caja',Casachema)

module.exports = Casa