import type { PropertiesPanelProps } from "@/plugins/registry";
import { ColorPickerField } from "@/components/ui/color-picker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { VisibilityProperties } from "./properties/VisibilityProperties";

const textColorSwatches = ["#0F172A", "#334155", "#1D4ED8", "#7C3AED", "#0F766E", "#DC2626"];
const surfaceSwatches = ["#FFFFFF", "#F8FAFC", "#EFF6FF", "#F5F3FF", "#ECFDF5", "#FFF7ED"];

export default function QuizProperties({ element, updateElement }: PropertiesPanelProps) {
  if (element.type !== "quiz") {
    return null;
  }

  const correctIndex = element.props.correctIndex ?? 0;

  const handleAddOption = () => {
    const nextOptions = [...element.props.options, `${String.fromCharCode(65 + element.props.options.length)}. New option`];
    updateElement(element.id, {
      props: { ...element.props, options: nextOptions },
    });
  };

  const handleRemoveOption = (index: number) => {
    if (element.props.options.length <= 2) return;
    const nextOptions = element.props.options.filter((_, i) => i !== index);
    const nextCorrect = correctIndex >= nextOptions.length ? nextOptions.length - 1 : correctIndex > index ? correctIndex - 1 : correctIndex;
    updateElement(element.id, {
      props: { ...element.props, options: nextOptions, correctIndex: nextCorrect },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Quiz</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="quiz-title">Title</Label>
          <Input
            id="quiz-title"
            value={element.props.title}
            onChange={(event) =>
              updateElement(element.id, {
                props: { ...element.props, title: event.target.value },
              })
            }
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="quiz-retry-label">Nút thử lại</Label>
          <Input
            id="quiz-retry-label"
            value={element.props.retryLabel ?? "Thử lại"}
            onChange={(event) =>
              updateElement(element.id, {
                props: { ...element.props, retryLabel: event.target.value },
              })
            }
          />
        </div>
        <div className="grid gap-2">
          <Label>Options</Label>
          <div className="space-y-2">
            {element.props.options.map((option, index) => (
              <div key={`opt-${index}`} className="flex items-center gap-2">
                <Input
                  className="flex-1"
                  value={option}
                  onChange={(event) => {
                    const nextOptions = [...element.props.options];
                    nextOptions[index] = event.target.value;
                    updateElement(element.id, {
                      props: { ...element.props, options: nextOptions },
                    });
                  }}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 shrink-0 p-0 text-slate-400 hover:text-red-500"
                  onClick={() => handleRemoveOption(index)}
                  disabled={element.props.options.length <= 2}
                >
                  🗑
                </Button>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" onClick={handleAddOption}>
            + Thêm đáp án
          </Button>
        </div>
        <div className="grid gap-2">
          <Label>Đáp án đúng</Label>
          <Select
            value={String(correctIndex)}
            onValueChange={(value) =>
              updateElement(element.id, {
                props: { ...element.props, correctIndex: Number(value) },
              })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {element.props.options.map((option, index) => (
                <SelectItem key={`correct-${index}`} value={String(index)}>
                  {String.fromCharCode(65 + index)}. {option.replace(/^[A-Z]\.\s*/, "")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-2">
            <Label htmlFor="quiz-title-size">Title Size</Label>
            <Input
              id="quiz-title-size"
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
          <div className="grid gap-2">
            <Label htmlFor="quiz-option-size">Option Size</Label>
            <Input
              id="quiz-option-size"
              type="number"
              min={10}
              max={32}
              value={element.props.optionSize}
              onChange={(event) =>
                updateElement(element.id, {
                  props: { ...element.props, optionSize: Number(event.target.value) || 0 },
                })
              }
            />
          </div>
        </div>
        <div className="grid gap-3">
          <ColorPickerField
            label="Text Color"
            value={element.props.textColor}
            swatches={textColorSwatches}
            description="Màu nội dung quiz"
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
            description="Màu nền của quiz"
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
