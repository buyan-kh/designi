import { promises as fs } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { designProfileSchema } from './designProfileSchema.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_FILE = resolve(__dirname, '../../design-profile.json');
export async function loadDesignProfile() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        const profile = JSON.parse(data);
        return designProfileSchema.parse(profile);
    }
    catch (error) {
        if (error.code === 'ENOENT') {
            console.log('Design profile file not found, creating a new one.');
            const newProfile = {};
            await saveDesignProfile(newProfile);
            return newProfile;
        }
        console.error('Error loading design profile:', error);
        return {}; // Return empty profile on error
    }
}
export async function saveDesignProfile(profile) {
    try {
        const validatedProfile = designProfileSchema.parse(profile);
        await fs.writeFile(DATA_FILE, JSON.stringify(validatedProfile, null, 2), 'utf8');
    }
    catch (error) {
        console.error('Error saving design profile:', error);
        throw error;
    }
}
