import type { Slide } from "./slides";
import type { SlideElement } from "./elements";

export type HistorySnapshot = {
  slides: Slide[];
  elements: SlideElement[];
};
