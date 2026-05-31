## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.

## 2026-05-31 - Explicit Label Association for Inputs
**Learning:** Found instances where `<label>` elements were placed before inputs/textareas but lacked explicit `htmlFor` and `id` attributes. This prevents screen readers from announcing the label when the input is focused and prevents users from clicking the label to focus the input.
**Action:** Always link `<label>` to `<input>`, `<textarea>`, or `<select>` using `htmlFor` on the label and matching `id` on the form control.
