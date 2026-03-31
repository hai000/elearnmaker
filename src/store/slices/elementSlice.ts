import { StateCreator } from "zustand";
import { EditorState, SlideElement } from "../types";
import { initialElements } from "../initialState";
import { createId, createSnapshotPatch } from "../utils";

export const createElementSlice: StateCreator<EditorState, [], [], Pick<EditorState, 
  "elements" | "selectedId" | "addElement" | "updateElement" | "deleteElement" | "selectElement"
>> = (set) => ({
  elements: initialElements,
  selectedId: null,
  addElement: (element) =>
    set((state) => {
      const id = element.id ?? createId();
      const maxZ = state.elements.reduce(
        (max, el) => Math.max(max, el.zIndex ?? 0),
        0
      );
      const nextElement = {
        ...(element as Omit<SlideElement, "id">),
        id,
        slideId: element.slideId ?? state.currentSlideId,
        zIndex: maxZ + 1,
      } as SlideElement;
      return {
        ...createSnapshotPatch(state),
        elements: [...state.elements, nextElement],
        selectedId: id,
      };
    }),
  updateElement: (id, patch) =>
    set((state) => ({
      isDirty: true,
      elements: state.elements.map((element) =>
        element.id === id
          ? ({
              ...element,
              ...patch,
              props: patch.props
                ? ({
                    ...(element.props as Record<string, unknown>),
                    ...patch.props,
                  } as typeof element.props)
                : element.props,
            } as SlideElement)
          : element
      ),
    })),
  deleteElement: (id) =>
    set((state) => ({
      ...createSnapshotPatch(state),
      elements: state.elements.filter((element) => element.id !== id),
      selectedId: state.selectedId === id ? null : state.selectedId,
    })),
  selectElement: (id) =>
    set((state) => {
      if (!id) return { selectedId: null, isEditingText: false };

      const isSameElement = state.selectedId === id;
      const maxZ = state.elements.reduce(
        (max, el) => Math.max(max, el.zIndex ?? 0),
        0
      );

      return {
        selectedId: id,
        // Only stop editing if we switch to a DIFFERENT element
        isEditingText: isSameElement ? state.isEditingText : false,
        elements: state.elements.map((el) =>
          el.id === id ? ({ ...el, zIndex: maxZ + 1 } as SlideElement) : el
        ),
      };
    }),
});
