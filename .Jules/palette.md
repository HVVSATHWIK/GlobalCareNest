## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.
## 2024-06-10 - Triggering focus-visible in Playwright
**Learning:** Programmatic `.focus()` in Playwright often does not trigger `:focus-visible` styling, because browsers use heuristics (like detecting recent keyboard activity) to determine if a focus ring should be shown.
**Action:** When writing Playwright scripts to visually verify `:focus-visible` changes, always simulate keyboard navigation (e.g., `element.focus()`, then `page.keyboard.press('Tab')` and `page.keyboard.press('Shift+Tab')`) to ensure the focus ring renders correctly for screenshots.
