"use client";

import { memo } from "react";
import { DndContext, PointerSensor, KeyboardSensor, closestCenter, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

import { useEditorStore } from "@/store/editorStore";
import { SortableSlideCard } from "./SortableSlideCard";
import { useShallow } from "zustand/shallow";

export const SlideList = function SlideList() {
  const { slides, currentSlideId, selectSlide, moveSlideToIndex } = useEditorStore(
    useShallow((state) => ({
      slides: state.slides,
      currentSlideId: state.currentSlideId,
      selectSlide: state.selectSlide,
      moveSlideToIndex: state.moveSlideToIndex,
    }))
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const fromIndex = slides.findIndex((slide) => slide.id === active.id);
    const toIndex = slides.findIndex((slide) => slide.id === over.id);

    if (fromIndex < 0 || toIndex < 0) {
      return;
    }

    if (fromIndex !== toIndex) {
      const nextSlides = arrayMove(slides, fromIndex, toIndex);
      const orderedIds = nextSlides.map((slide) => slide.id);
      const targetIndex = orderedIds.indexOf(active.id as string);

      if (targetIndex >= 0) {
        moveSlideToIndex(active.id as string, targetIndex);
      }
    }
  };

  return (
    <DndContext
      id="timeline-dnd-context"
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToHorizontalAxis]}
    >
      <SortableContext items={slides.map((slide) => slide.id)} strategy={horizontalListSortingStrategy}>
        <div className="flex gap-3 pb-2">
          {slides.map((slide, index) => (
            <SortableSlideCard
              key={slide.id}
              slide={slide}
              index={index}
              isActive={slide.id === currentSlideId}
              onSelect={() => selectSlide(slide.id)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
