"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useEditorStore, type SlideElement } from "@/store/editorStore";
import { baseSlide } from "@/constants/previewDevices";
import ElementRenderer from "@/components/elements/ElementRenderer";

export function StandaloneViewer() {
  const currentSlideId = useEditorStore((state) => state.currentSlideId);
  const slides = useEditorStore((state) => state.slides);
  const allElements = useEditorStore((state) => state.elements);
  const selectSlide = useEditorStore((state) => state.selectSlide);
  const emitEditorEvent = useEditorStore((state) => state.emitEditorEvent);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [elementVisibilityOverrides, setElementVisibilityOverrides] = useState<Record<string, boolean>>({});
  const entryTimeRef = useRef(0);
  const messageTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Responsive Scaling Observer
  useLayoutEffect(() => {
    const updateScale = () => {
      // Use window dimensions for the source of truth to avoid container growth loops
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      const scaleX = windowWidth / baseSlide.width;
      const scaleY = windowHeight / baseSlide.height;
      
      // Use a slightly larger buffer (0.95) for reliability on mobile bars/notches
      setScale(Math.min(scaleX, scaleY) * 0.95);
    };
    
    updateScale();
    const observer = new ResizeObserver(() => updateScale());
    if (containerRef.current) {
        observer.observe(containerRef.current);
    }
    
    window.addEventListener("resize", updateScale);
    window.addEventListener("orientationchange", () => setTimeout(updateScale, 150));
    
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateScale);
    };
  }, []);

  // Slide Lifecycle (reset context when changing screen)
  const [prevSlideId, setPrevSlideId] = useState(currentSlideId);
  if (currentSlideId !== prevSlideId) {
    setPrevSlideId(currentSlideId);
    setElementVisibilityOverrides({});
    setActionMessage(null);
  }

  useEffect(() => {
    entryTimeRef.current = Date.now();
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
      messageTimeoutRef.current = null;
    }
  }, [currentSlideId]);

  const currentSlide = slides.find((slide) => slide.id === currentSlideId);
  const currentSlideBackground = currentSlide?.backgroundColor ?? "#ffffff";
  const currentSlideAnimation = currentSlide?.animation ?? "none";
  const minDuration = currentSlide?.minDuration ?? 0;

  const animationClass = useMemo(() => {
    switch(currentSlideAnimation) {
      case "fade": return "animate-in fade-in duration-500 fill-mode-both";
      case "slide-up": return "animate-in slide-in-from-bottom-8 fade-in duration-700 fill-mode-both";
      case "slide-down": return "animate-in slide-in-from-top-8 fade-in duration-700 fill-mode-both";
      case "slide-left": return "animate-in slide-in-from-right-8 fade-in duration-700 fill-mode-both";
      case "slide-right": return "animate-in slide-in-from-left-8 fade-in duration-700 fill-mode-both";
      case "zoom": return "animate-in zoom-in-95 fade-in duration-500 fill-mode-both";
      default: return "";
    }
  }, [currentSlideAnimation]);

  const elements = useMemo(
    () => allElements.filter((element) => element.slideId === currentSlideId),
    [allElements, currentSlideId]
  );

  const showMessage = (msg: string, duration = 2500) => {
    setActionMessage(msg);
    if (messageTimeoutRef.current) clearTimeout(messageTimeoutRef.current);
    messageTimeoutRef.current = setTimeout(() => {
      setActionMessage(null);
      messageTimeoutRef.current = null;
    }, duration);
  };

  const handleElementAction = (element: SlideElement) => {
    if (element.type === "button") {
      const actionType = element.props.actionType;

      if (actionType === "go_to_slide") {
        if (!currentSlide) return;
        const slideMinDuration = currentSlide.minDuration ?? 0;
        if (slideMinDuration > 0) {
          const elapsedSeconds = (Date.now() - entryTimeRef.current) / 1000;
          if (elapsedSeconds < slideMinDuration) {
             const remaining = Math.ceil(slideMinDuration - elapsedSeconds);
             showMessage(`🔒 Hệ thống yêu cầu xem đủ học liệu. Bạn cần xem thêm ${remaining}s nữa.`);
             return;
          }
        }

        const targetSlideId = element.props.targetSlideId?.trim() ?? "";
        const targetSlide = slides.find((slide) => slide.id === targetSlideId);
        
        if (targetSlide) {
          emitEditorEvent({
            type: "button.go_to_slide",
            source: "button",
            slideId: currentSlideId,
            elementId: element.id,
            payload: { targetSlideId: targetSlide.id },
          });
          selectSlide(targetSlide.id);
        } else {
          showMessage(`Trang đích không khả dụng: ${targetSlideId}`);
        }
      } else if (actionType === "show_element") {
        const targetIds: string[] = Array.isArray(element.props.targetElementIds) 
          ? element.props.targetElementIds 
          : [];

        if (targetIds.length > 0) {
          emitEditorEvent({
            type: "button.show_element",
            source: "button",
            slideId: currentSlideId,
            elementId: element.id,
            payload: { targetElementIds: targetIds },
          });

          setElementVisibilityOverrides((prev) => {
            const next = { ...prev };
            targetIds.forEach((id) => {
              next[id] = true;
            });
            return next;
          });
        }
      }
    }
  };

  if (!currentSlide) return null;

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center bg-[#0a0a0a] relative select-none">
       {/* Global System Alerts */}
       {actionMessage && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-top-4 duration-300">
           <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/95 px-6 py-2.5 text-sm font-semibold text-slate-800 shadow-xl backdrop-blur-md">
             {actionMessage}
           </div>
        </div>
      )}

      {/* 
         Scale Wrapper: 
         - The outer div has the EXACT scaled dimensions.
         - This allows the parent (flex items-center justify-center) to center it correctly.
      */}
      <div 
        style={{
            width: baseSlide.width * scale,
            height: baseSlide.height * scale,
        }}
        className="relative shadow-2xl overflow-hidden ring-1 ring-white/10 flex items-center justify-center"
      >
        <div 
            style={{
               width: baseSlide.width,
               height: baseSlide.height,
               transform: `scale(${scale})`,
               transformOrigin: "top left",
               position: "absolute",
               top: 0,
               left: 0,
            }}
            className="overflow-hidden"
        >
          <div 
             key={`${currentSlideId}-${currentSlideAnimation}`}
             className={`relative h-full w-full ${animationClass}`}
             style={{ backgroundColor: currentSlideBackground }}
          >
              {/* Visual Timeline Lock feedback */}
              {minDuration > 0 && (
                <div 
                  className="absolute bottom-0 left-0 h-1 bg-violet-500 z-[9999] animate-progress-grow origin-left"
                  style={{ animationDuration: `${minDuration}s` }} 
                />
              )}
             
              <div className="absolute inset-0 bg-[linear-gradient(160deg,_rgba(226,232,240,0.5),_transparent_45%)] mix-blend-multiply opacity-50" />
              
              <div className="absolute inset-0">
                 {elements.map((element) => {
                    let isVisible = !element.hidden;
                    if (elementVisibilityOverrides[element.id] !== undefined) {
                      isVisible = elementVisibilityOverrides[element.id];
                    }

                    if (!isVisible) return null;

                    return (
                      <ElementRenderer
                        key={element.id}
                        element={element}
                        isSelected={false}
                        onSelect={() => {}}
                        interactive={false}
                        onAction={handleElementAction}
                      />
                    );
                  })}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
