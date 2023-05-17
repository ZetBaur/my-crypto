import moment from 'moment';

export const getDate = (value: number, period: string): number => {
  // @ts-ignore
  return new Date(moment().subtract(value, period).format()).getTime();
};
