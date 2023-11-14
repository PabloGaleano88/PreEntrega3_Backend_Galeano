import express from 'express'
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import productsRouter from './routes/productsRoutes.js'
import cartsRouter from './routes/cartsRoutes.js'
import viewsRouter from './routes/viewsRouter.js'
import userRouter from './routes/userRouter.js';
import ProductManager from './dao/MongoDB/ProductManager.js'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'

import MongoStore from 'connect-mongo';
import session from 'express-session';

import { messageModel } from './dao/MongoDB/models/messageModels.js';
import passport from 'passport';

import initializePassport from './config/passport.config.js';
import sessionRouter from './routes/sessionRouter.js';

import { getProducts } from './controllers/productsController.js';

const app = express()

const httpServer = app.listen(8080, () => console.log("Servicio corriendo en el puerto 8080"))
const socketServer = new Server(httpServer)

const productManager = new ProductManager()

dotenv.config()

mongoose.connect(process.env.MONGODB_PATH)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

app.engine('handlebars', handlebars.engine());
app.set('views', './src/views');
app.set('view engine', 'handlebars');
app.use('/static', express.static('./public'))

app.use(
    session({
        store: MongoStore.create({mongoUrl:process.env.MONGODB_PATH,ttl:15}),
        secret:process.env.SESSION_SECRET,
        resave:false,
        saveUninitialized:false,})
)

app.use((req, res, next) => {
    req.context = { socketServer }
    next()
})

socketServer.on('connection', async (socket) => {
    console.log(`cliente ${socket.id} conectado`)
    const {payload: products} = await getProducts()
    socket.emit("actualizar_realtimeproducts", products)
    const message = await messageModel.find().lean()
        socketServer.emit('new_message', message)
    socket.on('mensaje', async (data) => {
        await messageModel.create(data)
        const message = await messageModel.find().lean()
        socketServer.emit('new_message', message)
    })

})

initializePassport()
app.use(passport.initialize())
app.use(passport.session())


app.use('/', viewsRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/session',sessionRouter)
app.use('/api',userRouter)