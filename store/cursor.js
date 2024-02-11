// store/cursor.js
export const state = () => ({
  isHovered: false,
});

export const mutations = {
  setHovered(state, value) {
    state.isHovered = value;
  },
};
