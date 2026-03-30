import type { PropertiesPanelProps } from "@/plugins/registry";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VisibilityProperties } from "./properties/VisibilityProperties";

export default function VideoProperties({ element, updateElement }: PropertiesPanelProps) {
  if (element.type !== "video") {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Video</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        <Label htmlFor="video-url">Video URL</Label>
        <Input
          id="video-url"
          value={element.props.videoUrl}
          onChange={(event) =>
            updateElement(element.id, {
              props: { ...element.props, videoUrl: event.target.value },
            })
          }
          placeholder="https://..."
        />
        <VisibilityProperties element={element} updateElement={updateElement} />
      </CardContent>
    </Card>
  );
}
