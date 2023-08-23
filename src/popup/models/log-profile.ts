import { getRandomColor } from "../colors";
import { Highlight } from "./highlight";
import { Remove } from "./remove";

export class LogProfile {
    name: string | null;
    highlights: Highlight[];
    removes: Remove[];

    constructor(
        name: string | null,
        highlights: Highlight[],
        removes: Remove[]) {
        this.name = name;
        this.highlights = highlights;
        this.removes = removes;
    }

    public static emptyLogProfile() {
        return new LogProfile(null, [], [])
    }

    public static fromStorage(document: any) {
        return new LogProfile(
            document.name,
            document.highlights.map(x => Highlight.fromStorage(x)),
            document.removes.map(x => Remove.fromStorage(x)),
        )
    }

    public isDefault() {
        return !this.name;
    }

    public addHighlight() {
        this.highlights.push(new Highlight('', getRandomColor()));
    }

    public addRemove() {
        this.removes.push(new Remove(''));
    }

    public deleteHighlight(i: number) {
        this.highlights.splice(i, 1);
    }

    public deleteRemove(i: number) {
        this.removes.splice(i, 1);
    }
}