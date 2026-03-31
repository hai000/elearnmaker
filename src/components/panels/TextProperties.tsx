"use client";

import React from "react";
import type { PropertiesPanelProps } from "@/plugins/registry";
import { ColorPickerField } from "@/components/ui/color-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VisibilityProperties } from "./properties/VisibilityProperties";
import { PropertyCard } from "./properties/PropertyCard";
import { Type, Palette } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const textColorSwatches = ["#0F172A", "#334155", "#1D4ED8", "#7C3AED", "#0F766E", "#DC2626"];
const surfaceSwatches = ["#FFFFFF", "#F8FAFC", "#EFF6FF", "#F5F3FF", "#ECFDF5", "#FFF7ED"];

export default function TextProperties({ element, updateElement }: PropertiesPanelProps) {
  if (element.type !== "text") {
    return null;
  }

  return (
    <div className="space-y-4 pb-6">
      <PropertyCard 
        title="Văn bản" 
        icon={<Type className="w-4 h-4 text-blue-500" />}
      >
        <div className="grid gap-2 min-w-0">
          <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Kích thước chữ</Label>
          <Input
            type="number"
            className="h-8 text-xs bg-slate-50"
            value={element.props.fontSize}
            onChange={(event) =>
              updateElement(element.id, {
                props: { ...element.props, fontSize: Number(event.target.value) || 0 },
              })
            }
          />
        </div>
      </PropertyCard>

      <PropertyCard 
        title="Phong cách & Màu sắc" 
        icon={<Palette className="w-4 h-4 text-purple-500" />}
      >
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
        
        <Separator className="opacity-50" />
        <VisibilityProperties element={element} updateElement={updateElement} />
      </PropertyCard>
    </div>
  );
}
