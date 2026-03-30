import type { PropertiesPanelProps } from "@/plugins/registry";
import { ColorPickerField } from "@/components/ui/color-picker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEditorStore } from "@/store/editorStore";
import { VisibilityProperties } from "./properties/VisibilityProperties";

const textColorSwatches = ["#FFFFFF", "#0F172A", "#2563EB", "#0F766E", "#DC2626"];
const surfaceSwatches = ["#2563EB", "#0F172A", "#F59E0B", "#10B981", "#7C3AED"];

const actionOptions = [
  { value: "none", label: "None" },
  { value: "go_to_slide", label: "Go to slide" },
  { value: "show_element", label: "Show Element" },
  { value: "hide_element", label: "Hide Element" },
  { value: "toggle_element", label: "Toggle Element" },
] as const;

export default function ButtonProperties({ element, updateElement }: PropertiesPanelProps) {
  const slides = useEditorStore((state) => state.slides);
  const elements = useEditorStore((state) => state.elements);

  if (element.type !== "button") {
    return null;
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Button</CardTitle>
        </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="button-label">Label</Label>
          <Input
            id="button-label"
            value={element.props.label}
            onChange={(event) =>
              updateElement(element.id, {
                props: { ...element.props, label: event.target.value },
              })
            }
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="button-size">Font size</Label>
          <Input
            id="button-size"
            type="number"
            min={10}
            max={36}
            value={element.props.buttonSize}
            onChange={(event) =>
              updateElement(element.id, {
                props: { ...element.props, buttonSize: Number(event.target.value) || 0 },
              })
            }
          />
        </div>

        <div className="grid gap-3">
          <ColorPickerField
            label="Text Color"
            value={element.props.textColor}
            swatches={textColorSwatches}
            description="Màu chữ trên button"
            onChange={(nextColor) =>
              updateElement(element.id, {
                props: { ...element.props, textColor: nextColor },
              })
            }
          />
          <ColorPickerField
            label="Background"
            value={element.props.backgroundColor}
            swatches={surfaceSwatches}
            description="Màu nền của button"
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

    <Card>
      <CardHeader>
        <CardTitle className="text-base text-slate-800">Action Settings</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">

        <div className="grid gap-2">
          <Label className="text-xs font-medium text-slate-500 uppercase">On Click Behavior</Label>
          <Select
            value={element.props.actionType || "none"}
            onValueChange={(val: any) =>
              updateElement(element.id, {
                props: { ...element.props, actionType: val },
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an action" />
            </SelectTrigger>
            <SelectContent>
              {actionOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {element.props.actionType === "go_to_slide" ? (
          <div className="grid gap-2">
            <Label>Target slide</Label>
            <Select
              value={element.props.targetSlideId || ""}
              onValueChange={(val: string) =>
                updateElement(element.id, {
                  props: { ...element.props, targetSlideId: val },
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a slide" />
              </SelectTrigger>
              <SelectContent>
                {slides.map((slide) => (
                  <SelectItem key={slide.id} value={slide.id}>
                    {slide.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : null}

        {["show_element", "hide_element", "toggle_element"].includes(element.props.actionType) ? (
          <div className="grid gap-2">
            <Label htmlFor="button-target-elements">Target Elements</Label>
            <div className="grid gap-2 border bg-slate-50 border-slate-200 p-3 rounded-md max-h-[160px] overflow-y-auto">
              {elements.filter(e => e.id !== element.id && e.slideId === element.slideId).length === 0 ? (
                <p className="text-xs text-slate-500">No other elements on this slide.</p>
              ) : (
                elements
                  .filter(e => e.id !== element.id && e.slideId === element.slideId)
                  .map((tgt) => {
                    const isSelected = element.props.targetElementIds?.includes(tgt.id);
                    const tgtLabel = tgt.name || `${tgt.type.toUpperCase()} (${tgt.id.slice(0, 5)})`;
                    return (
                      <label key={tgt.id} className="flex flex-row items-center space-x-3 text-sm font-medium cursor-pointer">
                        <input
                          type="checkbox"
                          className="rounded border-slate-300 w-4 h-4 text-slate-900 focus:ring-slate-900"
                          checked={isSelected || false}
                          onChange={(e) => {
                            let nextIds = [...(element.props.targetElementIds || [])];
                            if (e.target.checked) {
                              nextIds.push(tgt.id);
                            } else {
                              nextIds = nextIds.filter(id => id !== tgt.id);
                            }
                            updateElement(element.id, {
                              props: { ...element.props, targetElementIds: nextIds }
                            });
                          }}
                        />
                        <span className="text-slate-700">{tgtLabel}</span>
                      </label>
                    );
                  })
              )}
            </div>
          </div>
        ) : null}

      </CardContent>
    </Card>
  </div>
  );
}