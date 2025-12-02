import assert from 'node:assert';
import { test, describe, before, after } from 'node:test';
import { promises as fs } from 'fs';
import { resolve } from 'path';
import { loadDesignProfile, saveDesignProfile } from '../src/store.js';
import { DesignProfile } from '../src/designProfileSchema.js';

const TEST_FILE = resolve('test-profile.json');

describe('Store Tests', () => {
  before(async () => {
    // Clean up before start
    try {
      await fs.unlink(TEST_FILE);
    } catch (e) {}
  });

  after(async () => {
    // Clean up after finish
    try {
      await fs.unlink(TEST_FILE);
    } catch (e) {}
  });

  test('should create new profile if not exists', async () => {
    const profile = await loadDesignProfile(TEST_FILE);
    assert.deepStrictEqual(profile, {});
    
    // Check if file was created
    try {
      const stat = await fs.stat(TEST_FILE);
      assert.ok(stat.isFile());
    } catch (e) {
      assert.fail('File should exist');
    }
  });

  test('should save and load profile', async () => {
    const newProfile: DesignProfile = {
      tone: 'playful',
      keywords: ['test', 'demo']
    };
    await saveDesignProfile(newProfile, TEST_FILE);
    
    const loaded = await loadDesignProfile(TEST_FILE);
    assert.deepStrictEqual(loaded, newProfile);
  });
});
