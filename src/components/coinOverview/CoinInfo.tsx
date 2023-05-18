import { useEffect, useState } from 'react';
import { useAppSelector } from '../../helpers/reduxHook';
import { Box, IconButton, Link, List, ListItem, Tooltip } from '@mui/material';

import HelpIcon from '@mui/icons-material/Help';

const formatPrice = (value: number | undefined) => {
  return value?.toLocaleString('fi-FI', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });
};

const CoinInfo = () => {
  const currentCoin = useAppSelector((state) => state.coins.currentCoin);
  const [links, setLinks] = useState<string[][]>([]);

  useEffect(() => {
    const c: string[][] = [];

    if (currentCoin.links) {
      Object.entries(currentCoin?.links).forEach(([key, value]) => {
        if (value) {
          c.push([key, value]);
          setLinks(c);
        }
      });
    }
  }, [currentCoin]);

  return (
    <Box
      sx={{
        background: 'black',
        padding: '8px',
      }}
    >
      <List
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <ListItem
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            background: '#0F0E0E',
            borderRadius: '4px',
            padding: '4px 0',
            minHeight: '47px',
          }}
        >
          <Box
            sx={{
              fontSize: '10px',
            }}
          >
            All time high
          </Box>
          <Box>
            {currentCoin.allTimeHighUSD
              ? formatPrice(currentCoin.allTimeHighUSD)
              : 'NA'}
          </Box>
        </ListItem>

        <ListItem
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            background: '#0F0E0E',
            borderRadius: '4px',
            padding: '4px 0',
            minHeight: '47px',
          }}
        >
          <Box
            sx={{
              fontSize: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span>Circulating supply</span>

            <Tooltip
              title='The number of coins minted, but not locked'
              sx={{
                padding: '0',
              }}
            >
              <IconButton>
                <HelpIcon
                  sx={{
                    fontSize: '13px',
                  }}
                />
              </IconButton>
            </Tooltip>
          </Box>
          <Box>
            {currentCoin.circulatingSupply
              ? formatPrice(currentCoin.circulatingSupply)
              : 'NA'}
          </Box>
        </ListItem>

        <ListItem
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            background: '#0F0E0E',
            borderRadius: '4px',
            padding: '4px 0',
            minHeight: '47px',
          }}
        >
          <Box
            sx={{
              fontSize: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span>Max supply</span>

            <Tooltip
              title='Maximum number of coins that can be minted'
              sx={{
                padding: '0',
              }}
            >
              <IconButton>
                <HelpIcon
                  sx={{
                    fontSize: '13px',
                  }}
                />
              </IconButton>
            </Tooltip>
          </Box>
          <Box>
            {currentCoin.maxSupply ? formatPrice(currentCoin.maxSupply) : 'NA'}
          </Box>
        </ListItem>

        <ListItem
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            background: '#0F0E0E',
            borderRadius: '4px',
            padding: '4px 0',
            minHeight: '103.73px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              padding: '4px',
            }}
          >
            {links &&
              links.map((el) => (
                <Link
                  key={el[1]}
                  href={el[1]}
                  variant='body2'
                  target='_blanc'
                  sx={{
                    color: 'white',
                    background: 'blue',
                    padding: '4px 16px',
                    textAlign: 'center',
                    borderRadius: '4px',
                    fontSize: '13px',
                  }}
                >
                  {el[0]}
                </Link>
              ))}
          </Box>
        </ListItem>
      </List>
    </Box>
  );
};

export default CoinInfo;
