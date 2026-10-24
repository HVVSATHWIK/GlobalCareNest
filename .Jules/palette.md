## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.

## 2026-10-24 - Dynamic Theme Toggle ARIA State
**Learning:** When a toggle button changes global states like themes, dynamic `aria-label` values (e.g., changing from 'Light mode' to 'Dark mode') can cause redundant announcements. Additionally, programmatic `.focus()` in Playwright does not reliably trigger `:focus-visible` without simulated tab navigation.
**Action:** Use a static `aria-label` describing the feature combined with `aria-pressed={state}` for clear screen reader feedback. Always use `page.keyboard.press('Tab')` in Playwright tests to verify `:focus-visible` styling.
