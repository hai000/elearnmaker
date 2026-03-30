import type { PropertiesPanelProps } from "@/plugins/registry";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VisibilityProperties } from "./properties/VisibilityProperties";

export default function ImageProperties({ element, updateElement }: PropertiesPanelProps) {
  if (element.type !== "image") {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Image</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        <Label htmlFor="image-url">Image URL</Label>
        <Input
          id="image-url"
          value={element.props.imageUrl}
          onChange={(event) =>
            updateElement(element.id, {
              props: { ...element.props, imageUrl: event.target.value },
            })
          }
          placeholder="https://..."
        />
        <VisibilityProperties element={element} updateElement={updateElement} />
      </CardContent>
    </Card>
  );
}
