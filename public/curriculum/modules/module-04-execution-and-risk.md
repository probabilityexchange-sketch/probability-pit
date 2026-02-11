# Module 4: Execution & Risk Management

You've done the math. You've found your niche. You've gathered superior information. Now comes the part that destroys most traders: execution.

Because here's the truth—a great analysis with terrible execution will lose money. A mediocre analysis with perfect execution will make money.

## The Kelly Criterion

The most important formula in betting is the Kelly Criterion. It tells you exactly how much to bet when you have an edge:

```
Kelly % = (Edge / Odds) × Bankroll
```

Where:
- Edge = Your probability - Market probability
- Odds = (1 - Price) / Price for buying, or Price / (1 - Price) for selling

Example:
- Market price for Yes: $0.55 (implied 55%)
- Your estimate: 65%
- Edge: 10%
- Odds: (1 - 0.55) / 0.55 = 0.82

```
Kelly = (0.10 / 0.82) × Bankroll = 12.2% of bankroll
```

Kelly says bet 12.2% of your bankroll on this trade.

## Why You Should Never Bet Full Kelly

Kelly maximizes long-term growth *if your probability estimates are perfect*. They never are.

If you think you have 65% but actually have 55%, full Kelly will destroy you.

The solution: **Fractional Kelly**

Most professional traders use Quarter-Kelly (25% of the Kelly amount) or Half-Kelly (50%).

Quarter-Kelly in our example: 3% of bankroll.

This sacrifices some growth for massive reduction in risk of ruin.

## Position Sizing Rules

**Rule 1**: Never bet more than 10% of your bankroll on a single trade, no matter how good it looks.

**Rule 2**: Use Quarter-Kelly as your default sizing.

**Rule 3**: Reduce size further if:
- Your confidence is low
- The market is illiquid (hard to exit)
- Your edge is recent/untested
- You're on a losing streak

**Rule 4**: Increase size (up to Half-Kelly) only if:
- You have extensive track record in this niche
- Your edge is large (15%+)
- The market is highly liquid

## The Risk of Ruin

Risk of Ruin is the probability that you lose your entire bankroll.

With Quarter-Kelly sizing on a 55% win rate:
- Risk of Ruin is effectively 0%

With Full Kelly sizing on the same:
- Risk of Ruin is approximately 13%

With 2× Kelly sizing:
- Risk of Ruin approaches 50%

**You cannot trade if you have no bankroll.** Survival is more important than growth.

## Emotional Drawdown Guards

Math is easy. Psychology is hard.

When you're down 20% on the week, you'll want to:
- Bet bigger to "make it back"
- Chase lower-quality edges
- Ignore your sizing rules
- Trade more frequently

This is **tilt**, and it's how small losses become catastrophic ones.

Build in guards:

1. **Drawdown pause**: Stop trading for 24 hours after any 10% loss
2. **Position limit**: No new positions after 3 consecutive losses
3. **Cooling off**: After any trade, wait 1 hour before the next
4. **Weekly review**: Every week, review your decision log before trading

## Cross-Platform Arbitrage

Sometimes different platforms show different prices for the same event.

If Polymarket has Yes at $0.55 and Kalshi has Yes at $0.52, you can:
- Buy Yes on Kalshi for $0.52
- Sell Yes on Polymarket (or buy No) for $0.55
- Lock in a risk-free profit

This is **arbitrage**, and it's the closest thing to free money in prediction markets.

But:
- Opportunities are rare and short-lived
- You need accounts and capital on multiple platforms
- You need to account for vig on both sides
- Execution speed matters

Arbitrage is worth pursuing, but don't build your whole strategy around it.

## The Complete Trade Checklist

Before every trade:

**Analysis**:
- [ ] Calculated de-vigged market probability
- [ ] Documented my probability estimate with sources
- [ ] Calculated EV (must be positive)
- [ ] Edge is at least 2× the vig

**Sizing**:
- [ ] Calculated Kelly fraction
- [ ] Applied Quarter-Kelly (or less)
- [ ] Position size is under 10% of bankroll
- [ ] Position size accounts for liquidity (can I exit?)

**Psychology**:
- [ ] Not on tilt (no recent big losses)
- [ ] Not chasing (edge is genuine, not FOMO)
- [ ] Documented reasoning in decision log
- [ ] Comfortable with worst-case outcome

