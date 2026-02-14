export interface RiskCalculation {
  vig: number
  deVigged: number
  edge: number
  kelly: number
  size: number
  ev: number
  isProfitable: boolean
}

export function calculateRisk(
  yesPrice: number,
  noPrice: number,
  myEstimate: number,
  bankroll: number
): RiskCalculation {
  const sum = yesPrice + noPrice
  const vig = sum > 0 ? sum - 1 : 0
  const deViggedYes = sum > 0 ? yesPrice / sum : 0
  const edge = myEstimate - deViggedYes
  
  const b = yesPrice > 0 ? (1 - yesPrice) / yesPrice : 0
  const q = 1 - myEstimate
  const fullKelly = b > 0 && myEstimate > 0 ? (b * myEstimate - q) / b : 0
  const quarterKelly = fullKelly / 4
  
  const suggestedSize = Math.max(0, Math.min(0.1, quarterKelly)) * bankroll
  const ev = myEstimate * (1 - yesPrice) - q * yesPrice

  return {
    vig: Number((vig * 100).toFixed(1)),
    deVigged: Number((deViggedYes * 100).toFixed(1)),
    edge: Number((edge * 100).toFixed(1)),
    kelly: Number((quarterKelly * 100).toFixed(1)),
    size: Number(suggestedSize.toFixed(2)),
    ev: Number(ev.toFixed(3)),
    isProfitable: ev > 0 && edge > vig * 0.5,
  }
}

export const modules = [
  {
    id: 1,
    title: "The Casino vs. The Exchange",
    description: "Break the gambler's mindset. Learn how the market translates events into prices and why the 'Vig' is your primary obstacle.",
    concepts: ["Implied Probability Formula", "De-vigging Strategy", "Expected Value (EV)"],
    links: [
      { label: "Kalshi (US Regulated)", url: "https://kalshi.com/sign-up/?referral=2a55b6f1-7864-40c5-bb9c-65c106496b34" },
      { label: "Polymarket (Crypto-native)", url: "https://polymarket.com?via=billy-bradshaw-zsmu" }
    ],
    duration: "15 min"
  },
  {
    id: 2,
    title: "The 'Inch-Wide, Mile-Deep' Strategy",
    description: "Stop trading national elections. Find your edge in illiquid niches like weather, state-level politics, or tech dev cycles.",
    concepts: ["Local Information Asymmetry", "Niche Selection", "The 7-Day Specialty Challenge"],
    links: [
      { label: "Meteorology Models", url: "https://tropicaltidbits.com" },
      { label: "NWS Technical Forecasts", url: "https://weather.gov" }
    ],
    duration: "20 min"
  },
  {
    id: 3,
    title: "The Quant Toolkit",
    description: "Professional-grade data sources. Stop reading headlines; start reading primary data and technical discussion.",
    concepts: ["Technical Forecast Discussions", "GitHub Commit Tracking", "270toWin Scenarios"],
    links: [
      { label: "RealClearPolitics Hub", url: "https://realclearpolitics.com" },
      { label: "PACER Legal Filing Tracking", url: "https://pacer.uscourts.gov" }
    ],
    duration: "18 min"
  },
  {
    id: 4,
    title: "Execution & Risk Management",
    description: "The math of survival. Position sizing using Quarter-Kelly and spotting cross-platform arbitrage.",
    concepts: ["The Kelly Criterion", "Arbitrage Execution", "Emotional Drawdown Guards"],
    links: [
      { label: "Risk Manager Tool", url: "#" }
    ],
    duration: "25 min"
  }
] as const

export type Module = typeof modules[number]
