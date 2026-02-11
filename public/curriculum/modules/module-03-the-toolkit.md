# Module 3: The Quant Toolkit

By now you understand the math of expected value and the strategy of niche focus. Now we need to talk about tools.

Professional quants don't trade on headlines. They trade on data. And they don't read data—they **monitor** it.

## Stop Reading Headlines

Headlines are processed information. By the time something is a headline, the market has already moved.

Your job is to find the raw information *before* it becomes a headline.

This means:
- Primary sources, not news aggregators
- Raw data, not analysis
- Original documents, not summaries
- Technical discussions, not press releases

## The Toolkit Architecture

Your quant toolkit should have four components:

**1. Data Sources** - Where raw information lives
**2. Monitoring Systems** - How you track it automatically
**3. Analysis Frameworks** - How you interpret what you see
**4. Decision Logs** - How you learn from past trades

## Data Sources by Domain

### Political Markets
- FEC filings (campaign finance)
- State Secretary of State websites (voter registration, early voting)
- 270toWin (electoral college scenarios)
- FiveThirtyEight model outputs (not the articles—the raw probabilities)
- Local county clerk offices (ballot counts, certification timelines)

### Weather Markets
- National Weather Service discussions (not the forecasts—the technical analysis)
- Tropical Tidbits (hurricane models)
- ECMWF vs GFS model comparisons
- Local NWS office Twitter accounts
- Weather balloon sounding data

### Economic Markets
- BLS raw data releases (before news outlets summarize)
- Fed FOMC statements (read the actual text, not the coverage)
- CME FedWatch (market-implied rate probabilities)
- Initial jobless claims (Thursday 8:30am ET—set an alarm)

### Crypto/Tech Markets
- GitHub commits (frequency, content, contributors)
- Developer Discord/Telegram channels
- On-chain analytics (Etherscan, Dune Analytics)
- Protocol governance forums

### Legal/Regulatory Markets
- PACER (federal court filings—costs money but worth it)
- CourtListener (free PACER alternative for some cases)
- Federal Register (proposed rules, comment periods)
- SEC EDGAR (corporate filings)

## Monitoring Systems

You can't manually check 50 sources every day. You need automation.

**RSS Feeds**: Still the best way to monitor most websites. Use Feedly or Inoreader.

**Alerts**: 
- Google Alerts for key terms
- Twitter/X lists for key accounts
- Reddit monitoring for niche communities

**APIs** (advanced):
- GitHub API for commit monitoring
- NWS API for weather alerts
- CourtListener API for legal filings

**Dashboards**:
Build a simple dashboard that shows all your monitored data in one place. Even a Notion page with embedded feeds is better than nothing.

## Analysis Frameworks

Raw data is useless without interpretation. Here are frameworks for common situations:

### Probability Updates
When new information arrives, ask:
1. Does this change the base rate?
2. Is this already priced in?
3. What's the gap between market reaction and correct reaction?

### Source Weighting
Not all sources are equal. Track your sources over time:
- Which ones were right before?
- Which ones were early?
- Which ones were noise?

Build a mental (or actual) weighting system. Trust sources with better track records more.

### Scenario Analysis
For binary events, map out:
- What happens in the Yes case?
- What happens in the No case?
- What's the probability of each?
- Is the current price higher or lower than your probability?

## Decision Logs

Every trade you consider—even ones you don't make—should be logged:

1. **Date/Time**
2. **Market and current price**
3. **Your probability estimate**
4. **Your reasoning** (be specific—cite sources)
5. **Your EV calculation**
6. **Trade decision** (entered, passed, or watched)
7. **Outcome** (filled in later)

Review your decision logs weekly. You'll learn:
- Where your estimates are systematically off
- Which sources led you astray
- Patterns you didn't notice in the moment

## The 80/20 of Information

80% of profitable information comes from:
- Official government sources
- Primary technical documents
- Local news that hasn't gone national
- Niche community discussions

