export class Remove {
    text: string;

    constructor(text: string) {
        this.text = text;
    }

    public static fromStorage(document: any) {
        return new Remove(document.text);
    }
}