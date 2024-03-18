import Message from "./Message.js";

class System {

    constructor(conversation) {
        this.conversation = conversation;
        this.name = 'system';
    }

    CreateMessage(text) {
        const msg = new Message(this.name, text, null)
        this.conversation.AddMessage(msg);
        return msg;
    }

}


export default System;