## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.
## 2026-05-10 - Prevent layout shift on MoodTracker save button
**Learning:** Using a permanently visible `disabled` button state instead of conditionally rendering it prevents layout shift and offers better discoverability for required form actions.
**Action:** Replace conditionally rendered `{isValid && <button>}` blocks with `<button disabled={!isValid}>` across all forms to improve layout stability and provide actionable tooltips.
