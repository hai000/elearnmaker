import type { PropertiesPanelProps } from "@/plugins/registry";
import { ColorPickerField } from "@/components/ui/color-picker";
import { PropertyCard } from "./properties/PropertyCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VisibilityProperties } from "./properties/VisibilityProperties";
import { FerrisWheel, Settings2, Palette } from "lucide-react";

const textColorSwatches = ["#0F172A", "#334155", "#166534", "#0F766E", "#1D4ED8", "#EF4444"];
const surfaceSwatches = ["#ECFDF5", "#F0FDF4", "#FFFFFF", "#F8FAFC", "#FFF7ED", "#FEF3C7"];

export default function WheelProperties({ element, updateElement }: PropertiesPanelProps) {
  if (element.type !== "wheel_plugin") {
    return null;
  }

  return (
    <div className="space-y-4 pb-6">
      <PropertyCard 
        title="Cấu hình Vòng quay" 
        icon={<FerrisWheel className="w-4 h-4 text-emerald-600" />}
        className="border-emerald-200 bg-emerald-50/30"
      >
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">Tiêu đề</Label>
            <Input
              value={element.props.title}
              onChange={(event) =>
                updateElement(element.id, {
                  props: { ...element.props, title: event.target.value },
                })
              }
              className="bg-white border-emerald-100 h-9 text-xs"
            />
          </div>
          <div className="grid gap-2">
            <Label className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">Chế độ</Label>
            <Input
              value={element.props.mode}
              onChange={(event) =>
                updateElement(element.id, {
                  props: { ...element.props, mode: event.target.value },
                })
              }
              className="bg-white border-emerald-100 h-9 text-xs"
            />
          </div>
        </div>
      </PropertyCard>

      <PropertyCard 
        title="Giao diện & Màu sắc" 
        icon={<Palette className="w-4 h-4 text-emerald-500" />}
        className="border-emerald-100 bg-emerald-50/20"
      >
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">Cỡ chữ tiêu đề</Label>
            <Input
              type="number"
              min={12}
              max={48}
              value={element.props.titleSize}
              onChange={(event) =>
                updateElement(element.id, {
                  props: { ...element.props, titleSize: Number(event.target.value) || 0 },
                })
              }
              className="bg-white border-emerald-100 h-8 text-xs w-24"
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
    </div>
  );
}
