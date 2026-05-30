---
name: RecallIQ
colors:
  background: '#F8F8F6'
  surface: '#F8F8F6'
  card: '#FFFFFF'
  text-primary: '#1A1A18'
  text-secondary: '#888780'
  border: '#E5E5E2'
  primary: '#5C51E8'
  primary-light: '#EEEDFE'
  primary-dark: '#3C3489'
  secondary: '#1D9E75'
  secondary-light: '#E1F5EE'
  secondary-dark: '#085041'
  tertiary: '#BA7517'
  tertiary-light: '#FAEEDA'
  tertiary-dark: '#633806'
  error: '#E24B4A'
  error-light: '#FCEBEB'
  error-dark: '#791F1F'
  dark-bg: '#0F0F0E'
  dark-card: '#1A1A18'
  dark-border: '#2C2C2A'
  dark-text: '#F5F5F3'
  dark-primary: '#7F77DD'
typography:
  display-lg:
    fontFamily: dmSans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: dmSans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: dmSans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: dmSans
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  headline-sm:
    fontFamily: dmSans
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
  body-lg:
    fontFamily: inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  badge: 999px
  chip: 999px
  input: 6px
  card: 12px
  large-card: 16px
  pill-button: 999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style

The design system is engineered for cognitive efficiency and high-performance learning. It follows a **Minimalist-Modern** aesthetic that prioritizes content clarity over decorative flair, drawing inspiration from psychological principles of focus and memory retention. 

The visual language is "smart" and "utilitarian," designed to disappear so that the user's educational material can take center stage. It utilizes generous negative space, a restricted color palette for semantic meaning, and a structured typographic hierarchy to reduce the mental load on students and professionals alike.

## Colors

The color strategy for the design system is rooted in functional signaling. 

- **Primary Purple** is used for core actions and navigation, providing a calm yet authoritative anchor.
- **Secondary Teal** and **Tertiary Amber** are reserved for feedback loops — specifically progress tracking and spaced-repetition indicators.
- **Error Red** is used sparingly for destructive actions or critical errors.
- The **Neutral** palette shifts slightly toward warm greys (#F8F8F6 background) to reduce eye strain during long study sessions compared to pure clinical whites.

## Typography

This design system employs a dual-font approach to balance personality with readability. **DM Sans** is used for display and headings, providing a geometric, confident structure that feels modern and approachable. 

For all functional and long-form text, **Inter** is utilized. Its high x-height and neutral character ensure maximum legibility at various sizes, essential for reviewing complex study notes. Weight is used strategically: 700 for primary hierarchy, 500 for sub-headers, 400 for standard body text, and 600 for badges and labels.

## Layout & Spacing

The layout is built on a **4px base unit**, following an 8pt grid for larger components to ensure mathematical harmony. 

The system utilizes a **12-column fluid grid** for desktop, collapsing to a **4-column grid** on mobile. 
- **Desktop:** 40px side margins with 24px gutters.
- **Tablet:** 32px side margins with 16px gutters.
- **Mobile:** 16px side margins with 16px gutters.

Spacing between related items (like an input label and its field) should use `sm` (8px), while spacing between distinct sections should use `xl` (32px) or `2xl` (48px) to maintain a sense of openness.

## Elevation & Depth

The design system uses a flat, layered approach rather than deep skeuomorphism. Depth is communicated through **Tonal Layers** and extremely subtle **Ambient Shadows**.

- **Level 0 (Surface):** The page background (#F8F8F6).
- **Level 1 (Cards):** Pure white (#FFFFFF) with a delicate 1px border (#E5E5E2) and a 0 1px 3px rgba(0,0,0,0.08) shadow.
- **Level 2 (Modals/Popovers):** Higher contrast shadows (0 4px 12px rgba(0,0,0,0.12)) to indicate temporary interaction.

Borders are the primary method for defining space, keeping the interface feeling lightweight and "un-designed."

## Shapes

The shape language in this design system is purposeful and hierarchical.
- **Cards:** Use a 12px radius (`rounded-card`) to feel approachable and modern.
- **Large Cards:** Use a 16px radius (`rounded-large-card`) to define major structural areas.
- **Input Fields:** Use a 6px radius (`rounded-input`) to appear more precise and technical.
- **Buttons:** Primary buttons use a pill shape (`rounded-pill-button`, 999px).
- **Chips/Badges:** Are fully pill-shaped (`rounded-badge`, 999px) to differentiate them from interactive buttons.

## Components

### Buttons
Primary buttons use the Primary Purple background with white text and a 999px radius (pill button). Secondary buttons use a transparent background with a border. Interactive states (Hover/Active) should involve a subtle shift in luminosity rather than color change.

### Cards
Cards are the primary container for information. They must use the 12px radius, a 1px border (#E5E5E2), and the defined Level 1 shadow. Padding within cards should be a consistent 24px (`lg`).

### Input Fields
Inputs use a 6px radius and the secondary text color (#888780) for placeholders. The border shifts to Primary Purple on focus. Error states use the Error Red for both the border and the helper text.

### Progress Indicators
Used for tracking mastery. These should use Secondary Teal for completed segments and the primary-light tint (#EEEDFE) for the track background.

### Lists & Items
List items should have a subtle 1px bottom border separator. Active list items in a navigation menu use a vertical 4px Primary Purple bar on the left edge to denote selection.
