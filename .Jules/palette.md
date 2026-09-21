## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.
## 2024-04-26 - Toggle Button Accessibility
**Learning:** When using `aria-pressed` to denote a toggle state, having a dynamic `aria-label` (e.g., 'Switch to light theme' vs 'Switch to dark theme') can cause redundant announcements in screen readers ('Switch to light theme, pressed'). The standard pattern is a static label with a dynamic `aria-pressed` state.
**Action:** Use a static `aria-label` (e.g., 'Dark Mode') on toggle buttons in combination with `aria-pressed` to communicate the active state clearly without redundancy.
