import type { PropertiesPanelProps } from "@/plugins/registry";
import { ColorPickerField } from "@/components/ui/color-picker";
import { PropertyCard } from "./properties/PropertyCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VisibilityProperties } from "./properties/VisibilityProperties";
import { ActionProperties } from "./properties/ActionProperties";
import { MousePointer2, Eye } from "lucide-react";

const textColorSwatches = ["#FFFFFF", "#0F172A", "#2563EB", "#0F766E", "#DC2626"];
const surfaceSwatches = ["#2563EB", "#0F172A", "#F59E0B", "#10B981", "#7C3AED"];

export default function ButtonProperties({ element, updateElement }: PropertiesPanelProps) {
  if (element.type !== "button") {
    return null;
  }

  return (
    <div className="space-y-4 pb-6">
      <PropertyCard 
        title="Thiết lập Nút" 
        icon={<MousePointer2 className="w-4 h-4 text-blue-500" />}
      >
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nhãn (Label)</Label>
            <Input
              value={element.props.label}
              onChange={(event) =>
                updateElement(element.id, {
                  props: { ...element.props, label: event.target.value },
                })
              }
              className="bg-white border-slate-200 h-9 text-xs font-medium"
            />
          </div>

          <div className="grid gap-2">
            <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Kích thước chữ</Label>
            <Input
              type="number"
              min={10}
              max={36}
              value={element.props.buttonSize}
              onChange={(event) =>
                updateElement(element.id, {
                  props: { ...element.props, buttonSize: Number(event.target.value) || 0 },
                })
              }
              className="bg-slate-50 h-8 text-xs w-24"
            />
          </div>

          <div className="grid gap-4 pt-1">
            <ColorPickerField
              label="Màu chữ"
              value={element.props.textColor}
              swatches={textColorSwatches}
              onChange={(nextColor) =>
                updateElement(element.id, {
                  props: { ...element.props, textColor: nextColor },
                })
              }
            />
            <ColorPickerField
              label="Màu nền"
              value={element.props.backgroundColor}
              swatches={surfaceSwatches}
              onChange={(nextColor) =>
                updateElement(element.id, {
                  props: { ...element.props, backgroundColor: nextColor },
                })
              }
            />
          </div>
        </div>
      </PropertyCard>

      <VisibilityProperties element={element} updateElement={updateElement} />

      <ActionProperties 
        element={element}
        updateElement={updateElement}
        title="Hành động khi nhấn"
      />
    </div>
  );
}