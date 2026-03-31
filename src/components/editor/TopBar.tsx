"use client";

import { useCallback, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Undo2, Redo2, Eye, EyeOff, MonitorIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useEditorStore } from "@/store/editorStore";
import { useProjectPersistence } from "@/hooks/useProjectPersistence";
import { ImportConfirmDialog } from "./top-bar/ImportConfirmDialog";
import { ProjectActions } from "./top-bar/ProjectActions";
import { SlideTitle } from "./top-bar/SlideTitle";

type TopBarProps = {
  onOpenPreview: () => void;
};

export default function TopBar({ onOpenPreview }: TopBarProps) {
  const saveProject = useEditorStore((state) => state.saveProject);
  const isDirty = useEditorStore((state) => state.isDirty);

  const undo = useEditorStore((state) => state.undo);
  const redo = useEditorStore((state) => state.redo);
  const canUndo = useEditorStore((state) => state.past.length > 0);
  const canRedo = useEditorStore((state) => state.future.length > 0);
  const showHiddenElements = useEditorStore((state) => state.showHiddenElements);
  const toggleShowHiddenElements = useEditorStore((state) => state.toggleShowHiddenElements);
  
  const zoom = useEditorStore((state) => state.zoom);
  const setZoom = useEditorStore((state) => state.setZoom);

  const { 
    exportProject, 
    handleImport, 
    isConfirmOpen, 
    setIsConfirmOpen, 
    confirmImport, 
    cancelImport 
  } = useProjectPersistence();
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onImportClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleSave = useCallback(() => {
    saveProject();
    toast.success("Đã lưu dự án và dọn dẹp lịch sử chỉnh sửa.");
  }, [saveProject]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSave]);

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/75 px-6 backdrop-blur">
      <div className="flex items-center gap-4">
        <div className="flex h-9 w-9 bg-black items-center justify-center rounded-xl text-white shadow-lg shadow-black-200 text-sm font-bold select-none">
          E
        </div>
        <div className="flex items-center gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Studio</p>
            <div className="flex items-center gap-2">
              <p className="font-(--font-display) text-base tracking-tight">Trình chỉnh sửa Studio</p>
              {isDirty ? (
                <Badge variant="secondary">Nháp</Badge>
              ) : (
                <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50 font-medium">
                  Đã lưu
                </Badge>
              )}
            </div>
          </div>
          <Separator orientation="vertical" className="mx-1 h-8" />
          <SlideTitle />
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

        <ProjectActions 
          onSave={handleSave}
          onImportClick={onImportClick}
          onExport={exportProject}
          fileInputRef={fileInputRef}
          handleImport={handleImport}
        />

        <div className="flex items-center gap-2 mr-2 border-r border-slate-200/80 pr-4">
           <Select value={zoom.toString()} onValueChange={(val) => setZoom(parseFloat(val))}>
            <SelectTrigger className="h-8 w-32.5 text-xs bg-slate-50/50">
              <SelectValue placeholder="Thu phóng" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0" className="text-xs">
                <div className="flex items-center gap-2 font-medium"><MonitorIcon className="h-3 w-3" />Vừa với màn hình</div>
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

        <Button variant="outline" onClick={onOpenPreview}>Xem trước</Button>
        <Button variant="default">Xuất bản</Button>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">TH</div>
      </div>
      
      <ImportConfirmDialog 
        isOpen={isConfirmOpen} 
        onOpenChange={setIsConfirmOpen}
        onConfirm={confirmImport}
        onCancel={cancelImport}
      />
    </header>
  );
}
