## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.
## 2024-10-29 - State-Toggling Icon Buttons Accessibility
**Learning:** Icon-only buttons that toggle states (like a theme switcher) cause redundant announcements if both the static `aria-label` and the inner SVG text are read. Furthermore, a changing `aria-label` (e.g. from "Switch to Light Mode" to "Switch to Dark Mode") can be confusing.
**Action:** Use a static `aria-label` (e.g., "Dark mode") along with `aria-pressed={state}` to convey the active state cleanly to screen readers. Add `aria-hidden="true"` to the inner SVG icons to prevent redundant noise, and always provide clear visual focus indicators like `focus-visible:ring-2`.
