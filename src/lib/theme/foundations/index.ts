import colors from './colors';
import sizes from './sizes';
import typography from './typography';

const foundations = { colors, sizes, ...typography };

export type Foundations = typeof foundations;

export default foundations;
