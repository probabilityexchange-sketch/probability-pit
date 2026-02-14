# UX Specification: Probability Pit UI Redesign

## PRD Reference
Redesign the Probability Pit trading application to match a top-tier design agency aesthetic (Linear, Vercel, Stripe). The app is a prediction market risk management tool with a 3-step wizard interface.

## Pass 1: Mental Model

### User's Existing Model
Users of this app are traders who think in terms of:
- Probability and odds
- Risk vs reward
- Execution and sizing
- Real-time data

They expect a tool that feels like professional trading software - dense, precise, no fluff.

### Our Model
The current UI tries too hard to be "edgy" with scanlines, heavy glows, and gaming aesthetics. The new model should feel like a precision instrument - clean, focused, trustworthy.

### Alignment Strategy
- Remove gaming/military jargon aesthetic
- Keep the "tool" feel but elevate it to Bloomberg-terminal-caliber
- Make the data the hero, not the chrome

## Pass 2: Information Architecture

### Entities
- **Navbar**: Logo, navigation tabs, status indicator
- **Hero**: Badge, title, subtitle
- **Risk Wizard**: 3-step form (Market Data → Edge → Risk)
- **Terminal Panel**: Live indicators and doctrine
- **Footer**: Minimal branding

### Hierarchy
Primary: Risk calculation results and inputs
Secondary: Navigation and progress
Tertiary: Terminal indicators and doctrine

### Relationships
- Navbar → Page selection
- Hero → Context setting
- Risk Wizard → Core interaction (3 linear steps)
- Terminal Panel → Always-visible reference

## Pass 3: Affordances

### Interactive Elements
| Element | Affordance Signal | Action |
|---------|------------------|--------|
| Nav links | Underline on hover, active state | Route change |
| Step dots | Fill color, connected line | Visual progress only |
| Input fields | Border highlight on focus | Data entry |
| Slider | Thumb grab cursor, track fill | Probability input |
| Buttons | Color shift on hover, scale on click | Form progression |
| Cards | Subtle lift on hover | Visual feedback |

### Potential Confusion Points
- Step dots look clickable but aren't (fix: cursor-default)
- "Scanline" effects look like errors (remove)
- Glow effects feel "gamer" not professional (reduce)

## Pass 4: Cognitive Load

### Decisions Required
1. Enter market prices (yes/no) - Info: Current odds from exchange
2. Set personal probability estimate - Info: Your
3. Confirm thesis position size - Info: Kelly calculation

### Load Reduction
- Pre-fill common values
- Show real-time calculations as user types
- Single-purpose panels (wizard on left, reference on right)
- Clear step progression

## Pass 5: State Design

### Loading
- Skeleton states for any async data
- Subtle spinner on submit buttons only

### Empty
- Default pre-filled values (0.60/0.45)
- Placeholder text in inputs

### Error
- Inline validation (red border, helper text below input)
- Don't block progression unnecessarily

### Success
- Green accent on positive EV
- Clear "Execute" call-to-action
- Confirmation animation on final step

## Pass 6: Flow Integrity

### Happy Path
1. User enters yes/no prices
2. System shows vig and implied probability
3. User adjusts their estimate via slider
4. System shows edge calculation
5. User sees Kelly size and EV
6. User adjusts bankroll, sees final position size
7. User executes or resets

### Escape Hatches
- Back button on each step
- Reset returns to step 1
- Navigation always accessible

### Dead Ends Eliminated
- Can't proceed without valid inputs
- Clear feedback when edge is insufficient

---

## Visual Specification

### Color Palette
- **Background**: hsl(222 47% 7%) - Rich navy, not pure black
- **Surface**: hsl(220 50% 8%) - Slightly lighter
- **Surface Elevated**: hsl(217 33% 17%) - Cards and inputs
- **Border**: hsla(215 20% 47% / 0.15) - Subtle, low contrast
- **Text Primary**: hsl(210 40% 98%)
- **Text Secondary**: hsl(215 20% 65%)
- **Text Muted**: hsl(215 16% 47%)
- **Accent**: hsl(217 91% 60%) - Blue, used sparingly
- **Success**: hsl(142 71% 55%)
- **Danger**: hsl(0 84% 70%)
- **Warning**: hsl(38 92% 60%)

### Typography
- **Font Family**: Inter (system fallback)
- **Display**: 48px/56px, bold, tight tracking (-0.02em)
- **Heading**: 24px/32px, semibold
- **Body**: 14px/20px, regular
- **Micro**: 11px/16px, uppercase, tracking-widest

### Spacing
- Base unit: 4px
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64
- Container max-width: 1200px
- Card padding: 16px (sm), 24px (md), 32px (lg)

### Component Specs

#### Navbar
- Height: 56px
- Background: transparent with backdrop-blur
- Logo: Icon + text, 24px font
- Nav tabs: Pill-style, 8px padding horizontal, 6px vertical
- Status dot: 6px, pulse animation

#### Hero
- Padding: 32px vertical (mobile), 48px (desktop)
- Badge: Pill, subtle background, 11px uppercase
- Title: 32px mobile, 48px desktop
- Subtitle: 16px, secondary text color

#### Cards
- Background: Surface color
- Border: 1px solid border color
- Border radius: 12px
- Padding: 16px or 24px
- Hover: translateY(-2px), subtle shadow increase

#### Buttons
- Primary: Accent background, white text, 10px 20px padding
- Secondary: Transparent, border, text secondary
- Border radius: 8px
- Hover: brightness increase, subtle scale
- Active: scale(0.98)
- Disabled: 50% opacity

#### Inputs
- Height: 40px
- Background: Surface elevated
- Border: 1px solid border color
- Border radius: 8px
- Focus: Accent border, subtle glow
- Label: 11px uppercase, tracking-wide, above input

#### Progress Indicator
- Line: 1px height, border color background
- Active fill: Accent color
- Dots: 8px diameter, border only (inactive), filled (active)
- Labels: 10px uppercase, tracking-wide

#### Terminal Panel
- Lighter visual weight than main content
- Smaller text (12px)
- More muted colors
- Status indicators as subtle colored dots

### Animations
- Duration: 150-200ms (quick, snappy)
- Easing: cubic-bezier(0.4, 0, 0.2, 1)
- Page transitions: Fade + slide
- Step transitions: Cross-fade
- Hover: 150ms ease
- Active: 100ms scale
