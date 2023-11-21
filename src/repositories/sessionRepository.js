import { userModel } from "../dao/MongoDB/models/userModel.js"

class sessionRepository{

    async findUser(email){
        try{
            const user = await userModel.findOne({ email:email}).lean()
            return user
        }
        catch(error){
            throw error
        }
    } 
}

export default sessionRepository   