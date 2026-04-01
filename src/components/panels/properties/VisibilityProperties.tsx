import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import type { SlideElementPatch, SlideElement } from "@/store/editorStore";
import { PropertyCard } from "./PropertyCard";
import { Eye } from "lucide-react";
import { AnimationProperties } from "./AnimationProperties";

type VisibilityPropertiesProps = {
  element: SlideElement;
  updateElement: (id: string, patch: SlideElementPatch) => void;
};

export function VisibilityProperties({ element, updateElement }: VisibilityPropertiesProps) {
  return (
    <PropertyCard 
      title="Hiển thị" 
      icon={<Eye className="w-4 h-4 text-purple-500" />}
    >
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Định danh phần tử</Label>
          <Input
            placeholder={`ví dụ: ${element.type} (ID nội bộ: ${element.id.slice(0, 5)})`}
            value={element.name || ""}
            onChange={(e) => updateElement(element.id, { name: e.target.value })}
            className="bg-white border-slate-200 h-9 text-xs"
          />
          <p className="text-[10px] text-slate-500 leading-tight">
            Tên gợi nhớ để nhắm tới phần tử này bằng các kích hoạt (Triggers).
          </p>
        </div>

        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
          <div className="space-y-0.5">
            <Label className="text-[10px] font-bold uppercase tracking-tight text-slate-700">Ẩn khi bắt đầu</Label>
            <p className="text-[10px] text-slate-500 leading-tight">
              Phần tử không hiển thị khi tải.
            </p>
          </div>
          <Switch
            checked={!!element.hidden}
            onCheckedChange={(checked) => updateElement(element.id, { hidden: checked })}
          />
        </div>

        <AnimationProperties element={element} updateElement={updateElement} />
      </div>
    </PropertyCard>
  );
}
