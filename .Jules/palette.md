## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.
## 2026-06-09 - Accessible Custom File Uploads
**Learning:** Using `className="hidden"` on a file input completely removes it from the keyboard tab order and accessibility tree, making custom styled upload buttons inaccessible to keyboard and screen reader users.
**Action:** Use Tailwind's `sr-only` to keep the input accessible, provide an `aria-label`, and add `focus-within` utility classes to the visible wrapper (like the `<label>`) to show a focus ring when the invisible input receives focus.
