<script setup lang="ts">
import { Canvas } from "./components/Canvas";
import { Topbar } from "./components/Topbar";
</script>

<template>
  <div class="app-container">
    <Topbar />
    <div class="canvas-wrapper">
      <Canvas />
    </div>
  </div>
</template>

<style scoped>
.app-container {
  position: relative;
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.canvas-wrapper {
  flex: 1;
  position: relative;
  overflow: hidden;
}
</style>
