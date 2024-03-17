import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    content: String,
    role: { type: String, enum: ['user', 'assistant', 'system'] },
    // Add any other properties you want to store for each message
});

// Define the schema for the conversation
const conversationSchema = new mongoose.Schema({
    name: String,
    messages: [messageSchema],
    // Add any other properties you want to store for the conversation
});

const ConversationModel = mongoose.model('Conversation', conversationSchema);




class Conversation {
    constructor () {
        this.model = new ConversationModel()

    }



    async AddMessage(msg) {

        const data = msg.GetData()

        this.model.messages.push(data)
        await this.model.save()
    }

    GetMessages() {
        return this.messages
    }

    GetSystemMessage() {
        const systemMsg = this.messages.filter(msg => msg.role === 'system')[0]
        return systemMsg
    }

    GetUserMessages() {
        return this.messages.filter(msg => msg.role === 'user');
    }

    GetLastUserMessage() {
        const userMessages = this.messages.filter(msg => msg.role === 'user');
        const lastMessage = userMessages[userMessages.length - 1]
        return lastMessage
    }
    
}


export default Conversation;