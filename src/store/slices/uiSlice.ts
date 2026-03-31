import { StateCreator } from "zustand";
import { EditorState } from "../types";

export const createUiSlice: StateCreator<EditorState, [], [], Pick<EditorState, 
  "showHiddenElements" | "zoom" | "isEditingText" | "isDirty" | "toggleShowHiddenElements" | "setZoom" | "setIsEditingText"
>> = (set) => ({
  showHiddenElements: true,
  zoom: 0,
  isEditingText: false,
  isDirty: false,
  toggleShowHiddenElements: () => set((state) => ({ showHiddenElements: !state.showHiddenElements })),
  setZoom: (zoom) => set({ zoom }),
  setIsEditingText: (isEditing: boolean) => set({ isEditingText: isEditing }),
});
