import ElementShell from "./ElementShell";
import type { CanvasElementProps } from "@/plugins/registry";
import { Badge } from "@/components/ui/badge";

export default function VideoElement({
  element,
  isSelected,
  onSelect,
  interactive,
  elementRef,
}: CanvasElementProps) {
  if (element.type !== "video") {
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
      {element.props.videoUrl ? (
         
        <video
          src={element.props.videoUrl}
          className="h-full w-full object-cover"
          controls
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-muted/40">
          <Badge variant="secondary">Add video URL</Badge>
        </div>
      )}
    </ElementShell>
  );
}
