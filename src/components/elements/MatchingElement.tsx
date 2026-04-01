"use client";

import ElementShell from "./ElementShell";
import type { CanvasElementProps } from "@/plugins/registry";
import { MatchingInteractive } from "./matching/MatchingInteractive";
import type { MatchingElement as MatchingElementType } from "@/store/types";

export default function MatchingElement({
  element,
  isSelected,
  onSelect,
  interactive,
  onAction,
  elementRef,
}: CanvasElementProps) {
  if (element.type !== "matching") {
    return null;
  }

  const matchingElement = element as MatchingElementType;

  return (
    <ElementShell
      element={element}
      isSelected={isSelected}
      onSelect={onSelect}
      interactive={interactive}
      className="rounded-2xl border-border bg-card shadow-lg overflow-hidden"
      style={{ backgroundColor: matchingElement.props.backgroundColor || "#ffffff" }}
      ref={elementRef}
    >
      <div className="relative h-full w-full">
        <MatchingInteractive 
          element={matchingElement} 
          isDisabled={interactive} 
          onAction={onAction}
        />
        
        {interactive && (
          <div className="absolute inset-0 bg-blue-500/5 hover:bg-blue-500/10 flex items-center justify-center opacity-0 hover:opacity-100 transition-all pointer-events-none">
             <div className="px-4 py-2 bg-white/90 border shadow-lg rounded-full text-xs font-bold text-blue-600 backdrop-blur-sm">
               Khu vực Biên tập: Nhấn đúp để chơi thử
             </div>
          </div>
        )}
      </div>
    </ElementShell>
  );
}
