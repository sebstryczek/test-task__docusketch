<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

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

const draw = (ctx: CanvasRenderingContext2D) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.fillStyle = "red";
  ctx.fillRect(0, 0, 100, 100);
};

const resizeCanvas = () => {
  const canvas = getCanvas();
  const ctx = getContext();

  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;

  console.log("Canvas resized to:", rect.width, rect.height);

  draw(ctx);
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
  border: 1px solid #000;
  display: block; /* usuwa spację pod canvas */
}
</style>
