export const numberWithCommas = (num: number | string | null) => {
  if (num === null) return null;
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

export const customHeadCell = {
  color: "black",
  fontFamily: "Montserrat",
  fontWeight: "600",
};

export const handleSearch = (searchValue: string, arr: any[]) => {
  return arr.filter(
    (el) =>
      el.symbol.toLowerCase().includes(searchValue) ||
      el.name.toLowerCase().includes(searchValue)
  );
};

export const toQwerty = (str: string) => {
  return str.replace(/[йцукенгшщзхъфывапролджэячсмитьбю,./]/g, function (x) {
    return replacer[x] || x;
  });
};

export const replacer: { [key: string]: string } = {
  й: "q",
  ц: "w",
  у: "e",
  к: "r",
  е: "t",
  н: "y",
  г: "u",
  ш: "i",
  щ: "o",
  з: "p",
  х: "[",
  ъ: "]",
  ф: "a",
  ы: "s",
  в: "d",
  а: "f",
  п: "g",
  р: "h",
  о: "j",
  л: "k",
  д: "l",
  ж: ";",
  э: "'",
  я: "z",
  ч: "x",
  с: "c",
  м: "v",
  и: "b",
  т: "n",
  ь: "m",
  б: ",",
  ю: ".",
  ".": "/",
};
