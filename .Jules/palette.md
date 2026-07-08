## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.
## 2024-11-20 - ThemeToggle Accessibility Enhancements
**Learning:** For state-toggling icon buttons, static ARIA labels like "Toggle theme" don't clearly convey what the *next* state will be. Hiding the internal SVG icons from screen readers is essential to prevent redundant or confusing screen reader announcements when the button itself already provides a descriptive `aria-label`.
**Action:** When implementing toggle buttons, ensure `aria-label` dynamically describes the *action* that will occur (e.g., 'Switch to dark theme') and hide internal decorative icons with `aria-hidden="true"`.
