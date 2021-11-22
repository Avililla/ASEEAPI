//Constantes necesarias para la api rest
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Caja = require('./models/caja.js')
const cors = require('cors')
const UserRoute = require('./routes/user')
const CajaRoute = require('./routes/caja')
const ObjetoRoute = require('./routes/objeto')
const CasaRoute = require('./routes/casa')
const verifyToken = require('./verifytoken')
const dotenv = require('dotenv')
const path = require('path')
var fs = require("fs");

//Servidores
// var http = require('http')
// var https = require('https')
//Cargar la configuración
dotenv.config()


const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// var corsOptions = {
//     origin: '*', // Aqui debemos reemplazar el * por el dominio de nuestro front
//     optionsSuccessStatus: 200 // Es necesario para navegadores antiguos o algunos SmartTVs
// }
app.use(cors())

app.use('/uploads',verifyToken,express.static('./storage/imgs'))
//Definición de las rutas
app.use('/user',UserRoute)
app.use('/caja',verifyToken,CajaRoute)
app.use('/casa',verifyToken,CasaRoute)
app.use('/objeto',verifyToken,ObjetoRoute)

app.get('/image',(req,res)=>{
    console.log(__dirname)
    console.log(path.join(__dirname,req.query.imgsrc))
    try{
        fs.readFile(path.join(__dirname,req.query.imgsrc),(err,data)=>{
            if(err) return res.status(500)
            var encodedimage = new Buffer(data, 'binary').toString('base64')
            console.log("Lo tengo")
            res.status(200).json(encodedimage)
        })
    }catch(err){
        res.status(500).send({msg:'Error getting image'})
    }
})


mongoose.connect('mongodb://localhost:27017/asee',(err,res)=>{
    if (err) throw err
    console.log("Conexion a bd establecida")
})

// var httpsServer = https.createServer(app);
// httpsServer.listen(port,()=>{
//     console.log(`Corriendo en puerto ${port}`)
// })

app.listen(port,()=>{
    console.log(`Corriendo en puerto ${port}`)
})