## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.
## 2024-11-20 - [Theme Toggle Accessibility]
**Learning:** Icon-only toggle buttons need dynamic `aria-label`s to reflect the *action* they will perform, not just their current state. Also, adding `aria-hidden="true"` to inner SVG icons prevents screen readers from redundantly announcing them.
**Action:** Always verify that toggle buttons provide clear actionable labels and hide decorative SVGs from the accessibility tree.
