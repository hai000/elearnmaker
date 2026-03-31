import { useEffect, useRef } from "react";
import ElementShell from "./ElementShell";
import type { CanvasElementProps } from "@/plugins/registry";
import { Separator } from "@/components/ui/separator";
import { useEditorStore } from "@/store/editorStore";

export default function CardElement({
  element,
  isSelected,
  onSelect,
  interactive,
  elementRef,
}: CanvasElementProps) {
  const isEditing = useEditorStore((state) => state.isEditingText);
  const setIsEditing = useEditorStore((state) => state.setIsEditingText);
  const updateElement = useEditorStore((state) => state.updateElement);
  
  const titleRef = useRef<HTMLInputElement>(null);

  if (element.type !== "card") {
    return null;
  }

  const cardElement = element as import("@/store/types").CardElement;

  // Focus title when edit mode starts
  useEffect(() => {
    if (isEditing && isSelected) {
      setTimeout(() => {
        titleRef.current?.focus();
        if (titleRef.current) {
          titleRef.current.setSelectionRange(
            titleRef.current.value.length,
            titleRef.current.value.length
          );
        }
      }, 50);
    }
  }, [isEditing, isSelected]);

  const handleDoubleClick = () => {
    if (!interactive) return;
    setIsEditing(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsEditing(false);
      titleRef.current?.blur();
    }
    e.stopPropagation();
  };

  return (
    <ElementShell
      element={cardElement}
      isSelected={isSelected}
      onSelect={onSelect}
      onDoubleClick={handleDoubleClick}
      interactive={interactive}
      className="rounded-2xl border-border bg-card"
      style={{ backgroundColor: cardElement.props.backgroundColor }}
      ref={elementRef}
    >
      <div 
        className="flex h-full flex-col p-4 w-full"
        onMouseDownCapture={(e) => {
          if (isEditing) e.stopPropagation();
        }}
        onClickCapture={(e) => {
          if (isEditing) e.stopPropagation();
        }}
        onPointerDownCapture={(e) => {
          if (isEditing) e.stopPropagation();
        }}
        onTouchStartCapture={(e) => {
          if (isEditing) e.stopPropagation();
        }}
      >
        {isEditing ? (
          <div className="flex h-full flex-col">
            <input
              ref={titleRef}
              className="w-full bg-transparent border-none outline-none font-[var(--font-display)] font-semibold mb-1"
              style={{ color: cardElement.props.textColor, fontSize: cardElement.props.titleSize }}
              value={cardElement.props.title}
              onChange={(e) => {
                updateElement(cardElement.id, {
                  props: { ...cardElement.props, title: e.target.value }
                });
              }}
              onKeyDown={handleKeyDown}
            />
            <Separator className="my-3 opacity-50" />
            <textarea
              className="w-full flex-1 bg-transparent border-none outline-none resize-none text-sm leading-relaxed"
              style={{ color: cardElement.props.textColor, fontSize: cardElement.props.bodySize }}
              value={cardElement.props.body}
              onChange={(e) => {
                updateElement(cardElement.id, {
                  props: { ...cardElement.props, body: e.target.value }
                });
              }}
              onKeyDown={handleKeyDown}
            />
          </div>
        ) : (
          <div className="flex h-full flex-col">
            <p
              className="font-[var(--font-display)] font-semibold overflow-hidden text-ellipsis whitespace-nowrap"
              style={{ color: cardElement.props.textColor, fontSize: cardElement.props.titleSize }}
            >
              {cardElement.props.title}
            </p>
            <Separator className="my-3" />
            <p
              className="text-sm leading-relaxed overflow-hidden whitespace-pre-wrap"
              style={{ color: cardElement.props.textColor, fontSize: cardElement.props.bodySize }}
            >
              {cardElement.props.body}
            </p>
          </div>
        )}
      </div>
    </ElementShell>
  );
}
