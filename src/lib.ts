import { Headings, Turns } from '.';

export const setHeading = (currentHeading: Headings, direction: Turns): Headings => {
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
