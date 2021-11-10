const express = require('express')
const router = express.Router()
const verifyToken = require('../verifytoken')
const Caja = require('../models/caja')
const upload = require('../libs/storage')
const path = require('path')

router.get('/',(req,res)=>{
    console.log(req.user)
    if(req.query.id){

    }else{
        Caja.find({userid:req.user.id},(err,cajas)=>{
            if(err) return res.status(500).send({msg:err})
            res.status(200).json(cajas)
        })
    }
})
// router.get('/image',(req,res)=>{
//     try{
//         res.status(200).sendFile(path.join(__dirname, '../',req.query.imgsrc))
//     }catch(err){
//         res.status(500).send({msg:'Error getting image'})
//     }
    
// })

router.post('/',upload.single('image'), (req, res) => {
    let caja = new Caja()
    caja.name = req.body.name
    caja.idcasa = req.body.idcasa
    caja.imginfo = req.file
    caja.description = req.body.description
    caja.userid = req.user.id
    console.log(caja)
    caja.save((err,product)=>{
        if(err) return res.status(500).send({msg:err})
        res.status(200).json(product)
    })
})

module.exports = router