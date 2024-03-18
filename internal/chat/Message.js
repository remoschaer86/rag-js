
class Message {
    constructor(role, content, sources) {
        this.role = role;
        this.content = content;
        this.sources = sources;
    }

    GetText() {
        return this.content
    }

    GetSources() {
        return this.sources
    }


    GetData(includeSources) {

        let data = {
            role: this.role,
            content: this.content
        }

        if(includeSources) {
            data.sources = this.sources
        }
        return data
    }


    GetDataWithoutSources() {

        const { role, content } = this;

        return {
            role,
            content
        }
    }
}


export default Message;