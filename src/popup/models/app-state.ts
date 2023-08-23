import { LogProfile } from "./log-profile";
import { Highlight } from "./highlight";
import { Remove } from "./remove";

export class AppState {
    selectedProfile: LogProfile;
    savedLogProfiles: LogProfile[];

    // Increment when breaking changes are needed
    public static version = '2';

    constructor(selectedProfile: LogProfile, savedLogProfiles: LogProfile[]) {
        this.selectedProfile = selectedProfile;
        this.savedLogProfiles = savedLogProfiles;
    }

    public saveLogProfile(name: string) {
        this.validateUniqueName(name);
        this.selectedProfile.name = name;
        this.savedLogProfiles.push(this.selectedProfile);
    }

    public updateLogProfile(index: number) {        
        this.savedLogProfiles[index] = this.selectedProfile;
    }

    public deleteLogProfile(index: number) {
        this.savedLogProfiles.splice(index, 1);
    }

    private validateUniqueName(name: string) {
        if (this.savedLogProfiles.filter(x => x.name === name).length > 0) {
            throw new Error(`Log profile name must be unique`);
        }
    }

    public static fromStorage(document: any) {
        /*
        {
            highlights: Highlight[],
            removes: Remove[]
        }
        */
        if (!document.version) {
            return new AppState(new LogProfile(null, 
                (document.highlights || []).map(x => Highlight.fromStorage(x)),
                (document.removes || []).map(x => Remove.fromStorage(x))), []);
        }
        if (document.version === AppState.version) {
            return new AppState(LogProfile.fromStorage(document.selectedProfile),
                document.savedLogProfiles.map(x => LogProfile.fromStorage(x)));
        }
        throw new Error(`Unsupported version found, ${document.version}`);
    }
}