export type EditorEvent = {
  id: string;
  type: string;
  source: "button" | "system";
  slideId: string;
  elementId?: string;
  payload?: Record<string, unknown>;
  timestamp: number;
};
