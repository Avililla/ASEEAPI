const express = require('express')
const router = express.Router()
const verifyToken = require('../verifytoken')
const Objeto = require('../models/objeto')
const upload = require('../libs/storage')
const path = require('path')

//Get para coger todos los objetos de un usuario
router.get('/',verifyToken,(req, res)=>{
    Objeto.find({'userid':req.user.id},(err, objeto)=>{
        if(err) return res.status(500).send({msg:err})
        res.status(200).json(objeto)
    })
})

//Get para coger un objeto o grupo de objetos usando su nombre
router.get('/name',verifyToken,(req, res)=>{
    Objeto.find({'userid':req.user.id,'name':req.query.name},(err, objeto)=>{
        if(err) return res.status(500).send({msg:err})
        res.status(200).json(objeto)
    })
})

//Get para coger un objeto en si usando su id
router.get('/id',verifyToken,(req, res)=>{
    Objeto.find({'userid':req.user.id,'_id':req.query.id},(err, objeto)=>{
        if(err) return res.status(500).send({msg:err})
        res.status(200).json(objeto)
    })
})

//Get para coger todos los objetos de una caja
router.get('/idcaja',verifyToken,(req, res)=>{
    Objeto.find({'userid':req.user.id,'idcaja':req.query.idcaja},(err, objeto)=>{
        if(err) return res.status(500).send({msg:err})
        res.status(200).json(objeto)
    })
})

router.post('/',verifyToken,upload.single('image'),(req, res)=>{
    console.log(req.body)
    if(req.body.name && req.body.description){
        let objeto = new Objeto()
        objeto.name = req.body.name
        objeto.idcaja = req.body.idcaja
        if(req.file !== undefined){
            objeto.imginfo = req.file.path
        }
        objeto.description = req.body.description
        objeto.userid = req.user.id
        objeto.categoria = req.body.categoria
        objeto.save((err,object)=>{
            if(err) return res.status(500).send({msg:err})
            console.log(object)
            res.status(200).json(object)
        })
    }
})

//Actualiza una caja con id x
router.put('/',verifyToken,(req, res)=>{
    if(req.query.id){
        Objeto.findOneAndUpdate({'_id':req.query.id},{'name':req.body.name,'idcaja':req.body.idcaja,'description':req.body.description,'categoria':req.body.categoria},{new:true},(err,doc)=>{
            if(err) return res.status(500).send({msg:err})
            res.status(200).json(doc)
        })
    }
})
//Actualiza el idcaja del objeto
router.put('/caja/id',verifyToken,(req, res)=>{

})

router.delete('/',verifyToken,(req,res)=>{
    if(req.query.id){
        Objeto.deleteOne({'userid':req.user.id,'_id':req.query.id},(err,count)=>{
            if(err) return res.status(500).send({msg:err})
            res.status(200).json({deleted:count})
        })
    }else{
        return res.status(401).send({msg:"No se ha aportado id del objeto"})
    }
})

module.exports = router