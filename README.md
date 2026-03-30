  # ElearnMaker Studio

Interactive e-learning editor with a drag-and-drop canvas and plugin-ready architecture.

## Core Principles (V1)

- Never store HTML: slide data is stored as JSON Schema-like data.
- Absolute positioning: the canvas is `position: relative`, and every element is `position: absolute` with `top`/`left`.
- Modular architecture: each default element or third-party plugin is a standalone React component that receives data via props.

## Project Structure

- `src/store/` - Zustand store, split into:
  - `types.ts` - All element, slide, and state type definitions.
  - `utils.ts` - Helper functions (ID generation, snapshot, duplication).
  - `initialState.ts` - Default slides and elements for demo.
  - `editorStore.ts` - Store actions only (~230 lines).
- `src/constants/` - Shared constants (`previewDevices.ts`, `sidebarElements.ts`).
- `src/plugins/registry.tsx` - Central registry for canvas + properties panels.
- `src/components/elements/*` - Canvas renderers for each element type.
  - `quiz/` - Interactive quiz sub-components.
- `src/components/panels/*` - Right sidebar properties panels.
- `src/components/editor/*` - Editor layout, split into sub-folders:
  - `canvas/` - `SelectionTransformControls` (Moveable wrapper).
  - `preview/` - `PreviewHeader`, `PreviewViewport`.
  - `timeline/` - `SortableSlideCard`, `TimelineEventLog`.
  - `properties/` - `ColorPaletteCard`.

## Element Reference

See [ELEMENTS.md](ELEMENTS.md) for the full element model, props, and behavior notes.

## Slides and Events

The editor now uses a real slide model instead of a single shared canvas:

- Slides are stored in `src/store/editorStore.ts`.
- The timeline panel can create, duplicate, delete, and switch slides.
- Canvas and preview render only the active slide.
- Button actions can switch slides or emit editor events.

The timeline also shows a small system event log so runtime actions are visible in-editor.

## Visibility & Triggers

ElearnMaker supports advanced conditional visibility and trigger mechanisms without relying on loose string matching (Pub/Sub):
- **Element Identity**: Elements contain an optional `name` field acting as an author-facing Alias (e.g., "Hint Popup").
- **Hidden on Start**: A boolean flag (`hidden?: boolean`) that prevents the element from rendering upon slide load.
- **Button Targeting**: Buttons manage a precise list of target element IDs (`targetElementIds: string[]`). Buttons select `"show_element" | "hide_element" | "toggle_element"` and pass these IDs to the simulation environment.
- **Preview Execution**: The `PreviewOverlay` intercepts button events, maintains a temporary state of `elementVisibilityOverrides: Record<string, boolean>`, and evaluates if an element should dynamically mount or unmount.
- **Micro-Animations**: Because elements are fully stripped from the DOM when hidden, revealing them triggers a fresh mount sequence, naturally playing any configured tailwind Entrance Animations (Zoom, Slide-up, Fade). Inversely, hiding an element rips it from the DOM instantly without an exit sequence.

## Data Loop (Canva-like)

The right sidebar renders a properties panel by looking up the selected element type in the registry. When a panel updates data, Zustand updates state and the canvas re-renders immediately.
## Recent Updates (UI/UX & Features)

- **Enhanced Canvas Workflow**:
  - **Drag-and-Drop Creation**: Added native HTML5 drag-and-drop to pull elements from the sidebar directly onto precise canvas coordinates.
  - **Slide Customization**: Independent "Slide Properties" panel supporting dynamic Background Colors and tailwind-based Entrance Animations (Fade, Slide, Zoom) that work in both Editor and Preview.
  - **Expansive Workspace**: Removed horizontal constraints (`max-w-6xl`) and padding, allowing the 16:9 canvas to dynamically fill the entire available screen area.
  - **Static Timeline Layout**: The Studio timeline panel is now permanently anchored at the bottom (no toggle overlay), while the active canvas layout automatically reserves bottom padding to prevent overlap.
- **Canvas Scale Optimization**: Removed redundant Slide Title badge for a cleaner canvas.
- **Centered New Elements**: Elements spawn at the center of the canvas instead of the top-left.
- **Shortcuts & Focus Handling**:
  - Click empty canvas/properties space to deselect.
  - `Delete` / `Backspace` to remove selected elements.
- **Undo / Redo (Ctrl+Z / Ctrl+Y)**:
  - Snapshot-based history in Zustand with TopBar buttons.
  - Captures discrete steps (before drag/resize/rotate/edit).
- **Interactive Quiz Element**:
  - Students can click options and get instant correct/wrong feedback.
  - Teachers set the correct answer via a dropdown in Properties Panel.
  - Customizable retry button label (`retryLabel` prop).
## Recent Features & Improvements

### 1. Unified Coordinate System (960x540)
- **Shared Framework**: Both the Editor and Preview now operate on a standardized **960x540** logical grid. An element’s (X, Y) position in the Editor will map exactly to the same location in the Preview across all devices.
- **Absolute Centering**: Implemented a robust `translate(-50%, -50%)` centering logic for the Preview slide. This ensures perfect alignment regardless of the device's physical aspect ratio or scale.

