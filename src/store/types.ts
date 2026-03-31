export type ElementBase = {
  id: string;
  type: "text" | "card" | "quiz" | "image" | "video" | "audio" | "button" | "wheel_plugin" | "sort_game" | "shape";
  slideId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  borderRadius: number;
  zIndex?: number;
  hidden?: boolean;
  name?: string;
  animation?: string; // Entrance animation for the element
};

export type TextElement = ElementBase & {
  type: "text";
  props: {
    text: string;
    fontSize: number;
    textColor: string;
    backgroundColor: string;
  };
};

export type CardElement = ElementBase & {
  type: "card";
  props: {
    title: string;
    body: string;
    titleSize: number;
    bodySize: number;
    textColor: string;
    backgroundColor: string;
  };
};

export type QuizElement = ElementBase & {
  type: "quiz";
  props: {
    title: string;
    options: string[];
    correctIndex: number;
    retryLabel: string;
    titleSize: number;
    optionSize: number;
    textColor: string;
    backgroundColor: string;
  };
};

export type ImageElement = ElementBase & {
  type: "image";
  props: {
    imageUrl: string;
  };
};

export type VideoElement = ElementBase & {
  type: "video";
  props: {
    videoUrl: string;
  };
};

export type ButtonElement = ElementBase & {
  type: "button";
  props: {
    label: string;
    textColor: string;
    backgroundColor: string;
    actionType: "none" | "go_to_slide" | "trigger" | "show_element" | "hide_element" | "toggle_element";
    targetSlideId: string;
    targetElementIds?: string[];
    triggerName?: string;
    buttonSize: number;
  };
};

export type WheelPluginElement = ElementBase & {
  type: "wheel_plugin";
  props: {
    title: string;
    mode: string;
    titleSize: number;
    textColor: string;
    backgroundColor: string;
  };
};

export type Slide = {
  id: string;
  title: string;
  backgroundColor?: string;
  animation?: string;
  minDuration?: number; // Minimum viewing time in seconds
};

export type EditorEvent = {
  id: string;
  type: string;
  source: "button" | "system";
  slideId: string;
  elementId?: string;
  payload?: Record<string, unknown>;
  timestamp: number;
};

export type AudioElement = ElementBase & {
  type: "audio";
  props: {
    audioUrl: string;
    autoplay: boolean;
    loop: boolean;
    controls: boolean;
    volume: number;
  };
};

export type SortGameElement = ElementBase & {
  type: "sort_game";
  props: {
    title: string;
    items: string[];
    titleSize: number;
    itemSize: number;
    textColor: string;
    backgroundColor: string;
    checkLabel: string;
  };
};

export type ShapeElement = ElementBase & {
  type: "shape";
  props: {
    shapeType: "rectangle" | "circle" | "line";
    fillColor: string;
    strokeColor: string;
    strokeWidth: number;
  };
};

export type SlideElement =
  | TextElement
  | CardElement
  | QuizElement
  | ImageElement
  | VideoElement
  | ButtonElement
  | WheelPluginElement
  | AudioElement
  | SortGameElement
  | ShapeElement;

export type SlideElementPatch = Partial<
  Pick<ElementBase, "x" | "y" | "width" | "height" | "rotation" | "borderRadius" | "zIndex" | "hidden" | "name" | "animation">
> & {
  props?: Record<string, unknown>;
};

export type HistorySnapshot = {
  slides: Slide[];
  elements: SlideElement[];
};

export type MediaAsset = {
  id: string;
  name: string;
  url: string;
  type: "audio" | "image" | "video";
  size: number;
  createdAt: number;
};

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
  emitEditorEvent: (
    event: Omit<EditorEvent, "id" | "timestamp"> & { id?: string; timestamp?: number }
  ) => EditorEvent;
};
