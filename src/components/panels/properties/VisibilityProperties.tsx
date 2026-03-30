import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import type { SlideElementPatch, SlideElement } from "@/store/editorStore";

import { AnimationProperties } from "./AnimationProperties";

type VisibilityPropertiesProps = {
  element: SlideElement;
  updateElement: (id: string, patch: SlideElementPatch) => void;
};

export function VisibilityProperties({ element, updateElement }: VisibilityPropertiesProps) {
  return (
    <div className="space-y-4 pt-4 mt-4 border-t border-slate-100">
      <div className="grid gap-2">
        <Label className="text-sm font-semibold text-slate-700">Element Identity</Label>
        <Input
          placeholder={`e.g. ${element.type} (Internal ID: ${element.id.slice(0, 5)})`}
          value={element.name || ""}
          onChange={(e) => updateElement(element.id, { name: e.target.value })}
        />
        <p className="text-[11px] text-slate-500 leading-tight">
          Helpful name for targeting this element via Triggers.
        </p>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <div className="space-y-0.5">
          <Label className="text-sm font-semibold text-slate-700">Hidden on Start</Label>
          <p className="text-[11px] text-slate-500 leading-tight">
            Element is invisible on load.
          </p>
        </div>
        <Switch
          checked={!!element.hidden}
          onCheckedChange={(checked) => updateElement(element.id, { hidden: checked })}
        />
      </div>

      <AnimationProperties element={element} updateElement={updateElement} />
    </div>
  );
}
