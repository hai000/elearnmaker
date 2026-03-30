import type { EditorState, SlideElement } from "./types";

export const createId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `el-${Date.now()}-${Math.round(Math.random() * 10000)}`;
};

export const createSlideId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `slide-${crypto.randomUUID()}`;
  }
  return `slide-${Date.now()}-${Math.round(Math.random() * 10000)}`;
};

export const createSnapshotPatch = (state: EditorState) => ({
  past: [...state.past, { slides: state.slides, elements: state.elements }].slice(-50),
  future: [],
});

export const duplicateElement = (element: SlideElement, slideId: string): SlideElement => ({
  ...element,
  id: createId(),
  slideId,
  x: element.x + 24,
  y: element.y + 24,
});
