
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

    GetData() {

        const {role,content, sources} = this;

        return {
            role,
            content,
            sources
        }
    }


    GetDataWithoutSources() {

        const {role,content} = this;

        return {
            role,
            content
        }
    }
}


export default Message;