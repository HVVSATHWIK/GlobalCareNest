## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.
## 2026-06-24 - Dynamic ARIA and Title for ThemeToggle
**Learning:** The 'Toggle theme' aria-label doesn't clearly convey what happens when you press the button, especially for screen reader users or users relying on tooltips. It's better to describe the *resulting action* ('Switch to dark/light theme') based on the current state. Also, using 'focus-visible' is essential for keyboard accessibility without compromising mouse-click aesthetics.
**Action:** Use dynamic `aria-label` and `title` attributes on toggle buttons that indicate the future state. Ensure `focus-visible:ring-2` is applied to interactive elements.
