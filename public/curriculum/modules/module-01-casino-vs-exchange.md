# Module 1: The Casino vs. The Exchange

Before we talk about any strategy, any edge, or any position sizing—we need to reprogram how you think about prediction markets.

## The Casino Mindset (That You Need to Kill)

Most people approach prediction markets like a slot machine. They see a question, form an opinion, and bet. Maybe they feel confident. Maybe it's a "hunch." Maybe they read a convincing tweet.

This is the **casino mindset**. You are the house's revenue source.

In a casino, the odds are fixed. The house edge is baked in. You cannot beat roulette over time because the math is against you. You *can* beat blackjack if you count cards—and the casino will ban you for it.

Prediction markets are different. The "house" (the exchange) takes a small cut called the **vig**. But the *odds*—the prices—aren't fixed. They move based on what everyone else thinks.

This is your opportunity. And your trap.

## How Prices Become Probabilities

In a prediction market, you can buy a "Yes" share or a "No" share. Each share pays $1.00 if correct, $0 if wrong.

If the market price for "Yes" is $0.60, you're paying 60 cents for something that *might* pay a dollar.

The **implied probability** is simply:

```
Implied Probability = Price / (Yes Price + No Price)
```

But here's the catch: Yes + No usually adds up to *more* than $1.00.

That extra amount is the **vig**—the exchange's fee baked into the price.

## The Vig Is Your Enemy

Let's say:
- Yes price: $0.60
- No price: $0.45
- Total: $1.05

The vig is 5%. The market isn't saying "60% chance Yes." It's saying the *true* probability is somewhere below 60%, after accounting for the vig.

**De-vigging** is the process of extracting the real implied probability:

```
De-vigged Yes = 0.60 / 1.05 = 57.1%
```

The market thinks there's a 57.1% chance of Yes happening. Not 60%.

This 2.9% difference is where beginners lose money without knowing why.

## Expected Value: The Only Math That Matters

Every trade you make has an **Expected Value (EV)**:

```
EV = (Your Probability × Profit if Right) - (Market Probability × Loss if Wrong)
```

If you think the true probability is 65%, but the de-vigged market says 57%:

```
EV = (0.65 × $0.40) - (0.35 × $0.60)
EV = $0.26 - $0.21
EV = +$0.05 per share
```

Positive EV means you have an **edge**. Negative EV means you're donating to the market.

**Rule #1**: Never enter a trade with negative expected value. Not for fun. Not for "experience." Not ever.

## The Three Questions Before Every Trade

Before clicking buy, answer these:

1. **What is the de-vigged market probability?** (Not the raw price.)
2. **What is MY estimated probability?** (Based on research, not vibes.)
3. **Is my edge larger than 2× the vig?** (If vig is 5%, you need 10%+ edge.)

If you can't answer all three with numbers, you're not trading. You're gambling.

---

## Core Concepts

### Implied Probability Formula

The market's price isn't a direct probability. To extract it:

```
De-vigged Probability = Side Price / (Yes Price + No Price)
```

Example:
- Yes: $0.55
- No: $0.48
- Sum: $1.03
- Vig: 3%
- De-vigged Yes: 0.55 / 1.03 = **53.4%**

The market is pricing Yes at 53.4%, not 55%.

### Calculating the Vig

```
Vig = (Yes Price + No Price) - 1
Vig % = Vig × 100
```

A vig under 4% is **healthy**. Between 4-7% is **acceptable**. Above 7% is **toxic**—the market is too expensive to beat reliably.

### Expected Value (EV)

```
EV = (Your Prob × Potential Profit) - (Opponent Prob × Potential Loss)
```

For buying Yes at price P with your estimate E:

```
EV = (E × (1 - P)) - ((1 - E) × P)
```

- EV > 0: You have an edge
- EV = 0: Fair price (break-even)
- EV < 0: You're losing money on average

### The 2× Vig Rule

Your edge should be at least **double the vig** before considering a trade.

Why? Because your probability estimate has error margins. The vig protects the market against small edges. You need a big enough edge to survive estimation error.

| Vig | Minimum Edge |
|-----|--------------|
| 3%  | 6%+          |
| 5%  | 10%+         |
| 7%  | 14%+         |

---

## Common Mistakes

1. **Treating price as probability**  
   A $0.60 Yes price does NOT mean 60% probability. Always de-vig.

2. **Ignoring the vig**  
   Small vigs compound. A 3% vig on every trade means you need 53% accuracy just to break even.

3. **Betting without EV calculation**  
   If you haven't calculated EV, you're guessing. Guessing is -EV.

4. **Trading high-vig markets**  
   Some markets have 10%+ vig. They're mathematically unbeatable unless you have insider information.

---

## Practice Exercise

Go to Polymarket or Kalshi. Find any active market.

1. Record the Yes and No prices
2. Calculate the vig
3. De-vig to find the true implied probability
4. If you had to estimate the real probability, what would it be?
5. Calculate your EV if you bought Yes at current prices

Do this for 10 markets. Don't trade anything. Just practice the math.

---

## Key Takeaways

- Prediction markets are not casinos—the odds move
- The vig is baked into prices; always de-vig before analysis
- Expected Value is the only metric that matters
- Never trade without a positive EV edge of at least 2× the vig
