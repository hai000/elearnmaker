import { StateCreator } from "zustand";
import { EditorState } from "../types";

export const createUiSlice: StateCreator<EditorState, [], [], Pick<EditorState, 
  "showHiddenElements" | "zoom" | "isEditingText" | "isDirty" | "interactionState" | "toggleShowHiddenElements" | "setZoom" | "setIsEditingText" | "setElementCompleted" | "gameFeedback" | "setGameFeedback"
>> = (set) => ({
  showHiddenElements: true,
  zoom: 0,
  isEditingText: false,
  isDirty: false,
  interactionState: {},
  gameFeedback: null,
  toggleShowHiddenElements: () => set((state) => ({ showHiddenElements: !state.showHiddenElements })),
  setZoom: (zoom) => set({ zoom }),
  setIsEditingText: (isEditing: boolean) => set({ isEditingText: isEditing }),
  setElementCompleted: (id, completed) => set((state) => ({
    interactionState: {
      ...state.interactionState,
      [id]: completed,
    }
  })),
  setGameFeedback: (feedback) => set({ gameFeedback: feedback }),
});
