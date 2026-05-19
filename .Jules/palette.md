## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.
## 2024-05-15 - Icon-only Theme Toggles
**Learning:** Icon-only buttons that dynamically switch states (like a light/dark mode toggle) are often unclear to screen reader users if they just have a generic label like "Toggle theme" and lack native tooltips for sighted users.
**Action:** Always provide a dynamic `aria-label` and `title` attribute reflecting the *action* that will occur (e.g., "Switch to light theme"), and ensure the decorative icons inside have `aria-hidden="true"` to prevent redundancy.
