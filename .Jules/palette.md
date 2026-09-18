## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.
## 2026-09-18 - State-toggling Icon Button Accessibility
**Learning:** When dealing with state-toggling icon buttons like a theme switch, screen readers need to know the *action* that will occur, rather than just what the current state is, and icons themselves can be redundant and should be hidden from screen readers. Dynamic ARIA labels and titles solve this issue elegantly.
**Action:** Use dynamic `aria-label` and `title` describing the resulting state (e.g., 'Switch to light theme' instead of just 'Toggle theme') and apply `aria-hidden="true"` to the actual icon SVG/components.
