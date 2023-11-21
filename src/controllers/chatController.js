import messageRepository from "../repositories/messagesRepository.js"

const MessageRepository = new messageRepository

export const getMessages = async () => {
    try {
        const message = await MessageRepository.readMessages()
        return message
    }
    catch (error) {
        console.log("no se pudieron leer los mensajes anteriores")
    }
}

export const createMessage = async(data) =>{
    try{
        await MessageRepository.createMessage(data)
    }
    catch(error){
        console.log("No se pudo enviar el mensaje")
    }
}