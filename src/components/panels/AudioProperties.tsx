import { useState } from "react";
import type { PropertiesPanelProps } from "@/plugins/registry";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Music, Volume2 } from "lucide-react";
import { VisibilityProperties } from "./properties/VisibilityProperties";
import { AudioLibrary } from "./properties/AudioLibrary";

export default function AudioProperties({ element, updateElement }: PropertiesPanelProps) {
  const [showLibrary, setShowLibrary] = useState(false);

  if (element.type !== "audio") {
    return null;
  }

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="px-4 py-3 pb-0">
        <CardTitle className="text-sm font-semibold">Audio Settings</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 px-4 pb-6">
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="audio-url" className="text-xs">Audio URL</Label>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 gap-1.5 px-2 text-[10px] text-blue-600 hover:bg-blue-50"
                onClick={() => setShowLibrary(!showLibrary)}
              >
                <Music className="h-3 w-3" />
                {showLibrary ? "Ẩn thư viện" : "Thư viện mẫu"}
              </Button>
            </div>
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
            className="h-8 text-xs"
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

        <div className="grid gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
               <Volume2 className="h-3 w-3 text-slate-400" />
               <Label htmlFor="default-volume" className="text-xs">Default Volume</Label>
            </div>
            <span className="text-[10px] font-medium text-slate-500">
               {Math.round((element.props.volume as number || 0.8) * 100)}%
            </span>
          </div>
          <Slider
            id="default-volume"
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

        <div className="flex items-center justify-between pt-2">
          <Label htmlFor="autoplay" className="text-xs">Autoplay</Label>
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

        <div className="flex items-center justify-between">
          <Label htmlFor="loop" className="text-xs">Loop</Label>
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

        <div className="flex items-center justify-between">
          <Label htmlFor="controls" className="text-xs">Show Native Player</Label>
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

        <VisibilityProperties element={element} updateElement={updateElement} />
      </CardContent>
    </Card>
  );
}
