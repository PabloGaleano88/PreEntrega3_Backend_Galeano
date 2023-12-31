import { productsModel } from '../dao/MongoDB/models/productsModel.js'

class productRepository{

    async getProducts(filter, limitQuery, pageQuery, sortQuery) {
        try {
                const products = await productsModel.paginate(filter, {
                limit: limitQuery,
                page: pageQuery,
                sort: sortQuery,
                lean: true,
            })

            return products
        }
        catch(error) {
            throw error
        }
    }
    
    async createProduct(title, description, price, code, category, stock, thumbnail) {
        try{
            const producto = await productsModel.create({
                title,
                description,
                price,
                code,
                status: true,
                category,
                stock,
                thumbnail: [thumbnail],
            })
            return producto
        }
        catch(error){
            throw error
        }
        }

    async deleteProduct(id) {
        try{
            await productsModel.findByIdAndDelete(id)
        }
        catch(error){
            throw error
        }
    }

    async findProductById(id) {
        try {
            const product = await productsModel.findById(id)
            return product
        }
        catch (error) {
            throw error
        }
    }

    async updateProductById(id, updateField,value) {

        try {
            await productsModel.findOneAndUpdate({ _id: id }, { $set: { "stock": value } })
            return this.findProductById(id)
        }
        catch (error) {
            console.log(error)
        }
    }

}

export default productRepository