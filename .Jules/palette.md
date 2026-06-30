## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.
## 2026-06-30 - Dynamic ARIA and Tooltips for Theme Toggles
**Learning:** When upgrading static icon buttons like theme toggles, using a dynamic action-oriented `aria-label` and `title` (e.g., 'Switch to dark theme') is significantly more accessible and intuitive than static descriptions ('Toggle theme').
**Action:** Always use state-dependent labels for binary toggle buttons instead of static descriptions to describe the *resulting action*.
