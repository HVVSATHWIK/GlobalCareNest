## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.
## 2024-05-18 - State-Toggling Icon Button Accessibility
**Learning:** For single-button state toggles (like a theme switcher that switches between light and dark modes), screen reader users benefit from knowing the *resulting* action of pressing the button rather than the current state, as standard toggle behavior is not natively supported on simple buttons. Also, changing icons within these buttons can be read redundantly if not hidden.
**Action:** Use a dynamic `aria-label` (and optionally a `title` for mouse users) that describes the action (e.g., "Switch to dark theme"). Add `aria-hidden="true"` to the inner SVG elements to reduce screen reader noise. Ensure proper `focus-visible` styles are included for keyboard accessibility.
