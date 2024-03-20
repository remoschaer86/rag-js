import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        enum: ['user', 'assistant', 'system']
    },
    content: String
});

const conversationSchema = new mongoose.Schema({
    messages: [messageSchema]
});

export default new mongoose.model('Conversation', conversationSchema);
