## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.
## 2024-06-26 - Custom File Upload Keyboard Accessibility
**Learning:** Using `display: none` (like Tailwind's `hidden`) on an `<input type="file">` removes it from the keyboard tab order entirely, breaking accessibility for custom-styled upload buttons.
**Action:** Use `sr-only` on the `<input type="file">` to hide it visually while keeping it in the tab order. Apply `focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#219B9D]` on the wrapping `<label>` to display a visible focus ring when the input receives keyboard focus. Also, add `aria-label` to the input and `aria-hidden="true"` to decorative icons.
