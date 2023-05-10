// import layer

// constant layer
export const breakpoints = [30, 48, 62, 80, 96]; // em, = [400, 768, 992, 1280, 1536] px
export const breakpointsByPx = breakpoints.map((bp) => bp * 16);

export const mq = breakpoints.map((bp) => `@media (min-width: ${bp}em)`);
