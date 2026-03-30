"use client";

import { useRef } from "react";
import { useEditorStore } from "@/store/editorStore";
import { pluginRegistry } from "@/plugins/registry";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { ColorPaletteCard } from "./properties/ColorPaletteCard";
import { ColorPickerField } from "@/components/ui/color-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const surfaceSwatches = ["#FFFFFF", "#F8FAFC", "#EFF6FF", "#F5F3FF", "#ECFDF5", "#FFF7ED"];

export default function PropertiesPanel() {
  const selectedId = useEditorStore((state) => state.selectedId);
  const element = useEditorStore((state) =>
    state.elements.find((item) => item.id === selectedId)
  );
  const currentSlideId = useEditorStore((state) => state.currentSlideId);
  const currentSlide = useEditorStore((state) => state.slides.find((s) => s.id === state.currentSlideId));
  const updateSlide = useEditorStore((state) => state.updateSlide);
  const updateElement = useEditorStore((state) => state.updateElement);
  const deleteElement = useEditorStore((state) => state.deleteElement);
  const saveSnapshot = useEditorStore((state) => state.saveSnapshot);
  const registryEntry = element ? pluginRegistry[element.type] : null;
  const PropertiesComponent = registryEntry?.propertiesPanel;
  
  const lastSnapshotTime = useRef(0);
  const handleInteractionStart = () => {
    const now = Date.now();
    if (now - lastSnapshotTime.current > 1000) {
      saveSnapshot();
      lastSnapshotTime.current = now;
    }
  };

  return (
    <aside 
      className="flex h-full min-h-0 w-80 flex-col border-l border-slate-200/80 bg-white/85"
      onPointerDownCapture={handleInteractionStart}
      onFocusCapture={handleInteractionStart}
    >
      <div className="flex items-center justify-between px-5 py-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Element Properties
        </p>
        <Button variant="outline" size="sm">
          Reset
        </Button>
      </div>
      <Separator />
      <ScrollArea className="flex min-h-0 flex-1 px-5 py-5">
        {!element ? (
          <Card className="mx-px border bg-white">
            <CardHeader className="space-y-3">
              <CardTitle className="text-base">Slide Properties</CardTitle>
              <CardDescription>
                Edit properties for the current slide.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 text-sm text-slate-500">
              <ColorPickerField
                label="Background Color"
                value={currentSlide?.backgroundColor || "#ffffff"}
                swatches={surfaceSwatches}
                description="Màu nền toàn bề mặt slide"
                onChange={(nextColor) =>
                  updateSlide(currentSlideId, { backgroundColor: nextColor })
                }
              />
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <Label className="text-xs font-semibold text-slate-500">Entrance Animation</Label>
                <Select
                  value={currentSlide?.animation || "none"}
                  onValueChange={(value) => updateSlide(currentSlideId, { animation: value })}
                >
                  <SelectTrigger className="w-full bg-slate-50">
                    <SelectValue placeholder="Select animation..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="fade">Fade In</SelectItem>
                    <SelectItem value="slide-up">Slide Up</SelectItem>
                    <SelectItem value="zoom">Zoom In</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500">Minimum Viewing Time</Label>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                    {currentSlide?.minDuration || 0}s
                  </span>
                </div>
                <Slider
                  min={0}
                  max={60}
                  step={1}
                  value={[currentSlide?.minDuration || 0]}
                  onPointerDownCapture={handleInteractionStart}
                  onValueChange={(value) =>
                    updateSlide(currentSlideId, { minDuration: value[0] })
                  }
                />
                <p className="text-[10px] text-slate-400 leading-relaxed italic">
                  Prevents navigation to the next slide until the specified time has passed during preview.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 px-px py-px">
            <Card className="mx-px">
              <CardHeader className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <CardTitle className="text-base capitalize">{element.type}</CardTitle>
                    <CardDescription>ID: {element.id}</CardDescription>
                  </div>
                  <Badge variant="secondary">Selected</Badge>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs text-slate-500">
                    {Math.round(element.width)} x {Math.round(element.height)}
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteElement(element.id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="grid gap-3 text-xs text-slate-500">
                <div className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2">
                  <span>Position</span>
                  <span>
                    {Math.round(element.x)} x {Math.round(element.y)}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2">
                  <span>Size</span>
                  <span>
                    {Math.round(element.width)} x {Math.round(element.height)}
                  </span>
                </div>
                <div className="rounded-xl border border-slate-200 px-3 py-2">
                  <div className="flex items-center justify-between">
                    <span>Corner Radius</span>
                    <span>{Math.round(element.borderRadius)}px</span>
                  </div>
                  <div className="mt-3">
                    <Slider
                      min={0}
                      max={48}
                      step={1}
                      value={[element.borderRadius]}
                      onPointerDownCapture={handleInteractionStart}
                      onValueChange={(value) =>
                        updateElement(element.id, {
                          borderRadius: value[0] ?? 0,
                        })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {PropertiesComponent ? (
              <PropertiesComponent element={element} updateElement={updateElement} />
            ) : null}

            <ColorPaletteCard />
          </div>
        )}
      </ScrollArea>
    </aside>
  );
}
