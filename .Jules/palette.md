## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.
## 2024-05-08 - Mood Tracker Submission Feedback
**Learning:** Interactive components that accept user input but lack a clear success state can leave users uncertain if their action was successful. In `MoodTracker`, adding a brief visual transition (check mark, green background) followed by resetting the selection confirms the action while keeping the interface clean for future interactions.
**Action:** Always include temporary visual feedback and state reset mechanisms for non-navigating form submissions or generic action buttons to confirm success without requiring a page reload or separate toast notification.
