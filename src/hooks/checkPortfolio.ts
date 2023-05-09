export const useCheckPortfolio = (code: string, portfolio: string[]) => {
  return portfolio.some((item) => item === code);
};
