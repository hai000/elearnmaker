"use client";

import ElementRenderer from "@/components/elements/ElementRenderer";
import { useEditorStore } from "@/store/editorStore";
import { useEffect, useMemo, useRef, useState } from "react";
import { SelectionTransformControls } from "./canvas/SelectionTransformControls";
import { elementInitialData } from "@/constants/sidebarElements";
import { baseSlide } from "@/constants/previewDevices";
import { useLayoutEffect } from "react";

export default function CanvasArea() {
  const elements = useEditorStore((state) => state.elements);
  const slides = useEditorStore((state) => state.slides);
  const currentSlideId = useEditorStore((state) => state.currentSlideId);
  const selectedId = useEditorStore((state) => state.selectedId);
  const selectElement = useEditorStore((state) => state.selectElement);
  const addElement = useEditorStore((state) => state.addElement);
  const updateElement = useEditorStore((state) => state.updateElement);
  const deleteElement = useEditorStore((state) => state.deleteElement);
  const undo = useEditorStore((state) => state.undo);
  const redo = useEditorStore((state) => state.redo);
  const saveSnapshot = useEditorStore((state) => state.saveSnapshot);
  const zoom = useEditorStore((state) => state.zoom);
  const setZoom = useEditorStore((state) => state.setZoom);
  const isEditingText = useEditorStore((state) => state.isEditingText);

  const currentSlideElements = useMemo(
    () => elements.filter((element) => element.slideId === currentSlideId),
    [currentSlideId, elements]
  );
  const currentSlideBackground = useMemo(
    () => slides.find((slide) => slide.id === currentSlideId)?.backgroundColor ?? "#ffffff",
    [currentSlideId, slides]
  );
  const currentSlideAnimation = useMemo(
    () => slides.find((slide) => slide.id === currentSlideId)?.animation ?? "none",
    [currentSlideId, slides]
  );

  const animationClass = useMemo(() => {
    switch(currentSlideAnimation) {
      case "fade": return "animate-in fade-in duration-500 fill-mode-both";
      case "slide-up": return "animate-in slide-in-from-bottom-8 fade-in duration-700 fill-mode-both";
      case "zoom": return "animate-in zoom-in-95 fade-in duration-500 fill-mode-both";
      default: return "";
    }
  }, [currentSlideAnimation]);

  const selectedElement = useMemo(
    () => currentSlideElements.find((element) => element.id === selectedId),
    [currentSlideElements, selectedId]
  );
  const elementRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [selectedTarget, setSelectedTarget] = useState<HTMLDivElement | null>(null);
  
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateSize = () => {
      const rect = el.getBoundingClientRect();
      setContainerSize({ width: rect.width, height: rect.height });
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scale = useMemo(() => {
    if (zoom > 0) return zoom;
    if (!containerSize.width || !containerSize.height) return 1;
    // We want the 960x540 canvas to fit comfortably. 
    // Usually we want a little bit of padding around it.
    const padding = 16;
    return Math.min(
      (containerSize.width - padding) / baseSlide.width,
      (containerSize.height - padding) / baseSlide.height
    );
  }, [containerSize, zoom]);

  const [prevSelectedId, setPrevSelectedId] = useState(selectedId);
  if (selectedId !== prevSelectedId) {
    setPrevSelectedId(selectedId);
    if (!selectedId) {
      setSelectedTarget(null);
    }
  }

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        const currentZoom = zoom > 0 ? zoom : scale;
        const nextZoom = Math.max(0.1, Math.min(5, currentZoom + delta));
        setZoom(Number(nextZoom.toFixed(2)));
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle Undo / Redo regardless of input focus status
      const isInputFocused =
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA" ||
        (document.activeElement as HTMLElement)?.isContentEditable;

      if (!isInputFocused) {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
          if (e.shiftKey) {
            redo();
          } else {
            undo();
          }
          e.preventDefault();
          return;
        }

        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
          redo();
          e.preventDefault();
          return;
        }

        if ((e.key === "Delete" || e.key === "Backspace") && selectedId) {
          deleteElement(selectedId);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [selectedId, deleteElement, undo, redo, zoom, scale, setZoom]);

  return (
    <div 
      ref={containerRef}
      className="relative flex min-h-0 flex-1 overflow-auto p-2 bg-slate-50/50"
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) selectElement(null);
      }}
    >
        <div 
          className="relative flex min-h-0 flex-1 items-center justify-center font-[var(--font-display)]"
          style={{ 
            minWidth: zoom > 0 ? (baseSlide.width * scale) + 20 : "100%", 
            minHeight: zoom > 0 ? (baseSlide.height * scale) + 20 : "100%" 
          }}
          onPointerDown={(e) => {
            if (e.target === e.currentTarget) selectElement(null);
          }}
        >
          <div 
            className="absolute inset-0 bg-slate-50/80" 
            style={{ 
              backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)', 
              backgroundSize: `${24 * scale}px ${24 * scale}px`,
              backgroundAttachment: 'local'
            }}
            onPointerDown={(e) => {
              if (e.target === e.currentTarget) selectElement(null);
            }}
          />
          <div 
            key={`${currentSlideId}-${currentSlideAnimation}`}
            className={`relative flex-none overflow-hidden rounded-md border border-slate-300 shadow-xl ring-1 ring-slate-900/10 ${animationClass}`}
            style={{ 
              backgroundColor: currentSlideBackground,
              width: baseSlide.width,
              height: baseSlide.height,
              minWidth: baseSlide.width,
              minHeight: baseSlide.height,
              transform: `scale(${scale})`,
              transformOrigin: "center center",
              transition: "transform 0.1s ease-out" 
            }}
            onPointerDown={(e) => {
              if (e.target === e.currentTarget) selectElement(null);
            }}
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = "copy";
            }}
            onDrop={(e) => {
              e.preventDefault();
              const dataStr = e.dataTransfer.getData("application/json");
              if (!dataStr) return;
              try {
                const { type, item } = JSON.parse(dataStr);
                if (type === "element" && elementInitialData[item]) {
                  const data = elementInitialData[item];
                  if (data) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    // Divide by scale to get logical positions
                    const x = (e.clientX - rect.left) / scale - (data.width / 2);
                    const y = (e.clientY - rect.top) / scale - (data.height / 2);
                    addElement({
                      ...data,
                      x: Math.max(0, x),
                      y: Math.max(0, y)
                    } as Parameters<typeof addElement>[0]);
                  }
                }
              } catch (err) {
                console.error("Drop error", err);
              }
            }}
          >
          {currentSlideElements.map((element) => {
            const isSelected = element.id === selectedId;
            return (
              <ElementRenderer
                key={element.id}
                element={element}
                isSelected={isSelected}
                onSelect={() => selectElement(element.id)}
                elementRef={(node) => {
                  elementRefs.current[element.id] = node;
                  if (element.id === selectedId) {
                    setSelectedTarget(node);
                  }
                }}
              />
            );
          })}
          {selectedElement && selectedTarget && !isEditingText ? (
            <SelectionTransformControls
              selectedElement={selectedElement}
              selectedTarget={selectedTarget}
              updateElement={updateElement}
              saveSnapshot={saveSnapshot}
              scale={scale}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
