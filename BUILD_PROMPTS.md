# Build Prompts for Probability Pit UI Redesign

## Dependency Graph

```
Design Tokens (CSS)
    └── Base Components (Button, Input, Card)
        └── Layout (Navbar, Footer, Container)
            └── Page Components (Hero)
                └── Feature (RiskManager Wizard)
                    └── Final Assembly (HomePage)
```

---

## Prompt 1: Design Tokens & Base Styles

**Dependencies**: None (foundation)
**Builds toward**: All components

### Context
Define the design tokens and base styles for the entire application. This sets the foundation for all other components.

### Design Tokens
- Background: hsl(222 47% 7%)
- Surface: hsl(220 50% 8%)
- Surface Elevated: hsl(217 33% 17%)
- Border: hsla(215 20% 47% / 0.15)
- Text Primary: hsl(210 40% 98%)
- Text Secondary: hsl(215 20% 65%)
- Text Muted: hsl(215 16% 47%)
- Accent: hsl(217 91% 60%)
- Success: hsl(142 71% 55%)
- Danger: hsl(0 84% 70%)
- Warning: hsl(38 92% 60%)
- Border radius: 12px
- Font: Inter, system-ui, sans-serif

### Requirements
- Create CSS custom properties for all design tokens
- Set base body styles (background, text color, font)
- Define container max-width (1200px) and padding
- Create utility classes for transitions (150ms, cubic-bezier)
- Set up glassmorphism utilities (backdrop-blur)
- Define micro-interaction utilities (active:scale)

### Constraints
- Use Tailwind v4 @theme syntax
- Keep animations snappy (150-200ms)
- Ensure WCAG AA contrast ratios

---

## Prompt 2: Base UI Components

**Dependencies**: Prompt 1 (Design Tokens)
**Builds toward**: Layout components

### Context
Build the foundational UI components: Button, Input, Card, Badge, Indicator. These are used throughout the app.

### Component: Button

### Design Tokens
- Primary bg: hsl(217 91% 60%)
- Primary text: white
- Secondary bg: transparent
- Secondary border: hsla(215 20% 47% / 0.15)
- Border radius: 8px
- Padding: 10px 20px
- Font: Inter, 14px, semibold

### Requirements
- Variants: primary, secondary, success, danger, ghost
- Sizes: sm (32px), md (40px), lg (48px)
- Hover: brightness-110, subtle translate
- Active: scale-98
- Disabled: 50% opacity, cursor-not-allowed
- Loading state: spinner icon

### States
- Default: As specified
- Hover: brightness-110, translateY(-1px)
- Active: scale-98
- Disabled: opacity-50

---

### Component: Input

### Design Tokens
- Height: 40px
- Background: hsl(217 33% 17%)
- Border: 1px solid hsla(215 20% 47% / 0.15)
- Border radius: 8px
- Text: 14px
- Label: 11px uppercase, tracking-wide

### Requirements
- Label above input
- Optional prefix/suffix (like $)
- Number input support with step prop
- Focus: accent border, subtle glow (box-shadow)
- Error state: danger border

### States
- Default: muted border
- Focus: accent border, glow
- Error: danger border, helper text
- Disabled: opacity-50

---

### Component: Card

### Design Tokens
- Background: hsl(220 50% 8%)
- Border: 1px solid hsla(215 20% 47% / 0.15)
- Border radius: 12px
- Padding: 16px (sm), 24px (md), 32px (lg)

### Requirements
- Variants: default, muted, outline
- Hover prop for interactive cards
- Padding options
- Glassmorphism variant with backdrop-blur

### States
- Default: as specified
- Hover: translateY(-2px), shadow increase

---

### Component: Badge

### Design Tokens
- Font size: 11px
- Padding: 4px 8px
- Border radius: 9999px (full)
- Uppercase, tracking-wide

### Requirements
- Variants: primary, success, danger, warning
- Dot indicator option
- Subtle background color matching variant

---

### Component: Indicator

### Design Tokens
- Label: 11px uppercase, muted
- Value: 14px mono font
- Status dot: 6px

### Requirements
- Label-value pairing
- Status dot with color
- Status text label

### States
- Variants: success, danger, primary, muted

---

## Prompt 3: Layout Components

**Dependencies**: Prompt 2 (Base Components)
**Builds toward**: Page components

### Context
Build the layout shell: Navbar, Footer, Container.

### Component: Navbar

### Design Tokens
- Height: 56px
- Background: transparent, backdrop-blur-xl
- Border bottom: 1px solid border color
- Logo: 24px bold
- Nav pills: bg-surface-elevated

