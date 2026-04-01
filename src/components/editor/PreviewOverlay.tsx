"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import { useEditorStore } from "@/store/editorStore";
import { type DeviceOption, deviceOptions } from "@/constants/previewDevices";
import { PreviewHeader } from "./preview/PreviewHeader";
import { PreviewViewport } from "./preview/PreviewViewport";

type PreviewOverlayProps = {
  open: boolean;
  onClose: () => void;
};

export default function PreviewOverlay({ open, onClose }: PreviewOverlayProps) {
  const currentSlideId = useEditorStore((state) => state.currentSlideId);
  const slides = useEditorStore((state) => state.slides);
  const allElements = useEditorStore((state) => state.elements);
  const selectSlide = useEditorStore((state) => state.selectSlide);
  const emitEditorEvent = useEditorStore((state) => state.emitEditorEvent);
  const [deviceId, setDeviceId] = useState<DeviceOption["id"]>("desktop");
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [elementVisibilityOverrides, setElementVisibilityOverrides] = useState<Record<string, boolean>>({});
  const entryTimeRef = useRef(0);
  const messageTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const [prevSlideId, setPrevSlideId] = useState(currentSlideId);
  const [prevOpen, setPrevOpen] = useState(open);

  if (currentSlideId !== prevSlideId || open !== prevOpen) {
    setPrevSlideId(currentSlideId);
    setPrevOpen(open);
    setElementVisibilityOverrides({});
    setActionMessage(null);
  }

  useEffect(() => {
    entryTimeRef.current = Date.now();
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
      messageTimeoutRef.current = null;
    }
  }, [currentSlideId, open]);

  const currentSlide = slides.find((slide) => slide.id === currentSlideId);
  const currentSlideTitle = currentSlide?.title ?? "Xem trước";
  const currentSlideBackground = currentSlide?.backgroundColor ?? "#ffffff";
  const currentSlideAnimation = currentSlide?.animation ?? "none";
  
  const animationClass = useMemo(() => {
    switch(currentSlideAnimation) {
      case "fade": return "animate-in fade-in duration-500 fill-mode-both";
      case "slide-up": return "animate-in slide-in-from-bottom-8 fade-in duration-700 fill-mode-both";
      case "zoom": return "animate-in zoom-in-95 fade-in duration-500 fill-mode-both";
      default: return "";
    }
  }, [currentSlideAnimation]);
  const elements = useMemo(
    () => allElements.filter((element) => element.slideId === currentSlideId),
    [allElements, currentSlideId]
  );

  useLayoutEffect(() => {
    if (!open) {
      return;
    }
    const element = viewportRef.current;
    if (!element) {
      return;
    }

    const rect = element.getBoundingClientRect();
    if (rect.width && rect.height) {
      setViewportSize({ width: rect.width, height: rect.height });
    }

    const observer = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect;
      if (rect) {
        setViewportSize({ width: rect.width, height: rect.height });
      }
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [open]);

  const device = deviceOptions.find((item) => item.id === deviceId) ?? deviceOptions[0];

  const frameScale = useMemo(() => {
    if (!viewportSize.width || !viewportSize.height) {
      return 0;
    }
    return Math.min(
      viewportSize.width / device.width,
      viewportSize.height / device.height,
      1
    );
  }, [device.height, device.width, viewportSize.height, viewportSize.width]);


  if (!open) {
    return null;
  }

  const frameWidth = Math.round(device.width * frameScale);
  const frameHeight = Math.round(device.height * frameScale);

  const handleElementAction = (element: (typeof elements)[number]) => {
    const state = useEditorStore.getState();
    const props = element.props as any;
    const actionType = props.actionType;
    if (!actionType || actionType === "none") return;

    if (actionType === "go_to_slide") {
      // Check Timelock
      if (currentSlide?.minDuration) {
        const elapsedSeconds = (Date.now() - entryTimeRef.current) / 1000;
        if (elapsedSeconds < currentSlide.minDuration) {
          const remaining = Math.ceil(currentSlide.minDuration - elapsedSeconds);
          setActionMessage(`🔒 Bạn cần xem thêm ${remaining}s nữa.`);
          
          if (messageTimeoutRef.current) clearTimeout(messageTimeoutRef.current);
          messageTimeoutRef.current = setTimeout(() => {
            setActionMessage(null);
            messageTimeoutRef.current = null;
          }, 2000);
          return;
        }
      }

      const targetSlideId = (props.targetSlideId || "").trim();
      const targetSlide = state.slides.find((slide) => slide.id === targetSlideId);

      if (!targetSlide) {
        emitEditorEvent({
          type: "element.go_to_slide.missing",
          source: element.type,
          slideId: state.currentSlideId,
          elementId: element.id,
          payload: { targetSlideId },
        });
        setActionMessage(`Không tìm thấy slide: ${targetSlideId || "(trống)"}`);
        return;
      }

      emitEditorEvent({
        type: "element.go_to_slide",
        source: element.type,
        slideId: currentSlideId,
        elementId: element.id,
        payload: {
          targetSlideId: targetSlide.id,
          targetSlideTitle: targetSlide.title,
        },
      });
      state.selectSlide(targetSlide.id);
      return;
    }

    if (["show_element", "hide_element", "toggle_element"].includes(actionType)) {
      const targetIds = props.targetElementIds || [];
      if (targetIds.length === 0) {
        setActionMessage("No target elements selected.");
        return;
      }

      setElementVisibilityOverrides((prev) => {
        const next = { ...prev };
        targetIds.forEach((id: string) => {
          if (actionType === "show_element") {
            next[id] = true;
          } else if (actionType === "hide_element") {
            next[id] = false;
          } else if (actionType === "toggle_element") {
            // Find the base element in the store if no override exists
            const baseElement = state.elements.find(e => e.id === id);
            const currentVal = next[id] !== undefined ? next[id] : !(baseElement?.hidden);
            next[id] = !currentVal;
          }
        });
        return next;
      });

      emitEditorEvent({
        type: `element.${actionType}`,
        source: element.type,
        slideId: currentSlideId,
        elementId: element.id,
        payload: { targetElementIds: targetIds },
      });
      return;
    }

    state.emitEditorEvent({
      type: "element.none",
      source: element.type,
      slideId: state.currentSlideId,
      elementId: element.id,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/35 backdrop-blur">
      <PreviewHeader
        currentSlideTitle={currentSlideTitle}
        deviceId={deviceId}
        setDeviceId={setDeviceId}
        onClose={onClose}
      />
      <PreviewViewport
        viewportRef={viewportRef}
        device={device}
        frameWidth={frameWidth}
        frameHeight={frameHeight}
        frameScale={frameScale}
        actionMessage={actionMessage}
        elements={elements}
        handleElementAction={handleElementAction}
        animationClass={animationClass}
        currentSlideId={currentSlideId}
        currentSlideAnimation={currentSlideAnimation}
        currentSlideBackground={currentSlideBackground}
        elementVisibilityOverrides={elementVisibilityOverrides}
        minDuration={currentSlide?.minDuration}
      />
    </div>
  );
}
