const express = require('express')
const router = express.Router()
const verifyToken = require('../verifytoken')
const Casa = require('../models/casa')

router.post('/',verifyToken, (req, res) => {
    let casa = new Casa()
    casa.name = req.body.name
    casa.description = req.body.description
    casa.userid = req.user.id
    casa.save((err,auxcasa)=>{
        if(err) return res.status(500).send({msg:err})
        res.status(200).json(auxcasa)
    })
})

router.get('/',verifyToken, (req, res)=>{
    if(req.query.name){
        Casa.findOne({name:req.query.name},(err,casa)=>{
            if (err) return res.status(401).send({msg:err})
            res.status(200).json(casa)
        })
    }else{
        Casa.find({userid:req.user.id},(err,casas)=>{
            if (err) return res.status(401).send({msg:err})
            res.status(200).json(casas)
        })
    }
})

router.put('/',verifyToken, (req,res)=>{
    if(req.body.id){
        Casa.findOneAndUpdate
        Casa.findOne({_id:req.body.id},(err,c)=>{
            if (err) return res.status(401).send({msg:err})
            
        })
    }else{
        return res.status(401).send({msg:"No se ha aportado id de la casa"})
    }
})