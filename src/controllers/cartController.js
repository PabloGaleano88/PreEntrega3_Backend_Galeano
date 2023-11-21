import CartManager from "../dao/MongoDB/CartManager.js";
import ProductManager from "../dao/MongoDB/ProductManager.js";
import { sendMail } from "../services/mailService.js";

const cartManager = new CartManager
const productManager = new ProductManager

export const addCart = async (req, res) => {
    const result = await cartManager.addCart()
    res.status(200).send(result)
}

export const getCartById = async (req, res) => {
    const cid = req.params.cid
    const cartById = await cartManager.findCartById(cid)
    res.status(200).send(cartById)
}

export const addProductToCart = async (req, res) => {
    const cid = req.params.cid
    const pid = req.params.pid
    const result = await cartManager.addProductToCart(cid, pid, 1)
    res.status(200).send(result)
}

export const updateProducts = async (req, res) => {
    const cid = req.params.cid
    const productUpdate = req.body
    const result = await cartManager.updateProducts(cid, productUpdate)
    res.status(200).send(result)
}

export const updateProductQuantity = async (req, res) => {
    const cid = req.params.cid
    const pid = req.params.pid
    const { quantity } = req.body
    const result = await cartManager.updateProductQuantity(cid, pid, quantity)
    res.status(200).send(result)
}

export const removeProductFromCart = async (req, res) => {
    const cid = req.params.cid
    const pid = req.params.pid
    const result = await cartManager.removeProductFromCart(cid, pid)
    res.status(200).send(result)
}

export const removeAllProductsFromCart = async (req, res) => {
    const cid = req.params.cid
    const result = await cartManager.removeAllProductsFromCart(cid)
    res.status(200).send(result)
}

export const purchase = async (req, res) => {
    try {
        const cid = req.session.cartId
        const userEmail = req.session.email
        if (req.session.isLogged) {
            const [cart] = await cartManager.findCartById(cid)
            let amountTotal = 0
            let quantityTotal = 0

            for (const producto of cart.products) {
                if (producto.quantity <= producto.productId.stock) {
                    await cartManager.removeProductFromCart(cid, producto.productId._id)
                    const newstock = producto.productId.stock - producto.quantity
                    quantityTotal += producto.quantity
                    amountTotal += producto.quantity * producto.productId.price
                    await productManager.updateProduct(producto.productId._id, "stock", newstock)
                }
            };
            amountTotal = amountTotal.toFixed(2)
            const autoCode = userEmail.substring(0, 3) + Math.floor(Math.random() * 1000 + 1)
            await cartManager.createTicket(autoCode, amountTotal, userEmail)
            sendMail(userEmail, autoCode, amountTotal)
            res.status(200).send("ok")
        }
        else {
            console.log("El usuario no inició sesión")

        }
    }
    catch (error) {
        console.log("Ocurrió un error en Purchase", error)
    }
}