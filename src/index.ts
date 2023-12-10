type Directions = 'forward' | 'left' | 'right';

type RobotInput = {
  arena: {
    corner1: {
      x: number;
      y: number;
    };
    corner2: {
      x: number;
      y: number;
    };
  };
  location: {
    x: number;
    y: number;
  };
  heading: 'north' | 'south' | 'east' | 'west';
  directions: Directions[];
};

export function runWith(_input: RobotInput | undefined) {
  return { status: 'error' };
}

runWith(undefined);
