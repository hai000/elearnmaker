import type { PropertiesPanelProps } from "@/plugins/registry";
import { ColorPickerField } from "@/components/ui/color-picker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { VisibilityProperties } from "./properties/VisibilityProperties";
import type { ShapeElement } from "@/store/types";

const fillSwatches = ["#CBD5E1", "#94A3B8", "#64748B", "#475569", "#334155", "#1E293B", "#EF4444", "#F59E0B", "#10B981", "#3B82F6", "#6366F1", "#8B5CF6", "#EC4899"];

export default function ShapeProperties({ element, updateElement }: PropertiesPanelProps) {
  if (element.type !== "shape") {
    return null;
  }

  const shapeElement = element as ShapeElement;
  const { shapeType, fillColor, strokeColor, strokeWidth } = shapeElement.props;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">
          {shapeType.charAt(0).toUpperCase() + shapeType.slice(1)} Shape
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        {/* Fill Color */}
        {! (shapeType === 'line') && (
          <ColorPickerField
            label="Fill Color"
            value={fillColor}
            swatches={fillSwatches}
            description="Màu nền bên trong hình khối"
            onChange={(nextColor) =>
              updateElement(element.id, {
                props: { ...shapeElement.props, fillColor: nextColor },
              })
            }
          />
        )}

        {/* Stroke Color */}
        <ColorPickerField
          label={shapeType === 'line' ? "Line Color" : "Stroke Color"}
          value={strokeColor}
          swatches={fillSwatches}
          description={shapeType === 'line' ? "Màu của đường kẻ" : "Màu viền bao quanh"}
          onChange={(nextColor) =>
            updateElement(element.id, {
              props: { ...shapeElement.props, strokeColor: nextColor },
            })
          }
        />

        {/* Stroke Width */}
        <div className="grid gap-3">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-semibold text-slate-700">
              {shapeType === 'line' ? "Thickness" : "Stroke Width"}
            </Label>
            <span className="text-[10px] font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">
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

        <VisibilityProperties element={element} updateElement={updateElement} />
      </CardContent>
    </Card>
  );
}
