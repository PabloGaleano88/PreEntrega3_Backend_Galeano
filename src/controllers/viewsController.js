import ProductManager from "../dao/MongoDB/ProductManager.js";
import CartManager from "../dao/MongoDB/CartManager.js";

const productManager = new ProductManager()
const cartManager = new CartManager()

export const getProductsJson = async (req, res) => {
    try {
        const { limit, page, sort, query } = req.query
        const product = await productManager.getAll(query, limit, page, sort)
        res.send(product)
    }
    catch (error) {
        console.log(error)
    }
}

export const getProducts = async (req, res) => {
    const { limit, page, sort, query } = req.query
    const { first_name, last_name, email, age, cartId, admin } = req.session
    const result = await productManager.getAll(query, limit, page, sort)
    if (!page) {
        const prevLink = result.hasPrevPage ? `http://localhost:8080/products?page=${result.prevPage}&limit=${result.limit}` : false
        const nextLink = result.hasNextPage ? `http://localhost:8080/products?page=${result.nextPage}&limit=${result.limit}` : false
        const products = result.payload
        res.render('products', { products, prevLink, nextLink, first_name, last_name, email, age, cartId, admin, style: 'products.css' })
    }
    else {
        const pageExists = parseInt(page)
        if (pageExists > result.totalPages || isNaN(pageExists) || pageExists < 1) {
            res.render('error')
        }
        else {
            const prevLink = result.hasPrevPage ? `http://localhost:8080/products?page=${result.prevPage}&limit=${result.limit}` : false
            const nextLink = result.hasNextPage ? `http://localhost:8080/products?page=${result.nextPage}&limit=${result.limit}` : false
            const products = result.payload
            res.render('products', { products, prevLink, nextLink, first_name, last_name, email, age, cartId, admin, style: 'products.css' })
        }
    }
}

export const login = (req, res) => {
    const login_fail = req.query.login_fail === 'true';
    res.render('login', { style: 'login.css', login_fail });
}

export const findCart = async (req, res) => {
    const cid = req.params.cid
    const cartById = await cartManager.findCartById(cid)
    const productsOnCart = cartById[0].products
    const session_data = req.session
    let amountTotal = 0
    let quantityTotal = 0
    if (req.session.isLogged) {
        const cid = req.session.cartId
        const userEmail = req.session.email
        productsOnCart.forEach(producto => {
            quantityTotal += producto.quantity
            amountTotal += producto.quantity * producto.productId.price
        });
        amountTotal = amountTotal.toFixed(2)
    }
    else (
        console.log("primero debes iniciar sesion")
    )
    res.render('carts', { productsOnCart, cid, session_data, quantityTotal, amountTotal, style: 'carts.css' })
}