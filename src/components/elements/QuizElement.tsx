import ElementShell from "./ElementShell";
import type { CanvasElementProps } from "@/plugins/registry";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { QuizInteractive } from "./quiz/QuizInteractive";
import type { QuizElement as QuizElementType } from "@/store/types";

export default function QuizElement({
  element,
  isSelected,
  onSelect,
  interactive,
  elementRef,
}: CanvasElementProps) {
  if (element.type !== "quiz") {
    return null;
  }

  const quizElement = element as QuizElementType;

  return (
    <ElementShell
      element={element}
      isSelected={isSelected}
      onSelect={onSelect}
      interactive={interactive}
      className="rounded-2xl border-border bg-card"
      style={{ backgroundColor: element.props.backgroundColor }}
      ref={elementRef}
    >
      {interactive === false ? (
        <QuizInteractive element={quizElement} />
      ) : (
        <div className="flex h-full flex-col overflow-y-auto p-4">
          <p
            className="font-semibold"
            style={{ color: element.props.textColor, fontSize: element.props.titleSize }}
          >
            {element.props.title}
          </p>
          <Separator className="my-3" />
          <div
            className="flex flex-col gap-2"
            style={{ color: element.props.textColor, fontSize: element.props.optionSize }}
          >
            {element.props.options.map((option, index) => (
              <Badge
                key={`${option}-${index}`}
                variant={index === quizElement.props.correctIndex ? "default" : "outline"}
                className={`w-full justify-start rounded-xl px-4 py-3.5 text-left transition-all ${
                  index === quizElement.props.correctIndex
                    ? "border-emerald-300 bg-emerald-50 text-emerald-700 shadow-sm"
                    : "border-slate-200 bg-white"
                }`}
              >
                <span className="mr-1.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border text-[9px] font-bold">
                  {index === quizElement.props.correctIndex ? "✓" : String.fromCharCode(65 + index)}
                </span>
                {option}
              </Badge>
            ))}
          </div>
          <div className="mt-3 flex justify-end">
            <Button variant="outline" size="sm" className="pointer-events-none opacity-70">
              {quizElement.props.retryLabel || "Thử lại"}
            </Button>
          </div>
        </div>
      )}
    </ElementShell>
  );
}
