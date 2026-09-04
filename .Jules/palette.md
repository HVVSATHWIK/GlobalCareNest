## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.
## 2024-05-15 - State-Toggling Icon Buttons
**Learning:** For state-toggling icon buttons (like a dark/light theme switch), a static `aria-label` like "Toggle theme" is less informative than describing the *resulting action* (e.g., "Switch to dark theme"). Additionally, these buttons should have an `aria-hidden` property on their inner icons to prevent screen readers from reading out both the icon representation and the `aria-label`. Focus-visible styles are crucial here since these buttons are frequently used by keyboard navigators.
**Action:** Use a dynamic `aria-label` and `title` for state-toggling buttons that describes the action being taken. Always apply `aria-hidden="true"` to decorative icons within these buttons, and apply `focus-visible` styles with sufficient offset so the ring isn't clipped by rounded borders.
