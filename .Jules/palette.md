## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.
## 2024-06-22 - Custom File Upload Button Accessibility
**Learning:** For custom file upload buttons, avoiding `display: none` (e.g., Tailwind's `hidden`) on the `<input type="file">` is crucial because it removes the element from the keyboard tab order and breaks accessibility.
**Action:** Use `sr-only` to keep the input visually hidden but accessible, and add `focus-within` styling to the visible wrapping parent (like a `<label>`) to provide a focus ring for keyboard users.
