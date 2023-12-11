import { describe, expect, test } from '@jest/globals';
import { moveRobot, setHeading } from './lib';
import { Headings, Turns } from '.';

const headings: Headings[] = ['north', 'south', 'east', 'west'];

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
  test(`robot turns ${turn} and now faces ${results[heading][turn]}`, () => {
    expect(setHeading(heading, turn)).toEqual(results[heading][turn]);
  });
};

describe('Robot heading:', () => {
  const turns: Turns[] = ['left', 'right'];

  headings.forEach((heading) => {
    describe(`When facing ${heading}`, () => {
      turns.forEach((turn) => {
        testSetHeading(heading, turn);
      });
    });
  });
});

describe('Move robot:', () => {
  // To keep test run times down, I've only included one 2x2 grid.
  // This has been tested with larger grids of odd sizes, including
  // non-square and off-center grids
  // Feel free to add more or subsititute for another size to test
  const testGrids = [
    {
      corner1: {
        x: -2,
        y: -2,
      },
      corner2: {
        x: 2,
        y: 2,
      },
    },
  ];

  testGrids.forEach((grid) => {
    const gridWidth = grid.corner2.x + (0 - grid.corner1.x);
    const gridHeight = grid.corner2.y + (0 - grid.corner1.y);
    for (let x = grid.corner1.x; x <= grid.corner2.x; x++) {
      for (let y = grid.corner1.y; y <= grid.corner2.y; y++) {
        headings.forEach((heading) => {
          const location = { x, y };
          const result = moveRobot(location, heading, grid);
          test(`robot moves ${heading} at ${x}, ${y} on a ${gridWidth}x${gridHeight} grid: ${
            result === 'crash' ? 'crash' : `to ${result.x}, ${result.y}`
          }`, () => {
            // Hmm. This test is FAR too similar to the actual code...
            // It almost says exactly the same a `moveRobot()` but just with jest syntax
            // It protects the functions from careless changes, but I'm not a big fan.
            // The problem is even a 4x4 grid is 100 tests, and whoo that is tedious to
            // write out by hand, and the configuration of this is so open that there are
            // infinite possible variations. One could just cherry pick a few representative
            // tests for a small number of configurations, but that wouldn't be much quicker
            // than writing a more programmatic test, and would have lower confidence.
            switch (heading) {
              case 'north':
                if (y === grid.corner2.y) {
                  expect(result).toEqual('crash');
                } else {
                  expect(result).toEqual({ x, y: y + 1 });
                }
                break;
              case 'south':
                if (y === grid.corner1.y) {
                  expect(result).toEqual('crash');
                } else {
                  expect(result).toEqual({ x, y: y - 1 });
                }
                break;
              case 'east':
                if (x === grid.corner2.x) {
                  expect(result).toEqual('crash');
                } else {
                  expect(result).toEqual({ x: x + 1, y });
                }
                break;
              case 'west':
                if (x === grid.corner1.x) {
                  expect(result).toEqual('crash');
                } else {
                  expect(result).toEqual({ x: x - 1, y });
                }
                break;
            }
          });
        });
      }
    }
  });
});
