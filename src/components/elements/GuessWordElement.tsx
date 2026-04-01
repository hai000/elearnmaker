import ElementShell from "./ElementShell";
import type { CanvasElementProps } from "@/plugins/registry";
import type { GuessWordElement as GuessWordElementType } from "@/store/types";
import { GuessWordInteractive } from "./guess_word/GuessWordInteractive";
import { HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function GuessWordElement({
  element,
  isSelected,
  onSelect,
  interactive,
  onAction,
  elementRef,
}: CanvasElementProps) {
  if (element.type !== "guess_word") {
    return null;
  }

  const guessWordElement = element as GuessWordElementType;

  return (
    <ElementShell
      element={element}
      isSelected={isSelected}
      onSelect={onSelect}
      interactive={interactive}
      className="rounded-2xl border-border bg-card shadow-lg"
      style={{ backgroundColor: guessWordElement.props.backgroundColor || "#ffffff" }}
      ref={elementRef}
    >
      <div className="relative h-full w-full">
        <GuessWordInteractive
          element={guessWordElement}
          isDisabled={interactive}
          onAction={onAction}
        />

        {interactive && (
          <div className="absolute inset-0 bg-blue-500/5 hover:bg-blue-500/10 flex items-center justify-center opacity-0 hover:opacity-100 transition-all pointer-events-none">
            <div className="px-4 py-2 bg-white/90 border shadow-lg rounded-full text-xs font-bold text-blue-600 backdrop-blur-sm">
              Khu vực Biên tập: Nhấn đúp để chơi thử
            </div>
          </div>
        )}

        {/* Image Preview Grid */}
        <div className={cn(
          "flex-1 min-h-0 bg-slate-100 rounded-lg overflow-hidden border grid gap-0.5",
          (guessWordElement.props.imageUrls?.length || 0) <= 1 ? "grid-cols-1" :
            guessWordElement.props.imageUrls?.length === 2 ? "grid-cols-2" :
              guessWordElement.props.imageUrls?.length <= 4 ? "grid-cols-2 grid-rows-2" : "grid-cols-3 grid-rows-2"
        )}>
          {guessWordElement.props.imageUrls?.length > 0 ? (
            guessWordElement.props.imageUrls.map((url, i) => (
              <div key={i} className="bg-white flex items-center justify-center overflow-hidden">
                {url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={url} alt="Preview" className="h-full w-full object-cover" />
                ) : (
                  <HelpCircle className="w-4 h-4 text-slate-200" />
                )}
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <HelpCircle className="w-8 h-8 text-slate-300" />
            </div>
          )}
        </div>
      </div>
    </ElementShell>
  );
}
