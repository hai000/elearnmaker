# Studio System Architecture

This document explains the technical underpinnings of the Editor, from project structure to the core data loop.

## 1. Core Principles (V1)

- **HTML-Free Storage**: All slide data is stored as JSON Schema. This ensures maximum portability and future-proofing.
- **Absolute Positioning**: The canvas is `position: relative`, and every element is `position: absolute`. Coordinates (`x`, `y`, `width`, `height`) are strictly managed by the store.
- **Plugin Architecture**: Each element type (text, image, quiz, shapes, etc.) is a standalone React component, registered in `pluginRegistry.tsx`.

## 2. Project Structure

- `src/store/`: State management via Zustand.
    - `types.ts`: Core data definitions (Slide, Element, State).
    - `utils.ts`: Helper functions (ID generation, snapshots, duplication).
    - `initialState.ts`: Default demo data.
    - `editorStore.ts`: Action definitions for state mutation.
- `src/constants/`: Shared constants (Preview devices, Sidebar configuration).
- `src/plugins/registry.tsx`: Central hub for registering Canvas renderers and Properties Panels.
- `src/components/elements/`: Canvas-side element components.
- `src/components/panels/`: Right-sidebar property editors.
- `src/components/editor/`: Core editor UI components.

## 3. Layering Management (Z-Index)

The system utilizes a `zIndex` property in the store to handle element stacking.
New elements are automatically assigned a value of `max(current_zIndex) + 1` to ensure they always appear on the top layer upon creation.


---
*Last updated: March 31, 2026*
