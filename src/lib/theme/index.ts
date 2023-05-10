import { extendTheme } from '@chakra-ui/react';

import { styles } from './styles';
import foundations from './foundations';
import textStyles from './textStyles';

const overrides = { styles, ...foundations, textStyles };

export type Overrides = typeof overrides;

export default extendTheme(overrides);
