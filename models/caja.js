var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CajaSchema = new Schema({
    name:{
        type:String,
        require:true,
    },
    idcasa:String,
    imginfo:Object,
    description:String,
    userid:{
        type:String,
        require:true,
    }
});

var Caja = mongoose.model('Caja',CajaSchema)

module.exports = Caja