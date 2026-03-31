import { StateCreator } from "zustand";
import { EditorState } from "../types";

export const createHistorySlice: StateCreator<EditorState, [], [], Pick<EditorState, 
  "past" | "future" | "saveSnapshot" | "undo" | "redo" | "importProject" | "saveProject"
>> = (set) => ({
  past: [],
  future: [],
  saveSnapshot: () =>
    set((state) => ({
      past: [...state.past, { slides: [...state.slides], elements: [...state.elements] }].slice(-50),
      future: [],
    })),
  undo: () =>
    set((state) => {
      if (state.past.length === 0) return state;

      const previous = state.past[state.past.length - 1];
      const newPast = state.past.slice(0, -1);

      return {
        past: newPast,
        isDirty: true,
        future: [
          {
            slides: [...state.slides],
            elements: [...state.elements],
          },
          ...state.future,
        ],
        slides: previous.slides,
        elements: previous.elements,
      };
    }),
  redo: () =>
    set((state) => {
      if (state.future.length === 0) return state;

      const next = state.future[0];
      const newFuture = state.future.slice(1);

      return {
        isDirty: true,
        past: [
          ...state.past,
          {
            slides: [...state.slides],
            elements: [...state.elements],
          },
        ],
        future: newFuture,
        slides: next.slides,
        elements: next.elements,
      };
    }),
  importProject: (data) =>
    set(() => ({
      slides: data.slides,
      elements: data.elements,
      assets: data.assets ?? [],
      currentSlideId: data.slides[0]?.id ?? "",
      selectedId: null,
      past: [],
      future: [],
      isDirty: false,
    })),
  saveProject: () =>
    set({
      past: [],
      future: [],
      isDirty: false,
    }),
});
