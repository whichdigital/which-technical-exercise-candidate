import { describe, expect, test } from '@jest/globals';
import { setHeading } from './lib';
import { Headings, Turns } from '.';

const testSetHeading = (heading: Headings, turn: Turns) => {
  const results = {
    north: {
      left: 'west',
      right: 'east',
    },
    east: {
      left: 'north',
      right: 'south',
    },
    south: {
      left: 'east',
      right: 'west',
    },
    west: {
      left: 'south',
      right: 'north',
    },
  };
  test(`robot turns ${turn}`, () => {
    expect(setHeading(heading, turn)).toEqual(results[heading][turn]);
  });
};

describe('Robot heading:', () => {
  const turns: Turns[] = ['left', 'right'];
  const headings: Headings[] = ['north', 'south', 'east', 'west'];

  headings.forEach((heading) => {
    describe(`When facing ${heading}`, () => {
      turns.forEach((turn) => {
        testSetHeading(heading, turn);
      });
    });
  });
});
