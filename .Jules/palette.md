## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.
## 2024-05-15 - State-Toggling Icon Button Accessibility
**Learning:** For buttons that toggle state without text labels (e.g., Theme Toggle), a static `aria-label` like "Toggle theme" is less informative than describing the *resulting action*. Additionally, focus styles must be prominent, and decorative SVG elements need `aria-hidden="true"`.
**Action:** Use dynamic `aria-label` and `title` attributes that reflect the *action* (e.g., "Switch to dark theme" instead of "Toggle theme") based on current state. Add `aria-hidden="true"` to inner SVG icons and apply clear `:focus-visible` ring styles.
