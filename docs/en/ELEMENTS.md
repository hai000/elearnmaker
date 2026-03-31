# Element Reference

This document describes the elements currently available in the Studio, their key properties, and runtime/preview behavior.


## 1. Shared Model

Every editor element includes these base fields:

- `id`: unique identifier.
- `type`: element type.
- `slideId`: the slide the element belongs to.
- `x`, `y`: absolute canvas position.
- `width`, `height`: size.
- `rotation`: rotation angle.
- `borderRadius`: corner radius.
- `zIndex`: stacking order.
- `hidden`: boolean flag to hide element on slide load.
- `name`: friendly alias for triggering (e.g., "Hint Button").
- `animation`: entrance effect (fade, zoom, slide, etc.).
- `props`: element-specific data.

Important rules:

- The canvas uses absolute positioning.
- Elements do not store HTML.
- Each element is a standalone React component in `src/components/elements/*`.
- Each element has a matching properties panel in `src/components/panels/*`.

## 2. Slide Model

The editor now has a real slide model:

- `slides`: slide list in the store.
- `currentSlideId`: the slide shown in canvas/preview.

Implications:

- The canvas renders only elements whose `slideId` matches `currentSlideId`.
- Preview renders the active slide as well.
- The Button `go_to_slide` action updates `currentSlideId`.

## 3. Text Element

Type: `text`

Props:

- `title`: title text.
- `body`: content body.
- `titleSize`: title font size.
- `bodySize`: body font size.
- `textColor`: text color.
- `backgroundColor`: background color.

Behavior:

- Renders as a compact content card.
- Useful for short explanations and key highlights.

## 4. Card Element

Type: `card`

Props:

- `title`
- `body`
- `titleSize`
- `bodySize`
- `textColor`
- `backgroundColor`

Behavior:

- Similar to Text, but used as a more prominent information block.
- Good for modules, summaries, and intro content.

## 5. Image Element

Type: `image`

Props:

- `imageUrl`: image URL.

Behavior:

- Renders an image when a URL exists.
- Shows a placeholder when empty.

## 6. Video Element

Type: `video`

Props:

- `videoUrl`: video URL.

Behavior:

- Renders a video player when a URL exists.
- Shows a placeholder when empty.

## 7. Quiz Element

Type: `quiz`

Props:

- `title`: quiz title.
- `options`: option list.
- `titleSize`: title font size.
- `optionSize`: option font size.
- `textColor`: text color.
- `backgroundColor`: background color.

Behavior:

- Renders options as badges.
- It is interactive visually, but scoring is not implemented yet.

## 8. Button Element

Type: `button`

Props:

- `label`: button label.
- `textColor`: text color.
- `backgroundColor`: background color.
- `actionType`: action mode:
  - `none`
  - `go_to_slide`
  - `trigger`
- `targetSlideId`: target slide when `go_to_slide` is used.
- `triggerName`: trigger name when `trigger` is used.
- `buttonSize`: button font size.

Behavior:

- In the editor, Button can still be selected, dragged, and resized like other elements.
- In preview/runtime:
  - `none`: no action.
  - `go_to_slide`: switches to the slide matching `targetSlideId`.
  - `trigger`: fires a logic event, currently surfaced as a preview message and editor event.

Recommended use:

- CTA buttons such as Start, Next, Open Quiz, or Jump to section.
- Use `go_to_slide` for lesson flow navigation.
- Use `trigger` when you want to extend to other rules such as hints, modals, or audio.

## 9. Wheel Plugin Element

Type: `wheel_plugin`

Props:

- `title`
- `mode`
- `titleSize`
- `textColor`
- `backgroundColor`

Behavior:

- Serves as a sample gamification-style plugin element.
- Can be extended with plugin-specific logic through the registry.

## 10. Preview Notes

Preview currently supports 3 device profiles:

- Desktop
- Tablet
- Mobile landscape

Preview renders the same real slide data from the store, so Button actions work on the active slide.
