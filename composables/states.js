export const isScrollHorizontal = () => useState('scroll', () => false)

export const stateMenuOpen = () => useState('shared', () => false);

// export const stateMenuOpen = ref(false);

// const isMenuOpen = ref(false);

// function toggleMenuBurgerr() {
//   isMenuOpen.value = !isMenuOpen.value;
// }

// export function useMenuState() {
//   return { isMenuOpen, toggleMenuBurgerr };
// }