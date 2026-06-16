## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.
## 2026-06-16 - Link Context for Screen Readers
**Learning:** Ambiguous link text like 'Learn More' is difficult for screen reader users to understand when navigating out of context. Adding descriptive `aria-label` helps provide context.
**Action:** Use `aria-label` on links with generic text (like 'Read More' or 'Learn More') to describe the destination, and hide decorative trailing icons using `aria-hidden='true'`.
