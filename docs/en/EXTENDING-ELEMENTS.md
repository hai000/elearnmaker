# Extending Elements

This document explains how to add a new element to ElearnMaker Studio.

## 1. Goal

Every new element needs three main layers:

- Data model in the store.
- Canvas renderer to display it on the slide.
- Properties panel to edit its data.

If the element has special preview/runtime behavior, pass a dedicated handler from the layout/preview instead of hard-coding logic inside the UI component.

## 2. Add the type and props to the store

Open `src/store/editorStore.ts` and declare the new type in `SlideElement`.

Example:

```ts
type VideoElement = ElementBase & {
  type: "video";
  props: {
    videoUrl: string;
  };
};

export type SlideElement =
  | TextElement
  | CardElement
  | QuizElement
  | ImageElement
  | VideoElement
  | ButtonElement
  | WheelPluginElement;
```

If the new element needs starter data, add it to:

- `initialElements` so it appears when the editor opens.
- `LeftSidebar` so users can add it from the library.

## 3. Create the canvas renderer

Create a file in `src/components/elements/`.

> [!IMPORTANT]
> You **must** wrap your content in `ElementShell`. The `ElementShell` handles selection, transformation, and now automatically applies **Entrance Animations** configured by the user.

Example:

```tsx
import ElementShell from "./ElementShell";
import type { CanvasElementProps } from "@/plugins/registry";

export default function VideoElement({ element, isSelected, onSelect, interactive, elementRef }: CanvasElementProps) {
  if (element.type !== "video") {
    return null;
  }

  return (
    <ElementShell
      element={element}
      isSelected={isSelected}
      onSelect={onSelect}
      interactive={interactive}
      className="rounded-2xl border border-slate-200 bg-white"
      ref={elementRef}
    >
      {/* Your actual element content goes here */}
      {element.props.videoUrl ? (
        <video src={element.props.videoUrl} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-xs text-slate-500">
          No Video Loaded
        </div>
      )}
    </ElementShell>
  );
}
```

## 4. Create the properties panel

Create a file in `src/components/panels/`.

> [!TIP]
> Always embed `<VisibilityProperties />` at the end of your properties list. This ensures your element automatically gains features like: Identity Name, Hidden on Start, and the **Entrance Animation selector**.

Example:

```tsx
import type { PropertiesPanelProps } from "@/plugins/registry";
import { VisibilityProperties } from "./properties/VisibilityProperties";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function VideoProperties({ element, updateElement }: PropertiesPanelProps) {
  if (element.type !== "video") {
    return null;
  }

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label>Video URL</Label>
        <Input
          value={element.props.videoUrl}
          onChange={(e) => updateElement(element.id, { props: { ...element.props, videoUrl: e.target.value } })}
        />
      </div>

      {/* Automatically adds Visibility, Identity, and Animation settings */}
      <VisibilityProperties element={element} updateElement={updateElement} />
    </div>
  );
}
```

## 5. Register it in the plugin registry

Open `src/plugins/registry.tsx` and add the element to `pluginRegistry`.

Example:

```tsx
import VideoElement from "@/components/elements/VideoElement";
import VideoProperties from "@/components/panels/VideoProperties";

export const pluginRegistry = {
  ...,
  video: {
    canvasComponent: VideoElement,
    propertiesPanel: VideoProperties,
  },
};
```

## 6. Check preview behavior

If the new element needs special interaction:

- Pass the handler from preview/runtime.
- Do not hard-code navigation or trigger logic inside the UI component.
- If you need button-style actions, model them in `props` so they can be saved with slide data.

## 7. Keep these conventions

- Render the element according to `slideId` if it belongs to a specific slide.
- Keep props explicit so the panel can edit them without knowing runtime logic.
- Do not store HTML in element data.
- Keep the element self-contained so it can later become a plugin.
