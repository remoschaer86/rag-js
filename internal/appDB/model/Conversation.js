
import mongoose from 'mongoose'
const { Schema } = mongoose;



const sourcesSchema = new Schema({
    score:  Number,
    text: String 
});

const MessageSchema = new Schema({
    role: { type: String, enum: ['user','assistant','system'], required: true },
    content: { type: String, required: true },
    sources: [sourcesSchema] 
});

// Add methods to Message schema
MessageSchema.methods.GetText = function () {
    return this.content;
};

MessageSchema.methods.GetSources = function () {
    return this.sources;
};

MessageSchema.methods.GetData = function () {
    const { role, content } = this;
    return {
        role,
        content
    };
};

const ConversationSchema = new Schema({
    messages: [MessageSchema]
});

ConversationSchema.methods.AddMessage = function (msg) {
    this.messages.push(msg);
};

ConversationSchema.methods.GetMessages = function () {
    return this.messages;
};

ConversationSchema.methods.GetSystemMessage = function () {
    return this.messages.find(msg => msg.role === 'system');
};

ConversationSchema.methods.GetUserMessages = function () {
    return this.messages.filter(msg => msg.role === 'user');
};

ConversationSchema.methods.GetLastUserMessage = function () {
    const userMessages = this.messages.filter(msg => msg.role === 'user');
    return userMessages[userMessages.length - 1];
};


export const ConversationModel = mongoose.model('Conversation', ConversationSchema);
export const MessageModel = mongoose.model('Message', MessageSchema);


