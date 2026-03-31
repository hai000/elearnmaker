"use client";

import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Save, Upload, Download } from "lucide-react";

type ProjectActionsProps = {
  onSave: () => void;
  onImportClick: () => void;
  onExport: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleImport: (file: File) => void;
};

export const ProjectActions = memo(function ProjectActions({
  onSave,
  onImportClick,
  onExport,
  fileInputRef,
  handleImport,
}: ProjectActionsProps) {
  return (
    <div className="flex items-center gap-1 mr-2 border-r border-slate-200/80 pr-4">
      <Button
        variant="ghost"
        size="icon"
        title="Lưu dự án (Ctrl+S)"
        className="h-8 w-8 text-slate-500"
        onClick={onSave}
      >
        <Save className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        title="Nhập dự án (Import)"
        className="h-8 w-8 text-slate-500"
        onClick={onImportClick}
      >
        <Upload className="h-4 w-4" />
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".json"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleImport(file);
          e.target.value = "";
        }}
      />
      <Button
        variant="ghost"
        size="icon"
        title="Xuất dự án (Export)"
        className="h-8 w-8 text-slate-500"
        onClick={onExport}
      >
        <Download className="h-4 w-4" />
      </Button>
    </div>
  );
});
