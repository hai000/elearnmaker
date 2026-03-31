import { useRef } from "react";
import Moveable from "react-moveable";
import type { SlideElement } from "@/store/editorStore";
import { useEditorStore } from "@/store/editorStore";

type SelectionTransformControlsProps = {
  selectedElement: SlideElement;
  selectedTarget: HTMLElement;
  updateElement: (id: string, patch: Partial<SlideElement>) => void;
  saveSnapshot: () => void;
  scale: number;
};

export function SelectionTransformControls({
  selectedElement,
  selectedTarget,
  updateElement,
  saveSnapshot,
  scale,
}: SelectionTransformControlsProps) {
  const dragOrigin = useRef<{ x: number; y: number } | null>(null);
  const resizeOrigin = useRef<{ x: number; y: number } | null>(null);
  const resizeDraft = useRef<{ width: number; height: number; x: number; y: number } | null>(null);
  const setIsEditingText = useEditorStore((state) => state.setIsEditingText);

  return (
    <Moveable
      target={selectedTarget}
      draggable
      resizable
      rotatable
      origin={false}
      zoom={1 / scale}
      onClick={(event) => {
        if (event.isDouble && (selectedElement.type === "text" || selectedElement.type === "card")) {
          setIsEditingText(true);
        }
      }}
      onDragStart={(event) => {
        saveSnapshot();
        dragOrigin.current = {
          x: selectedElement.x,
          y: selectedElement.y,
        };
        event.set([0, 0]);
      }}
      onDrag={(event) => {
        if (!dragOrigin.current) {
          return;
        }
        updateElement(selectedElement.id, {
          x: dragOrigin.current.x + event.beforeTranslate[0] / scale,
          y: dragOrigin.current.y + event.beforeTranslate[1] / scale,
        });
      }}
      onResizeStart={(event) => {
        saveSnapshot();
        resizeOrigin.current = {
          x: selectedElement.x,
          y: selectedElement.y,
        };
        resizeDraft.current = {
          width: selectedElement.width,
          height: selectedElement.height,
          x: selectedElement.x,
          y: selectedElement.y,
        };
        if (event.dragStart) {
          event.dragStart.set([0, 0]);
        }
      }}
      onResize={(event) => {
        if (!resizeOrigin.current) {
          return;
        }
        const x = resizeOrigin.current.x + event.drag.beforeTranslate[0] / scale;
        const y = resizeOrigin.current.y + event.drag.beforeTranslate[1] / scale;
        resizeDraft.current = {
          width: event.width,
          height: event.height,
          x,
          y,
        };
        const target = event.target as HTMLElement;
        target.style.width = `${event.width}px`;
        target.style.height = `${event.height}px`;
        target.style.left = `${x}px`;
        target.style.top = `${y}px`;
      }}
      onResizeEnd={() => {
        if (!resizeDraft.current) {
          return;
        }
        updateElement(selectedElement.id, resizeDraft.current);
        resizeDraft.current = null;
        resizeOrigin.current = null;
      }}
      onRotateStart={(event) => {
        saveSnapshot();
        event.set(selectedElement.rotation);
      }}
      onRotate={(event) => {
        updateElement(selectedElement.id, {
          rotation: event.beforeRotate,
        });
      }}
    />
  );
}
