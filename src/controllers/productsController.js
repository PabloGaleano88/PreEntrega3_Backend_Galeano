import ProductManager from "../dao/MongoDB/ProductManager.js";

const productManager = new ProductManager()

export const getProducts = async (req, res) => {
    const {limit,page,sort,query} = req.query
    const product = await productManager.getAll(query,limit,page,sort)
    res.send(product)
}

export const addProduct = async (req, res) => {
    try{
        const {title, description, price, code, category, stock} = req.body
        const thumbnail = req.file.originalname
        const product = await productManager.create(title, description, price, code, category, stock,thumbnail)
        const products = await productManager.getAll()
        res.status(200).send(products)
        req.context.socketServer.emit('actualizar_realtimeproducts',products)
    }
    catch(error){
        console.log(error)
        res.status(400).send(error)
    }
    }

export const getProductById =  async (req, res) => {
    const id = req.params.pid
    const productById = await productManager.findById(id)
    res.status(200).send(productById)
}

export const updateProduct =  async (req, res) => {
    const id = req.params.pid
    const updateFields= req.body
    const productUpdated = await productManager.updateProduct(id,updateFields)
    res.status(200).send(productUpdated)
}

export const deleteProduct = async (req, res) => {
    const id = req.params.pid
    try{
        const products = await productManager.delete(id)
        req.context.socketServer.emit('actualizar_realtimeproducts',products)
        res.status(200).send(products)
    }
    catch(error){
        console.log(error)
        res.status(400).send(error)
        
    }
}


