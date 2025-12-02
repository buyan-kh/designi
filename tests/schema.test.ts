import assert from 'node:assert';
import { test, describe } from 'node:test';
import { designProfileSchema } from '../src/designProfileSchema.js';

describe('Schema Tests', () => {
  test('should validate valid hex colors', () => {
    const valid = {
      colorPalette: {
        primary: '#000000',
        secondary: '#FFF'
      }
    };
    const result = designProfileSchema.parse(valid);
    assert.deepStrictEqual(result, valid);
  });

  test('should reject invalid hex colors', () => {
    const invalid = {
      colorPalette: {
        primary: 'red' // Not a hex
      }
    };
    assert.throws(() => {
      designProfileSchema.parse(invalid);
    });
  });

  test('should validate typography sizes', () => {
     const valid = {
         typography: {
             headingSize: '2rem'
         }
     };
     const result = designProfileSchema.parse(valid);
     assert.deepStrictEqual(result, valid);
  });
});
