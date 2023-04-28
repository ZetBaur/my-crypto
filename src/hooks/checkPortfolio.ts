import { ICoinData } from '../model/coinsTypes';

export const useCheckPortfolio = (id: string, portfolio: ICoinData[]) => {
  return portfolio.some((item) => item.id === id);
};
