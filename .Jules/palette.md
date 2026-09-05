## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.
## 2026-09-05 - Interactive Card Accessibility
**Learning:** Interactive components like ResourceCard and ExerciseCard lacked descriptive `aria-label` attributes on actionable elements ('Learn More' links opening in new tabs and 'Start Exercise' buttons). Decorative icons within these actions were visible to screen readers, causing redundant announcements. Additionally, keyboard navigation lacked clear visual focus states.
**Action:** Add descriptive `aria-label` attributes to complex actions, use `aria-hidden="true"` on decorative icons (like external link or play icons) inside interactive elements, and apply robust `focus-visible` styling (`ring-2`, `ring-offset-2`) for clear keyboard navigation cues.