If any box is unchecked, **do not trade**.

---

## Core Concepts

### Kelly Criterion Formula

For buying Yes shares:

```
Kelly % = (p × (1-price) - (1-p) × price) / (1-price)
```

Where p = your estimated probability

Simplified:
```
Kelly % = Edge / Decimal Odds
Decimal Odds = (1-price) / price
```

For buying No shares:
```
Kelly % = Edge / Decimal Odds
Decimal Odds = price / (1-price)
```

### Fractional Kelly Table

| Full Kelly | Quarter Kelly | Half Kelly |
|------------|---------------|------------|
| 20% | 5% | 10% |
| 15% | 3.75% | 7.5% |
| 10% | 2.5% | 5% |
| 5% | 1.25% | 2.5% |

**Recommendation**: Default to Quarter-Kelly. Use Half-Kelly only after proving your edge over 50+ trades.

### Risk of Ruin Calculation

Approximate formula:
```
RoR ≈ ((1 - edge) / (1 + edge))^(bankroll / bet_size)
```

Example:
- Edge: 5%
- Bankroll: $1,000
- Bet size: $25 (2.5% with Quarter-Kelly)
- RoR ≈ 0.0000001%

Compare to bet size of $200 (20%):
- RoR ≈ 13%

### Arbitrage Detection

Arbitrage exists when:
```
(Platform A Yes Price) + (Platform B No Price) < 1
```

Or equivalently:
```
(Platform A Yes Price) < (Platform B Yes Price) - vig_gap
```

You need price differences larger than the combined vig of both platforms.

Example:
- Polymarket Yes: $0.58
- Kalshi Yes: $0.52
- Polymarket vig: 3%
- Kalshi vig: 2%

Gap: $0.06
Combined vig: 5%
Profitable arbitrage: Yes ($0.06 > $0.05)

### Position Sizing Calculator

Given:
- Your probability estimate: p
- Market price: m
- Bankroll: B
- Kelly fraction: f (0.25 for Quarter-Kelly)

```
Edge = p - (m / (m + (1-m)))
Odds = (1 - m) / m
Kelly = Edge / Odds
Position = B × f × Kelly
```

Example:
- p = 0.65
- m = 0.55
- B = $1000
- f = 0.25

```
Edge = 0.65 - 0.55 = 0.10
Odds = 0.45 / 0.55 = 0.82
Kelly = 0.10 / 0.82 = 0.122
Position = $1000 × 0.25 × 0.122 = $30.50
```

---

## Common Mistakes

1. **Overbetting**  
   Betting 20-30% on a "sure thing" is how you go broke. No such thing as a sure thing.

2. **Ignoring liquidity**  
   If you need to exit and there are no buyers, your position is worth less than you think.

3. **Revenge trading**  
   Trying to win back losses with bigger bets. Classic tilt behavior.

4. **No stop-loss discipline**  
   Holding losing positions hoping they'll recover. Cut losses early.

5. **Overtrading**  
   Trading for the sake of trading. Only trade when you have genuine edge.

---

## Decision Log Template

```markdown
## Trade Log: [Date]

**Market**: [Market name]
**Current Price**: $X.XX
**My Estimate**: XX%
**Edge**: X%

**Reasoning**:
- [Source 1]: [What it says]
- [Source 2]: [What it says]
- [Synthesis]: [Why my estimate differs from market]

**EV Calculation**:
- EV = [calculation]
- Kelly = [calculation]
- Position Size = [calculation]

**Decision**: [ENTER / PASS / WATCH]

**Actual Outcome**: [filled in later]
**Lessons**: [filled in later]
```

---

## Practice Exercise

1. Use the Risk Manager tool on this site
2. Enter a real market you're following
3. Input your probability estimate based on research
4. Note the Kelly recommendation
5. Apply Quarter-Kelly
6. Log the trade (even if you don't enter)
7. Review the outcome after resolution

Do this for 20 trades before committing significant capital.

---

## Key Takeaways

- Use Quarter-Kelly as your default position size
- Never bet more than 10% on a single trade
- Risk of ruin matters more than expected return
- Build guards against emotional decision-making
- Arbitrage exists but requires speed and multi-platform setup
- Log every decision to improve over time
- Survival > Growth. Always.
