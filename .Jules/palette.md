## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.
## 2024-07-07 - Theme Toggle Accessibility
**Learning:** Using dynamic `aria-label` and `title` attributes that describe the *resulting action* ("Switch to dark theme") is more helpful for state-toggling icon buttons than simply describing the *current state*. Additionally, inner SVG icons in buttons with `aria-label` should have `aria-hidden="true"` to prevent redundant screen reader announcements.
**Action:** Always verify that toggle buttons clearly communicate their outcome to screen readers and mouse hover users, and hide decorative inner elements from the accessibility tree.
