
/*
import mongoose from 'mongoose'
const { Schema } = mongoose;

// Define Message schema
const sourcesSchema = new Schema({
    score:  Number,
    text: String 
});


const messageSchema = new Schema({
    role: { type: String, enum: ['user','assistant','system'], required: true },
    content: { type: String, required: true },
    sources: [sourcesSchema] 
});

// Add methods to Message schema
messageSchema.methods.GetText = function () {
    return this.content;
};

messageSchema.methods.GetSources = function () {
    return this.sources;
};

messageSchema.methods.GetData = function () {
    const { role, content } = this;
    return {
        role,
        content
    };
};

// Create Message model
export default mongoose.model('Message', messageSchema);

*/
