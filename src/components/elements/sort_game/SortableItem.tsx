"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

type SortableItemProps = {
  id: string;
  text: string;
  index: number;
};

export function SortableItem({ id, text }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.8 : 1,
    boxShadow: isDragging ? "0 10px 15px -3px rgba(0, 0, 0, 0.1)" : "none",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative flex items-center rounded-lg border bg-background px-3 py-2 text-left touch-none select-none transition-colors ${
        isDragging ? "border-slate-300 ring-2 ring-slate-100 ring-offset-1" : "hover:border-slate-300 hover:bg-slate-50"
      }`}
      {...attributes}
      {...listeners}
    >
      <div className="mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-slate-100/50 text-xs font-medium text-slate-400">
        <GripVertical className="h-4 w-4" />
      </div>
      <span className="flex-1 pointer-events-none">{text}</span>
    </div>
  );
}
