## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.
## 2026-06-20 - State-Toggling Icon Buttons
**Learning:** For buttons that toggle between two states (e.g., Theme Toggle: light/dark), using a static `aria-label` (like 'Toggle theme') is ambiguous. Screen reader users need to know what action the button will perform if pressed, not just what it affects.
**Action:** Use a dynamic `aria-label` and `title` that describes the *resulting action* (e.g., 'Switch to light theme') rather than the current state, and remember to hide purely visual icons with `aria-hidden='true'`.
