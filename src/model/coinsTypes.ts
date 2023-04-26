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
  id: string | null;
  vsCurrency: string;
  days: string;
  interval: string;
}

//----------

export interface IPrices {
  date: string;
  price: string;
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

// ------- current coin-----

export interface ICurrentCoin {
  id: string;
  symbol: string;
  name: string;
  asset_platform_id?: string;
  platforms?: Platforms;
  detail_platforms?: DetailPlatforms;
  block_time_in_minutes?: number;
  hashing_algorithm?: any;
  categories?: string[];
  public_notice?: any;
  additional_notices?: any[];
  description?: Description;
  links?: Links;
  image: Image;
  country_origin?: string;
  genesis_date?: any;
  contract_address?: string;
  sentiment_votes_up_percentage?: number;
  sentiment_votes_down_percentage?: number;
  watchlist_portfolio_users?: number;
  market_cap_rank?: number;
  coingecko_rank?: number;
  coingecko_score?: number;
  developer_score?: number;
  community_score?: number;
  liquidity_score?: number;
  public_interest_score?: number;
  public_interest_stats?: PublicInterestStats;
  status_updates?: any[];
  last_updated?: string;
}

export interface Platforms {
  cardano: string;
}

export interface DetailPlatforms {
  cardano: Cardano;
}

export interface Cardano {
  decimal_place: any;
  contract_address: string;
}

export interface Description {
  en: string;
}

export interface Links {
  homepage: string[];
  blockchain_site: string[];
  official_forum_url: string[];
  chat_url: string[];
  announcement_url: string[];
  twitter_screen_name: string;
  facebook_username: string;
  bitcointalk_thread_identifier: any;
  telegram_channel_identifier: string;
  subreddit_url: string;
  repos_url: ReposUrl;
}

export interface ReposUrl {
  github: any[];
  bitbucket: any[];
}

export interface Image {
  thumb: string;
  small: string;
  large: string;
}

export interface PublicInterestStats {
  alexa_rank: any;
  bing_matches: any;
}

//------- public companies------------------
export interface IPublicCompanies {
  total_holdings: number;
  total_value_usd: number;
  market_cap_dominance: number;
  companies: Company[];
}

export interface Company {
  name: string;
  symbol: string;
  country: string;
  total_holdings: number;
  total_entry_value_usd: number;
  total_current_value_usd: number;
  percentage_of_total_supply: number;
}

// -------- trending -------

export interface ITrending {
  coins: ITrendingCoin[];
  exchanges: any[];
}

export interface ITrendingCoin {
  item: Item;
}

export interface Item {
  id: string;
  coin_id: number;
  name: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  small: string;
  large: string;
  slug: string;
  price_btc: number;
  score: number;
}
