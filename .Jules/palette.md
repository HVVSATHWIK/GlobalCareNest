## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.
## 2024-05-21 - Disabled Button Context
**Learning:** Conditionally rendered action buttons can feel confusing as users may not realize an action is available until specific criteria are met. Replacing a hidden button with a persistently visible, disabled button that includes a tooltip (`title` attribute) explaining why it is disabled improves discoverability and sets clear expectations.
**Action:** Always prefer persistently visible, disabled buttons with descriptive `title` attributes over conditionally hiding primary action buttons when form criteria are unmet.
