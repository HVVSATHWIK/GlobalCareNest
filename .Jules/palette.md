## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.
## 2026-06-21 - Theme Switch Accessibility
**Learning:** For state-toggling icon buttons (like theme switches), using a static 'Toggle theme' aria-label is less informative than describing the action that will happen when clicked.
**Action:** Use dynamic `aria-label` and `title` that describes the resulting action based on current state (e.g., 'Switch to dark theme'), ensure keyboard focus is visible, and hide decorative icons.
