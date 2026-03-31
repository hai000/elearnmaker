import type { PropertiesPanelProps } from "@/plugins/registry";
import { ColorPickerField } from "@/components/ui/color-picker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { VisibilityProperties } from "./properties/VisibilityProperties";

const textColorSwatches = ["#0F172A", "#334155", "#1D4ED8", "#7C3AED", "#0F766E", "#DC2626"];
const surfaceSwatches = ["#FFFFFF", "#F8FAFC", "#EFF6FF", "#F5F3FF", "#ECFDF5", "#FFF7ED"];

export default function TextProperties({ element, updateElement }: PropertiesPanelProps) {
  if (element.type !== "text") {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Văn bản</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="text-font-size">Kích thước chữ</Label>
          <Input
            id="text-font-size"
            type="number"
            min={10}
            max={120}
            value={element.props.fontSize}
            onChange={(event) =>
              updateElement(element.id, {
                props: { ...element.props, fontSize: Number(event.target.value) || 0 },
              })
            }
          />
        </div>
        <div className="grid gap-3">
          <ColorPickerField
            label="Màu chữ"
            value={element.props.textColor}
            swatches={textColorSwatches}
            description="Màu chữ hiển thị"
            onChange={(nextColor) =>
              updateElement(element.id, {
                props: { ...element.props, textColor: nextColor },
              })
            }
          />
          <ColorPickerField
            label="Nền"
            value={element.props.backgroundColor}
            swatches={surfaceSwatches}
            description="Màu nền khối văn bản"
            onChange={(nextColor) =>
              updateElement(element.id, {
                props: { ...element.props, backgroundColor: nextColor },
              })
            }
          />
        </div>
        <VisibilityProperties element={element} updateElement={updateElement} />
      </CardContent>
    </Card>
  );
}
