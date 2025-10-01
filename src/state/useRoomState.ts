import { computed, reactive } from "vue";
import { getRoomData } from "../data/getRoomData";

const keys = ["simple", "triangle", "t_shape"] as const;

const state = reactive({
  roomIndex: Math.floor(Math.random() * keys.length),
  currentWallIndex: 0,
});

const getDataRoomName = (index: number) => {
  return keys[index] || keys[0];
};

export const useRoomState = () => {
  const currentRoomName = computed(() => getDataRoomName(state.roomIndex));
  const roomData = computed(() => getRoomData(currentRoomName.value));

  const changeRoom = () => {
    state.roomIndex = (state.roomIndex + 1) % keys.length;
    state.currentWallIndex = 0;
  };

  const changeDimensionWall = () => {
    const walls = roomData.value.walls;

    if (walls.length > 0) {
      state.currentWallIndex = (state.currentWallIndex + 1) % walls.length;
    }
  };

  return {
    roomData,
    currentRoomName,
    currentWallIndex: computed(() => state.currentWallIndex),
    changeRoom,
    changeDimensionWall,
  };
};
