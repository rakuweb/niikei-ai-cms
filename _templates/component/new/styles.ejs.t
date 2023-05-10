---
to: "<%= make_styles ? `${abs_path}/styles.ts` : null %>"
unless_exists: true
---

// import layer
import { css } from '@emotion/react';
import { mq } from 'constants/styles';

// style layer
const styles = css``;
