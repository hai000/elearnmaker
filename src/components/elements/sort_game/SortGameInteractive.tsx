"use client";

import { useState, useMemo, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { SortGameElement } from "@/store/types";
import { SortableItem } from "@/components/elements/sort_game/SortableItem";
import { useEditorStore } from "@/store/editorStore";
import { GameFeedback } from "../shared/GameFeedback";

// Random shuffle helper
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

type SortGameInteractiveProps = {
  element: SortGameElement;
  onAction?: (element: any) => void;
};

interface SortItem {
  id: string;
  originalIndex: number;
  text: string;
}

export function SortGameInteractive({ element, onAction }: SortGameInteractiveProps) {
  const setElementCompleted = useEditorStore((state) => state.setElementCompleted);
  const setGameFeedback = useEditorStore((state) => state.setGameFeedback);
  const { items, title, titleSize, itemSize, textColor, checkLabel } = element.props;

  // We map the original items to objects with an id, where the id is their original correct index.
  const initialData: SortItem[] = useMemo(() => {
    return items.map((text, index) => ({ id: `sort-${index}`, originalIndex: index, text }));
  }, [items]);

  const [activeItems, setActiveItems] = useState<SortItem[]>(initialData);
  const [isChecked, setIsChecked] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Auto-shuffle on mount (in preview mode)
  useEffect(() => {
    setActiveItems(shuffleArray(initialData));
  }, [initialData]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setActiveItems((currentItems) => {
        const oldIndex = currentItems.findIndex((i) => i.id === active.id);
        const newIndex = currentItems.findIndex((i) => i.id === over.id);
        return arrayMove(currentItems, oldIndex, newIndex);
      });
      // Reset feedback if ordered changes after checking
      if (isChecked) {
        setIsChecked(false);
        setIsCorrect(null);
      }
    }
  };

  const handleCheck = () => {
    setIsChecked(true);
    setIsDismissed(false);
    // Determine correctness (are all items in their originalIndex order?)
    const correct = activeItems.every((item: SortItem, i: number) => item.originalIndex === i);
    setIsCorrect(correct);
    if (correct) {
      setElementCompleted(element.id, true);
    }

    setGameFeedback({
      status: correct ? "success" : "error",
      onDismiss: () => {
        setIsDismissed(true);
        if (correct && onAction) onAction(element);
        if (!correct) {
          setIsChecked(false);
          setIsCorrect(null);
        }
      },
      onRetry: () => {
        setIsChecked(false);
        setIsCorrect(null);
      }
    });
  };

  const handleDismiss = () => {
    setIsDismissed(true);
  };

  return (
    <div className="flex h-full flex-col p-4 overflow-y-auto">
      <p className="font-semibold" style={{ color: textColor, fontSize: titleSize }}>
        {title}
      </p>
      <Separator className="my-3" />

      <div className="flex-1 overflow-x-hidden p-1">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={activeItems} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col gap-2" style={{ color: textColor, fontSize: itemSize }}>
              {activeItems.map((item: SortItem, index: number) => (
                <SortableItem
                  key={item.id}
                  id={item.id}
                  text={item.text}
                  index={index}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

      </div>

      <div className="mt-4 flex flex-col items-center justify-between shrink-0 gap-3">
        <Button onClick={handleCheck} disabled={isChecked && isCorrect!}>
          {checkLabel || "Kiểm tra đáp án"}
        </Button>
      </div>
    </div>
  );
}
