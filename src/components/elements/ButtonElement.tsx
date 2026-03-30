import ElementShell from "./ElementShell";
import type { CanvasElementProps } from "@/plugins/registry";
import { Button as UIButton } from "@/components/ui/button";

export default function ButtonElement({
  element,
  isSelected,
  onSelect,
  interactive,
  onAction,
  elementRef,
}: CanvasElementProps) {
  if (element.type !== "button") {
    return null;
  }

  const handleAction = () => {
    onAction?.(element);
  };

  return (
    <ElementShell
      element={element}
      isSelected={isSelected}
      onSelect={onSelect}
      interactive={interactive}
      className="rounded-2xl border-border bg-card"
      ref={elementRef}
    >
      <UIButton
        type="button"
        variant="default"
        className="h-full w-full rounded-none border-0 px-4 py-3 text-center leading-tight shadow-none hover:brightness-105"
        style={{
          backgroundColor: element.props.backgroundColor,
          color: element.props.textColor,
          fontSize: element.props.buttonSize,
        }}
        onClick={interactive === false ? handleAction : undefined}
      >
        {element.props.label}
      </UIButton>
    </ElementShell>
  );
}