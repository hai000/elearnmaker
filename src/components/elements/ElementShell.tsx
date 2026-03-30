import type { SlideElement } from "@/store/editorStore";
import { forwardRef } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const selectedRing = "ring-2 ring-blue-400 ring-offset-2";
const hoverShadow = "hover:shadow-md";

type ElementShellProps = {
  element: SlideElement;
  isSelected: boolean;
  onSelect: () => void;
  className: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  interactive?: boolean;
};

const ElementShell = forwardRef<HTMLDivElement, ElementShellProps>(
  (
    { element, isSelected, onSelect, className, children, style, interactive = true },
    ref
  ) => {
    const animationClass = (() => {
      if (!element.animation || element.animation === "none") return "";
      
      const base = "animate-in duration-500 fill-mode-both";
      switch (element.animation) {
        case "fade": return `${base} fade-in`;
        case "zoom": return `${base} zoom-in-95 fade-in`;
        case "slide-up": return `${base} slide-in-from-bottom-8 fade-in`;
        case "slide-down": return `${base} slide-in-from-top-8 fade-in`;
        case "slide-left": return `${base} slide-in-from-right-8 fade-in`;
        case "slide-right": return `${base} slide-in-from-left-8 fade-in`;
        case "bounce": return `${base} zoom-in-75 fade-in duration-700 ease-out`;
        default: return "";
      }
    })();

    return (
      <Card
        ref={ref}
        key={`${element.id}-${element.animation}`}
        className={cn(
          "absolute overflow-hidden p-0 shadow-sm transition-shadow",
          interactive ? "cursor-pointer" : "cursor-default",
          className,
          interactive ? (isSelected ? selectedRing : hoverShadow) : null,
          animationClass
        )}
        style={{
          left: element.x,
          top: element.y,
          width: element.width,
          height: element.height,
          transform: `rotate(${element.rotation}deg)`,
          borderRadius: element.borderRadius,
          zIndex: isSelected ? (element.zIndex ?? 0) + 1 : (element.zIndex ?? 0),
          ...style,
        }}
        onClick={interactive ? onSelect : undefined}
        role={interactive ? "button" : undefined}
        tabIndex={interactive ? 0 : -1}
        onKeyDown={
          interactive
            ? (event) => {
                if (event.key === "Enter") {
                  onSelect();
                }
              }
            : undefined
        }
      >
        {children}
      </Card>
    );
  }
);

ElementShell.displayName = "ElementShell";

export default ElementShell;
