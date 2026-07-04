## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.

## 2025-02-19 - Theme Toggle Accessibility
**Learning:** Icon-only toggle buttons require dynamic `aria-label` and `title` attributes that describe the *resulting action* rather than the current state, and the icons themselves must be hidden from screen readers using `aria-hidden='true'`.
**Action:** For all future toggle buttons, use a ternary or dynamic value for `aria-label` (e.g., 'Switch to X') and always hide decorative icons inside interactive elements.
