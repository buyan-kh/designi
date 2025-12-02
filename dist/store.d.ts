import { DesignProfile } from './designProfileSchema.js';
export declare const DEFAULT_PROFILE_PATH: string;
export declare function loadDesignProfile(filePath?: string): Promise<DesignProfile>;
export declare function saveDesignProfile(profile: DesignProfile, filePath?: string): Promise<void>;
//# sourceMappingURL=store.d.ts.map