var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var JWTSchema = new Schema({
    jwt:String,
    createdAt:{type:Date,default:Date.now,expires:86400}
});

var JWT = mongoose.model('ExpiredJWT',JWTSchema)

module.exports = JWT