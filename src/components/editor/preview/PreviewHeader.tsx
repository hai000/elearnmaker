import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DeviceOption, deviceOptions } from "@/constants/previewDevices";

type PreviewHeaderProps = {
  currentSlideTitle: string;
  deviceId: DeviceOption["id"];
  setDeviceId: (id: DeviceOption["id"]) => void;
  onClose: () => void;
};

export function PreviewHeader({ currentSlideTitle, deviceId, setDeviceId, onClose }: PreviewHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-slate-200/60 bg-white/95 px-6 py-4">
      <div>
        <p className="text-[11px] uppercase tracking-[0.32em] text-slate-400">Preview</p>
        <p className="text-base font-semibold text-slate-900">{currentSlideTitle}</p>
      </div>
      <Tabs value={deviceId} onValueChange={(value) => setDeviceId(value as DeviceOption["id"])}>
        <TabsList className="bg-slate-100/80">
          {deviceOptions.map((option) => (
            <TabsTrigger key={option.id} value={option.id} className="gap-2">
              <span>{option.label}</span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
                {option.hint}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <Button variant="outline" onClick={onClose}>
        Close
      </Button>
    </div>
  );
}
