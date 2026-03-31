# Studio System Architecture

This document explains the technical underpinnings of the Editor, from project structure to the core data loop.

## 1. Core Principles (V1)

- **HTML-Free Storage**: All slide data is stored as JSON Schema. This ensures maximum portability and future-proofing.
- **Absolute Positioning**: The canvas is `position: relative`, and every element is `position: absolute`. Coordinates (`x`, `y`, `width`, `height`) are strictly managed by the store.
- **Plugin Architecture**: Each element type (text, image, quiz, shapes, etc.) is a standalone React component, registered in `pluginRegistry.tsx`.
- **Alpha-First Styling**: All color properties support 8-digit Hex (`#RRGGBBAA`) to enable modern semi-transparent UI designs.

## 2. Project Structure

- `src/store/`: State management via Zustand (Sliced Pattern).
    - `types.ts`: **Barrel File** for all project definitions.
    - `types/`: Modularized type system (elements, slides, assets, editor, history, events).
    - `utils.ts`: Helper functions (ID generation, snapshots, duplication).
    - `initialState.ts`: Default demo data.
    - `slices/`: Specialized store logic (UI, Slide, Element, History, Asset, Event).
    - `editorStore.ts`: Combined store utilizing all modular slices.
- `src/constants/`: Shared constants (Preview devices, Sidebar configuration).
- `src/plugins/registry.tsx`: Central hub for registering Canvas renderers and Properties Panels.
- `src/components/elements/`: Canvas-side element components.
- `src/components/panels/`: Property editing panels. Leverages the **PropertyCard** architecture to group settings logically (e.g., Content, Appearance, Logic).
- `src/components/viewer/`: Professional lesson viewer (StandaloneViewer). Implements the **Scale Wrapper** technique for 16:9 ratio preservation on all screens.
- `src/hooks/`: Custom hooks for project persistence, UI interactions, and keyboard shortcuts.

## 3. UI/UX Property Standardization

To ensure a seamless developer experience when adding new elements, all property panels must:
- Use `PropertyCard` as the primary grouping container.
- Segregate properties into: **Content**, **Appearance**, and **Actions/Logic**.
- Maintain UI consistency by using shared components from `@/components/ui/*` (Input, Slider, Switch, ColorPicker).

## 4. Responsive Viewer Technology (Scale Wrapper)

The Viewer is engineered to render 16:9 content (960x540) perfectly on any device:
- **Calculation**: Uses `window.innerWidth/innerHeight` to calculate `scale = min(scaleX, scaleY) * 0.95`. A 5% safety buffer prevents clipping on mobile browser UI (notches, toolbars).
- **Wrapper Dimension**: An outer wrapper div precisely matches the scaled dimensions (`width * scale`), allowing standard Flexbox centering (`justify-center`, `items-center`) to work flawlessly.
- **Dynamic Viewport (`dvh`)**: Utilizes `h-[100dvh]` to handle instantaneous height changes when mobile browser address bars toggle visibility.

## 5. Layering & History

- **Layering**: Managed via the `zIndex` property. New elements receive `max(zIndex) + 1`.
- **Undo/Redo**: The Sliced Store automatically captures state snapshots upon interaction completion (e.g., `onMouseUp` or `onChange`).

---
*Last updated: March 31, 2026 (UI Standardization & Responsive Viewer)*
