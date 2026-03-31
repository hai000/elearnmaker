import { create } from "zustand";
import type { EditorState } from "./types";
import { createUiSlice } from "./slices/uiSlice";
import { createSlideSlice } from "./slices/slideSlice";
import { createElementSlice } from "./slices/elementSlice";
import { createHistorySlice } from "./slices/historySlice";
import { createAssetSlice } from "./slices/assetSlice";
import { createEventSlice } from "./slices/eventSlice";

export * from "./types";

/**
 * Main Studio Store - Combined from modular slices.
 * Adheres to the 150-line file limit by delegating logic to specialized slice creators.
 */
export const useEditorStore = create<EditorState>()((...a) => ({
  ...createUiSlice(...a),
  ...createSlideSlice(...a),
  ...createElementSlice(...a),
  ...createHistorySlice(...a),
  ...createAssetSlice(...a),
  ...createEventSlice(...a),
}));
