export const isScrollHorizontal = () => useState('scroll', () => false)

export const stateMenuOpen = () => useState('shared', () => false);

export const stateIntroAnimation = () => useState('introAnimation', () => true);

export const stateSession = () => useState('introSession', () => false);

export const stateFirstVisit = () => useState('firstVisit', () => true);

export const stateIsMobile = () => useState('isMobile', () => false);

export const firstInterraction = () => useState('isFirstInterraction', () => 1);

export const musicPlaying = () => useState('isMusicPlaying', () => false);

export const pageMentionsLegales = () => useState('isPageMentionsLegales', () => false);

export const talents = () => useState('isTalents', () => false);

export const workCarousel = () => useState('isWorkCarousel', () => true);

export const mobileUpdateLanguage = () => useState('isMobileUpdateLanguage', () => 1);

export const tableauPreFetchImages = () => useState('useTableauPreFetchImages', () => []);

export const tableauPreFetchImagesLoading = () => useState('isTableauPreFetchImagesLoading', () => true);

export const closeMenu = () => useState('isCloseMenu', () => false);






