## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.
## 2026-04-29 - Mobile Menu Toggle Accessibility
**Learning:** Main navigation toggle buttons that are icon-only need clear state management and labels for screen reader users, since the visual icon change (hamburger to X) isn't inherently announced.
**Action:** Add `aria-expanded={isOpen}` and dynamic `aria-label={isOpen ? "Close main menu" : "Open main menu"}` to navigation toggles. Apply `aria-hidden="true"` to the internal icons to prevent redundant screen reader announcements.
