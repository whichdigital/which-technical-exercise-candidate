import { describe, expect, test } from '@jest/globals';
import { setHeading } from './lib';

describe('Robot heading:', () => {
  describe('When facing north', () => {
    test('robot turns left', () => {
      expect(setHeading('north', 'left')).toEqual('west');
    });
  });
});
