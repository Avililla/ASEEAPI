var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CajaSchema = new Schema({
    name:String,
    description:String,
    userid:{
        type:String,
        require:true,
    },
});

var Caja = mongoose.model('Caja',CajaSchema)

module.exports = Caja