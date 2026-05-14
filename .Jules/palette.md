## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.
## 2024-03-05 - Theme Toggle Accessibility
**Learning:** Theme toggle buttons should describe the *action* they perform (e.g., "Switch to light theme" or "Switch to dark theme") rather than the current state or a generic "Toggle theme". Also, for icon-only buttons, providing a native tooltip (`title`) is essential for mouse users to understand the action.
**Action:** Always use dynamic labels for binary state toggles that explain what clicking the button will do. Ensure icon-only interactive elements have both `aria-label` for screen readers and `title` for mouse users, and that icons themselves have `aria-hidden="true"`.
