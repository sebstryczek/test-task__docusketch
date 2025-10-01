import type { Corner, Wall } from "../data/getRoomData";

type LineStyle = {
  color: string;
  thickness: number;
};

type Props = {
  corners: Array<Corner>;
  context: CanvasRenderingContext2D;
};

class ViewportService {
  private context: CanvasRenderingContext2D;
  private scaleFactor: number;
  private offset: { x: number; y: number };

  constructor({ corners, context }: Props) {
    this.context = context;

    const bounds = {
      minX: Math.min(...corners.map((c) => c.x)),
      maxX: Math.max(...corners.map((c) => c.x)),
      minY: Math.min(...corners.map((c) => c.y)),
      maxY: Math.max(...corners.map((c) => c.y)),
    };

    const roomWidth = bounds.maxX - bounds.minX;
    const roomHeight = bounds.maxY - bounds.minY;

    const canvasHeight = context.canvas.height;
    const canvasWidth = context.canvas.width;

    const targetWidth = canvasWidth * 0.8;
    const targetHeight = canvasHeight * 0.8;

    const scaleFactor = Math.min(targetWidth / roomWidth, targetHeight / roomHeight);
    const scaledRoomWidth = roomWidth * scaleFactor;
    const scaledRoomHeight = roomHeight * scaleFactor;

    this.scaleFactor = scaleFactor;
    this.offset = {
      x: (canvasWidth - scaledRoomWidth) / 2 - bounds.minX * scaleFactor,
      y: (canvasHeight - scaledRoomHeight) / 2 - bounds.minY * scaleFactor,
    };
  }

  public drawWall({ wall, corners, style }: { wall: Wall; corners: Array<Corner>; style: LineStyle }) {
    const { id: wallId } = wall;
    const startCorners = corners.filter((corner) => corner.wallStarts[0]?.id === wallId);
    const endCorners = corners.filter((corner) => corner.wallEnds[0]?.id === wallId);

    if (startCorners.length !== 1 || endCorners.length !== 1) {
      console.error("Unexpected data shape", { startCorners, endCorners });
      return;
    }

    const startCorner = startCorners[0];
    const endCorner = endCorners[0];

    if (!startCorner || !endCorner) {
      console.error("Missing corner data", { startCorner, endCorner });
      return;
    }

    this.drawLine({
      start: startCorner,
      end: endCorner,
      style: { color: style.color, thickness: style.thickness },
    });
  }

  public drawLine({
    start,
    end,
    style,
  }: {
    start: { x: number; y: number };
    end: { x: number; y: number };
    style: LineStyle;
  }) {
    this.context.strokeStyle = style.color;
    this.context.lineWidth = style.thickness;
    this.context.lineCap = "round";
    this.context.beginPath();
    this.context.moveTo(this.offset.x + start.x * this.scaleFactor, this.offset.y + start.y * this.scaleFactor);
    this.context.lineTo(this.offset.x + end.x * this.scaleFactor, this.offset.y + end.y * this.scaleFactor);
    this.context.stroke();
  }
}

export { ViewportService as Viewport };
