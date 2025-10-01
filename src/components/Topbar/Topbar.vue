<template>
  <div class="topbar">
    <div>Current Room: {{ currentRoomName }}</div>

    <div class="controls">
      <button @click="handleChangeDimensionWall">Change Dimension Wall</button>
      <button @click="handleChangeRoom">Change Room</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoomState } from "../../state/useRoomState";

const { currentRoomName, changeRoom, changeDimensionWall } = useRoomState();

const handleChangeDimensionWall = () => {
  changeDimensionWall();
};

const handleChangeRoom = () => {
  changeRoom();
};
</script>

<style scoped>
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 16px;
  background-color: #f5f5f5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 0.75rem;
}

.controls {
  display: flex;
  gap: 8px;
}

button {
  padding: 8px 16px;
  cursor: pointer;
  border: none;
  background: #1976d2;
  color: #fff;
  border-radius: 4px;
  transition: background 0.2s linear;
}

button:hover {
  background: #1565c0;
}
</style>
