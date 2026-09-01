## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.
## 2026-09-01 - State-Toggling Icon Buttons
**Learning:** For state-toggling icon buttons (like theme switches), using a generic aria-label (e.g., 'Toggle theme') is less informative than describing the *resulting action* based on current state (e.g., 'Switch to dark theme'). Similarly, icons within buttons that have aria-labels must have aria-hidden='true' to avoid redundant/confusing screen reader output.
**Action:** When building toggle buttons, use dynamic aria-labels and titles reflecting the action that will occur. Hide the internal SVG icon with aria-hidden='true'.
