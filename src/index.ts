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

  // Loop over directions
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

// runWith(undefined);
