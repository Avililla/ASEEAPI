var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjetoSchema = new Schema({
    name:{
        type:String,
        require:true,
    },
    idcaja:String,
    imginfo:Object,
    description:String,
    userid:{
        type:String,
        require:true,
    },
});

var Objeto = mongoose.model('Objeto',ObjetoSchema)

module.exports = Objeto