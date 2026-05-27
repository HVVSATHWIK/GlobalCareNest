## 2024-04-11 - Form Accessibility Patterns
**Learning:** In the Auth modals, inputs were lacking explicit association with labels, required fields didn't visually indicate necessity, and decorative icons needed aria-hidden to prevent screen reader noise. Icon-only buttons (like modal close buttons) need clear aria-labels.
**Action:** Always link labels to inputs using htmlFor and id, append visually distinct required markers (like asterisks), and hide purely decorative SVG icons from assistive technology using aria-hidden='true'.
## 2024-04-24 - Interactive Component Grouping
**Learning:** Groups of interactive buttons (like mood or time selectors) lack clear association for screen readers without proper grouping.
**Action:** Use `role="group"` and `aria-labelledby` on parent containers to associate a descriptive question/label with a set of related buttons. Add `aria-pressed` to indicate active selection.
## 2024-05-27 - Generic Card Link A11y

**Learning:** Repeated generic links like "Learn More" or "Start Exercise" within mapped components like `ResourceCard` or `ExerciseCard` create a poor screen reader experience because users navigating by links only hear "Learn More, Learn More". Additionally, keyboard focus was unclear without `focus-visible` states.
**Action:** Always interpolate titles/names into `aria-label`s for generic card action buttons/links (e.g., `aria-label={"Learn more about " + title}`). Always add `focus-visible:ring-2` to interactive elements and add `aria-hidden="true"` to decorative icons within buttons.
