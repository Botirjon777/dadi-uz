# DADI.UZ — Landing Page · Technical Specification

> **Stack:** Next.js 15 · TypeScript · Tailwind CSS v4  
> **Type:** Single-page landing (no routing)  
> **Locale:** Uzbek (primary), Russian (secondary)

---

## 1. Project Identity

| Field           | Value                                                                            |
| --------------- | -------------------------------------------------------------------------------- |
| Brand name      | **Dadi.uz**                                                                      |
| Category        | Marketing agency · Video studio                                                  |
| Core promise    | Explosive ideas + cinematic production. Not strategy decks — actual results.     |
| Tone of voice   | Bold, sharp, zero fluff. Speaks like a creative director, not a consultant.      |
| Target audience | Business owners & brand managers in Uzbekistan who are tired of average agencies |

### Brand Positioning (copy direction)

The visitor must feel: _"These people think differently. I want to work with them."_

Key messages to embed throughout the page:

- We don't teach marketing — we **execute ideas**
- Not strategy → not consulting → **just hits**
- Strong idea + professional shoot/edit = the only formula we believe in
- Short timelines, extreme output

---

## 2. Design Direction

### Aesthetic

**Dark editorial-cinematic.** Think: a film production house meets a boutique creative agency.  
Not corporate. Not startup-ish. Something between _A24 films_ and _Wieden+Kennedy_.

### Color Palette

```
--color-bg:        #080808        /* near-black base */
--color-surface:   #111111        /* card/section surface */
--color-border:    #1E1E1E        /* subtle dividers */
--color-accent:    #FF3D00        /* electric red-orange — the "spark" */
--color-accent-2:  #FFD60A        /* flash yellow — used sparingly */
--color-text:      #F2F2F2        /* primary text */
--color-muted:     #6B6B6B        /* secondary/meta text */
```

### Typography

| Role            | Font                                  | Source       |
| --------------- | ------------------------------------- | ------------ |
| Display / Hero  | **Clash Display** (Bold, Semibold)    | Fontshare    |
| Body            | **Cabinet Grotesk** (Regular, Medium) | Fontshare    |
| Accent / Labels | **Space Mono** (for numbers, tags)    | Google Fonts |

> Both Fontshare fonts are free. Import via `@import` in `globals.css`.

### Motion Principles

- **Page load:** staggered fade-up on all hero elements (0ms → 600ms delays)
- **Scroll reveals:** `IntersectionObserver` → add `is-visible` class → CSS transitions
- **Hover states:** scale + color shift on cards, magnetic cursor effect on CTAs
- **Navbar:** shrinks + adds backdrop blur on scroll past 80px
- **No excessive looping animations** — motion should feel intentional, not decorative

---

## 3. Page Structure

```
<Navbar />
<HeroSection />
<ManifestoSection />
<ServicesSection />
<WorksSection />          ← portfolio grid
<ClientsSection />        ← logos / "who we work with"
<ProcessSection />        ← optional: 3-step how we work
<ContactSection />        ← form
<Footer />
```

---

## 4. Component Specs

### 4.1 Navbar

- **Position:** `fixed top-0`, full width, `z-50`
- **Default state:** transparent background
- **Scrolled state (>80px):** `background: rgba(8,8,8,0.85)` + `backdrop-filter: blur(12px)` + thin bottom border
- **Logo:** "DADI" wordmark in Clash Display Bold — left aligned. Add small `.uz` in accent color
- **Nav links (desktop):** Ishlар · Kim biz · Aloqa (smooth scroll anchors)
- **CTA button:** "Gaplashamiz" → opens Telegram link. Style: outlined, accent border, hover fills with accent color
- **Mobile:** hamburger → fullscreen overlay menu with staggered link entrance

---

### 4.2 Hero Section

**Full viewport height (`100vh`), centered content.**

Layout (vertically stacked, centered):

1. Small eyebrow label: `[ MARKETING · VIDEO STUDIO ]` — Space Mono, muted color, letter-spaced
2. H1 headline — 2–3 lines, massive Clash Display:
   ```
   Oddiy reklama emas.
   Portlovchi ideyalar.
   ```
3. Subheadline (Cabinet Grotesk, muted):
   ```
   Biz strategiya qurib bermaymiz —
   biz siz uchun ishlaydi degan narsani yaratamiz.
   ```
4. **Two CTA buttons (side by side):**
   - **Primary:** "Telegram'da yozing" → `https://t.me/YOUR_USERNAME` — filled accent background
   - **Secondary:** "Loyiha haqida gaplashamiz" → smooth scroll to `#contact` — outlined

**Background:**

- Base: `#080808`
- Subtle noise texture overlay (CSS `background-image: url("data:image/svg+xml...")` grain)
- One large blurred radial gradient in accent color, low opacity (~8%), positioned off-center

**Animation sequence (on load):**

```
eyebrow     → fadeUp, delay: 0ms
h1 line 1   → fadeUp, delay: 150ms
h1 line 2   → fadeUp, delay: 300ms
subheadline → fadeUp, delay: 450ms
buttons     → fadeUp, delay: 600ms
```

---

### 4.3 Manifesto / "Biz kim?" Section

Short, punchy section. Dark surface card or full-width band.

Content idea:

```
Hammasi idealdan boshlanadi.
Keyin professional syomka va montaj.
Natija: odamlar to'xtab ko'radigan kontent.
```

Visual: Large background text (ghost text) — word "IDEA" or "DADI" — very low opacity, decorative.

---

### 4.4 Services Section

**id:** `#services`

3 cards in a row (desktop), stacked (mobile).

