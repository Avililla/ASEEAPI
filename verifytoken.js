const jwt = require('jsonwebtoken')
const ExpiredJWT = require('./models/jwttoken')

const verifyToken = (req, res, next) => {
    const token = req.header('auth-token')
    if(!token) return res.status(401).json({msg:"Acceso denegado"})
    try{
        ExpiredJWT.findOne({jwt:token},(err,docs)=>{
            if(err) return res.status(401).json({msg:"Acceso denegado"})
            if(docs){
                return res.status(401).json({msg:"Token invalido"})
            }else{
                const verified = jwt.verify(token, process.env.JWTOKEN)
                req.user = verified
                next()
            }
        })
    }catch(error){
        res.status(400).json({msg:'Token no valido, acceso denegado'})
    }
}

module.exports = verifyToken