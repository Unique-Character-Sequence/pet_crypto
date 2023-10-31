const BASE_API_URL = "https://api.coingecko.com/api/v3";

export const getCoinListURL = (currency: string, locale: string = "en") =>
  `${BASE_API_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=250&page=1&sparkline=false&locale=${locale}`;

export const getCoinDataURL = (id: string) => `${BASE_API_URL}/coins/${id}`;

export const getCoinChartURL = (id: string, currency: string, days: number = 365) =>
  `${BASE_API_URL}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

export const getTrendingCoinsURL = (currency: string) =>
  `${BASE_API_URL}/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;
