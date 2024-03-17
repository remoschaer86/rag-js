class Source {
    constructor(text, score) {
        this.text = text;
        this.score = score;
    }

    GetText() {
        return `score: ${this.score} | text: ${this.text}`
    }
}



export default Source;