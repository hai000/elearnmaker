import ElementShell from "./ElementShell";
import type { CanvasElementProps } from "@/plugins/registry";
import { EssayElement as EssayElementType } from "@/store/types";
import { EssayInteractive } from "./essay/EssayInteractive";
import { cn } from "@/lib/utils";

export default function EssayElement({
  element,
  isSelected,
  onSelect,
  interactive,
  onAction,
  elementRef,
}: CanvasElementProps) {
  if (element.type !== "essay") {
    return null;
  }

  const essayElement = element as EssayElementType;

  return (
    <ElementShell
      element={element}
      isSelected={isSelected}
      onSelect={onSelect}
      interactive={interactive}
      className="p-0 border-none bg-transparent shadow-none"
      ref={elementRef}
    >
      <div className={cn("h-full w-full", interactive && "pointer-events-none")}>
        <EssayInteractive element={essayElement} onAction={onAction} />
      </div>
    </ElementShell>
  );
}
