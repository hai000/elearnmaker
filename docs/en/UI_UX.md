# Design Philosophy and User Experience (UI/UX)

This document explains the design decisions that make the Editor a modern and professional learning tool.


## 1. Visual Hierarchy and Consistency

- **Colors**: Modern HSL-based palettes, prioritizing Slate and Blue for a clean feel that reduces eye strain.
- **Typography**: Optimized for readability using Google Fonts (Inter, Roboto) for sharp rendering on all devices.
- **Dot Grid Workspace**: Premium Dot Grid pattern in the background for precise visual alignment (similar to design tools like Figma or Canva).

## 2. Intelligent Canvas Interaction

- **Automated Zoom**: "Contain" scaling keeps your slide perfectly centered and zoomed-to-fit without altering the 960x540 logical coordinate system.
- **Precision Controls**: Smooth rotation, scaling, and positioning handles powered by the Moveable library.
- **Clean Selection**: "Double-Border" redundancy has been eliminated, so you see only the editor's primary selection frame.

## 3. Properties Management (Property Cards)

The right-hand panel is organized using a **PropertyCard** system, helping users focus on specific groups of settings:
- **Content**: Titles, body text, images, and audio sources.
- **Appearance**: Colors, corner radius, font sizes, and shadow effects.
- **Actions & Logic**: Click events, slide navigation, and dynamic visibility triggers.

## 4. Navigation and Timeline (UX)

- **Horizontal Scroll Timeline**: Enables management of an unlimited number of slides. When the slide list exceeds the screen width, a horizontal scrollbar automatically appears for quick navigation.
- **Slide Reordering**: Supports intuitive drag-and-drop slide reordering directly on the Timeline.
- **Multi-Device Preview**: The Preview mode provides standard Viewports for Desktop, Tablet, and Mobile, ensuring content is always centered and scaled correctly.

## 5. Interaction Feedback (Micro-interactions)

- **Success/Failure States**: Interaction elements (Quiz, Guess Word, Matching) provide immediate visual and auditory feedback upon user action.
- **Transition Effects**: Each slide can be configured with entrance transitions (Fade, Slide, Zoom) to create a seamless and engaging learning experience.

---
*Last updated: March 31, 2026 (UI/UX Standardization update)*
