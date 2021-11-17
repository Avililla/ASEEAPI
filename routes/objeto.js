const express = require('express')
const router = express.Router()
const verifyToken = require('../verifytoken')
const Objeto = require('../models/objeto')
const upload = require('../libs/storage')
const path = require('path')

router.get('/',verifyToken,(req, res)=>{
    Objeto.find({'userid':req.user.id},(err, objeto)=>{
        
    })
})

router.get('/:name',verifyToken,(req, res)=>{
    
})

router.get('/:id',verifyToken,(req, res)=>{
    
})