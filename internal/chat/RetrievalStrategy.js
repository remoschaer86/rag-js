
class RetrievalStrategy {

    constructor(conversation, type) {
        this.conversation = conversation;
        this.type = type;
    }

    lastUserMessage() {
        const userMessage =  this.conversation.GetLastUserMessage()
        const txt = userMessage.GetText()
        return txt
    }

    allUserMessages() {
        const userMessages =  this.conversation.GetUserMessages()

        let txt = '';

        userMessages.forEach((uMsg, uIdx) => {
            if(uIdx > 0) {
                txt += "\n"
            }
            txt += uMsg.GetText()
        })
        
        return txt
    }

    GetEmbeddingString() {

        let txt = ''

        switch(this.type) {
            case 'lum':
                txt = this.lastUserMessage()
            case 'aum':
                txt = this.allUserMessages()
        }
        return txt;
    }

}


export default RetrievalStrategy;