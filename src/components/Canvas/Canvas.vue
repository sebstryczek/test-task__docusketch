<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";

import { Viewport } from "../../services/ViewportService";
import { calculateDimensions } from "../../utils/calculateDimensions";
import { useRoomState } from "../../state/useRoomState";

const canvasRef = ref<HTMLCanvasElement | null>(null);
let resizeObserver: ResizeObserver | null = null;

const getCanvas = (): HTMLCanvasElement => {
  if (!canvasRef.value) {
    throw new Error("Canvas element is not available");
  }

  return canvasRef.value;
};

const getContext = (): CanvasRenderingContext2D => {
  const canvas = getCanvas();
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("2D context is not available");
  }

  return ctx;
};

const { roomData, currentWallIndex } = useRoomState();

watch(
  [roomData, currentWallIndex],
  () => {
    update();
  },
  { deep: true },
);

// This could be extracted to a separate function/file, and Canvas could be a general-purpose component
const renderRoom = () => {
  const { corners, walls } = roomData.value;
  const dimensionWallIndex = currentWallIndex;
  const dimensionWall = walls[dimensionWallIndex.value];

  if (!dimensionWall) {
    throw new Error("Dimension wall not found");
  }

  const context = getContext();
  const viewport = new Viewport({ corners, context });

  walls.forEach((wall) => {
    viewport.drawWall({
      wall,
      corners,
      style: { color: "lightgrey", thickness: 21 },
    });
  });

  viewport.drawWall({
    wall: dimensionWall,
    corners,
    style: { color: "yellow", thickness: 21 },
  });

  const dimensions = calculateDimensions({ corners, dimensionWall });

  viewport.drawLine({
    start: {
      x: dimensions.lengthLine.start.x,
      y: dimensions.lengthLine.start.y,
    },
    end: {
      x: dimensions.lengthLine.end.x,
      y: dimensions.lengthLine.end.y,
    },
    style: { color: "red", thickness: 3 },
  });

  viewport.drawLine({
    start: {
      x: dimensions.widthLine.start.x,
      y: dimensions.widthLine.start.y,
    },
    end: {
      x: dimensions.widthLine.end.x,
      y: dimensions.widthLine.end.y,
    },
    style: { color: "blue", thickness: 3 },
  });
};

const update = () => {
  const context = getContext();
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  renderRoom();
};

const resizeCanvas = () => {
  const canvas = getCanvas();

  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;

  console.log("Canvas resized to:", rect.width, rect.height);

  update();
};

onMounted(() => {
  if (!canvasRef.value) return;

  resizeObserver = new ResizeObserver(() => {
    resizeCanvas();
  });

  resizeObserver.observe(canvasRef.value);

  resizeCanvas();
});

onUnmounted(() => {
  resizeObserver?.disconnect();
});
</script>

<template>
  <canvas ref="canvasRef"></canvas>
</template>

<style scoped>
canvas {
  width: 100%;
  height: 100%;

  display: block;
}
</style>
