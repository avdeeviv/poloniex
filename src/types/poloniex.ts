export interface IQuotePair {
  id: number;
  last: string;
  lowestAsk?: string;
  highestBid: string;
  percentChange: string;
  baseVolume?: string;
  quoteVolume?: string;
  isFrozen?: string;
  high24hr?: string;
  low24hr?: string;
  name?: string;
}

export interface ITicker {
  [pair: string]: IQuotePair;
}
