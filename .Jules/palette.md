## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.

## 2024-06-19 - ThemeToggle focus state
**Learning:** For state-toggling icon buttons, a dynamic aria-label and title describing the action (e.g. "Switch to dark theme") is clearer than a static one. Using `focus-visible` ring styling ensures users navigating with keyboard can clearly see which interactive element has focus.
**Action:** Always verify icon-only buttons have meaningful aria-labels, dynamically update based on state, and use `focus-visible:ring` to guarantee clear visual focus rings for keyboard a11y.
