"use client";

import { useState, useRef, useEffect, memo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEditorStore } from "@/store/editorStore";

export type SortableSlideCardProps = {
  slide: { id: string; title: string };
  index: number;
  isActive: boolean;
  onSelect: () => void;
};

export const SortableSlideCard = function SortableSlideCard({
  slide,
  index,
  isActive,
  onSelect,
}: SortableSlideCardProps) {
  const updateSlide = useEditorStore((state) => state.updateSlide);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(slide.title);
  const inputRef = useRef<HTMLInputElement>(null);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: slide.id,
    disabled: isEditing, // Disable sorting while editing title
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    if (title.trim() && title !== slide.title) {
      updateSlide(slide.id, { title: title.trim() });
    } else {
      setTitle(slide.title);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleBlur();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setTitle(slide.title);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={() => !isEditing && onSelect()}
      onKeyDown={(event) => {
        if (event.key === "Enter" && !isEditing) {
          onSelect();
        }
      }}
      {...attributes}
      {...(isEditing ? {} : listeners)}
      className={`group relative flex h-16 w-36 flex-shrink-0 flex-col items-start justify-between rounded-xl border px-3 py-2 text-left text-sm font-semibold transition hover:cursor-grab active:cursor-grabbing ${isActive
          ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
          : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50"
        } ${isDragging ? "opacity-60 z-50 shadow-lg" : ""}`}
    >
      <span className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
        Slide {index + 1}
      </span>
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onPointerDown={(e) => e.stopPropagation()}
          className="w-full bg-transparent outline-none border-b border-blue-400 text-blue-700 h-6 -ml-px px-px"
        />
      ) : (
        <span
          onDoubleClick={(e) => {
            e.stopPropagation();
            setIsEditing(true);
          }}
          className="truncate w-full cursor-text"
          title="Double click to rename"
        >
          {slide.title}
        </span>
      )}
    </div>
  );
};
