## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.
## 2026-06-03 - Focus Ring Color
**Learning:** When adding focus rings, it's better practice to use existing semantic design tokens (e.g., `ring-teal-500`) rather than hardcoding arbitrary hex values (e.g., `ring-[#219B9D]`) to strictly adhere to design constraints and maintain consistency.
**Action:** Always check existing components for standard token usage before introducing raw hex values for focus rings.
