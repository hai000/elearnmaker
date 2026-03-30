import ElementShell from "./ElementShell";
import type { CanvasElementProps } from "@/plugins/registry";
import { Separator } from "@/components/ui/separator";

export default function TextElement({
  element,
  isSelected,
  onSelect,
  interactive,
  elementRef,
}: CanvasElementProps) {
  if (element.type !== "text") {
    return null;
  }

  return (
    <ElementShell
      element={element}
      isSelected={isSelected}
      onSelect={onSelect}
      interactive={interactive}
      className="rounded-2xl border-border bg-card"
      style={{ backgroundColor: element.props.backgroundColor }}
      ref={elementRef}
    >
      <div className="flex h-full flex-col p-4">
        <p
          className="font-semibold"
          style={{ color: element.props.textColor, fontSize: element.props.titleSize }}
        >
          {element.props.title}
        </p>
        <Separator className="my-3" />
        <p
          className="text-sm leading-relaxed"
          style={{ color: element.props.textColor, fontSize: element.props.bodySize }}
        >
          {element.props.body}
        </p>
      </div>
    </ElementShell>
  );
}
