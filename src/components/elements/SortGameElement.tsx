import ElementShell from "./ElementShell";
import type { CanvasElementProps } from "@/plugins/registry";
import { Separator } from "@/components/ui/separator";
import type { SortGameElement as SortGameElementType } from "@/store/types";
import { SortGameInteractive } from "./sort_game/SortGameInteractive";

export default function SortGameElement({
  element,
  isSelected,
  onSelect,
  interactive,
  elementRef,
}: CanvasElementProps) {
  if (element.type !== "sort_game") {
    return null;
  }

  const sortGameElement = element as SortGameElementType;

  return (
    <ElementShell
      element={element}
      isSelected={isSelected}
      onSelect={onSelect}
      interactive={interactive}
      className="rounded-2xl border-border bg-card"
      style={{ backgroundColor: sortGameElement.props.backgroundColor }}
      ref={elementRef}
    >
      {interactive === false ? (
        <SortGameInteractive element={sortGameElement} />
      ) : (
        <div className="flex h-full flex-col overflow-y-auto p-4">
          <p
            className="font-semibold"
            style={{ color: sortGameElement.props.textColor, fontSize: sortGameElement.props.titleSize }}
          >
            {sortGameElement.props.title}
          </p>
          <Separator className="my-3" />
          <div
            className="flex flex-col gap-2 opacity-80 pointer-events-none"
            style={{ color: sortGameElement.props.textColor, fontSize: sortGameElement.props.itemSize }}
          >
            {sortGameElement.props.items.map((item: string, index: number) => (
              <div
                key={index}
                className="flex items-center rounded-lg border bg-background px-3 py-2 text-left"
              >
                <div className="mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-slate-100 text-xs font-medium text-slate-500">
                  {index + 1}
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-auto pt-3 flex justify-end">
            <div className="rounded-md border bg-muted px-4 py-2 text-sm text-muted-foreground opacity-70">
              {sortGameElement.props.checkLabel || "Kiểm tra đáp án"}
            </div>
          </div>
        </div>
      )}
    </ElementShell>
  );
}
