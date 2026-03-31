import type { PropertiesPanelProps } from "@/plugins/registry";
import { ColorPickerField } from "@/components/ui/color-picker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { VisibilityProperties } from "./properties/VisibilityProperties";

const textColorSwatches = ["#0F172A", "#334155", "#1D4ED8", "#7C3AED", "#0F766E", "#DC2626"];
const surfaceSwatches = ["#FFFFFF", "#F8FAFC", "#EFF6FF", "#F5F3FF", "#ECFDF5", "#FFF7ED"];

export default function CardProperties({ element, updateElement }: PropertiesPanelProps) {
  if (element.type !== "card") {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Thẻ nội dung</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-2">
            <Label htmlFor="card-title-size">Kích thước tiêu đề</Label>
            <Input
              id="card-title-size"
              type="number"
              min={12}
              max={64}
              value={element.props.titleSize}
              onChange={(event) =>
                updateElement(element.id, {
                  props: { ...element.props, titleSize: Number(event.target.value) || 0 },
                })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="card-body-size">Kích thước nội dung</Label>
            <Input
              id="card-body-size"
              type="number"
              min={10}
              max={48}
              value={element.props.bodySize}
              onChange={(event) =>
                updateElement(element.id, {
                  props: { ...element.props, bodySize: Number(event.target.value) || 0 },
                })
              }
            />
          </div>
        </div>
        <div className="grid gap-3">
          <ColorPickerField
            label="Màu chữ"
            value={element.props.textColor}
            swatches={textColorSwatches}
            description="Màu chữ trên card"
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
            description="Màu nền của card"
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
