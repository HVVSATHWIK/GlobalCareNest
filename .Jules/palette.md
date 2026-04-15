## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.

## 2026-04-15 - Interactive State Accessibility
**Learning:** Interactive elements that control the visibility of other content (like the mobile menu toggle) were missing the `aria-expanded` attribute, leaving screen reader users unaware of the menu's state. Furthermore, they lacked focus indicators for keyboard navigation.
**Action:** Always ensure that interactive UI elements toggling visibility include the `aria-expanded` attribute, dynamically updated based on state. Provide explicit `focus-visible` styles for keyboard users.
