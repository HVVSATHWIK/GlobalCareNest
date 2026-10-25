## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.
## 2023-10-25 - Icon-only Toggle Button Accessibility
**Learning:** Icon-only state toggle buttons (like theme switches) need specific ARIA configurations to be fully accessible. If the button has an `aria-label` (e.g., "Dark mode"), the SVG icons inside should use `aria-hidden="true"` to prevent redundant screen reader announcements (e.g., "Dark mode, Moon"). Additionally, `aria-pressed={state}` is essential for toggles to clearly communicate their current active state.
**Action:** When implementing icon-only toggle switches, always use a combination of a static descriptive `aria-label` on the button, `aria-pressed` to indicate state, and `aria-hidden="true"` on the enclosed icons.
