## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.
## 2024-05-18 - Async Action Feedback Pattern
**Learning:** Components handling async actions (like the MoodTracker save) lacked visual feedback during processing or success states, which can lead to user confusion or double submissions.
**Action:** Always provide interaction feedback (e.g., disabled states, loading spinners, success icons) on async operations. Ensure these visual state changes are announced to screen readers by wrapping the dynamic content region in `aria-live="polite"`. Use props to allow the parent to handle the async logic properly rather than mocking internal state.
