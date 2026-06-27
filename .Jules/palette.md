## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.

## 2024-06-27 - Dynamic Attributes for Toggle Buttons
**Learning:** Icon-only toggle buttons (like Theme Switches) often use a static aria-label (e.g., "Toggle Theme"), which doesn't inform screen reader users of the *result* of their action. A static title attribute also fails to provide helpful tooltips.
**Action:** When creating state-toggling icon buttons, use a dynamic `aria-label` and `title` attribute that explicitly describes the resulting action based on the current state (e.g., 'Switch to dark mode' / 'Switch to light mode'). This improves both accessibility and usability (via tooltips) for mouse users.
