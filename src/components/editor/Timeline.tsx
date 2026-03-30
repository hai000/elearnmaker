"use client";


import { DndContext, PointerSensor, KeyboardSensor, closestCenter, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEditorStore } from "@/store/editorStore";
import { SortableSlideCard } from "./timeline/SortableSlideCard";

export default function Timeline() {
  const slides = useEditorStore((state) => state.slides);
  const currentSlideId = useEditorStore((state) => state.currentSlideId);
  const selectSlide = useEditorStore((state) => state.selectSlide);
  const addSlide = useEditorStore((state) => state.addSlide);
  const duplicateSlide = useEditorStore((state) => state.duplicateSlide);
  const deleteSlide = useEditorStore((state) => state.deleteSlide);

  const moveSlideToIndex = useEditorStore((state) => state.moveSlideToIndex);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const fromIndex = slides.findIndex((slide) => slide.id === active.id);
    const toIndex = slides.findIndex((slide) => slide.id === over.id);

    if (fromIndex < 0 || toIndex < 0) {
      return;
    }

    if (fromIndex !== toIndex) {
      const nextSlides = arrayMove(slides, fromIndex, toIndex);
      const orderedIds = nextSlides.map((slide) => slide.id);
      const targetIndex = orderedIds.indexOf(active.id as string);

      if (targetIndex >= 0) {
        moveSlideToIndex(active.id as string, targetIndex);
      }
    }
  };

  return (
    <div className="relative w-full px-6 pb-6">
      <Card className="border border-slate-200/80 bg-white shadow-xl shadow-slate-900/5">
        <CardContent className="px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Tabs defaultValue="animations" className="w-auto gap-0">
                  <TabsList>
                    <TabsTrigger value="animations">Animations</TabsTrigger>
                  </TabsList>
                  <TabsContent value="animations" className="hidden" />
                </Tabs>
              </div>
              <Badge variant="secondary" className="text-xs font-normal">
                Range. 0 - 60 seconds · Time lock
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={addSlide}>
                New slide
              </Button>
              <Button variant="outline" size="sm" onClick={() => duplicateSlide(currentSlideId)}>
                Duplicate
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteSlide(currentSlideId)}
                disabled={slides.length <= 1}
              >
                Delete
              </Button>
            </div>
          </div>

          <Separator className="my-4" />

          <ScrollArea className="max-h-44">
            <DndContext
              id="timeline-dnd-context"
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
              modifiers={[restrictToHorizontalAxis]}
            >
              <SortableContext items={slides.map((slide) => slide.id)} strategy={horizontalListSortingStrategy}>
                <div className="flex gap-3 pb-2">
                  {slides.map((slide, index) => (
                    <SortableSlideCard
                      key={slide.id}
                      slide={slide}
                      index={index}
                      isActive={slide.id === currentSlideId}
                      onSelect={() => selectSlide(slide.id)}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}