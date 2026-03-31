"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PropertyCard } from "./properties/PropertyCard";
import { Plus, Trash2, ListOrdered, Settings2, Palette } from "lucide-react";
import type { PropertiesPanelProps } from "@/plugins/registry";
import { VisibilityProperties } from "./properties/VisibilityProperties";
import { ColorPickerField } from "@/components/ui/color-picker";
import type { SortGameElement } from "@/store/types";

export default function SortGameProperties({ element, updateElement }: PropertiesPanelProps) {
  if (element.type !== "sort_game") {
    return null;
  }

  const sortElement = element as SortGameElement;

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateElement(element.id, {
      props: { ...sortElement.props, title: e.target.value },
    });
  };

  const handleCheckLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateElement(element.id, {
      props: { ...sortElement.props, checkLabel: e.target.value },
    });
  };

  const handleItemChange = (index: number, value: string) => {
    const newItems = [...sortElement.props.items];
    newItems[index] = value;
    updateElement(element.id, {
      props: { ...sortElement.props, items: newItems },
    });
  };

  const handleAddItem = () => {
    if (sortElement.props.items.length >= 6) return;
    updateElement(element.id, {
      props: { ...sortElement.props, items: [...sortElement.props.items, "Bước mới"] },
    });
  };

  const handleRemoveItem = (index: number) => {
    const newItems = sortElement.props.items.filter((_, i) => i !== index);
    updateElement(element.id, {
      props: { ...sortElement.props, items: newItems },
    });
  };

  return (
    <div className="space-y-4 pb-6">
      <PropertyCard 
        title="Cài đặt quy trình" 
        icon={<Settings2 className="w-4 h-4 text-blue-500" />}
      >
        <div className="grid gap-2 min-w-0">
          <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tiêu đề Game</Label>
          <Input 
            className="bg-white border-slate-200 font-medium"
            value={sortElement.props.title} 
            onChange={handleTitleChange} 
          />
        </div>

        <div className="grid gap-2 min-w-0">
          <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Chữ nút Kiểm tra</Label>
          <Input 
            className="bg-slate-50 focus:bg-white text-xs h-9"
            value={sortElement.props.checkLabel || "Kiểm tra đáp án"} 
            onChange={handleCheckLabelChange} 
          />
        </div>
      </PropertyCard>

      <PropertyCard 
        title="Thứ tự các bước" 
        icon={<ListOrdered className="w-4 h-4 text-emerald-500" />}
        action={
          <Button variant="ghost" size="sm" className="h-7 px-2 text-[10px] uppercase font-bold text-blue-600 hover:bg-blue-50" onClick={handleAddItem}>
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Thêm
          </Button>
        }
      >
        <div className="space-y-2">
          {sortElement.props.items.map((item, index) => (
            <div key={index} className="flex items-center gap-2 w-full min-w-0 animate-in fade-in duration-200">
              <div className="flex bg-slate-100 items-center justify-center w-7 h-9 shrink-0 rounded-lg text-[10px] text-slate-500 font-extrabold border border-slate-200">
                {index + 1}
              </div>
              <Input
                value={item}
                onChange={(e) => handleItemChange(index, e.target.value)}
                className="h-9 flex-1 min-w-0 bg-slate-50 focus:bg-white text-xs"
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 shrink-0 text-slate-400 hover:text-red-500"
                onClick={() => handleRemoveItem(index)}
                disabled={sortElement.props.items.length <= 2}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </PropertyCard>

      <PropertyCard 
        title="Giao diện hiển thị" 
        icon={<Palette className="w-4 h-4 text-purple-500" />}
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2 min-w-0">
            <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Cỡ tiêu đề</Label>
            <Input 
              type="number"
              className="h-8 text-xs bg-slate-50"
              value={sortElement.props.titleSize} 
              onChange={(e) => updateElement(element.id, { props: { ...sortElement.props, titleSize: parseInt(e.target.value) || 0 }})} 
            />
          </div>
          <div className="grid gap-2 min-w-0">
            <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Cỡ chữ bước</Label>
            <Input 
              type="number"
              className="h-8 text-xs bg-slate-50"
              value={sortElement.props.itemSize} 
              onChange={(e) => updateElement(element.id, { props: { ...sortElement.props, itemSize: parseInt(e.target.value) || 0 }})} 
            />
          </div>
        </div>

        <div className="grid gap-4 pt-1">
          <ColorPickerField
            label="Màu chữ"
            value={sortElement.props.textColor}
            swatches={["#0F172A", "#1D4ED8", "#7C3AED", "#10b981", "#DC2626"]}
            onChange={(nextColor) => updateElement(element.id, { props: { ...sortElement.props, textColor: nextColor }})}
          />
          <ColorPickerField
            label="Màu nền"
            value={sortElement.props.backgroundColor}
            swatches={["#FFFFFF", "#F8FAFC", "#FDF4FF", "#F0F9FF", "#ECFDF5"]}
            onChange={(nextColor) => updateElement(element.id, { props: { ...sortElement.props, backgroundColor: nextColor }})}
          />
        </div>

        <Separator className="opacity-50" />
        <VisibilityProperties element={element} updateElement={updateElement} />
      </PropertyCard>
    </div>
  );
}
