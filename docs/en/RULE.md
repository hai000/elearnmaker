# Studio - Coding Rules & Standards


To ensure long-term maintainability, scalability, and code quality, all contributors must strictly adhere to these core principles.

## 1. DRY (Don't Repeat Yourself)
Avoid duplicated logic at all costs.
- If identical UI patterns appear in two or more places, extract them into a shared, reusable component in `src/components/ui/` or a specialized sub-folder.
- Shared business logic or calculations should reside in `src/store/utils.ts` or a custom hook.

## 2. File Split Rule (Max ~150 lines)
Small, focused files are easier to read, test, and debug.
- **Limit**: 150 lines is the benchmark. Once a file exceeds this, it is considered a candidate for refactoring.
- **Action**: Extract functional logic into custom hooks (e.g., `useCanvasInteraction`, `useTextEdit`).
- **Decomposition**: Break down large JSX trees into logical child components (e.g., `SlideProperties`, `ElementActions`, `ThumbnailItem`).

## 3. Technology & UI Standards
- **Component Priority**: Always prioritize using **Shadcn UI** components (located in `src/components/ui/`) for inputs, buttons, and layout structures.
- **Type Safety**: Maintain strict TypeScript definitions in `src/store/types.ts`. Avoid using `any`.
- **Styling**: Use **Tailwind CSS** for layout and **Vanilla CSS** (via inline styles or index.css) only when precise coordinate calculations or dynamic HSL values are required.

## 4. Architecture Rules
- **State Management**: All cross-component state belongs in the **Zustand** store (`src/store/editorStore.ts`).
- **Absolute Positioning**: Every canvas element must use `position: absolute` with coordinate data (x, y, width, height) managed by the store.
- **Pure Rendering**: Canvas elements should be "dumb" renderers that receive their state via props or selectors. Logic for updating the state should be centralized in the store actions.

## 5. Documentation Maintenance
To ensure the guide/instructions never fall behind the actual implementation:
- **Mandatory Update**: Every time a new feature is completed (New Element, logic change) or UI/UX improvements are made, the corresponding documentation in the root [**README.md**](../../README.md) or specialized files like [**FEATURES.md**](FEATURES.md) must be updated.
- **Timestamping**: Always update the "Last updated" date at the bottom of the documentation files after each modification.

---
*Last updated: March 31, 2026*
