const express = require('express')
const router = express.Router()
const verifyToken = require('../verifytoken')
const Caja = require('../models/caja')
const upload = require('../libs/storage')
const path = require('path')



router.get('/',verifyToken,(req,res)=>{
    Caja.find({'userid':req.user.id},(err,cajas)=>{
        if(err) return res.status(500).send({msg:err})
        res.status(200).json(cajas)
    })
})

router.get('/id',verifyToken,(req,res)=>{
    console.log(req.query.id)
    Caja.findOne({'userid':req.user.id,'_id':req.query.id},(err,caja)=>{
        if(err) return res.status(500).send({msg:err})
        console.log(caja)
        res.status(200).json(caja)
    })
})

router.get('/name',verifyToken,(req,res)=>{
    if(req.query.name){
        Caja.find({'userid':req.user.id,'name':req.query.name},(err,cajas)=>{
            if(err) return res.status(500).send({msg:err})
            res.status(200).json(cajas)
        })
    }else{
        res.status(401).send({msg:"No se ha aportado el id de la caja"})
    }
})



//Necesitamos el id que tiene en la bd
router.put('/',verifyToken,(req,res)=>{
    if(req.query.id){
        Caja.findOneAndUpdate({'_id':req.query.id},{'name':req.body.name,'idcasa':req.body.idcasa,'description':req.body.description},{new:true},(err,doc)=>{
            if(err) return res.status(500).send({msg:err})
            res.status(200).json(doc)
        })
    }else{
        return res.status(401).send({msg:"No se ha aportado id de la caja"})
    }
})

router.post('/',verifyToken,upload.single('image'), (req, res) => {
    if(req.body.name && req.body.description){
        let caja = new Caja()
        caja.name = req.body.name
        if(req.body.idcasa !== undefined){
            caja.idcasa = req.body.idcasa
        }
        if(req.file !== undefined){
            caja.imginfo = req.file.path
        }
        caja.description = req.body.description
        caja.userid = req.user.id
        console.log(caja)
        caja.save((err,product)=>{
            if(err) return res.status(500).send({msg:err})
            res.status(200).json(product)
        })
    }else{
        res.status(401).send({msg:"No se han aportado todos los datos necesarios"})
    }
})

router.delete('/',verifyToken, (req, res) => {
    if(req.query.id){
        Caja.deleteOne({'userid':req.user.id,'_id':req.query.id},(err,count)=>{
            if(err) return res.status(500).send({msg:err})
            res.status(200).json({deleted:count})
        })
    }else{
        return res.status(401).send({msg:"No se ha aportado id de la caja"})
    }
})

module.exports = router