# ElearnMaker Studio

Interactive e-learning editor with a drag-and-drop canvas and plugin-ready architecture.

## Core Principles

- Never store HTML: slide data is stored as JSON-like structured data.
- Absolute positioning: the canvas is `position: relative`, and every element is `position: absolute` with `top`/`left`.
- Modular architecture: each default element or third-party plugin is a standalone React component that receives data via props.

## Project Structure

- `src/store/editorStore.ts` - Zustand state, slide model, and element types.
- `src/plugins/registry.tsx` - Central registry for canvas + properties panels.
- `src/components/elements/*` - Canvas renderers for each element type.
- `src/components/panels/*` - Right sidebar properties panels.
- `src/components/editor/*` - Editor layout, canvas, toolbars, timeline, preview.

## Reference Docs

- [ELEMENTS.md](ELEMENTS.md) - full element model, props, and runtime behavior.
- [EXTENDING-ELEMENTS.md](EXTENDING-ELEMENTS.md) - step-by-step guide to add a new element.

## Slides and Events

The editor now uses a real slide model instead of a single shared canvas:

- Slides live in `src/store/editorStore.ts`.
- The timeline can create, duplicate, delete, and switch slides.
- The timeline also lets you move slides up or down.
- Canvas and preview render only the active slide.
- Button actions can switch slides or emit internal editor events.

The timeline also includes a small system event log so runtime behavior is visible inside the editor.

## Canva-like Data Loop

The right sidebar renders a properties panel by looking up the selected element type in the registry. When a panel updates data, Zustand updates state and the canvas re-renders immediately.

```tsx
const { selectedId, elements, updateElement } = useEditorStore();
const selected = elements.find((el) => el.id === selectedId);

if (!selected) {
	return <div>Please select an element on the canvas to edit it.</div>;
}

const Panel = pluginRegistry[selected.type].propertiesPanel;

return <Panel element={selected} updateElement={updateElement} />;
```

Why it scales:

- No if-else chain for each element type.
- New plugins only add one entry in the registry.
- Realtime editing comes from a single source of truth (Zustand).

## Button Actions

Button elements support three action modes:

- `none`: visual button only.
- `go_to_slide`: jump to another slide by `targetSlideId`.
- `trigger`: emit an internal editor event.

Use `trigger` for interactions such as hints, modal opens, audio cues, or custom runtime logic.

## Recent Updates & Features

### 1. Slide Timelock & Navigation Rules
- **Minimum Viewing Duration**: Added a per-slide "Timelock" setting (0-60s) in the Slide Properties panel.
- **Navigation Enforcement**: Students are prevented from using "Go to Slide" buttons until the lock duration expires.
- **Visual Feedback**:
    - **Countdown Toast**: Displays a premium locked message (e.g., `🔒 Please watch for X more seconds`) when attempting to skip early.
    - **Progress Indicator**: A subtle, animated progress bar at the bottom of the slide frame tracks the lock status in real-time.
- **Logic Correction**: Standardized the `interactive` prop across the app (`true` for Design/Editor mode, `false` for Live/Player mode), fixing bugs where buttons or quizzes wouldn't trigger in Preview.

### 2. Element Entrance Animations
- **Diverse Effects**: Support for Fade In, Zoom In, Slide Up/Down/Left/Right, and Bounce effects.
- **Real-time Preview**: Selecting an animation in the Property Panel now triggers a live preview on the Canvas immediately, allowing for rapid design iteration without switching to Preview mode.
- **Smart Triggering**: Animations automatically play when a slide loads or when a hidden element is revealed via a button trigger.

### 3. Media & Workflow Enhancements
- **Video Library Sync**: Improved the Media Library to correctly highlight uploaded video files when a Video element is selected on the canvas.
- **Simplified Timeline**: Removed redundant "Audio" tabs from the Timeline panel header to focus on slide sequencing and animations.
- **Direct Source Application**: Video elements can now be instantly updated by selecting them and clicking the "Check" button on an uploaded asset in the Media Library.

## Development

```bash
npm run dev
```

Open `http://localhost:3000` and start editing `src/app/page.tsx`.
