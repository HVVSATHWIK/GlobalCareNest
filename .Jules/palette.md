## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.
## 2024-05-18 - State-toggling Buttons Accessibility
**Learning:** For state-toggling buttons like ThemeToggle, a static `aria-label="Toggle theme"` lacks context about the resulting action. It is also important to use `aria-hidden="true"` on the inner SVGs to avoid redundant screen reader noise.
**Action:** Use a dynamic `aria-label` (and `title` for tooltip) that describes the *future state/action* (e.g., 'Switch to dark theme') and apply `aria-hidden="true"` to decorative inner SVGs.
