# Core Features of the Studio

This document highlights the key features and provides guidance on how to leverage them effectively.


## 1. On-Canvas Inline Editing
Double-click any `Text` or `Card` element to begin editing text directly on the canvas.
- **Card Element**: Supports concurrent editing of both Title and Body.
- **Shortcut**: Use the `Escape` key to save and exit edit mode.

## 2. Creative Shapes
Easily add basic geometric shapes to your slide from the left toolbar:
- **Rectangle & Circle**: Full support for background (Fill) and border (Stroke) customization.
- **Line**: Adjustable thickness and color, rotation-ready.
- **Corner Radius**: Precise control over rectangle corners for a modern look.

## 3. Interactive Components
- **Quiz Element**: Create multiple-choice questions. Students receive real-time feedback (Correct/Wrong) upon clicking an option.
- **Audio Element**: High-end playback control. Support for hidden background playback to create professional listening comprehension scenarios.
- **Essay & Quiz (UX)**: Refined layout with fixed headers and footers. Scrollbars appear only within the input/content area, keeping titles and submit buttons always in view.

## 4. Presentation & Flow Control
- **Slide Timelock**: Set a minimum viewing time (0-60s) for each slide before navigation is allowed.
- **Alpha Transparency**: Full support for 8-digit Hex colors (`#RRGGBBAA`). Use the opacity slider in the Color Picker to create semi-transparent backgrounds and overlays.
- **Micro-Animations**: Smooth transitions (Fade, Slide, Zoom, Bounce) to bring your slides and elements to life.

## 5. Project Persistence & Management
- **Export & Import**: Save your entire project as a local `.json` file and import it anytime to resume editing.
- **Save & History Reset**: Use the **Save** button to commit your changes as a new baseline, which clears the undo/redo buffer to maintain peak performance.
- **Slide Renaming**: Double-click any slide title in the **Timeline** or click the slide name in the **TopBar** to rename it instantly.
- **Status Indicators**: Real-time Badge showing **Saved** (Green) or **Draft** (Gray) status based on your latest edits.

## 6. Efficiency Shortcuts
- `Ctrl + S`: Save project and clear editing history.
- `Ctrl + Z` / `Ctrl + Y`: Undo and Redo operations.
- `Delete` / `Backspace`: Quickly remove selected elements.
- `Ctrl + Scroll`: Zoom in/out of the workspace.

## 7. Sequential Interaction Flow

Instead of overwhelming students with all content at once, the Studio supports a professional pedagogical flow:
- **Hidden by Default**: Navigation buttons or activities can be hidden when the slide starts.
- **Unlockable Content**: Next steps or subsequent quiz questions only reveal once the student completes the current game or task.

## 8. Background Audio & Scripting

- **Audio Trigger**: Audio elements can be configured to "trigger" (reveal) other elements, such as showing a hidden quiz immediately after the playback ends.
- **Persistence Logic**: Clever CSS-based hiding allows background audio to play seamlessly even if the control interface is hidden from the user.

---
*Last updated: April 1, 2026 (Sequential Flow & Audio Interaction)*
