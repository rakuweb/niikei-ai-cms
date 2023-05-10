---
to: <%= abs_path %>/style.css.ts
unless_exists: true
---

// import layer
import { style } from '@vanilla-extract/css';
import {
  responsiveStyle,
  responsiveDesktop,
  calculateResponsiveDesktop,
} from 'styles/utils.css';
import { colors } from 'constants/styles/colors';

export const Style = style([
  {},
  responsiveStyle({
    desktop1024: {},
    desktop1280: {},
    desktop1536: {},
  })
]);