### 2. Professional Editor Experience
- **Responsive Workspace**: The Editor Canvas dynamically zooms to fit your available screen space without altering the underlying logical coordinates.
- **Dot Grid Background**: Added a subtle, premium **Dot Grid** pattern to the workspace for better visual orientation and a state-of-the-art design feel (similar to Figma/Canva).
- **Z-Index Persistence**: Elements now preserve their stacking order via a stored `zIndex` property, fixing the issue where they would fall behind after being deselected.

### 3. UI/UX Optimization
- **"Contain" Scaling**: Preview windows now use `Math.min` scaling to preserve the 16:9 ratio, preventing content from being distorted or cut off by the device bezels.
- **Action Defaults**: Newly added buttons from the sidebar now default to `actionType: "none"`, preventing accidental navigation or triggers before they are configured.
- **Automatic Deselect**: Selection borders and transform controls are automatically hidden when opening the Preview for a clean "final product" view.

### 4. Technical Architecture
Significant refactoring was performed to keep files under the 150-line threshold:
- `src/components/editor/`
    - `CanvasArea.tsx` → `canvas/SelectionTransformControls.tsx`
    - `PreviewOverlay.tsx` → `preview/PreviewHeader.tsx` & `preview/PreviewViewport.tsx`
- `src/store/`
    - `editorStore.ts` → `types.ts`, `utils.ts`, `initialState.ts`
- `src/constants/`
    - Logic extracted into `sidebarElements.ts` and `previewDevices.ts`.

### 5. Manual Canvas Zoom
- **Interactive Controls**: Added a zoom selector in the TopBar for precise control (25% to 200%).
- **Auto-Fit Mode**: "Fit to screen" remains the default dynamic behavior for a responsive experience.
- **Scrollable Workspace**: When zoomed in beyond viewport limits, the canvas remains fully accessible via a scrollable container.
- **Shortcuts**: Hold `Ctrl` (or `Cmd`) while scrolling to zoom in/out instantly.
|
### 6. Audio Integration & Custom Player
- **Interactive Audio Element**: Teachers can now drag a new "Audio" element onto any slide from the Left Sidebar.
- **Multi-Category Sound Library**: Built-in library featuring 4 curated categories: **Nature**, **Music**, **Tech**, and **Classroom** effects, with instant one-click preview and selection.
- **Premium Custom UI**: Replaced native browser players with a bespoke, Shadcn-styled component in `src/components/ui/audio-player.tsx`.
- **Advanced Controls**:
    - **Precise Seeking**: Integrated Radix-based sliders for scrubbing through audio tracks.
    - **Dual Volume Control**: Teachers set a "Default Volume" (0-100%) in the properties panel, while students can interactively adjust volume via a hover-activated slider in the player.
    - **Animated Feedback**: A dynamic equalizer visualizer provides a "live" feel whenever audio is actively playing.
- **Mode Intelligence**: Transparently handles `autoplay`, `loop`, and `visibility` (e.g., hidden background music vs. visible narration clips).
|
### 7. Slide Timelock & Navigation Rules
- **Minimum Viewing Duration**: Added a per-slide "Timelock" setting (0-60s) in the Slide Properties panel.
- **Navigation Enforcement**: Students are prevented from using "Go to Slide" buttons until the lock duration expires.
- **Visual Feedback**:
    - **Countdown Toast**: Displays a premium locked message (e.g., `🔒 Bạn cần xem thêm 5s nữa`) when attempting to skip early.
    - **Progress Indicator**: A subtle, animated progress bar at the bottom of the slide frame tracks the lock status in real-time.
- **Real-time Animation Preview**: Selecting an animation in the Property Panel now triggers a live preview on the Canvas immediately, allowing for rapid design iteration without switching to Preview mode.
- **Logic Correction**: Standardized the `interactive` prop across the app (`true` for Design/Editor mode, `false` for Live/Player mode), fixing bugs where buttons or quizzes wouldn't trigger in Preview.

### 8. Media & Workflow Enhancements
- **Video Library Sync**: Improved the Media Library to correctly highlight uploaded video files when a Video element is selected on the canvas.
- **Simplified Timeline**: Removed redundant "Audio" tabs from the Timeline panel header to focus on slide sequencing and animations.
- **Direct Source Application**: Confirming that Video elements can now be instantly updated by selecting them and clicking the "Check" button on an uploaded asset in the Media Library.

---
*Last updated: March 30, 2026*

## Coding Rules & Standards

To ensure long-term maintainability, all code must follow these core principles:

1. **DRY (Don't Repeat Yourself)**: Avoid duplicated logic. If identical UI components appear twice or more, extract them into a shared, reusable standard component.
2. **File Split Rule (Max ~150 lines)**: 150 lines is the benchmark limit for a single file. Once a file starts crawling beyond ~150 lines, it's considered too long. **You must split it** by spinning off functional logic into custom hooks or breaking down JSX trees into smaller child components (`ComponentDialog`, `ComponentShell`, etc.). This keeps components focused, readable, and highly testable.
3. **Use Shadcn UI**: Always prioritize using the provided Shadcn UI components (e.g., `Label`, `Button`, `Input`, `Select`) for any new forms, inputs, or interactive UI elements instead of native HTML tags to maintain standard design language and consistency throughout the application.

# ElearnMaker Studio Docs

Choose a language folder:

- [Vietnamese docs](docs/vn/README.md)
- [English docs](docs/en/README.md)

For the full element reference and extension guide, open the matching language folder.

