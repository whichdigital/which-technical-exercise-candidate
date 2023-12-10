import { Headings, Turns } from '.';

export const setHeading = (currentHeading: Headings, direction: Turns): Headings => {
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
