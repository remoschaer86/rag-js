class Conversation {
    constructor () {
        this.messages = [];
    }

    AddMessage(msg) {
        this.messages.push(msg)
    }

    GetMessages() {
        return this.messages;
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