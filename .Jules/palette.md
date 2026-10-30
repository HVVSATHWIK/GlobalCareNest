## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.
## 2024-10-30 - Custom File Upload Button Accessibility
**Learning:** Using `display: none` (like Tailwind's `hidden`) on a `<input type="file">` to create a custom styled upload button removes the element from the accessibility tree, making it entirely inaccessible to keyboard users as they cannot tab to it or activate it.
**Action:** Always use `sr-only` to visually hide the file input while keeping it accessible. Add `focus-within` styling classes to the visible wrapper element (usually a `<label>`) so that when the hidden input receives keyboard focus, the wrapper displays a clear visual focus indicator.
