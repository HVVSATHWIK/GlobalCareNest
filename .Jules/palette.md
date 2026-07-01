## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.
## 2026-07-01 - Focus Visible with Vite and Tailwind
**Learning:** Testing `focus-visible` with Playwright against a standalone HTML file using Tailwind CDN requires explicitly defining the pseudo-class CSS if the CDN script doesn't parse it during runtime. Also, Vite built assets default to absolute paths and won't work nicely with `file://` protocol in Playwright without configuring `base: './'`.
**Action:** When testing `focus-visible` in Playwright, prefer using the development/preview server if it works, or fallback to mock HTML with explicit CSS overrides for complex pseudo-classes.
