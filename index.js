//Constantes necesarias para la api rest
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Caja = require('./models/caja.js')
const cors = require('cors')
const UserRoute = require('./routes/user')
const CajaRoute = require('./routes/caja')
const verifyToken = require('./verifytoken')
const dotenv = require('dotenv')
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



mongoose.connect('mongodb://localhost:27017/asee',(err,res)=>{
    if (err) throw err
    console.log("Conexion a bd establecida")
})

app.listen(port,()=>{
    console.log(`Corriendo en puerto ${port}`)
})