export interface ICoinMarkets {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation?: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply?: number;
  max_supply?: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi?: IRoi;
  last_updated: string;
}

export interface IRoi {
  times: number;
  currency: string;
  percentage: number;
}

export interface ICoinMarketsQuery {
  currency: string;
  coin: string;
  limit?: number;
}

//--------

export interface ICoinsList {
  id: string;
  symbol: string;
  name: string;
}

//-------- market_chart

export interface IMarketChart {
  prices: number[][];
  market_caps: number[][];
  total_volumes: number[][];
}

export interface IMarketChartQuery {
  id: string;
  currency: string;
  days: string;
  interval: string;
}

//----------

export interface IPrices {
  date: string;
  price: number;
}

//------ search coin

export interface ISearchCoin {
  coins: ICoin[];
  exchanges: IExchange[];
  icos: any[];
  categories: ICategory[];
  nfts: INft[];
}

export interface ICoin {
  id: string;
  name: string;
  api_symbol: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
}

export interface IExchange {
  id: string;
  name: string;
  market_type: string;
  thumb: string;
  large: string;
}

export interface ICategory {
  id: number;
  name: string;
}

export interface INft {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
}

// ------------