| Card | Icon idea         | Title                  | Description                                                  |
| ---- | ----------------- | ---------------------- | ------------------------------------------------------------ |
| 1    | Spark / lightning | Kuchli Ideya           | Maqsadingizga mos, boshqalardan ajralib turadigan konsepsiya |
| 2    | Camera            | Video Ishlab Chiqarish | Professional syomka, montaj, motion graphics                 |
| 3    | Megaphone         | Reklama Kampaniyasi    | Platforma uchun to'liq tayyor kreativ                        |

**Card style:**

- Border: `1px solid var(--color-border)`
- Hover: border color shifts to accent, subtle lift (`translateY(-4px)`)
- Number label top-left: `01` `02` `03` in Space Mono, accent color

---

### 4.5 Works Section

**id:** `#works`

**Headline:** `Ishlarimiz` or `Biz yaratganlar`

Masonry or asymmetric CSS grid layout — 2 large + 2 small or 3-column uneven.

Each work card:

- Background: project thumbnail image (placeholder: dark colored div with project title)
- Overlay on hover: project name + category tag
- Hover: scale(1.02), overlay fades in

> **Note for dev:** Use `next/image` for all project thumbnails. Add `data-category` attribute for potential future filter.

**Number of items:** 6 initial (can be expanded later)

---

### 4.6 Clients Section

**Headline:** `Bizga ishonganlar` or `Biz bilan ishlaydiganlar`

Logo strip — horizontally scrolling marquee animation (CSS `@keyframes marquee`).  
Logos: white/muted filter on dark background.  
Duplicate the list for seamless loop.

---

### 4.7 Contact Section

**id:** `#contact`

**Headline:** `Gaplashamiz`

Two-column layout (desktop):

- **Left:** Short motivating copy + contact info
  - Telegram: `@dadi_uz`
  - Phone: `+998 XX XXX XX XX`
- **Right:** Form

**Form fields:**

```
- Ismingiz          (text, required)
- Telefon raqam     (tel, required)
- Kompaniya nomi    (text, optional)
- Xabar / Maqsad   (textarea, optional)
```

**Submit button:** "Yuborish" — full width, accent background  
**Action:** `mailto:` fallback OR API route `/api/contact` (simple fetch POST)  
**Success state:** Replace form with success message + checkmark animation

---

### 4.8 Footer

Minimal, single row:

- Left: `DADI.UZ © 2025`
- Center: Nav links (same anchors)
- Right: Social icons (Telegram, Instagram)

Top border: `1px solid var(--color-border)`

---

## 5. File & Folder Structure

```
dadi-uz/
├── app/
│   ├── layout.tsx          # fonts, metadata, global styles
│   ├── page.tsx            # imports all sections
│   └── globals.css         # CSS variables, font imports, base styles
├── components/
│   ├── Navbar.tsx
│   ├── HeroSection.tsx
│   ├── ManifestoSection.tsx
│   ├── ServicesSection.tsx
│   ├── WorksSection.tsx
│   ├── ClientsSection.tsx
│   ├── ContactSection.tsx
│   └── Footer.tsx
├── hooks/
│   └── useScrollReveal.ts  # IntersectionObserver hook
├── lib/
│   └── constants.ts        # nav links, services data, works data
├── public/
│   ├── fonts/              # Clash Display, Cabinet Grotesk woff2 files
│   └── images/             # logos, project thumbnails
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

---

## 6. Tailwind Config Extensions

```ts
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      bg:       '#080808',
      surface:  '#111111',
      border:   '#1E1E1E',
      accent:   '#FF3D00',
      accent2:  '#FFD60A',
      text:     '#F2F2F2',
      muted:    '#6B6B6B',
    },
    fontFamily: {
      display: ['Clash Display', 'sans-serif'],
      body:    ['Cabinet Grotesk', 'sans-serif'],
      mono:    ['Space Mono', 'monospace'],
    },
    animation: {
      'marquee': 'marquee 25s linear infinite',
      'fade-up': 'fadeUp 0.7s ease forwards',
    },
    keyframes: {
      marquee: {
        '0%':   { transform: 'translateX(0%)' },
        '100%': { transform: 'translateX(-50%)' },
      },
      fadeUp: {
        '0%':   { opacity: '0', transform: 'translateY(24px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
    },
  },
}
```

---

## 7. SEO & Meta

```tsx
// app/layout.tsx
export const metadata = {
  title: "Dadi.uz — Kuchli Ideya. Professional Video.",
  description:
    "Marketing agentligi va video studiya. Oddiy reklama emas — portlovchi ideyalar va professional syomka.",
  openGraph: {
    title: "Dadi.uz",
    description: "Kuchli Ideya. Professional Video.",
    url: "https://dadi.uz",
    siteName: "Dadi.uz",
    locale: "uz_UZ",
    type: "website",
  },
};
```

---

## 8. Performance Notes

- All images: `next/image` with `priority` on hero image if added
- Fonts: local `woff2` files (no external requests for Fontshare)
- Space Mono: Google Fonts via `next/font/google`
- No heavy animation libraries — pure CSS + minimal vanilla JS
- Scroll reveal: passive `IntersectionObserver`, no layout thrash

---

## 9. Deployment

- **Platform:** Vercel (recommended)
- **Domain:** `dadi.uz`
- Contact form: either Telegram Bot API webhook OR simple email via Resend/Nodemailer in `/api/contact`

---

## 10. TODO / Open Questions for Client

- [ ] Telegram username / bot link for CTA button
- [ ] Phone number
- [ ] 6 project thumbnails / video thumbnails for Works section
- [ ] Client logos (PNG, white version)
- [ ] Instagram handle
- [ ] Preferred language priority: Uzbek-first or bilingual uz/ru?
- [ ] Any video to embed in hero as background? (optional, performance tradeoff)
