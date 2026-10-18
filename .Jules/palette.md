## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.
## 2024-05-15 - ThemeToggle Accessibility
**Learning:** Icon-only toggle buttons used for switching global states (like light/dark mode) often lack semantic state indicators and redundant icon announcements.
**Action:** Use `aria-pressed` to indicate the current state instead of dynamic `aria-label`s. Set a static `aria-label` (e.g., "Dark Mode") and hide purely visual icons with `aria-hidden="true"`. Ensure keyboard focus styles (`focus-visible`) are consistently applied to the interactive toggle element.
