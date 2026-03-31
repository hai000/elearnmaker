export type ElementBase = {
  id: string;
  type: "text" | "card" | "quiz" | "image" | "video" | "audio" | "button" | "wheel_plugin" | "sort_game" | "shape" | "guess_word" | "matching" | "essay";
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

export type GuessWordElement = ElementBase & {
  type: "guess_word";
  props: {
    title: string;
    imageUrls: string[];
    answer: string;
    hint: string;
    successMessage: string;
    titleSize: number;
    textColor: string;
    backgroundColor: string;
  };
};

export type MatchingPair = {
  id: string;
  left: string;
  right: string;
};

export type MatchingElement = ElementBase & {
  type: "matching";
  props: {
    title: string;
    pairs: MatchingPair[];
    titleSize: number;
    itemSize: number;
    textColor: string;
    backgroundColor: string;
  };
};

export type EssayElement = ElementBase & {
  type: "essay";
  props: {
    title: string;
    placeholder: string;
    minLength: number;
    maxLength: number;
    submitLabel: string;
    titleSize: number;
    textColor: string;
    backgroundColor: string;
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
  | ShapeElement
  | GuessWordElement
  | MatchingElement
  | EssayElement;

export type SlideElementPatch = Partial<
  Pick<ElementBase, "x" | "y" | "width" | "height" | "rotation" | "borderRadius" | "zIndex" | "hidden" | "name" | "animation">
> & {
  props?: Record<string, unknown>;
};