### Requirements
- Logo with icon and text
- Navigation tabs (pill-style)
- Status indicator (pulsing dot)
- Mobile hamburger menu
- Sticky positioning

### Content
- Logo: "PROBABILITY" + "PIT" (accent on PIT)
- Nav items: "Risk Manager", "Quant Academy"
- Status: "Operational" with green dot

### Constraints
- Mobile: hamburger menu below 768px
- Smooth backdrop blur effect

---

### Component: Footer

### Design Tokens
- Background: surface
- Border top: 1px solid border
- Text: 12px

### Requirements
- Logo
- Social link (@ProbabilityEx)
- Copyright year

---

### Component: Container

### Design Tokens
- Max width: 1200px
- Padding: 16px (mobile), 24px (desktop)

### Requirements
- Centered layout
- Responsive padding
- Export for reuse

---

## Prompt 4: Hero Component

**Dependencies**: Prompt 3 (Layout)
**Builds toward**: HomePage assembly

### Component: Hero

### Design Tokens
- Padding: 32px vertical (mobile), 48px (desktop)
- Background: surface color
- Border bottom: 1px solid border

### Design Tokens - Typography
- Badge: 11px uppercase, tracking-widest, secondary bg
- Title: 28px mobile, 40px desktop, bold, tight tracking
- Subtitle: 14px, secondary text color

### Requirements
- Optional badge at top
- Large title with accent word
- Subtitle below
- Fade-in animation on load

### Content
- Badge: "Professional Prediction Protocol"
- Title: "Trading is Numerical Warfare" (accent on "Numerical Warfare")
- Subtitle: "Identify mispriced probabilities using information asymmetry and execute with clinical risk management."

### Constraints
- Max width on title: 600px
- Responsive typography scaling

---

## Prompt 5: Risk Manager Wizard

**Dependencies**: Prompt 2 (Base Components), Prompt 3 (Layout)
**Builds toward**: Final HomePage assembly

### Component: RiskManager (Full Feature)

### Design Tokens
- Step indicator: 1px line, 8px dots
- Active accent: hsl(217 91% 60%)
- Panel background: surface with subtle border
- Terminal panel: lighter weight

### Requirements
**Layout:**
- Two-column on desktop (wizard 7 cols, terminal 5 cols)
- Single column on mobile
- Progress indicator at top

**Step 1 - Market Data:**
- Yes/No price inputs side by side
- Vig and implied probability cards
- Continue button

**Step 2 - Edge Calculation:**
- Large probability slider (0-100%)
- Current estimate display (large mono)
- Edge calculation card
- Back and continue buttons

**Step 3 - Risk Blueprint:**
- Kelly percentage card
- EV card with positive/negative styling
- Bankroll input
- Position size display
- Execute/Reset buttons

**Terminal Panel:**
- Always visible on right
- Alpha signal indicator
- Exchange friction indicator
- Confidence index indicator
- Doctrine quote

**Animations:**
- Step transitions: cross-fade (200ms)
- Progress line fills smoothly
- Card hover effects
- Button active states

### States
- Step 1: Market prices entered
- Step 2: Estimate set, edge shown
- Step 3: Complete, ready to execute
- Invalid: Edge insufficient warning

### Constraints
- Mobile: stacked layout, terminal panel below
- Smooth 200ms transitions between steps
- Don't show execute as disabled - show as "Insufficient Edge"

---

## Prompt 6: HomePage Assembly

**Dependencies**: Prompt 4 (Hero), Prompt 5 (RiskManager)
**Builds toward**: Complete application

### Component: HomePage

### Context
Assemble the final homepage by composing Hero and RiskManager.

### Requirements
- Navbar (from Layout)
- Hero component
- RiskManager component
- Footer (from Layout)
- Proper routing structure

### Content
- Badge: "Professional Prediction Protocol"
- Title: "Trading is Numerical Warfare"
- Subtitle: "Identify mispriced probabilities..."
- Wizard with all 3 steps

---

## Implementation Notes

1. **Start with Prompt 1** - Design tokens set the entire aesthetic
2. **Each prompt builds on the previous** - Don't skip
3. **Test responsive behavior** at each step
4. **Run the app** after Prompt 3 to verify foundation
5. **Final integration** after Prompt 6

### Tech Stack Reminders
- Tailwind CSS v4 with @theme
- Framer Motion for animations
- Lucide React for icons
- React Router for navigation
- clsx for conditional classes
