class Conversation {
    constructor () {
        this.id = 1;
        this.messages = [];
    }

    AddMessage(msg) {
        this.messages.push(msg)
    }

    GetMessages() {
        return this.messages;
    }

    ClearMessages() {
        this.messages = [];
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

    GetAll() {
        return {
            id: this.id,
            messages: this.messages
        }
    }


    
}


export default Conversation;