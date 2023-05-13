export const useCheckPortfolio = (
  code: string | undefined,
  portfolio: string[]
) => {
  // console.log(code, portfolio);
  if (code) return portfolio.some((item) => item === code);
};
