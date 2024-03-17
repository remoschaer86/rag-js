import { v4 as uuidv4 } from 'uuid';


class Embedding {
    constructor(text, vector) {
        this.id = uuidv4();
        this.text = text;
        this.vector = vector;
    }
    GetData() {
        const {id, text, vector} = this;

        return {
            id,
            text,
            vector
        }
    }

}

export default Embedding;