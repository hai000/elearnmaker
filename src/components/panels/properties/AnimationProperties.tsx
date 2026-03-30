"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SlideElementPatch, SlideElement } from "@/store/editorStore";

type AnimationPropertiesProps = {
  element: SlideElement;
  updateElement: (id: string, patch: SlideElementPatch) => void;
};

export function AnimationProperties({ element, updateElement }: AnimationPropertiesProps) {
  return (
    <div className="space-y-2 pt-4 border-t border-slate-100">
      <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Entrance Animation</Label>
      <Select
        value={element.animation || "none"}
        onValueChange={(value) => updateElement(element.id, { animation: value })}
      >
        <SelectTrigger className="w-full bg-slate-50/50">
          <SelectValue placeholder="Select animation..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">None (Static)</SelectItem>
          <SelectItem value="fade">Fade In</SelectItem>
          <SelectItem value="zoom">Zoom In</SelectItem>
          <SelectItem value="slide-up">Slide Up</SelectItem>
          <SelectItem value="slide-down">Slide Down</SelectItem>
          <SelectItem value="slide-left">Slide Left</SelectItem>
          <SelectItem value="slide-right">Slide Right</SelectItem>
          <SelectItem value="bounce">Bounce In</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-[10px] text-slate-400 leading-tight italic">
        Triggers when the element becomes visible in Preview.
      </p>
    </div>
  );
}
