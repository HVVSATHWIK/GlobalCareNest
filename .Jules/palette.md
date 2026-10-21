## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.

## 2025-02-12 - Accessible Theme Toggle
**Learning:** For state-toggling icon buttons (like theme switches), a static `aria-label` combined with `aria-pressed` communicates the state more clearly to screen readers than dynamically changing the `aria-label`. Using `aria-hidden="true"` on the internal icons is also crucial to prevent redundant announcements. Explicit focus rings should be defined using `focus-visible` with corresponding offset colors to ensure keyboard navigability and visual clarity.
**Action:** When implementing or updating toggle buttons (e.g. for themes or settings), use a static `aria-label` (e.g. "Dark Mode" instead of "Toggle theme"), manage the state through `aria-pressed`, hide inner icon elements from screen readers, and provide explicit focus visible ring styles.
