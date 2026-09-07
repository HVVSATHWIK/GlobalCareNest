## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.

## 2026-09-07 - Dynamic ARIA Labels for State-Toggling Icons
**Learning:** For state-toggling icon buttons (like theme switches), using a dynamic `aria-label` and `title` attribute that describes the *resulting action* (e.g., 'Switch to dark theme') is much more helpful to users than a static label describing the current state. Also, adding `aria-hidden="true"` to the inner SVG/icon prevents screen readers from reading the icon redundantly when the parent button already has a descriptive `aria-label`.
**Action:** Always use dynamic labels for toggle buttons where the action changes based on state, and remember to hide decorative/redundant inner icons from screen readers using `aria-hidden="true"`.
