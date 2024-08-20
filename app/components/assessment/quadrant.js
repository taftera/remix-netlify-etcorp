export function determineQuadrantAndSubQuadrant(x, y) {
  const minX = 25;
  const maxX = 100;
  const minY = 25;
  const maxY = 100;
  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;

  let quadrant;
  let subMidX;
  let subMidY;
  let subQuadrant;

  // Determine the main quadrant
  if (x <= midX && y <= midY) {
    quadrant = 1;
    subMidX = (minX + midX) / 2;
    subMidY = (minY + midY) / 2;
  } else if (x > midX && y <= midY) {
    quadrant = 2;
    subMidX = (midX + maxX) / 2;
    subMidY = (minY + midY) / 2;
  } else if (x <= midX && y > midY) {
    quadrant = 3;
    subMidX = (minX + midX) / 2;
    subMidY = (midY + maxY) / 2;
  } else if (x > midX && y > midY) {
    quadrant = 4;
    subMidX = (midX + maxX) / 2;
    subMidY = (midY + maxY) / 2;
  } else {
    return null; // If x or y is out of bounds
  }

  // Determine the sub-quadrant within the main quadrant
  if (x <= subMidX && y <= subMidY) {
    subQuadrant = 1;
  } else if (x > subMidX && y <= subMidY) {
    subQuadrant = 2;
  } else if (x <= subMidX && y > subMidY) {
    subQuadrant = 3;
  } else if (x > subMidX && y > subMidY) {
    subQuadrant = 4;
  }

  return { quadrant, subQuadrant };
}

export function quadrantSwitch(id) {
  switch (id) {
    case 1:
      return 'Fire';
    case 2:
      return 'Water';
    case 3:
      return 'Earth';
    case 4:
      return 'Air';
  }
}
