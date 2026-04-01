import { useState } from "react";
import type { PropertiesPanelProps } from "@/plugins/registry";
import { PropertyCard } from "./properties/PropertyCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Music, Volume2, Settings2, Eye } from "lucide-react";
import { VisibilityProperties } from "./properties/VisibilityProperties";
import { ActionProperties } from "./properties/ActionProperties";
import { AudioLibrary } from "./properties/AudioLibrary";

export default function AudioProperties({ element, updateElement }: PropertiesPanelProps) {
  const [showLibrary, setShowLibrary] = useState(false);

  if (element.type !== "audio") {
    return null;
  }

  return (
    <div className="space-y-4 pb-6">
      <PropertyCard 
        title="Cấu hình Âm thanh" 
        icon={<Settings2 className="w-4 h-4 text-blue-500" />}
      >
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="audio-url" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Audio URL</Label>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 gap-1.5 px-2 text-[10px] uppercase font-bold text-blue-600 hover:bg-blue-50"
                onClick={() => setShowLibrary(!showLibrary)}
              >
                <Music className="h-3 w-3" />
                {showLibrary ? "Ẩn thư viện" : "Thư viện mẫu"}
              </Button>
            </div>
            <Input
              id="audio-url"
              value={element.props.audioUrl}
              onChange={(event) =>
                updateElement(element.id, {
                  props: { ...element.props, audioUrl: event.target.value },
                })
              }
              placeholder="https://example.com/audio.mp3"
              className="bg-white border-slate-200 h-9 text-xs"
            />
            
            {showLibrary && (
              <AudioLibrary 
                currentUrl={element.props.audioUrl}
                onSelect={(url) => 
                  updateElement(element.id, {
                    props: { ...element.props, audioUrl: url },
                  })
                }
              />
            )}
          </div>

          <div className="grid gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                 <Volume2 className="h-3.5 w-3.5 text-slate-400" />
                 <Label className="text-[10px] font-bold uppercase text-slate-500">Âm lượng mặc định</Label>
              </div>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                 {Math.round((element.props.volume as number || 0.8) * 100)}%
              </span>
            </div>
            <Slider
              value={[element.props.volume as number || 0.8]}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(val) =>
                updateElement(element.id, {
                  props: { ...element.props, volume: val[0] },
                })
              }
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition-colors">
              <Label htmlFor="autoplay" className="text-xs cursor-pointer text-slate-600">Tự động phát (Autoplay)</Label>
              <Switch
                id="autoplay"
                checked={!!element.props.autoplay}
                onCheckedChange={(checked) =>
                  updateElement(element.id, {
                    props: { ...element.props, autoplay: checked },
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition-colors">
              <Label htmlFor="loop" className="text-xs cursor-pointer text-slate-600">Lặp lại (Loop)</Label>
              <Switch
                id="loop"
                checked={!!element.props.loop}
                onCheckedChange={(checked) =>
                  updateElement(element.id, {
                    props: { ...element.props, loop: checked },
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition-colors">
              <Label htmlFor="controls" className="text-xs cursor-pointer text-slate-600">Hiện trình phát hệ thống</Label>
              <Switch
                id="controls"
                checked={!!element.props.controls}
                onCheckedChange={(checked) =>
                  updateElement(element.id, {
                    props: { ...element.props, controls: checked },
                  })
                }
              />
            </div>
          </div>
        </div>
      </PropertyCard>

      <VisibilityProperties element={element} updateElement={updateElement} />

      <ActionProperties 
        element={element} 
        updateElement={updateElement} 
        title="Hành động khi hoàn thành" 
      />
    </div>
  );
}
