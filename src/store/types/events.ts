export type EditorEvent = {
  id: string;
  type: string;
  source: string; // "button", "system", or any element.type
  slideId: string;
  elementId?: string;
  payload?: Record<string, unknown>;
  timestamp: number;
};
