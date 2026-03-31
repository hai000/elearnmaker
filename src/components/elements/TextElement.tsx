import { useState, useRef, useEffect } from "react";
import ElementShell from "./ElementShell";
import type { CanvasElementProps } from "@/plugins/registry";
import { useEditorStore } from "@/store/editorStore";

export default function TextElement({
  element,
  isSelected,
  onSelect,
  interactive,
  elementRef,
}: CanvasElementProps) {
  const isEditing = useEditorStore((state) => state.isEditingText);
  const setIsEditing = useEditorStore((state) => state.setIsEditingText);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const updateElement = useEditorStore((state) => state.updateElement);

  if (element.type !== "text") {
    return null;
  }

  const textElement = element as import("@/store/types").TextElement;

  // Focus textarea when edit mode opens
  useEffect(() => {
    if (isEditing && isSelected) {
      setTimeout(() => {
        textareaRef.current?.focus();
        if (textareaRef.current) {
          textareaRef.current.setSelectionRange(
            textareaRef.current.value.length,
            textareaRef.current.value.length
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
      textareaRef.current?.blur();
    }
    e.stopPropagation();
  };

  return (
    <ElementShell
      element={textElement}
      isSelected={isSelected}
      onSelect={onSelect}
      interactive={interactive}
      onDoubleClick={handleDoubleClick}
      noShadow={true}
      className="rounded-2xl"
      style={{ backgroundColor: textElement.props.backgroundColor }}
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
          <textarea
            ref={textareaRef}
            className="w-full h-full bg-transparent border-none outline-none resize-none leading-relaxed"
            style={{ 
              color: textElement.props.textColor, 
              fontSize: textElement.props.fontSize,
            }}
            value={textElement.props.text}
            onChange={(e) => {
              updateElement(textElement.id, {
                props: { ...textElement.props, text: e.target.value },
              });
            }}
            onKeyDown={handleKeyDown}
          />
        ) : (
           <p
            className="w-full h-full whitespace-pre-wrap leading-relaxed overflow-hidden"
            style={{ 
              color: textElement.props.textColor, 
              fontSize: textElement.props.fontSize 
            }}
          >
            {textElement.props.text}
          </p>
        )}
      </div>
    </ElementShell>
  );
}
