## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.
## 2024-05-18 - Missing Focus Styles on Global Navigation Controls
**Learning:** Icon-only and secondary buttons (like Theme Toggle, Sign In, Sign Up) located in global navigation areas frequently lack keyboard focus indicators (`focus-visible:ring`), making them untab-able for keyboard users.
**Action:** Always ensure that global interactive elements receive `focus-visible:ring-2 focus-visible:ring-offset-2` alongside standard hover styles. Icon-only buttons should also include `title` tooltips for mouse users and `aria-label` for screen reader users.
