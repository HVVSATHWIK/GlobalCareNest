## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.

## 2024-05-24 - ARIA Expanded for Toggle Buttons
**Learning:** Icon-only toggle buttons (like mobile menu toggles) need both an `aria-label` to identify their function and an `aria-expanded` state to inform screen readers of their current state (open/closed).
**Action:** Always include `aria-expanded={isOpen}` and a dynamic `aria-label` (e.g. `isOpen ? Close menu : Open menu`) for toggle buttons.
