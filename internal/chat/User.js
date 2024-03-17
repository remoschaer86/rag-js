import Message from "./Message.js";
//import {MessageModel as Message} from "../appDB/model/Conversation.js";

class User {
  constructor(conversation) {
    this.conversation = conversation;

    this.name = "user";
  }

  CreateMessage(text, sources) {
    const msg = new Message(this.name, text, null)
    this.conversation.AddMessage(msg);
    return msg;
  }

}

export default User;
