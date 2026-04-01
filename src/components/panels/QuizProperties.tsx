"use client";

import type { PropertiesPanelProps } from "@/plugins/registry";
import { ColorPickerField } from "@/components/ui/color-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { VisibilityProperties } from "./properties/VisibilityProperties";
import { ActionProperties } from "./properties/ActionProperties";
import { PropertyCard } from "./properties/PropertyCard";
import { Trash2, PlusCircle, HelpCircle, CheckCircle2, Palette } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

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
    <div className="space-y-4 pb-6">
      <PropertyCard
        title="Nội dung câu hỏi"
        icon={<HelpCircle className="w-4 h-4 text-blue-500" />}
      >
        <div className="grid gap-2 min-w-0">
          <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tiêu đề</Label>
          <Input
            className="bg-white border-slate-200"
            value={element.props.title}
            onChange={(event) =>
              updateElement(element.id, {
                props: { ...element.props, title: event.target.value },
              })
            }
          />
        </div>

        <div className="grid gap-2 min-w-0">
          <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nút thử lại</Label>
          <Input
            className="bg-white border-slate-200 h-9"
            value={element.props.retryLabel ?? "Thử lại"}
            onChange={(event) =>
              updateElement(element.id, {
                props: { ...element.props, retryLabel: event.target.value },
              })
            }
          />
        </div>
      </PropertyCard>

      <PropertyCard
        title="Đáp án & Thiết lập"
        icon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />}
        action={
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-[10px] uppercase font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            onClick={handleAddOption}
          >
            <PlusCircle className="mr-1.5 h-3.5 w-3.5" />
            Thêm
          </Button>
        }
      >
        <div className="grid gap-3 min-w-0">
          <div className="space-y-2">
            {element.props.options.map((option, index) => (
              <div key={`opt-${index}`} className="flex items-center gap-2 w-full min-w-0">
                <div className={cn(
                  "flex items-center justify-center w-7 h-9 shrink-0 rounded-lg text-[10px] font-bold transition-all border",
                  correctIndex === index ? "bg-emerald-500 text-white border-emerald-600 shadow-sm" : "bg-slate-100 text-slate-500 border-slate-200"
                )}>
                  {String.fromCharCode(65 + index)}
                </div>
                <Input
                  className="flex-1 min-w-0 bg-slate-50 focus:bg-white transition-all h-9 text-xs"
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
                  size="icon"
                  className="h-9 w-9 shrink-0 text-slate-400 hover:text-red-500 hover:bg-red-50"
                  onClick={() => handleRemoveOption(index)}
                  disabled={element.props.options.length <= 2}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <Separator className="opacity-50" />

        <div className="grid gap-2 min-w-0">
          <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Đáp án đúng</Label>
          <Select
            value={String(correctIndex)}
            onValueChange={(value) =>
              updateElement(element.id, {
                props: { ...element.props, correctIndex: Number(value) },
              })
            }
          >
            <SelectTrigger className="bg-slate-50 h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {element.props.options.map((option, index) => (
                <SelectItem key={`correct-${index}`} value={String(index)}>
                  {String.fromCharCode(65 + index)}. {option.substring(0, 25)}...
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </PropertyCard>

      <PropertyCard
        title="Giao diện & Màu sắc"
        icon={<Palette className="w-4 h-4 text-purple-500" />}
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2 min-w-0">
            <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Cỡ tiêu đề</Label>
            <Input
              type="number"
              className="h-8 text-xs bg-slate-50"
              value={element.props.titleSize}
              onChange={(event) =>
                updateElement(element.id, {
                  props: { ...element.props, titleSize: Number(event.target.value) || 0 },
                })
              }
            />
          </div>
          <div className="grid gap-2 min-w-0">
            <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Cỡ đáp án</Label>
            <Input
              type="number"
              className="h-8 text-xs bg-slate-50"
              value={element.props.optionSize}
              onChange={(event) =>
                updateElement(element.id, {
                  props: { ...element.props, optionSize: Number(event.target.value) || 0 },
                })
              }
            />
          </div>
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

      </PropertyCard>

      <VisibilityProperties element={element} updateElement={updateElement} />

      <ActionProperties
        element={element}
        updateElement={updateElement}
        title="Hành động khi làm đúng"
      />
    </div>
  );
}
