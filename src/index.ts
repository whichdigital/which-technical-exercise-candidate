type Coordinates = { x: number; y: number };
export type Turns = 'left' | 'right';
type Directions = 'forward' | Turns;
export type Headings = 'north' | 'south' | 'east' | 'west';
type Statuses = 'ok' | 'error' | 'crash';

type RobotInput = {
  arena: {
    corner1: Coordinates;
    corner2: Coordinates;
  };
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

export const runWith = (_input: RobotInput | undefined): RobotOutput => {
  const output = {
    // Always start in a fail state, else you may be in situations where your
    // state hasn't changed but your output tells you everything is OK!
    status: 'error',
    location: _input?.location,
    heading: _input?.heading,
    path: [],
  };
  _input?.directions.forEach((direction) => {
    if (direction !== 'forward') {
      output.heading = setHeading(direction);
    }
  });
  return output;
};

runWith(undefined);
