import { StateCreator } from "zustand";
import { EditorState } from "../types";
import { initialSlides } from "../initialState";
import { createSlideId, createSnapshotPatch, duplicateElement } from "../utils";

export const createSlideSlice: StateCreator<EditorState, [], [], Pick<EditorState, 
  "slides" | "currentSlideId" | "addSlide" | "duplicateSlide" | "deleteSlide" | "moveSlide" | "moveSlideToIndex" | "updateSlide" | "selectSlide"
>> = (set) => ({
  slides: initialSlides,
  currentSlideId: initialSlides[0].id,
  addSlide: () =>
    set((state) => {
      const id = createSlideId();
      const title = `Slide ${state.slides.length + 1}`;

      return {
        ...createSnapshotPatch(state),
        slides: [...state.slides, { id, title }],
        currentSlideId: id,
        selectedId: null,
      };
    }),
  duplicateSlide: (slideId) =>
    set((state) => {
      const sourceSlideId = slideId ?? state.currentSlideId;
      const sourceSlide = state.slides.find((slide) => slide.id === sourceSlideId);

      if (!sourceSlide) {
        return state;
      }

      const id = createSlideId();
      const title = `${sourceSlide.title} Copy`;
      const duplicatedElements = state.elements
        .filter((element) => element.slideId === sourceSlideId)
        .map((element) => duplicateElement(element, id));

      return {
        ...createSnapshotPatch(state),
        slides: [...state.slides, { id, title }],
        elements: [...state.elements, ...duplicatedElements],
        currentSlideId: id,
        selectedId: null,
      };
    }),
  deleteSlide: (slideId) =>
    set((state) => {
      const targetSlideId = slideId ?? state.currentSlideId;

      if (state.slides.length <= 1) {
        return state;
      }

      const remainingSlides = state.slides.filter((slide) => slide.id !== targetSlideId);

      if (remainingSlides.length === state.slides.length) {
        return state;
      }

      const remainingElements = state.elements.filter((element) => element.slideId !== targetSlideId);
      const nextCurrentSlideId =
        state.currentSlideId === targetSlideId
          ? remainingSlides[0]?.id ?? state.currentSlideId
          : state.currentSlideId;

      return {
        ...createSnapshotPatch(state),
        slides: remainingSlides,
        elements: remainingElements,
        currentSlideId: nextCurrentSlideId,
        selectedId: state.currentSlideId === targetSlideId ? null : state.selectedId,
      };
    }),
  moveSlide: (slideId, direction) =>
    set((state) => {
      const currentIndex = state.slides.findIndex((slide) => slide.id === slideId);

      if (currentIndex < 0) {
        return state;
      }

      const nextIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

      if (nextIndex < 0 || nextIndex >= state.slides.length) {
        return state;
      }

      const slides = [...state.slides];
      const [movedSlide] = slides.splice(currentIndex, 1);

      if (!movedSlide) {
        return state;
      }

      slides.splice(nextIndex, 0, movedSlide);

      return { ...createSnapshotPatch(state), slides };
    }),
  moveSlideToIndex: (slideId, targetIndex) =>
    set((state) => {
      const currentIndex = state.slides.findIndex((slide) => slide.id === slideId);

      if (currentIndex < 0) {
        return state;
      }

      const clampedIndex = Math.max(0, Math.min(targetIndex, state.slides.length - 1));

      if (currentIndex === clampedIndex) {
        return state;
      }

      const slides = [...state.slides];
      const [movedSlide] = slides.splice(currentIndex, 1);

      if (!movedSlide) {
        return state;
      }

      slides.splice(clampedIndex, 0, movedSlide);

      return { ...createSnapshotPatch(state), slides };
    }),
  updateSlide: (id, patch) =>
    set((state) => ({
      isDirty: true,
      slides: state.slides.map((slide) =>
        slide.id === id ? { ...slide, ...patch } : slide
      ),
    })),
  selectSlide: (id) =>
    set({
      currentSlideId: id,
      selectedId: null,
      isEditingText: false,
    }),
});
