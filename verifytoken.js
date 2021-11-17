const jwt = require('jsonwebtoken')
const ExpiredJWT = require('./models/jwttoken')

const verifyToken = (req, res, next) => {
    const token = req.header('auth-token')
    if(!token) return res.status(401).json({msg:"Acceso denegado"})
    jwt.verify(token,process.env.JWTOKEN,(err,decoded)=>{
        if(err){
            return res.status(401).json({msg:err})
        }else{
            ExpiredJWT.findOne({jwt:token},(err,docs)=>{
                if(err) return res.status(401).json({msg:"Acceso denegado"})
                if(docs){
                    return res.status(400).json({msg:"Token invalido"})
                }else{
                    req.user = decoded
                    next()
                }
            })
        }
    })
    
}
module.exports = verifyToken