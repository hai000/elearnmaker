import type { PropertiesPanelProps } from "@/plugins/registry";
import { PropertyCard } from "./properties/PropertyCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VisibilityProperties } from "./properties/VisibilityProperties";
import { ImageIcon } from "lucide-react";

export default function ImageProperties({ element, updateElement }: PropertiesPanelProps) {
  if (element.type !== "image") {
    return null;
  }

  return (
    <div className="space-y-4 pb-6">
      <PropertyCard 
        title="Cấu hình Hình ảnh" 
        icon={<ImageIcon className="w-4 h-4 text-blue-500" />}
      >
        <div className="grid gap-2">
          <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Image URL</Label>
          <Input
            value={element.props.imageUrl}
            onChange={(event) =>
              updateElement(element.id, {
                props: { ...element.props, imageUrl: event.target.value },
              })
            }
            placeholder="https://..."
            className="bg-white border-slate-200 h-9 text-xs"
          />
        </div>
      </PropertyCard>

      <VisibilityProperties element={element} updateElement={updateElement} />
    </div>
  );
}
