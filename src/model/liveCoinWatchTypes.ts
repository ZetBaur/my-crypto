// /coins/single/history ----------------------------------------

export interface ICoinsSingleHistoryRequest {
  currency: string;
  code: string;
  start: number;
  end: number;
  meta: boolean;
}

export interface ICoinsSingleHistory {
  code: string;
  name: string;
  symbol: string;
  rank: number;
  age: number;
  color: string;
  png32: string;
  png64: string;
  webp32: string;
  webp64: string;
  exchanges: number;
  markets: number;
  pairs: number;
  categories: any[];
  allTimeHighUSD: number;
  circulatingSupply: number;
  totalSupply: number;
  maxSupply: number;
  links: Links;
  history: History[];
}

export interface Links {
  website: string;
  whitepaper: string;
  twitter: any;
  reddit: string;
  telegram: any;
  discord: any;
  medium: any;
  instagram: any;
}

export interface History {
  date: number;
  rate: number;
  volume: number;
  cap: number;
  liquidity: number;
}

// coins/list ----------------------------------------------------

export interface ICoinsListRequest {
  currency: string;
  sort: string;
  order: string;
  offset: number;
  limit: number;
  meta: boolean;
}

export interface ICoinsList {
  code: string;
  rate: number;
  volume: number;
  cap: number;
  delta: {
    hour: number;
    day: number;
    week: number;
    month: number;
    quarter: number;
    year: number;
  };
}
