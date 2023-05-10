import { Global } from '@emotion/react';

const Fonts = () => (
  <Global
    styles={`
@font-face {
  font-family: '';
  font-style: normal;
  font-weight: 500;
  src: url();

}
      `}
  />
);

export default Fonts;
