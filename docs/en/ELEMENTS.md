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
- `correctIndex`: index of the correct answer (0-based).
- `retryLabel`: message shown when the user selects the wrong answer.
- `titleSize`: title font size.
- `optionSize`: option font size.
- `textColor`: text color.
- `backgroundColor`: background color.

Behavior:

- Renders a list of options.
- When an option is selected, it validates against `correctIndex`.
- Shows `retryLabel` on incorrect answers to guide the user.

## 8. Audio Element

Type: `audio`

Props:

- `audioUrl`: path to the audio file (e.g., `/uploads/demo.mp3`).
- `autoplay`: autoplays when entering the slide.
- `loop`: loops the audio.
- `controls`: shows playback controls (play/pause/volume).
- `volume`: default volume (0 - 1).

Behavior:

- Renders a minimalist or hidden player (if controls are off).
- Used for listening comprehension exercises or slide background music.

## 9. Essay Element (Long Answer)

Type: `essay`

Props:

- `title`: the essay question.
- `placeholder`: descriptive placeholder text for the input.
- `submitLabel`: text for the submission button.
- `minLength`: minimum character count required.
- `maxLength`: maximum character count allowed.
- `titleSize`: question font size.
- `textColor`: text color.
- `backgroundColor`: background color.

Behavior:

- Provides a textarea for long-form user input.
- Validates text length before allowing submission.

## 10. Matching Element (Pairing Game)

Type: `matching`

Props:

- `title`: game instructions.
- `pairs`: list of matching pairs (id, left, right).
- `titleSize`: title font size.
- `itemSize`: item font size.
- `textColor`: text color.
- `backgroundColor`: background color.

Behavior:

- Interactive game where users drag and connect items from the left column to the right.
- Automatically validates pairs once all connections are made.

## 11. Guess Word Element (Image-to-Word Game)

Type: `guess_word`

Props:

- `title`: game title.
- `imageUrls`: array of static image hint URLs.
- `answer`: the target answer (uppercase, no accents).
- `hint`: a written hint for the user.
- `successMessage`: congratulatory text shown on win.
- `titleSize`: title font size.
- `textColor`: text color.
- `backgroundColor`: background color.

Behavior:

- Displays empty slots matching the `answer` length.
- Users input characters to solve the puzzle.
- Supports multiple image hints simultaneously.

## 12. Button Element

Type: `button`

Props:

- `label`: text shown on the button.
- `textColor`: text color.
- `backgroundColor`: background color.
- `actionType`: action mode:
  - `none`
  - `go_to_slide`
  - `show_element` (new): shows a hidden element on current slide.
- `targetSlideId`: target slide ID for `go_to_slide`.
- `targetElementIds` (new): array of element IDs to reveal for `show_element`.
- `buttonSize`: button font size.

Behavior:

- Handles navigation or triggers dynamic visibility within the slide.

---

## 13. Editor & Preview Notes

- **Editor**: Uses a standardized **PropertyCard** architecture to group related settings (Content, Appearance, Logic).
- **Preview/Viewer**: Implements a **Scale Wrapper** technique to ensure the 16:9 canvas is perfectly centered and scaled on any screen (Mobile, Tablet, Desktop).
- **Responsive**: Leverages `dvh` (Dynamic Viewport Height) to handle mobile browser address bar fluctuations.
