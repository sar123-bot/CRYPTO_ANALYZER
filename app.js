const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Map Blockchain.com symbols to CoinGecko IDs
const symbolToCoinGeckoId = {
  "BTC-USD": "bitcoin",
  "ETH-USD": "ethereum",
  "LTC-USD": "litecoin",
  "BCH-USD": "bitcoin-cash",
  "DOGE-USD": "dogecoin"
  // Add more if needed
};

app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://api.blockchain.com/v3/exchange/tickers');
    const tickers = response.data;

    res.render('index', {
      tickers,
      selectedSymbol: null,
      cryptoData: null,
      historicalPrices: null,
      error: null
    });
  } catch (err) {
    console.error(err);
    res.render('index', {
      tickers: [],
      selectedSymbol: null,
      cryptoData: null,
      historicalPrices: null,
      error: 'Failed to fetch ticker list.'
    });
  }
});

app.post('/', async (req, res) => {
  const selectedSymbol = req.body.symbol;
  const coinGeckoId = symbolToCoinGeckoId[selectedSymbol];

  try {
    // Fetch current price data from Blockchain.com
    const [tickerRes, tickersRes] = await Promise.all([
      axios.get(`https://api.blockchain.com/v3/exchange/tickers/${selectedSymbol}`),
      axios.get('https://api.blockchain.com/v3/exchange/tickers')
    ]);

    let historicalPrices = null;
    if (coinGeckoId) {
      // Fetch 7-day daily prices from CoinGecko (vs USD)
      const now = Math.floor(Date.now() / 1000);
      const sevenDaysAgo = now - 7 * 24 * 3600;

      const cgRes = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinGeckoId}/market_chart/range`,
        {
          params: {
            vs_currency: 'usd',
            from: sevenDaysAgo,
            to: now
          }
        }
      );

      // cgRes.data.prices is [[timestamp_ms, price], ...]
      historicalPrices = cgRes.data.prices.map(([timeMs, price]) => {
        const date = new Date(timeMs);
        // Format as e.g. "MM/DD" or "HH:mm"
        return {
          time: `${date.getMonth() + 1}/${date.getDate()}`,
          price: price.toFixed(2)
        };
      });
    }

    res.render('index', {
      tickers: tickersRes.data,
      selectedSymbol,
      cryptoData: tickerRes.data,
      historicalPrices,
      error: null
    });
  } catch (err) {
    console.error(err);
    res.render('index', {
      tickers: [],
      selectedSymbol,
      cryptoData: null,
      historicalPrices: null,
      error: 'Failed to fetch ticker or historical data.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
