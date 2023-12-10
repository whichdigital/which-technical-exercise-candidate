type Coordinates = { x: number; y: number };
type Directions = 'forward' | 'left' | 'right';
type Headings = 'north' | 'south' | 'east' | 'west';
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

export const runWith = (_input: RobotInput | undefined): RobotOutput => ({ status: 'error' });

runWith(undefined);
