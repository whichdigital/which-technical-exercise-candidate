import { Arena, Coordinates, Headings, Statuses, Turns } from '.';

export const setHeading = (currentHeading: Headings, direction: Turns): Headings => {
  /*
  // Alternative implementation done out of curiosity.
  // More practical for dealing with larger arrays, not worth the effort for a small one
  // Speed not tested but likely slower due to the lookups, tho negligbly.
  //
  const allHeadings = ['north', 'east', 'south', 'west'] as Headings[];
  let newIndex = -1;

  switch (direction) {
    case 'left':
      newIndex = allHeadings.indexOf(currentHeading) - 1;
      return newIndex < 0 ? allHeadings[allHeadings.length - 1] : allHeadings[newIndex];
    case 'right':
      newIndex = allHeadings.indexOf(currentHeading) + 1;
      return newIndex > allHeadings.length - 1 ? allHeadings[0] : allHeadings[newIndex];
  }
  */

  switch (currentHeading) {
    case 'east':
      return direction === 'left' ? 'north' : 'south';
    case 'south':
      return direction === 'left' ? 'east' : 'west';
    case 'west':
      return direction === 'left' ? 'south' : 'north';
    case 'north':
      return direction === 'left' ? 'west' : 'east';
  }
};

export const moveRobot = (
  location: Coordinates,
  heading: Headings,
  arena: Arena
): Coordinates | Extract<Statuses, 'crash'> => {
  switch (heading) {
    case 'east':
      return location.x === arena.corner2.x ? 'crash' : { ...location, x: location.x + 1 };
    case 'south':
      return location.y === arena.corner1.y ? 'crash' : { ...location, y: location.y - 1 };
    case 'west':
      return location.x === arena.corner1.x ? 'crash' : { ...location, x: location.x - 1 };
    case 'north':
      return location.y === arena.corner2.y ? 'crash' : { ...location, y: location.y + 1 };
  }
};
