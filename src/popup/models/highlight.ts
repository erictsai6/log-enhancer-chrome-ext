export class Highlight {
    text: string;
    color: string;

    constructor(text: string, color: string) {
        this.text = text;
        this.color = color;
    }

    public static fromStorage(document: any) {
        return new Highlight(document.text, document.color);
    }
}