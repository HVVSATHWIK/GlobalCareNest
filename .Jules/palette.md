## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.
## 2026-06-02 - Dynamic ARIA Labels for Stateful Icon Buttons
**Learning:** Static ARIA labels (e.g., 'Toggle theme') on icon-only stateful buttons don't communicate the *result* of the action to screen reader users. Additionally, mouse users lack context without tooltips.
**Action:** Always use dynamic `aria-label` and `title` attributes on stateful icon-only buttons (like Theme Toggles) to clearly state the *next* state (e.g., 'Switch to light mode' vs 'Switch to dark mode'), and ensure they have visible focus rings.
