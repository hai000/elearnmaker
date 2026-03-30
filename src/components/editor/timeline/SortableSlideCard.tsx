"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export type SortableSlideCardProps = {
  slide: { id: string; title: string };
  index: number;
  isActive: boolean;
  onSelect: () => void;
};

export function SortableSlideCard({
  slide,
  index,
  isActive,
  onSelect,
}: SortableSlideCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: slide.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          onSelect();
        }
      }}
      {...attributes}
      {...listeners}
      className={`group relative flex h-16 w-36 flex-shrink-0 flex-col items-start justify-between rounded-xl border px-3 py-2 text-left text-sm font-semibold transition hover:cursor-grab active:cursor-grabbing ${
        isActive
          ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
          : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50"
      } ${isDragging ? "opacity-60 z-50 shadow-lg" : ""}`}
    >
      <span className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
        Slide {index + 1}
      </span>
      <span>{slide.title}</span>
    </div>
  );
}
