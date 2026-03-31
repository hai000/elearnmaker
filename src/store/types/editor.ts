import type { Slide, } from "./slides";
import type { SlideElement, SlideElementPatch } from "./elements";
import type { MediaAsset } from "./assets";
import type { EditorEvent } from "./events";
import type { HistorySnapshot } from "./history";

export type EditorState = {
  slides: Slide[];
  currentSlideId: string;
  elements: SlideElement[];
  assets: MediaAsset[];
  selectedId: string | null;
  editorEvents: EditorEvent[];
  past: HistorySnapshot[];
  future: HistorySnapshot[];
  showHiddenElements: boolean;
  zoom: number;
  isEditingText: boolean;
  isDirty: boolean;
  toggleShowHiddenElements: () => void;
  setZoom: (zoom: number) => void;
  setIsEditingText: (isEditing: boolean) => void;
  saveSnapshot: () => void;
  undo: () => void;
  redo: () => void;
  addSlide: () => void;
  duplicateSlide: (slideId?: string) => void;
  deleteSlide: (slideId?: string) => void;
  moveSlide: (slideId: string, direction: "up" | "down") => void;
  moveSlideToIndex: (slideId: string, targetIndex: number) => void;
  addElement: (
    element: Omit<SlideElement, "id" | "slideId"> & { id?: string; slideId?: string }
  ) => void;
  updateElement: (id: string, patch: SlideElementPatch) => void;
  deleteElement: (id: string) => void;
  updateSlide: (id: string, patch: Partial<Slide>) => void;
  selectSlide: (id: string) => void;
  selectElement: (id: string | null) => void;
  addAsset: (asset: MediaAsset) => void;
  deleteAsset: (id: string) => void;
  importProject: (data: { slides: Slide[]; elements: SlideElement[]; assets?: MediaAsset[] }) => void;
  saveProject: () => void;
  emitEditorEvent: (
    event: Omit<EditorEvent, "id" | "timestamp"> & { id?: string; timestamp?: number }
  ) => EditorEvent;
};
