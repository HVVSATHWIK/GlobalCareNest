## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.
## 2024-05-17 - Form Label Accessibility

**Learning:** Found a pattern across the codebase where form labels were missing explicit `htmlFor` associations and required indicators, causing accessibility issues for screen reader users and missing visual cues.
**Action:** Always ensure explicit `htmlFor` mappings between `<label>` and form inputs (`id`), add visual required indicators (`<span className="text-red-500" aria-hidden="true">*</span>`) for fields with the `required` attribute, and add `focus-visible` states on interactive elements for keyboard navigation.
