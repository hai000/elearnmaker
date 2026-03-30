import ElementShell from "./ElementShell";
import type { CanvasElementProps } from "@/plugins/registry";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function WheelPlugin({
  element,
  isSelected,
  onSelect,
  interactive,
  elementRef,
}: CanvasElementProps) {
  if (element.type !== "wheel_plugin") {
    return null;
  }

  return (
    <ElementShell
      element={element}
      isSelected={isSelected}
      onSelect={onSelect}
      interactive={interactive}
      className="rounded-2xl border-emerald-200 bg-emerald-50"
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
        <Separator className="my-3 bg-emerald-200" />
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="h-10 min-w-10 rounded-full px-3 text-sm">
            8
          </Badge>
          <p className="text-xs" style={{ color: element.props.textColor }}>
            Mode: {element.props.mode}
          </p>
        </div>
      </div>
    </ElementShell>
  );
}
