import { Router } from "express";
import ProductManager from '../dao/MongoDB/ProductManager.js'
import CartManager from "../dao/MongoDB/CartManager.js";
import publicRoutes from "../middlewares/publicRoutes.js";
import privateRoutes from "../middlewares/privateRoutes.js";
import adminRoutes from "../middlewares/adminAuthorization.js"
import userRoutes from "../middlewares/userAuthorization.js"

const productManager = new ProductManager()
const cartManager = new CartManager()

import { getProductsJson, getProducts, login, findCart } from "../controllers/viewsController.js";


const rtRouter = Router()


rtRouter.get('/', getProductsJson)

rtRouter.get('/realtimeproducts', adminRoutes, async (req, res) => {
    res.render('realTimeProducts', { style: 'realTimeProducts.css' })
})

rtRouter.get('/chat', userRoutes,(req, res) => {
    res.render('chat', { style: 'chat.css' })
})

rtRouter.get('/products', privateRoutes, getProducts)

rtRouter.get('/login', publicRoutes, login)

rtRouter.get('/signup', publicRoutes, (req, res) => {
    res.render('signup', { style: 'signup.css' })
})

rtRouter.get('/carts/:cid',privateRoutes ,findCart)

rtRouter.get('/failregister', (req, res) => {
    res.render('failRegister')
})

export default rtRouter