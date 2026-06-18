## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.
## 2025-02-18 - Dynamic ARIA Labels for State Toggles
**Learning:** Static `aria-label` attributes on state-toggling icon buttons (like theme switches) fail to communicate the *resulting* action to screen readers. For example, 'Toggle theme' is less helpful than 'Switch to dark theme'. Additionally, relying solely on Playwright's `.focus()` might not trigger `:focus-visible` styles reliably during automated visual verification; simulating tab keypresses is necessary.
**Action:** When creating icon-only toggle buttons, use a dynamic `aria-label` (and `title` for mouse hover tooltips) that describes the action the user will take, not the current state. During UI verification of focus states, use `page.keyboard.press('Tab')` instead of programmatic focus to reliably trigger and capture `:focus-visible` CSS.
