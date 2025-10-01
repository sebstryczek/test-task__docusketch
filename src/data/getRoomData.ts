import simpleRoom from "./simple.json";
import tShapeRoom from "./t_shape.json";
import triangleRoom from "./triangle.json";

type FileName = "simple" | "t_shape" | "triangle";
type RoomData = typeof simpleRoom | typeof tShapeRoom | typeof triangleRoom;
type Wall = RoomData["walls"][number];
type Corner = RoomData["corners"][number];

function getRoomData(file: FileName) {
  switch (file) {
    case "simple":
      return simpleRoom;
    case "t_shape":
      return tShapeRoom;
    case "triangle":
      return triangleRoom;
  }
}

export { getRoomData };
export type { FileName, RoomData, Wall, Corner };
