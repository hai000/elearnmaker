"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import type { PropertiesPanelProps } from "@/plugins/registry";
import { VisibilityProperties } from "./properties/VisibilityProperties";
import { ActionProperties } from "./properties/ActionProperties";
import { PropertyCard } from "./properties/PropertyCard";
import type { MatchingElement, MatchingPair } from "@/store/types";
import { Plus, Trash2, ArrowRightLeft, Info, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ColorPickerField } from "@/components/ui/color-picker";

export default function MatchingProperties({ element, updateElement }: PropertiesPanelProps) {
  if (element.type !== "matching") {
    return null;
  }

  const matchingElement = element as MatchingElement;

  const handleChange = (key: keyof MatchingElement["props"], value: any) => {
    updateElement(element.id, {
      props: { ...matchingElement.props, [key]: value },
    });
  };

  const handleAddPair = () => {
    const newPair: MatchingPair = {
      id: `pair-${Date.now()}`,
      left: "Vế trái",
      right: "Vế phải",
    };
    handleChange("pairs", [...matchingElement.props.pairs, newPair]);
  };

  const handleRemovePair = (id: string) => {
    const nextPairs = matchingElement.props.pairs.filter((p) => p.id !== id);
    handleChange("pairs", nextPairs);
  };

  const handleUpdatePair = (id: string, side: "left" | "right", value: string) => {
    const nextPairs = matchingElement.props.pairs.map((p) => 
      p.id === id ? { ...p, [side]: value } : p
    );
    handleChange("pairs", nextPairs);
  };

  return (
    <div className="space-y-4 pb-6">
      <PropertyCard 
        title="Thông tin Game" 
        icon={<Info className="w-4 h-4 text-blue-500" />}
      >
        <div className="grid gap-2 min-w-0">
          <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tiêu đề</Label>
          <Input 
            className="bg-white border-slate-200"
            value={matchingElement.props.title} 
            onChange={(e) => handleChange("title", e.target.value)} 
          />
        </div>
        <div className="grid gap-2 min-w-0">
          <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cỡ tiêu đề</Label>
          <Input 
            type="number"
            className="h-8 text-xs bg-slate-50"
            value={matchingElement.props.titleSize} 
            onChange={(e) => handleChange("titleSize", parseInt(e.target.value) || 0)} 
          />
        </div>
      </PropertyCard>

      <PropertyCard 
        title="Danh sách Cặp nối" 
        icon={<ArrowRightLeft className="w-4 h-4 text-emerald-500" />}
        action={
          <Button variant="ghost" size="sm" className="h-7 px-2 text-[10px] uppercase font-bold text-blue-600 hover:bg-blue-50" onClick={handleAddPair}>
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Thêm
          </Button>
        }
      >
        <div className="space-y-4">
          {matchingElement.props.pairs.map((pair, index) => (
            <div key={pair.id} className="relative p-3 border border-slate-200 rounded-xl bg-slate-50/30 space-y-3 group animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cặp #{index + 1}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 text-slate-300 hover:text-red-500"
                  onClick={() => handleRemovePair(pair.id)}
                  disabled={matchingElement.props.pairs.length <= 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid gap-3 min-w-0">
                <div className="grid gap-1 min-w-0">
                  <Label className="text-[9px] font-bold text-slate-400 uppercase">Vế trái (Left)</Label>
                  <Input 
                    value={pair.left} 
                    onChange={(e) => handleUpdatePair(pair.id, "left", e.target.value)} 
                    className="h-8 text-xs bg-white border-slate-200"
                  />
                </div>
                <div className="flex justify-center -my-1">
                  <ArrowRightLeft className="w-2.5 h-2.5 text-blue-400" />
                </div>
                <div className="grid gap-1 min-w-0">
                  <Label className="text-[9px] font-bold text-slate-400 uppercase">Vế phải (Right)</Label>
                  <Input 
                    value={pair.right} 
                    onChange={(e) => handleUpdatePair(pair.id, "right", e.target.value)} 
                    className="h-8 text-xs bg-white border-slate-200"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </PropertyCard>

      <PropertyCard 
        title="Phong cách & Màu sắc" 
        icon={<Palette className="w-4 h-4 text-purple-500" />}
      >
        <div className="grid gap-2 min-w-0">
          <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Cỡ chữ ô nối</Label>
          <Input 
            type="number"
            className="h-8 text-xs bg-slate-50"
            value={matchingElement.props.itemSize} 
            onChange={(e) => handleChange("itemSize", parseInt(e.target.value) || 0)} 
          />
        </div>

        <div className="grid gap-4 pt-1">
          <ColorPickerField
            label="Màu chữ"
            value={matchingElement.props.textColor}
            swatches={["#0F172A", "#1D4ED8", "#7C3AED", "#10b981", "#DC2626"]}
            onChange={(nextColor) => handleChange("textColor", nextColor)}
          />
          <ColorPickerField
            label="Màu nền"
            value={matchingElement.props.backgroundColor}
            swatches={["#FFFFFF", "#F8FAFC", "#FDF4FF", "#F0F9FF", "#ECFDF5"]}
            onChange={(nextColor) => handleChange("backgroundColor", nextColor)}
          />
        </div>

      </PropertyCard>

      <VisibilityProperties element={element} updateElement={updateElement} />

      <ActionProperties 
        element={element} 
        updateElement={updateElement} 
        title="Hành động khi nối đúng" 
      />
    </div>
  );
}
