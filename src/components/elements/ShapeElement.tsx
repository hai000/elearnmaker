import ElementShell from "./ElementShell";
import type { CanvasElementProps } from "@/plugins/registry";
import type { ShapeElement as ShapeElementType } from "@/store/types";

export default function ShapeElement({
  element,
  isSelected,
  onSelect,
  interactive,
  elementRef,
}: CanvasElementProps) {
  if (element.type !== "shape") {
    return null;
  }

  const shapeElement = element as ShapeElementType;
  const { shapeType, fillColor, strokeColor, strokeWidth } = shapeElement.props;

  const isCircle = shapeType === "circle";
  const isLine = shapeType === "line";

  return (
    <ElementShell
      element={shapeElement}
      isSelected={isSelected}
      onSelect={onSelect}
      interactive={interactive}
      ref={elementRef}
      noShadow={isLine}
      className={isCircle ? "rounded-full" : ""}
      style={{
        backgroundColor: isLine ? "transparent" : fillColor,
        border: isLine ? "none" : `${strokeWidth}px solid ${strokeColor}`,
        ...(isCircle && { borderRadius: "50%" }),
      }}
    >
      {isLine && (
        <div 
          className="absolute inset-x-0 top-1/2 -translate-y-1/2" 
          style={{ 
            backgroundColor: strokeColor || fillColor,
            height: `${strokeWidth || 2}px`,
          }} 
        />
      )}
    </ElementShell>
  );
}
