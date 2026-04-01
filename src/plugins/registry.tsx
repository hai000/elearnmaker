import type { ReactElement } from "react";
import type { SlideElement, SlideElementPatch } from "@/store/types";
import AudioElement from "@/components/elements/AudioElement";
import ButtonElement from "@/components/elements/ButtonElement";
import CardElement from "@/components/elements/CardElement";
import ImageElement from "@/components/elements/ImageElement";
import QuizElement from "@/components/elements/QuizElement";
import TextElement from "@/components/elements/TextElement";
import VideoElement from "@/components/elements/VideoElement";
import WheelPlugin from "@/components/elements/WheelPlugin";
import AudioProperties from "@/components/panels/AudioProperties";
import ButtonProperties from "@/components/panels/ButtonProperties";
import CardProperties from "@/components/panels/CardProperties";
import ImageProperties from "@/components/panels/ImageProperties";
import QuizProperties from "@/components/panels/QuizProperties";
import TextProperties from "@/components/panels/TextProperties";
import VideoProperties from "@/components/panels/VideoProperties";
import WheelProperties from "@/components/panels/WheelProperties";
import SortGameElement from "@/components/elements/SortGameElement";
import SortGameProperties from "@/components/panels/SortGameProperties";
import ShapeElement from "@/components/elements/ShapeElement";
import ShapeProperties from "@/components/panels/ShapeProperties";
import GuessWordElement from "@/components/elements/GuessWordElement";
import GuessWordProperties from "@/components/panels/GuessWordProperties";
import MatchingElement from "@/components/elements/MatchingElement";
import MatchingProperties from "@/components/panels/MatchingProperties";
import EssayElement from "@/components/elements/EssayElement";
import EssayProperties from "@/components/panels/EssayProperties";


export type CanvasElementProps = {
  element: SlideElement;
  isSelected: boolean;
  onSelect: () => void;
  interactive?: boolean;
  onAction?: (element: SlideElement) => void;
  elementRef?: (node: HTMLDivElement | null) => void;
};

export type PropertiesPanelProps = {
  element: SlideElement;
  updateElement: (id: string, patch: SlideElementPatch) => void;
};

type RegistryEntry = {
  canvasComponent: (props: CanvasElementProps) => ReactElement | null;
  propertiesPanel: (props: PropertiesPanelProps) => ReactElement | null;
  meta?: {
    isCompletable?: boolean; // Is this element interactive/completable?
  };
};

export const pluginRegistry: Record<SlideElement["type"], RegistryEntry> = {
  text: {
    canvasComponent: TextElement,
    propertiesPanel: TextProperties,
  },
  button: {
    canvasComponent: ButtonElement,
    propertiesPanel: ButtonProperties,
  },
  card: {
    canvasComponent: CardElement,
    propertiesPanel: CardProperties,
  },
  quiz: {
    canvasComponent: QuizElement,
    propertiesPanel: QuizProperties,
    meta: { isCompletable: true },
  },
  image: {
    canvasComponent: ImageElement,
    propertiesPanel: ImageProperties,
  },
  video: {
    canvasComponent: VideoElement,
    propertiesPanel: VideoProperties,
    meta: { isCompletable: true },
  },
  audio: {
    canvasComponent: AudioElement,
    propertiesPanel: AudioProperties,
    meta: { isCompletable: true },
  },
  sort_game: {
    canvasComponent: SortGameElement,
    propertiesPanel: SortGameProperties,
    meta: { isCompletable: true },
  },
  wheel_plugin: {
    canvasComponent: WheelPlugin,
    propertiesPanel: WheelProperties,
  },
  shape: {
    canvasComponent: ShapeElement,
    propertiesPanel: ShapeProperties,
  },
  guess_word: {
    canvasComponent: GuessWordElement,
    propertiesPanel: GuessWordProperties,
    meta: { isCompletable: true },
  },
  matching: {
    canvasComponent: MatchingElement,
    propertiesPanel: MatchingProperties,
    meta: { isCompletable: true },
  },
  essay: {
    canvasComponent: EssayElement,
    propertiesPanel: EssayProperties,
    meta: { isCompletable: true },
  },
};

