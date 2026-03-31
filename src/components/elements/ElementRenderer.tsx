import { memo } from "react";
import { type SlideElement, useEditorStore } from "@/store/editorStore";
import { pluginRegistry } from "@/plugins/registry";

type ElementRendererProps = {
  element: SlideElement;
  isSelected: boolean;
  onSelect: () => void;
  interactive?: boolean;
  onAction?: (element: SlideElement) => void;
  elementRef?: (node: HTMLDivElement | null) => void;
};

const ElementRenderer = memo(function ElementRenderer({
  element,
  isSelected,
  onSelect,
  interactive,
  onAction,
  elementRef,
}: ElementRendererProps) {
  const showHiddenElements = useEditorStore((state) => state.showHiddenElements);
  
  if (interactive !== false && element.hidden && !showHiddenElements) {
    return null;
  }

  const registryEntry = pluginRegistry[element.type];
  if (!registryEntry) {
    return null;
  }
  const CanvasComponent = registryEntry.canvasComponent;
  return (
    <CanvasComponent
      element={element}
      isSelected={isSelected}
      onSelect={onSelect}
      interactive={interactive}
      onAction={onAction}
      elementRef={elementRef}
    />
  );
});

export default ElementRenderer;
