import { promises as fs } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DesignProfile, designProfileSchema } from './designProfileSchema.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// When running from dist/, go up one level to project root
export const DEFAULT_PROFILE_PATH = resolve(__dirname, '../design-profile.json');

export async function loadDesignProfile(filePath: string = DEFAULT_PROFILE_PATH): Promise<DesignProfile> {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const profile = JSON.parse(data);
    return designProfileSchema.parse(profile);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      console.log('Design profile file not found, creating a new one.');
      const newProfile: DesignProfile = {};
      await saveDesignProfile(newProfile, filePath);
      return newProfile;
    }
    console.error('Error loading design profile:', error);
    return {}; // Return empty profile on error
  }
}

export async function saveDesignProfile(profile: DesignProfile, filePath: string = DEFAULT_PROFILE_PATH): Promise<void> {
  try {
    const validatedProfile = designProfileSchema.parse(profile);
    await fs.writeFile(filePath, JSON.stringify(validatedProfile, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving design profile:', error);
    throw error;
  }
}
