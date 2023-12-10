import { moveRobot, setHeading } from './lib';

export type Coordinates = { x: number; y: number };
export type Turns = 'left' | 'right';
type Directions = 'forward' | Turns;
export type Headings = 'north' | 'south' | 'east' | 'west';
type Statuses = 'ok' | 'error' | 'crash';
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
  const output = {
    // Always start in a fail state, else you may be in situations where your
    // state hasn't changed but your output tells you everything is OK!
    status: 'error',
    location: _input.location,
    heading: _input.heading,
    path: [],
  } as RobotOutput;
  _input?.directions.forEach((direction) => {
    if (direction !== 'forward') {
      output.heading = setHeading(output.heading, direction);
    } else {
      const moveResult = moveRobot(output.location, output.heading, _input.arena)
      moveResult === 'crash' ? (output.status = moveResult) : (output.location = moveResult);
    }
    // Immediately end run on failure
    if (output.status === ('crash' || 'error')) {
      return output;
    }
    output.path.push(direction);
  });
  return output;
};

// runWith(undefined);
