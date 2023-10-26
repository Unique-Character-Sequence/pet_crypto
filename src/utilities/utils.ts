export const numberWithCommas = (num: number | string) => {
  const parts = num.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

export const responsiveCarousel = {
  0: { items: 3 },
  568: { items: 4 },
  1024: { items: 5 },
  1366: { items: 6 },
};