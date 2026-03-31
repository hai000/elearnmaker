import ElementShell from "./ElementShell";
import type { CanvasElementProps } from "@/plugins/registry";
import { Badge } from "@/components/ui/badge";

export default function ImageElement({
  element,
  isSelected,
  onSelect,
  interactive,
  elementRef,
}: CanvasElementProps) {
  if (element.type !== "image") {
    return null;
  }

  return (
    <ElementShell
      element={element}
      isSelected={isSelected}
      onSelect={onSelect}
      interactive={interactive}
      className="rounded-2xl border-border bg-card"
      ref={elementRef}
    >
      {element.props.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={element.props.imageUrl}
          alt="Hình ảnh"
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-muted/40">
          <Badge variant="secondary">Thêm URL hình ảnh</Badge>
        </div>
      )}
    </ElementShell>
  );
}
