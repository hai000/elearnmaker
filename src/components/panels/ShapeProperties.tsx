import type { PropertiesPanelProps } from "@/plugins/registry";
import { ColorPickerField } from "@/components/ui/color-picker";
import { PropertyCard } from "./properties/PropertyCard";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { VisibilityProperties } from "./properties/VisibilityProperties";
import { Separator } from "@/components/ui/separator";
import { Shapes, Palette, Ruler } from "lucide-react";
import type { ShapeElement } from "@/store/types";

const fillSwatches = ["#CBD5E1", "#94A3B8", "#64748B", "#475569", "#EF4444", "#F59E0B", "#10B981", "#3B82F6", "#6366F1"];

export default function ShapeProperties({ element, updateElement }: PropertiesPanelProps) {
  if (element.type !== "shape") {
    return null;
  }

  const shapeElement = element as ShapeElement;
  const { shapeType, fillColor, strokeColor, strokeWidth } = shapeElement.props;

  return (
    <div className="space-y-4 pb-6">
      <PropertyCard 
        title={`${shapeType.charAt(0).toUpperCase() + shapeType.slice(1)} Shape`}
        icon={<Shapes className="w-4 h-4 text-blue-500" />}
      >
        <div className="grid gap-6">
          {/* Fill Color */}
          {shapeType !== 'line' && (
            <ColorPickerField
              label="Màu nền (Fill)"
              value={fillColor}
              swatches={fillSwatches}
              onChange={(nextColor) =>
                updateElement(element.id, {
                  props: { ...shapeElement.props, fillColor: nextColor },
                })
              }
            />
          )}

          {/* Stroke Color */}
          <ColorPickerField
            label={shapeType === 'line' ? "Màu sắc" : "Màu viền (Stroke)"}
            value={strokeColor}
            swatches={fillSwatches}
            onChange={(nextColor) =>
              updateElement(element.id, {
                props: { ...shapeElement.props, strokeColor: nextColor },
              })
            }
          />
        </div>
      </PropertyCard>

      <PropertyCard 
        title="Kích thước viền" 
        icon={<Ruler className="w-4 h-4 text-emerald-500" />}
      >
        <div className="grid gap-3">
          <div className="flex items-center justify-between">
            <Label className="text-[10px] font-bold text-slate-500 uppercase">
              {shapeType === 'line' ? "Độ dày" : "Độ dày viền"}
            </Label>
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
              {strokeWidth}px
            </span>
          </div>
          <Slider
            value={[strokeWidth]}
            min={0}
            max={20}
            step={1}
            onValueChange={([val]) =>
              updateElement(element.id, {
                props: { ...shapeElement.props, strokeWidth: val },
              })
            }
          />
        </div>
      </PropertyCard>

      <VisibilityProperties element={element} updateElement={updateElement} />
    </div>
  );
}
