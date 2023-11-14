import CartManager from "../dao/MongoDB/CartManager.js";

const cartManager = new CartManager('./src/carts.json')

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
    const result = await cartManager.addProductsToCart(cid, pid, 1)
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