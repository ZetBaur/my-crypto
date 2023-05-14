export const useCheckPortfolio = (
  code: string | undefined,
  portfolio: string[]
) => {
  if (code) return portfolio.some((item) => item === code);
};
