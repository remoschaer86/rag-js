import Message from "./Message.js";
//import Message from "../appDB/model/Message.js";

class System {

    constructor(conversation) {
        this.conversation = conversation;
        this.name = 'system';
    }

    async CreateMessage(text) {
        const msg = new Message(this.name, text, null)
        await this.conversation.AddMessage(msg);
        return msg;
    }

}


export default System;