import { StateCreator } from "zustand";
import { EditorState, EditorEvent } from "../types";
import { createId } from "../utils";

export const createEventSlice: StateCreator<EditorState, [], [], Pick<EditorState, 
  "editorEvents" | "emitEditorEvent"
>> = (set) => ({
  editorEvents: [],
  emitEditorEvent: (event) => {
    const nextEvent: EditorEvent = {
      id: event.id ?? createId(),
      type: event.type,
      source: event.source,
      slideId: event.slideId,
      elementId: event.elementId,
      payload: event.payload,
      timestamp: event.timestamp ?? Date.now(),
    };

    set((state) => ({
      editorEvents: [...state.editorEvents, nextEvent].slice(-20),
    }));

    return nextEvent;
  },
});
