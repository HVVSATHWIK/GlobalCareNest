## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.
## 2024-05-07 - Navbar Action Buttons Keyboard Accessibility
**Learning:** Navbar action buttons like Theme toggles and Auth links often lack proper keyboard focus indicators, making navigation difficult for users reliant on keyboards. They also need contextual hover/focus styling (e.g., matching the theme colors depending on light vs. dark mode and matching the navbar background).
**Action:** Ensure all interactive elements, especially in core navigation layouts, receive explicit `focus-visible` ring styles that contrast appropriately with both their regular background and dark mode variants, and make sure icon-only buttons include descriptive `aria-label`s.
