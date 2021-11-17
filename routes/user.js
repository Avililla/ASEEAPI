const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/users')
const ExpiredJWT = require('../models/jwttoken')
const Joi = require('joi')
const verifyToken = require('../verifytoken')

const schemaRegister = Joi.object({
    username:Joi.string().min(6).max(255).required(),
    email:Joi.string().min(6).max(255).required().email(),
    password:Joi.string().min(8).max(1024).required()
})

router.post('/register',(req,res)=>{
    const {error} = schemaRegister.validate(req.body)
    if(error){
        res.status(400).send({msg:error.details[0].message})
    }else{
        User.find({email:req.body.email},(err,docs)=>{
            if(err) return res.status(500).json({msg:'Error interno'})
            if(docs.length) return res.status(409).json({msg:'Este email pertenece a un usuario ya registrado'})
            bcrypt.genSalt(10,(err,salt)=>{
                if(err) return res.status(500).json({msg:err.message})
                bcrypt.hash(req.body.password,salt,(err,hash)=>{
                    if(err) return res.status(500).json({msg:err})
                    let user = new User()
                    user.username = req.body.username
                    user.password = hash
                    user.email = req.body.email
                    user.save((err,auxuser)=>{
                        if(err) return res.status(500).json({msg:"Error al insertar un usuario"})
                        res.status(200).json({auxuser})
                    })
                })
            })
            
        })
    }
})

const schemaLogin = Joi.object({
    email:Joi.string().min(6).max(255).required().email(),
    password:Joi.string().min(6).max(1024).required()
})

router.post('/login',(req,res)=>{
    const {error} = schemaLogin.validate(req.body)
    if(error){
        res.status(400).json({msg:error.details[0].message})
    }else{
        User.findOne({email:req.body.email},(err,user)=>{
            if(err) return res.status(500).json({msg:err})

            if(!user) return res.status(400).json({msg:"No existe un usuario con ese email"})
                
            bcrypt.compare(req.body.password,user.password,(err,pass)=>{
                if(err) return res.status(500).json({msg:err})

                if(!pass) return res.status(400).json({msg:"No existe un usContraseña invalida"})

                const token = jwt.sign({
                    name: user.username,
                    id: user._id
                }, process.env.JWTOKEN,{expiresIn:"1d"})
                res.status(200).header('auth-token',token).json({token})
            })
        })
    }
})

router.post('/logout',verifyToken,(req,res)=>{
    console.log(`${req.user.name} pidiendo loggout`)
    console.log(req.header('auth-token'))
    let expired = new ExpiredJWT()
    expired.jwt = req.header('auth-token')
    expired.save((err,expi)=>{
        if(err) return res.status(500).json({msg:"Error insertando jwt"})
        res.status(200).json({msg:'Loggout completed',exam:expi})
    })
})

router.get('/',verifyToken,(req,res)=>{
    User.find({_id:req.user.id},(err,user)=>{
        if(err) return res.status(400).json({msg:"Usuario no encontrado"})
        res.status(200).json(user)
    })
})

// router.put('/',(req,res)=>{

// })


module.exports = router