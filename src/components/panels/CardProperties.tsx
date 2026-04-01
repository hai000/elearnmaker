"use client";

import React from "react";
import type { PropertiesPanelProps } from "@/plugins/registry";
import { ColorPickerField } from "@/components/ui/color-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { VisibilityProperties } from "./properties/VisibilityProperties";
import { PropertyCard } from "./properties/PropertyCard";
import { Layout, Palette, Settings2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const textColorSwatches = ["#0F172A", "#334155", "#1D4ED8", "#7C3AED", "#0F766E", "#DC2626"];
const surfaceSwatches = ["#FFFFFF", "#F8FAFC", "#EFF6FF", "#F5F3FF", "#ECFDF5", "#FFF7ED"];

export default function CardProperties({ element, updateElement }: PropertiesPanelProps) {
  if (element.type !== "card") {
    return null;
  }

  return (
    <div className="space-y-4 pb-6">
      <PropertyCard 
        title="Thẻ nội dung" 
        icon={<Layout className="w-4 h-4 text-blue-500" />}
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
            <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Cỡ nội dung</Label>
            <Input
              type="number"
              className="h-8 text-xs bg-slate-50"
              value={element.props.bodySize}
              onChange={(event) =>
                updateElement(element.id, {
                  props: { ...element.props, bodySize: Number(event.target.value) || 0 },
                })
              }
            />
          </div>
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
        
      </PropertyCard>

      <VisibilityProperties element={element} updateElement={updateElement} />
    </div>
  );
}
