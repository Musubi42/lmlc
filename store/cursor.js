// store/cursor.js
export const state = () => ({
  isHovered: false,
});

export const mutations = {
  setHovered(state, value) {
  console.log("oui");
    state.isHovered = value;
  },
};
