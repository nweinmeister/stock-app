import {Test} from './pages/Test';
import Second from './pages/Second';
import {Wins} from './pages/Wins';
import {PercentGains} from './pages/PercentGains';
import { StockPredictor } from './pages/StockPredictor';
import { StockTicker } from './iex/pages/StockTicker';

const routes = {
  test: {
    path: '/test',
    component: Test
  },
  second: {
    path: '/second',
    component: Second
  },
  wins: {
    path: '/wins',
    component: Wins
  },
  percentGains: {
    path: '/percent-gains/:symbol',
    component: PercentGains
  },
  stockPredictor: {
    path: '/stock-predictor/:symbol',
    component: StockPredictor
  },
  stockTicker: {
    path: '/stock-ticker/:symbol',
    component: StockTicker
  }
};

export default routes;