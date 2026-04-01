"use client";

import { useEditorStore } from "@/store/editorStore";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import type { SlideElement, Slide, MediaAsset } from "@/store/types";

type PendingProject = {
  version: string;
  timestamp: number;
  slides: Slide[];
  elements: SlideElement[];
  assets?: MediaAsset[];
};

export function useProjectPersistence() {
  const slides = useEditorStore((state) => state.slides);
  const elements = useEditorStore((state) => state.elements);
  const assets = useEditorStore((state) => state.assets);
  const importProject = useEditorStore((state) => state.importProject);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingData, setPendingData] = useState<PendingProject | null>(null);

  const exportProject = useCallback(() => {
    try {
      const data = {
        version: "1.0",
        timestamp: Date.now(),
        slides,
        elements,
        assets,
      };

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `studio-project-${new Date().toISOString().split("T")[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
      
      toast.success("Dự án đã được xuất bản thành công!");
    } catch (err) {
      console.error("Export error:", err);
      toast.error("Lỗi khi xuất dự án.");
    }
  }, [slides, elements, assets]);

  const handleImport = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);

        if (!data.slides || !data.elements) {
          toast.error("Lỗi: File JSON không đúng định dạng dự án Studio.");
          return;
        }

        // Instead of window.confirm, we open our custom dialog
        setPendingData(data as PendingProject);
        setIsConfirmOpen(true);
      } catch (err) {
        console.error("Import error:", err);
        toast.error("Lỗi: Không thể đọc file JSON.");
      }
    };
    reader.readAsText(file);
  }, []);

  const confirmImport = useCallback(() => {
    if (pendingData) {
      importProject({
        slides: pendingData.slides,
        elements: pendingData.elements,
        assets: pendingData.assets ?? [],
      });
      toast.success("Đã nhập dự án thành công!");
      setPendingData(null);
      setIsConfirmOpen(false);
    }
  }, [pendingData, importProject]);

  const cancelImport = useCallback(() => {
    setPendingData(null);
    setIsConfirmOpen(false);
  }, []);

  return { 
    exportProject, 
    handleImport, 
    isConfirmOpen, 
    setIsConfirmOpen, 
    confirmImport, 
    cancelImport 
  };
}
