import CartRepository from "../../repositories/cartRepository.js"

const cartRepository = new CartRepository

class CartManager {
    async addCart(){
        return await cartRepository.addCart()
    }

    async findCartById(id){
        return await cartRepository.findCartById(id)
    }

    async addProductToCart(cid, pid, quantity){
        return await cartRepository.addProductToCart(cid, pid, quantity)
    }

    async removeProductFromCart(cartId, productId){
        return await cartRepository.removeProductFromCart(cartId, productId)
    }

    async removeAllProductsFromCart(cartId){
        return await cartRepository.removeAllProductsFromCart(cartId)
    }

    async updateProducts(cartId, productUpdate){
        return await cartRepository.updateProducts(cartId, productUpdate)
    }

    async updateProductQuantity(cartId, productId, quantity){
        return await cartRepository.updateProductQuantity(cartId, productId, quantity)
    }
}

export default CartManager
