import { useState } from "react";
import type { QuizElement as QuizElementType, SlideElement } from "@/store/types";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useEditorStore } from "@/store/editorStore";
import { GameFeedback } from "../shared/GameFeedback";

type QuizInteractiveProps = {
  element: QuizElementType;
  onAction?: (element: SlideElement) => void;
};

type QuizStatus = "idle" | "correct" | "wrong" | "dismissed";

export function QuizInteractive({ element, onAction }: QuizInteractiveProps) {
  const setElementCompleted = useEditorStore((state) => state.setElementCompleted);
  const setGameFeedback = useEditorStore((state) => state.setGameFeedback);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [status, setStatus] = useState<QuizStatus>("idle");

  const handleSelect = (index: number) => {
    if (status !== "idle" && status !== "dismissed") return;
    setSelectedIndex(index);
    const isCorrect = index === element.props.correctIndex;
    setStatus(isCorrect ? "correct" : "wrong");
    
    if (isCorrect) {
      setElementCompleted(element.id, true);
    }

    setGameFeedback({
      status: isCorrect ? "success" : "error",
      title: isCorrect ? "Chính xác!" : "Chưa đúng rồi!",
      message: isCorrect 
        ? "Chúc mừng bạn đã trả lời đúng câu hỏi này." 
        : "Câu trả lời của bạn chưa chính xác, hãy thử lại nhé!",
      onDismiss: isCorrect ? () => {
        setStatus("dismissed");
        if (onAction) onAction(element);
      } : () => {
        setSelectedIndex(null);
        setStatus("idle");
      },
      onRetry: () => {
        setSelectedIndex(null);
        setStatus("idle");
      }
    });
  };

  const handleReset = () => {
    setSelectedIndex(null);
    setStatus("idle");
  };

  const handleDismiss = () => {
    setStatus("dismissed");
  };

  const getVariant = (index: number) => {
    if (status === "idle") return "outline" as const;
    if (index === element.props.correctIndex) return "default" as const;
    return "outline" as const;
  };

  const getClassName = (index: number) => {
    if (status === "idle") {
      return "hover:border-blue-300 hover:bg-blue-50 cursor-pointer";
    }
    if (index === element.props.correctIndex) {
      return "border-emerald-300 bg-emerald-50 text-emerald-700";
    }
    if (index === selectedIndex && status === "wrong") {
      return "border-red-400 bg-red-50 text-red-600 line-through";
    }
    return "opacity-50";
  };

  const getIcon = (index: number) => {
    if (status !== "idle" && index === element.props.correctIndex) return "✓";
    if (status === "wrong" && index === selectedIndex) return "✗";
    return String.fromCharCode(65 + index);
  };

  return (
    <div className="relative flex h-full flex-col overflow-y-auto p-4">
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
            variant={getVariant(index)}
            className={`w-full justify-start rounded-xl px-4 py-3.5 text-left border shadow-sm transition-all duration-200 ${getClassName(index)}`}
            onClick={() => handleSelect(index)}
            role="button"
            tabIndex={0}
          >
            <span className="mr-1.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border text-[9px] font-bold">
              {getIcon(index)}
            </span>
            {option}
          </Badge>
        ))}
      </div>

    </div>
  );
}
