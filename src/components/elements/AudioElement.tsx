import ElementShell from "./ElementShell";
import type { CanvasElementProps } from "@/plugins/registry";
import { AudioPlayer } from "@/components/ui/audio-player";

export default function AudioElement({
  element,
  isSelected,
  onSelect,
  interactive,
  elementRef,
}: CanvasElementProps) {
  if (element.type !== "audio") {
    return null;
  }

  const { audioUrl, autoplay, loop, controls, volume } = element.props;

  return (
    <ElementShell
      element={element}
      isSelected={isSelected}
      onSelect={onSelect}
      interactive={interactive}
      className="p-0 border-none bg-transparent shadow-none ring-0 overflow-visible"
      ref={elementRef}
    >
      <AudioPlayer
        src={audioUrl}
        autoPlay={autoplay}
        loop={loop}
        showControls={controls}
        volume={volume as number}
        label={audioUrl ? "Audio Clip" : "Chưa có nguồn âm thanh"}
        className="h-full w-full"
      />
    </ElementShell>
  );
}
