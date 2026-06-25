## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.
## 2024-06-25 - Dynamic ARIA labels for toggle buttons
**Learning:** Using a dynamic `aria-label` and `title` that describes the *resulting* action (e.g., "Switch to light theme") is much clearer for screen readers and tooltips than describing the current state. Also, explicit `focus-visible` styles with sufficient offset ensure keyboard navigation is visibly apparent across both light and dark backgrounds.
**Action:** Always implement dynamic labels for state-toggling icon buttons and ensure focus rings have proper contrast offsets in both color schemes.
