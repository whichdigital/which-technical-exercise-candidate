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
  heading: string;
  directions: string[];
};

export function runWith(_input: RobotInput | undefined) {
  return { status: 'error' };
}

runWith(undefined);
