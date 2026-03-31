"use client";

import { memo } from "react";
import { Button } from "@/components/ui/button";
import { useEditorStore } from "@/store/editorStore";

// 1. Atomic Component: AddSlideButton (Static - 0 re-renders)
const AddSlideButton = function AddSlideButton() {
  const addSlide = useEditorStore((state) => state.addSlide);
  return (
    <Button variant="outline" size="sm" onClick={() => addSlide()}>
      Slide mới
    </Button>
  );
};

// 2. Atomic Component: DuplicateSlideButton (Static - 0 re-renders)
const DuplicateSlideButton = function DuplicateSlideButton() {
  const duplicateSlide = useEditorStore((state) => state.duplicateSlide);
  return (
    <Button variant="outline" size="sm" onClick={() => duplicateSlide()}>
      Nhân bản
    </Button>
  );
};

// 3. Atomic Component: DeleteSlideButton (Dynamic - only re-renders on slide count crossover)
const DeleteSlideButton = function DeleteSlideButton() {
  const deleteSlide = useEditorStore((state) => state.deleteSlide);
  const canDelete = useEditorStore((state) => state.slides.length > 1);

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={() => deleteSlide()}
      disabled={!canDelete}
    >
      Xóa
    </Button>
  );
};

// Main Container: Now just a layout wrapper
export const TimelineActions = function TimelineActions() {
  return (
    <div className="flex items-center gap-2">
      <AddSlideButton />
      <DuplicateSlideButton />
      <DeleteSlideButton />
    </div>
  );
};
