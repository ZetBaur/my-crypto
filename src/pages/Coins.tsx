import React from 'react';
import CoinOverview from '../components/coinOverview/CoinOverview';
import BasicTable from '../components/table/BasicTable';

const coins = () => {
  return (
    <>
      <CoinOverview />
      <BasicTable />
    </>
  );
};

export default coins;
