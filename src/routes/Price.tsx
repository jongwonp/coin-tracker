import { useQuery } from 'react-query';
import styled from 'styled-components';
import { fetchCoinHistory } from '../api';
interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}
interface ChartProps {
  coinId: string;
}

const PriceTabs = styled.div``;

const PriceTab = styled.div`
  background-color: white;
  color: black;
`;

function Price({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(['ohlcv', coinId], () =>
    fetchCoinHistory(coinId)
  );

  return (
    <div>
      {isLoading ? (
        'Loading price...'
      ) : Array.isArray(data) ? (
        <PriceTabs>
          <PriceTab>
            Highest price in 3weeks{' '}
            <div>{Math.max(...data?.map((day) => Number(day.high)))}</div>
          </PriceTab>
          <PriceTab>
            Lowest price in 3weeks{' '}
            <div>{Math.min(...data?.map((day) => Number(day.low)))}</div>
          </PriceTab>
          <PriceTab>
            Today's highest price <div>{data[data?.length - 1].high}</div>
          </PriceTab>
          <PriceTab>
            Today's lowest price <div>{data[data?.length - 1].low}</div>
          </PriceTab>
        </PriceTabs>
      ) : (
        'Data not found'
      )}
    </div>
  );
}

export default Price;
