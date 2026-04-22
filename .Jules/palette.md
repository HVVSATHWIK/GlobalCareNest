## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-11-20 - Dynamic ARIA Labels for Mobile Menus
**Learning:** For mobile menu toggles (hamburger menus), it's not enough to just add `aria-label`. The state of the menu must be communicated to screen readers. If it lacks `aria-expanded` and an `aria-controls` relationship, users won't know if the menu opened or closed.
**Action:** When creating or fixing togglable icon-only buttons (like mobile menus), always include `aria-expanded={isOpen}`, `aria-controls="[menu-id]"`, and a dynamic `aria-label` (e.g., "Open menu" vs "Close menu").
