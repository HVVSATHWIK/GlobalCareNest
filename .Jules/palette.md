## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.

## 2024-04-20 - Navigation & Theme Toggle Accessibility
**Learning:** Standard navigation icon buttons and theme toggles often lack crucial accessibility attributes like `aria-expanded` and specific labels (`Switch to light mode` vs generic `Toggle theme`), making their state unclear to screen reader users. Additionally, keyboard focus indicators are frequently missing on these elements.
**Action:** Always verify that toggle buttons have state-specific `aria-label`s, `aria-expanded` when controlling menus, and clear `focus-visible` styling.
