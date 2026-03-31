"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import type { PropertiesPanelProps } from "@/plugins/registry";
import { VisibilityProperties } from "./properties/VisibilityProperties";
import { PropertyCard } from "./properties/PropertyCard";
import { ColorPickerField } from "@/components/ui/color-picker";
import type { EssayElement } from "@/store/types";
import { FileEdit, ShieldAlert, Palette } from "lucide-react";

export default function EssayProperties({ element, updateElement }: PropertiesPanelProps) {
  if (element.type !== "essay") {
    return null;
  }

  const essayElement = element as EssayElement;

  const handleChange = (key: keyof EssayElement["props"], value: any) => {
    updateElement(element.id, {
      props: { ...essayElement.props, [key]: value },
    });
  };

  return (
    <div className="space-y-4 pb-6">
      <PropertyCard 
        title="Câu hỏi tự luận" 
        icon={<FileEdit className="w-4 h-4 text-blue-500" />}
      >
        <div className="grid gap-2 min-w-0">
          <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tiêu đề</Label>
          <Input 
            className="bg-white border-slate-200 font-medium"
            value={essayElement.props.title} 
            onChange={(e) => handleChange("title", e.target.value)} 
          />
        </div>

        <div className="grid gap-2 min-w-0">
          <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Gợi ý nhãn (Placeholder)</Label>
          <Input 
            className="bg-slate-50 focus:bg-white text-xs h-9"
            value={essayElement.props.placeholder} 
            onChange={(e) => handleChange("placeholder", e.target.value)} 
          />
        </div>

        <div className="grid gap-2 min-w-0">
          <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nhãn nút Nộp bài</Label>
          <Input 
            className="bg-slate-50 focus:bg-white text-xs h-9"
            value={essayElement.props.submitLabel} 
            onChange={(e) => handleChange("submitLabel", e.target.value)} 
          />
        </div>
      </PropertyCard>

      <PropertyCard 
        title="Quy tắc trả lời" 
        icon={<ShieldAlert className="w-4 h-4 text-emerald-500" />}
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2 min-w-0">
            <Label className="text-[10px] font-bold text-slate-500 uppercase">Min ký tự</Label>
            <Input 
              type="number"
              className="h-8 text-xs bg-slate-50"
              value={essayElement.props.minLength || 0} 
              onChange={(e) => handleChange("minLength", parseInt(e.target.value) || 0)} 
            />
          </div>
          <div className="grid gap-2 min-w-0">
            <Label className="text-[10px] font-bold text-slate-500 uppercase">Max ký tự</Label>
            <Input 
              type="number"
              className="h-8 text-xs bg-slate-50"
              value={essayElement.props.maxLength || 0} 
              onChange={(e) => handleChange("maxLength", parseInt(e.target.value) || 0)} 
            />
          </div>
        </div>
      </PropertyCard>

      <PropertyCard 
        title="Phong cách & Màu sắc" 
        icon={<Palette className="w-4 h-4 text-purple-500" />}
      >
        <div className="grid gap-2 min-w-0">
          <Label className="text-[10px] font-bold text-slate-500 uppercase">Cỡ chữ tiêu đề</Label>
          <Input 
            type="number"
            className="h-8 text-xs bg-slate-50"
            value={essayElement.props.titleSize} 
            onChange={(e) => handleChange("titleSize", parseInt(e.target.value) || 0)} 
          />
        </div>

        <div className="grid gap-4 pt-1">
          <ColorPickerField
            label="Màu chữ tiêu đề"
            value={essayElement.props.textColor}
            swatches={["#0F172A", "#1D4ED8", "#7C3AED", "#10b981", "#DC2626"]}
            onChange={(nextColor) => handleChange("textColor", nextColor)}
          />
          <ColorPickerField
            label="Màu nền"
            value={essayElement.props.backgroundColor}
            swatches={["#FFFFFF", "#F8FAFC", "#FDF4FF", "#F0F9FF", "#ECFDF5"]}
            onChange={(nextColor) => handleChange("backgroundColor", nextColor)}
          />
        </div>

        <Separator className="opacity-50" />
        <VisibilityProperties element={element} updateElement={updateElement} />
      </PropertyCard>
    </div>
  );
}
