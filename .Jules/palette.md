## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.
## 2024-05-15 - Dynamic ARIA Labels for State Toggles
**Learning:** State-toggling icon buttons (like theme switches) need dynamic aria-labels describing the resulting action rather than the current state, and the inner icons should be hidden from screen readers.
**Action:** Use dynamic aria-label and title attributes (e.g., 'Switch to dark theme'), add aria-hidden="true" to the inner icon, and ensure keyboard accessibility with focus rings.
