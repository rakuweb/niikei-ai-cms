export const parse2xlToXl = (xl2: number) => (xl2 * 80) / 120;
export const parse2xlToXlrem = (xl2: number) => `${parse2xlToXl(xl2)}rem`;
export const parseXlToLg = (xl: number) => (xl * 62) / 80;
export const parseXlToLgrem = (xl: number) => `${parseXlToLg(xl)}rem`;

export const parse2xlToLg = (xl2: number) => {
  const xl = parse2xlToXl(xl2);
  const lg = parseXlToLg(xl);

  return lg;
};
export const parse2xlToLgrem = (xl2: number) => `${parse2xlToLg(xl2)}rem`;

export const calculateSizesBy2xl = (xl2: number) => {
  const xl = parse2xlToXl(xl2);
  const xlrem = `${xl}rem`;
  const lg = parseXlToLg(xl);
  const lgrem = `${lg}rem`;
  const base = `86.75vw`;
  const res = { base, lg: lgrem, xl: xlrem, '2xl': `${xl2}rem` };

  return res;
};
export const calculateSizesByXl = (xl: number) => {
  const lg = parseXlToLg(xl);
  const lgrem = `${lg}rem`;
  const base = `86.75vw`;
  const res = { base, lg: lgrem, xl: `${xl}rem` };

  return res;
};
