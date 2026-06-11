## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.
## 2024-05-15 - Interaction Feedback Pattern
**Learning:** The "Save Entry" button on the `MoodTracker` component lacked visual feedback, potentially leading to uncertainty or duplicate submissions by users wondering if their entry was saved.
**Action:** Implemented a simulated success state. When a user clicks a submission button, disable it temporarily and change the state (e.g., text to "Saved!" with a checkmark icon with `aria-hidden="true"`) to provide immediate and clear interaction feedback.
