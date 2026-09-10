## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.
## 2026-09-10 - Pre-existing Typecheck Errors
**Learning:** Encountered pre-existing `three-stdlib` missing module error in `pnpm typecheck` for `src/components/Three/AslSignClipPlayer.tsx`. Due to strict rules avoiding new dependencies for UX fixes, this error is left untouched.
**Action:** Do not attempt to fix pre-existing typecheck errors by installing dependencies if they violate the project's strict UX dependency rules.
