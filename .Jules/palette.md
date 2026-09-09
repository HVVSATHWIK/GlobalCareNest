## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.
## 2025-02-14 - Dynamic ARIA labels for toggle buttons
**Learning:** For toggle switches (like dark/light theme buttons), using a static aria-label (e.g., "Toggle theme") provides poor context for screen reader users on what action will actually occur. Adding a static `title` attribute acts the same way.
**Action:** Use a dynamic `aria-label` and `title` attribute that describes the resulting action (e.g., 'Switch to dark theme' or 'Switch to light theme') based on the current state.
