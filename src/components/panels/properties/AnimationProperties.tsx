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
      <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Hiệu ứng vào</Label>
      <Select
        value={element.animation || "none"}
        onValueChange={(value) => updateElement(element.id, { animation: value })}
      >
        <SelectTrigger className="w-full bg-slate-50/50">
          <SelectValue placeholder="Chọn hiệu ứng..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">Không (Tĩnh)</SelectItem>
          <SelectItem value="fade">Mờ vào</SelectItem>
          <SelectItem value="zoom">Phóng to</SelectItem>
          <SelectItem value="slide-up">Trượt lên</SelectItem>
          <SelectItem value="slide-down">Trượt xuống</SelectItem>
          <SelectItem value="slide-left">Trượt trái</SelectItem>
          <SelectItem value="slide-right">Trượt phải</SelectItem>
          <SelectItem value="bounce">Nhún vào</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-[10px] text-slate-400 leading-tight italic">
        Triggers when the element becomes visible in Preview.
      </p>
    </div>
  );
}
