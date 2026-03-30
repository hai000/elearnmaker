import type { PropertiesPanelProps } from "@/plugins/registry";
import { ColorPickerField } from "@/components/ui/color-picker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const textColorSwatches = ["#0F172A", "#334155", "#166534", "#0F766E", "#1D4ED8", "#EF4444"];
const surfaceSwatches = ["#ECFDF5", "#F0FDF4", "#FFFFFF", "#F8FAFC", "#FFF7ED", "#FEF3C7"];

export default function WheelProperties({ element, updateElement }: PropertiesPanelProps) {
  if (element.type !== "wheel_plugin") {
    return null;
  }

  return (
    <Card className="border-emerald-200 bg-emerald-50/60">
      <CardHeader>
        <CardTitle className="text-base text-emerald-800">Wheel Plugin</CardTitle>
        <CardDescription className="text-emerald-700/70">
          Changes update the canvas in real time.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="wheel-title" className="text-emerald-700">
            Title
          </Label>
          <Input
            id="wheel-title"
            value={element.props.title}
            onChange={(event) =>
              updateElement(element.id, {
                props: { ...element.props, title: event.target.value },
              })
            }
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="wheel-mode" className="text-emerald-700">
            Mode
          </Label>
          <Input
            id="wheel-mode"
            value={element.props.mode}
            onChange={(event) =>
              updateElement(element.id, {
                props: { ...element.props, mode: event.target.value },
              })
            }
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-2">
            <Label htmlFor="wheel-title-size" className="text-emerald-700">
              Title Size
            </Label>
            <Input
              id="wheel-title-size"
              type="number"
              min={12}
              max={48}
              value={element.props.titleSize}
              onChange={(event) =>
                updateElement(element.id, {
                  props: { ...element.props, titleSize: Number(event.target.value) || 0 },
                })
              }
            />
          </div>
          <ColorPickerField
            label="Text Color"
            value={element.props.textColor}
            swatches={textColorSwatches}
            description="Màu chữ cho vòng quay"
            onChange={(nextColor) =>
              updateElement(element.id, {
                props: { ...element.props, textColor: nextColor },
              })
            }
          />
        </div>
        <ColorPickerField
          label="Background"
          value={element.props.backgroundColor}
          swatches={surfaceSwatches}
          description="Màu nền cho plugin"
          onChange={(nextColor) =>
            updateElement(element.id, {
              props: { ...element.props, backgroundColor: nextColor },
            })
          }
        />
      </CardContent>
    </Card>
  );
}
