import { create } from "zustand";
import { initialElements, initialSlides } from "./initialState";
import { createId, createSlideId, createSnapshotPatch, duplicateElement } from "./utils";
import type { EditorState, EditorEvent, SlideElement } from "./types";

export * from "./types";

export const useEditorStore = create<EditorState>((set) => ({
  slides: initialSlides,
  currentSlideId: initialSlides[0].id,
  elements: initialElements,
  assets: [],
  selectedId: null,
  editorEvents: [],
  past: [],
  future: [],
  showHiddenElements: true,
  zoom: 0,
  toggleShowHiddenElements: () => set((state) => ({ showHiddenElements: !state.showHiddenElements })),
  setZoom: (zoom) => set({ zoom }),
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
  addElement: (element) =>
    set((state) => {
      const id = element.id ?? createId();
      const nextElement = {
        ...(element as Omit<SlideElement, "id">),
        id,
        slideId: element.slideId ?? state.currentSlideId,
      } as SlideElement;
      return {
        ...createSnapshotPatch(state),
        elements: [...state.elements, nextElement],
        selectedId: id,
      };
    }),
  updateSlide: (id, patch) =>
    set((state) => ({
      slides: state.slides.map((slide) =>
        slide.id === id ? { ...slide, ...patch } : slide
      ),
    })),
  updateElement: (id, patch) =>
    set((state) => ({
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
  selectSlide: (id) =>
    set({
      currentSlideId: id,
      selectedId: null,
    }),
  selectElement: (id) =>
    set((state) => {
      if (!id) return { selectedId: null };

      const maxZ = state.elements.reduce(
        (max, el) => Math.max(max, el.zIndex ?? 0),
        0
      );

      return {
        selectedId: id,
        elements: state.elements.map((el) =>
          el.id === id ? { ...el, zIndex: maxZ + 1 } as SlideElement : el
        ),
      };
    }),
  addAsset: (asset) =>
    set((state) => ({
      assets: [...state.assets, asset],
    })),
  deleteAsset: (id) =>
    set((state) => ({
      assets: state.assets.filter((asset) => asset.id !== id),
    })),
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
}));
