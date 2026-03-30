import type { RefObject } from "react";
import ElementRenderer from "@/components/elements/ElementRenderer";
import type { DeviceOption } from "@/constants/previewDevices";
import { baseSlide } from "@/constants/previewDevices";
import type { SlideElement } from "@/store/editorStore";

type PreviewViewportProps = {
  viewportRef: RefObject<HTMLDivElement | null>;
  device: DeviceOption;
  frameWidth: number;
  frameHeight: number;
  frameScale: number;
  actionMessage: string | null;
  elements: SlideElement[];
  handleElementAction: (element: SlideElement) => void;
  animationClass: string;
  currentSlideId: string;
  currentSlideAnimation: string;
  currentSlideBackground: string;
  elementVisibilityOverrides: Record<string, boolean>;
  minDuration?: number;
};

export function PreviewViewport({
  viewportRef,
  device,
  frameWidth,
  frameHeight,
  frameScale,
  actionMessage,
  elements,
  handleElementAction,
  animationClass,
  currentSlideId,
  currentSlideAnimation,
  currentSlideBackground,
  elementVisibilityOverrides,
  minDuration = 0,
}: PreviewViewportProps) {
  return (
    <div className="flex-1 px-6 py-6">
      <div
        ref={viewportRef}
        className="flex h-full w-full items-center justify-center rounded-[32px] border border-slate-200/70 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.08),_transparent_65%)]"
      >
        <div className="relative" style={{ width: frameWidth, height: frameHeight }}>
          {actionMessage && (
            <div className="absolute left-1/2 top-4 z-[100] -translate-x-1/2 animate-in fade-in zoom-in-95 duration-200">
               <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/95 px-6 py-2.5 text-sm font-semibold text-slate-800 shadow-2xl shadow-slate-900/20 backdrop-blur-md">
                 {actionMessage}
               </div>
            </div>
          )}
          <div
            className="rounded-[34px] bg-slate-900 p-3 shadow-[0_30px_90px_-40px_rgba(15,23,42,0.65)]"
            style={{
              width: device.width,
              height: device.height,
              transform: `scale(${frameScale})`,
              transformOrigin: "top left",
            }}
          >
            <div 
              key={`${currentSlideId}-${currentSlideAnimation}`}
              className={`relative h-full w-full overflow-hidden rounded-[26px] ${animationClass}`}
              style={{ backgroundColor: currentSlideBackground }}
            >
              {minDuration > 0 && (
                <div 
                  className="absolute bottom-0 left-0 h-0.5 bg-blue-500/40 z-50 animate-progress-grow origin-left"
                  style={{ 
                    animationDuration: `${minDuration}s`
                  }} 
                />
              )}
              <div className="absolute inset-0 bg-[linear-gradient(160deg,_rgba(226,232,240,0.5),_transparent_45%)]" />
              <div
                className="absolute left-1/2 top-1/2"
                style={{
                  width: baseSlide.width,
                  height: baseSlide.height,
                  // Use absolute centering for perfect alignment regardless of scale/overflow
                  transform: `translate(-50%, -50%) scale(${Math.min((device.width - 24) / baseSlide.width, (device.height - 24) / baseSlide.height)})`,
                  transformOrigin: "center center",
                }}
              >
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
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-medium uppercase tracking-[0.4em] text-slate-400 opacity-60">
            {device.width} x {device.height}
          </div>
        </div>
      </div>
    </div>
  );
}
