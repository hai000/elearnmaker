import ElementShell from "./ElementShell";
import type { CanvasElementProps } from "@/plugins/registry";
import { AudioPlayer } from "@/components/ui/audio-player";
import { useEditorStore } from "@/store/editorStore";

export default function AudioElement({
  element,
  isSelected,
  onSelect,
  interactive,
  onAction,
  elementRef,
}: CanvasElementProps) {
  const setElementCompleted = useEditorStore((state) => state.setElementCompleted);
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
        onEnded={() => {
          // Ensure we use the latest element state from the store for triggers
          const latestElement = useEditorStore.getState().elements.find(e => e.id === element.id);
          setElementCompleted(element.id, true);
          
          if (onAction && latestElement) {
            onAction(latestElement);
          } else if (onAction) {
            onAction(element);
          }
        }}
      />
    </ElementShell>
  );
}
