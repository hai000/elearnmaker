"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useEditorStore } from "@/store/editorStore";
import { Undo2, Redo2, Eye, EyeOff, MonitorIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TopBarProps = {
  onOpenPreview: () => void;
};

export default function TopBar({ onOpenPreview }: TopBarProps) {
  const currentSlideTitle = useEditorStore(
    (state) => state.slides.find((slide) => slide.id === state.currentSlideId)?.title ?? "Slide"
  );
  const currentSlideIndex = useEditorStore((state) =>
    Math.max(0, state.slides.findIndex((slide) => slide.id === state.currentSlideId))
  );

  const undo = useEditorStore((state) => state.undo);
  const redo = useEditorStore((state) => state.redo);
  const canUndo = useEditorStore((state) => state.past.length > 0);
  const canRedo = useEditorStore((state) => state.future.length > 0);
  const showHiddenElements = useEditorStore((state) => state.showHiddenElements);
  const toggleShowHiddenElements = useEditorStore((state) => state.toggleShowHiddenElements);
  
  const zoom = useEditorStore((state) => state.zoom);
  const setZoom = useEditorStore((state) => state.setZoom);

  return (
    <header className="flex h-14 items-center justify-between border-b border-slate-200/80 bg-white/75 px-6 backdrop-blur">
      <div className="flex items-center gap-4">
        <div className="flex h-8 w-8 bg-black items-center justify-center rounded-xl text-white shadow-lg shadow-black-200 text-sm">
          E
        </div>
        <div className="flex items-center gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
              ElearnMaker
            </p>
            <div className="flex items-center gap-2">
              <p className="font-[var(--font-display)] text-base font-semibold tracking-tight">
                Studio Editor
              </p>
              <Badge variant="secondary">Draft</Badge>
            </div>
          </div>
          <Separator orientation="vertical" className="mx-1 h-8" />
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
              Lesson: Insurance Basics
            </p>
            <p className="text-sm font-medium text-slate-700">
              Slide {currentSlideIndex + 1} · {currentSlideTitle}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 mr-2 border-r border-slate-200/80 pr-4">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500" onClick={() => toggleShowHiddenElements()}>
            {showHiddenElements ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500" disabled={!canUndo} onClick={undo}>
            <Undo2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500" disabled={!canRedo} onClick={redo}>
            <Redo2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2 mr-2 border-r border-slate-200/80 pr-4">
           <Select 
            value={zoom.toString()} 
            onValueChange={(val) => setZoom(parseFloat(val))}
          >
            <SelectTrigger className="h-8 w-[130px] text-xs bg-slate-50/50">
              <SelectValue placeholder="Zoom" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0" className="text-xs">
                <div className="flex items-center gap-2 font-medium">
                  <MonitorIcon className="h-3 w-3" />
                  Fit to screen
                </div>
              </SelectItem>
              <SelectItem value="0.25" className="text-xs">25%</SelectItem>
              <SelectItem value="0.5" className="text-xs">50%</SelectItem>
              <SelectItem value="0.75" className="text-xs">75%</SelectItem>
              <SelectItem value="1" className="text-xs">100%</SelectItem>
              <SelectItem value="1.5" className="text-xs">150%</SelectItem>
              <SelectItem value="2" className="text-xs">200%</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" onClick={onOpenPreview}>
          Preview
        </Button>
        <Button variant="default">Publish</Button>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
          TH
        </div>
      </div>
    </header>
  );
}
