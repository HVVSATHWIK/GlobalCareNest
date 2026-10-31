## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.
## 2024-05-15 - File Input Accessibility
**Learning:** Using `display: none` (Tailwind's `hidden`) on a `<input type="file">` removes it from the accessibility tree and keyboard tab order.
**Action:** Always use `sr-only` on file inputs instead of `hidden`, add an `aria-label` and `focus-within` styling to its wrapping `<label>` element to provide a focus ring and semantic meaning for screen readers.
