import type { Corner, Wall } from "../data/getRoomData";

type Props = {
  corners: Array<Corner>;
  dimensionWall: Wall;
};

/**
 * Based on: Rotating Calipers / Minimum Bounding Rectangle
 */
const calculateDimensions = ({ corners, dimensionWall }: Props) => {
  const wallStart = corners.find((c) => c.wallStarts[0]?.id === dimensionWall.id);
  const wallEnd = corners.find((c) => c.wallEnds[0]?.id === dimensionWall.id);

  if (!wallStart || !wallEnd) {
    throw new Error("Dimension wall corners not found");
  }

  const wallAngle = Math.atan2(wallEnd.y - wallStart.y, wallEnd.x - wallStart.x);

  const lengthDir = { x: Math.cos(wallAngle), y: Math.sin(wallAngle) };
  const widthDir = { x: -Math.sin(wallAngle), y: Math.cos(wallAngle) };

  let minLength = Infinity;
  let maxLength = -Infinity;
  let minWidth = Infinity;
  let maxWidth = -Infinity;

  corners.forEach((corner) => {
    const lengthProj = corner.x * lengthDir.x + corner.y * lengthDir.y;
    const widthProj = corner.x * widthDir.x + corner.y * widthDir.y;

    minLength = Math.min(minLength, lengthProj);
    maxLength = Math.max(maxLength, lengthProj);
    minWidth = Math.min(minWidth, widthProj);
    maxWidth = Math.max(maxWidth, widthProj);
  });

  return {
    lengthLine: {
      start: {
        x: minLength * lengthDir.x + maxWidth * widthDir.x,
        y: minLength * lengthDir.y + maxWidth * widthDir.y,
      },
      end: {
        x: maxLength * lengthDir.x + maxWidth * widthDir.x,
        y: maxLength * lengthDir.y + maxWidth * widthDir.y,
      },
    },

    widthLine: {
      start: {
        x: maxLength * lengthDir.x + minWidth * widthDir.x,
        y: maxLength * lengthDir.y + minWidth * widthDir.y,
      },
      end: {
        x: maxLength * lengthDir.x + maxWidth * widthDir.x,
        y: maxLength * lengthDir.y + maxWidth * widthDir.y,
      },
    },
  };
};

export { calculateDimensions };
