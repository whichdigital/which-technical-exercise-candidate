import { moveRobot, setHeading } from './lib';

export type Coordinates = { x: number; y: number };
export type Turns = 'left' | 'right';
type Directions = 'forward' | Turns;
export type Headings = 'north' | 'south' | 'east' | 'west';
export type Statuses = 'ok' | 'error' | 'crash';
export type Arena = {
  corner1: Coordinates;
  corner2: Coordinates;
};

type RobotInput = {
  arena: Arena;
  location: Coordinates;
  heading: Headings;
  directions: Directions[];
};

type RobotOutput = {
  status: Statuses;
  location: Coordinates;
  heading: Headings;
  path: Directions[];
};

export const runWith = (_input: RobotInput): RobotOutput => {
  const validCommands = ['forward', 'left', 'right'];
  const output = {
    status: 'ok',
    location: _input.location,
    heading: _input.heading,
    path: [],
  } as RobotOutput;

  _input.directions.forEach((direction) => {
    if (output.status !== 'ok') {
      return output;
    }

    output.path.push(direction);

    if (validCommands.indexOf(direction) === -1) {
      output.status = 'error';
      return output;
    }

    if (direction !== 'forward') {
      output.heading = setHeading(output.heading, direction);
    } else {
      const moveResult = moveRobot(output.location, output.heading, _input.arena);
      moveResult === 'crash' ? (output.status = moveResult) : (output.location = moveResult);
    }
  });

  return output;
};

// Process file:
//
// Note: There is no handling for a case where no input file is specified.
// This also causes a notice when running the tests:
//
//  `A worker process has failed to exit gracefully and has been force exited. [...]`
//
// Running just the index tests: `npm run test src/index.test.ts` will cause the tests to
// hang after successfully executing.
// This could be handled in a basic manner with timers
//
// Also, there are no tests for this code - I'm not experienced with testing Node CLI input
// and time is getting on...
const stdin = process.stdin;

const inputChunks: Buffer[] = [];

stdin.resume();
stdin.setEncoding('utf8');

stdin.on('data', function (chunk) {
  inputChunks.push(chunk);
});

stdin.on('end', function () {
  const inputJSON = inputChunks.join();
  const robotOutput = runWith(JSON.parse(inputJSON) as RobotInput);

  // This could be formatted much more nicely for readable output
  process.stdout.write(JSON.stringify(robotOutput) + '\n');
});
