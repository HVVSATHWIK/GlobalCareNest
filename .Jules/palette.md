## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.
## 2024-06-07 - Providing Visual Feedback on Save Actions
**Learning:** Adding visual feedback (like a changing icon and text, e.g., "Saving..." to "Saved!") to buttons during async operations significantly improves user confidence and prevents duplicate submissions.
**Action:** Always implement intermediate ("Saving...") and success ("Saved!") states on form submission buttons, disabling them during the process and shortly after to provide clear, accessible feedback.
