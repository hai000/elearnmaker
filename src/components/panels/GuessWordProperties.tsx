"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import type { PropertiesPanelProps } from "@/plugins/registry";
import { VisibilityProperties } from "./properties/VisibilityProperties";
import { ActionProperties } from "./properties/ActionProperties";
import { PropertyCard } from "./properties/PropertyCard";
import type { GuessWordElement } from "@/store/types";
import { Plus, Trash2, Gamepad2, ImageIcon, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ColorPickerField } from "@/components/ui/color-picker";

export default function GuessWordProperties({ element, updateElement }: PropertiesPanelProps) {
  if (element.type !== "guess_word") {
    return null;
  }

  const guessElement = element as GuessWordElement;

  const handleChange = (key: keyof GuessWordElement["props"], value: any) => {
    updateElement(element.id, {
      props: { ...guessElement.props, [key]: value },
    });
  };

  const handleAddImage = () => {
    if (guessElement.props.imageUrls.length >= 6) return;
    handleChange("imageUrls", [...guessElement.props.imageUrls, ""]);
  };

  const handleRemoveImage = (index: number) => {
    const nextImages = guessElement.props.imageUrls.filter((_, i) => i !== index);
    handleChange("imageUrls", nextImages);
  };

  const handleUpdateImage = (index: number, value: string) => {
    const nextImages = [...guessElement.props.imageUrls];
    nextImages[index] = value;
    handleChange("imageUrls", nextImages);
  };

  return (
    <div className="space-y-4 pb-6">
      <PropertyCard 
        title="Cài đặt Game" 
        icon={<Gamepad2 className="w-4 h-4 text-blue-500" />}
      >
        <div className="grid gap-2 min-w-0">
          <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tiêu đề</Label>
          <Input 
            className="bg-white border-slate-200 font-medium"
            value={guessElement.props.title} 
            onChange={(e) => handleChange("title", e.target.value)} 
          />
        </div>
        
        <div className="grid gap-2 min-w-0">
          <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Đáp án (Chữ HOA)</Label>
          <Input 
            className="bg-emerald-50 border-emerald-100 focus:bg-white focus:border-emerald-500 font-mono font-bold tracking-widest"
            value={guessElement.props.answer} 
            onChange={(e) => handleChange("answer", e.target.value.toUpperCase())} 
            placeholder="VIETNAM"
          />
        </div>

        <div className="grid gap-2 min-w-0">
          <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Gợi ý (Hint)</Label>
          <Input 
            className="bg-slate-50 focus:bg-white text-xs h-9"
            value={guessElement.props.hint} 
            onChange={(e) => handleChange("hint", e.target.value)} 
          />
        </div>

        <div className="grid gap-2 min-w-0">
          <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Thông báo thắng</Label>
          <Textarea 
            className="bg-slate-50 focus:bg-white text-xs min-h-[60px]"
            value={guessElement.props.successMessage} 
            onChange={(e) => handleChange("successMessage", e.target.value)} 
          />
        </div>
      </PropertyCard>

      <PropertyCard 
        title="Hình ảnh gợi ý" 
        icon={<ImageIcon className="w-4 h-4 text-emerald-500" />}
        action={
          <Button variant="ghost" size="sm" className="h-7 px-2 text-[10px] uppercase font-bold text-blue-600 hover:bg-blue-50" onClick={handleAddImage}>
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Thêm
          </Button>
        }
      >
        <div className="space-y-2">
          {guessElement.props.imageUrls.map((url, index) => (
            <div key={index} className="flex gap-2 items-center w-full min-w-0 group animate-in fade-in duration-200">
              <Input 
                value={url} 
                onChange={(e) => handleUpdateImage(index, e.target.value)} 
                placeholder={`URL hình ảnh ${index + 1}`}
                className="h-9 flex-1 min-w-0 bg-slate-50 focus:bg-white text-xs border-slate-200"
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-9 w-9 shrink-0 text-slate-400 hover:text-red-500"
                onClick={() => handleRemoveImage(index)}
                disabled={guessElement.props.imageUrls.length <= 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </PropertyCard>

      <PropertyCard 
        title="Phong cách & Màu sắc" 
        icon={<Palette className="w-4 h-4 text-purple-500" />}
      >
        <div className="grid gap-4 pt-1">
          <ColorPickerField
            label="Màu chữ"
            value={guessElement.props.textColor || "#0F172A"}
            swatches={["#0F172A", "#1D4ED8", "#7C3AED", "#10b981", "#DC2626"]}
            onChange={(nextColor) => handleChange("textColor", nextColor)}
          />
          <ColorPickerField
            label="Màu nền"
            value={guessElement.props.backgroundColor || "#FFFFFF"}
            swatches={["#FFFFFF", "#F8FAFC", "#F0F9FF", "#F5F3FF", "#ECFDF5"]}
            onChange={(nextColor) => handleChange("backgroundColor", nextColor)}
          />
        </div>

      </PropertyCard>

      <VisibilityProperties element={element} updateElement={updateElement} />

      <ActionProperties 
        element={element} 
        updateElement={updateElement} 
        title="Hành động khi giải đúng" 
      />
    </div>
  );
}