20% comes from:
- Mainstream news
- Social media sentiment
- "Gut feel"

Most traders spend 80% of their time on the 20% sources. Flip this ratio.

---

## Core Concepts

### Source Hierarchy

For any prediction market, rank your information sources by:

1. **Primary** - Raw data, official sources, original documents
2. **Secondary** - Analysis of primary sources, expert commentary
3. **Tertiary** - News articles, summaries, social media

**Rule**: Never make a trade decision based only on tertiary sources.

### The Monitoring Stack

**Level 1 (Essential)**:
- RSS reader with 10-20 key feeds
- Twitter/X list of 20-50 key accounts
- Calendar alerts for scheduled data releases

**Level 2 (Serious)**:
- Custom scripts to scrape key websites
- Discord/Telegram monitoring for niche communities
- Spreadsheet tracking of key metrics over time

**Level 3 (Professional)**:
- API integrations for automated data collection
- Custom dashboards with real-time updates
- Automated alerts when metrics cross thresholds

Start at Level 1. Upgrade as your niche becomes profitable.

### Information Decay Rate

Information has a half-life. The value of exclusive information decays as it spreads.

| Information Type | Half-Life |
|-----------------|-----------|
| Fed rate decision (post-announcement) | Seconds |
| Major election result | Minutes |
| Earnings release | Minutes |
| Local news story | Hours to days |
| Technical analysis insight | Days to weeks |
| Structural knowledge | Months to years |

Focus your monitoring effort on information with longer half-lives in your niche.

### Source Credibility Tracking

For each source you follow, track:

- **Accuracy**: How often was it right?
- **Timeliness**: How early was it?
- **Specificity**: How actionable was it?

Example tracking:

| Source | Accuracy | Timeliness | Specificity | Weight |
|--------|----------|------------|-------------|--------|
| Local newspaper | 75% | 2 days early | Medium | 0.3 |
| County clerk website | 95% | 1 day early | High | 0.5 |
| Twitter insider | 60% | 3 days early | Low | 0.2 |

Use weighted averages when sources conflict.

---

## Data Source Reference

**Political**:
- [FEC.gov](https://fec.gov) - Campaign finance
- [270toWin](https://270towin.com) - Electoral maps
- [FiveThirtyEight](https://fivethirtyeight.com) - Polls and models
- Ballotpedia - Ballot measures and local elections

**Weather**:
- [Weather.gov](https://weather.gov) - NWS forecasts and discussions
- [TropicalTidbits.com](https://tropicaltidbits.com) - Hurricane models
- EarthWindMap - Global weather visualization

**Economic**:
- [BLS.gov](https://bls.gov) - Labor statistics
- [BEA.gov](https://bea.gov) - Economic accounts
- [FRED](https://fred.stlouisfed.org) - Economic data

**Legal**:
- [PACER](https://pacer.uscourts.gov) - Federal court filings
- [CourtListener](https://courtlistener.com) - Free legal database
- [Federal Register](https://federalregister.gov) - Regulatory actions

---

## Common Mistakes

1. **Over-relying on mainstream news**  
   By the time CNN covers something, every trader knows.

2. **Ignoring scheduled releases**  
   Some information arrives on predictable schedules. Be prepared.

3. **Not tracking source accuracy**  
   You can't improve what you don't measure.

4. **Analysis paralysis**  
   More data isn't always better. Focus on actionable information.

---

## Practice Exercise

1. Pick your niche from Module 2
2. Identify the 5 most important primary data sources
3. Set up monitoring for each (RSS, alerts, or calendar)
4. Spend 1 week collecting data without trading
5. At the end of the week, write down 3 probability estimates based on your data
6. Compare your estimates to market prices

---

## Key Takeaways

- Trade on primary data, not processed headlines
- Build monitoring systems so you don't miss information
- Weight sources by track record, not just reputation
- Log every decision to learn from patterns
- Focus on information with longer half-lives
