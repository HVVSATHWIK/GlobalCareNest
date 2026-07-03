## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.
## 2026-07-03 - Dynamic ARIA Labels for State-Toggling Icons
**Learning:** Icon-only state toggle buttons (like Theme switches) need dynamic `aria-label`s and `title`s that describe the *resulting action* (e.g., 'Switch to dark theme'), rather than a static description of the current state. Inner icons must also be explicitly hidden with `aria-hidden="true"` to prevent redundant screen reader announcements alongside the label.
**Action:** Always verify stateful icon buttons use action-oriented dynamic labels and hide their SVG content from assistive tech.
