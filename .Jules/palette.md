## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.

## 2024-05-16 - Accessible "Show Password" Toggle on Authentication Modals
**Learning:** Adding a show/hide password toggle to password inputs is a critical UX and accessibility enhancement. Users often struggle typing long passwords on mobile or with screen readers. Utilizing an icon-only button inside the input wrapper requires careful consideration: using ARIA labels (e.g., "Show password") correctly updates the button state and providing `focus-visible` ensures keyboard navigators can tab and trigger the toggle effectively.
**Action:** When creating password input fields, always include a toggle button using the `Eye`/`EyeOff` pattern, ensure it provides an accurate `aria-label` based on its active state, and use semantic `<button type="button">` to prevent accidental form submission while ensuring keyboard accessibility.
