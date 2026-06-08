## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.
## 2026-06-08 - Added Async Feedback to Mood Tracker Save
**Learning:** For actions like saving a mood log which don't navigate away, lacking immediate visual feedback leaves users unsure if their click worked, leading to potential duplicate submissions or abandonment. Using a simulated delay for UI feedback on frontend-only environments is a robust way to demonstrate this interaction pattern.
**Action:** Always provide minimum 3 states for async actions: Default, Loading (disabled + spinner), and Success (disabled + checkmark) before resetting to Default.
