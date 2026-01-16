// Demo data for when Gemini API quota is exceeded
// This shows what the system looks like with real data

export const demoNewsData = [
  {
    type: 'news',
    title: 'Stocks making the biggest moves premarket: PNC, ImmunityBio, Coupang & more',
    source: 'CNBC',
    link: 'https://www.cnbc.com/2026/01/16/stocks-making-the-biggest-moves-premarket.html',
    sentiment: 0.2,
    mood: 'POSITIVE',
    currencies: ['USD', 'SPX'],
    timestamp: Date.now() / 1000 - 300
  },
  {
    type: 'news',
    title: 'Goldman Sachs CEO looking at how bank can get involved in prediction markets',
    source: 'CNBC',
    link: 'https://www.cnbc.com/2026/01/15/goldman-sachs-prediction-markets.html',
    sentiment: 0.4,
    mood: 'POSITIVE',
    currencies: ['USD', 'SPX'],
    timestamp: Date.now() / 1000 - 250
  },
  {
    type: 'news',
    title: 'Trump Moves to Have Tech Giants Pay for Surging Power Costs',
    source: 'Bloomberg',
    link: 'https://www.bloomberg.com/news/articles/2026-01-15/trump-tech-power-costs.html',
    sentiment: -0.7,
    mood: 'NEGATIVE',
    currencies: ['USD', 'SPX'],
    timestamp: Date.now() / 1000 - 200
  },
  {
    type: 'news',
    title: 'Gold prices fall as dollar strengthens amid Fed policy expectations',
    source: 'Reuters',
    link: '',
    sentiment: -0.6,
    mood: 'NEGATIVE',
    currencies: ['GOLD', 'USD'],
    timestamp: Date.now() / 1000 - 180
  },
  {
    type: 'news',
    title: 'Bitcoin rebounds above $50K as institutional adoption accelerates',
    source: 'CoinTelegraph',
    link: '',
    sentiment: 0.8,
    mood: 'POSITIVE',
    currencies: ['BTC', 'ETH'],
    timestamp: Date.now() / 1000 - 150
  },
  {
    type: 'news',
    title: 'Oil prices surge on Middle East tensions and supply concerns',
    source: 'Reuters',
    link: '',
    sentiment: 0.5,
    mood: 'POSITIVE',
    currencies: ['OIL', 'USD'],
    timestamp: Date.now() / 1000 - 120
  },
  {
    type: 'news',
    title: 'Euro weakens against dollar as ECB signals dovish stance',
    source: 'ForexLive',
    link: '',
    sentiment: -0.4,
    mood: 'NEGATIVE',
    currencies: ['EUR', 'USD'],
    timestamp: Date.now() / 1000 - 90
  },
  {
    type: 'news',
    title: 'Japanese Yen gains as investors seek safe haven assets',
    source: 'ForexLive',
    link: '',
    sentiment: 0.3,
    mood: 'POSITIVE',
    currencies: ['JPY', 'USD'],
    timestamp: Date.now() / 1000 - 60
  },
  {
    type: 'news',
    title: 'British Pound steady ahead of Bank of England rate decision',
    source: 'ForexLive',
    link: '',
    sentiment: 0.0,
    mood: 'NEUTRAL',
    currencies: ['GBP', 'USD'],
    timestamp: Date.now() / 1000 - 30
  },
  {
    type: 'news',
    title: 'Australian Dollar rises on strong employment data',
    source: 'ForexLive',
    link: '',
    sentiment: 0.6,
    mood: 'POSITIVE',
    currencies: ['AUD', 'USD'],
    timestamp: Date.now() / 1000
  }
];

export const demoForexEvents = [
  { currency: 'JPY', event: 'Bank Holiday' },
  { currency: 'AUD', event: 'ANZ Job Advertisements m/m' },
  { currency: 'USD', event: 'Initial Jobless Claims' },
  { currency: 'EUR', event: 'ECB Interest Rate Decision' },
  { currency: 'GBP', event: 'BOE Governor Speech' }
];
