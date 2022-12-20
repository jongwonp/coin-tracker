import ApexCharts from 'react-apexcharts';
import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';

interface ChartProps {
  coinId: string;
}

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

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ['ohlcv', coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 60000,
    }
  );

  return (
    <div>
      {isLoading ? (
        'Loading chart...'
      ) : Array.isArray(data) ? (
        <ApexCharts
          type="candlestick"
          series={[
            {
              name: 'price',
              data: data?.map((price) => ({
                x: new Date(price.time_close * 1000),
                y: [price.open, price.high, price.low, price.close],
              })) as { x: any; y: any }[],
            },
          ]}
          options={{
            theme: {
              mode: 'dark',
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: 'transparent',
            },
            grid: {
              show: false,
            },
            xaxis: {
              type: 'datetime',
            },
          }}
        />
      ) : (
        'Data not found'
      )}
    </div>
  );
}

export default Chart;
